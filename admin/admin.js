/* ════════════════════════════════════════════════════════════════
   JAYPEE — ADMIN.JS
   Back-office connecté à Supabase : catalogues, produits, couleurs,
   images, variantes, reviews. Auth via Supabase Auth + allowlist
   admin_users (RLS protège l'écriture côté base).
════════════════════════════════════════════════════════════════ */

const BUCKET = 'product-images';
let CATALOGS = [];
let PRODUCTS = [];      // liste allégée (sidebar)
let REVIEWS = [];
let currentTab = 'products';

let draftProduct = null;   // { ...row, colors:[], images:[], variants:[] }
let draftCatalog = null;
let draftReview = null;
let tmpCounter = 0;
const tmpId = () => 'tmp_' + (++tmpCounter);

/* ─────────────────────── HELPERS ─────────────────────── */
function esc(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function slugify(s) {
  return (s || '')
    .toString().toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
function fmtPrice(v) {
  if (v == null || v === '') return '—';
  return Number(v).toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + ' MAD';
}
function starRow(rating) {
  rating = Math.round(rating || 0);
  let out = '';
  for (let i = 1; i <= 5; i++) out += `<span class="${i <= rating ? '' : 'off'}">★</span>`;
  return `<span class="adm-stars">${out}</span>`;
}
function toast(msg, type) {
  const el = document.getElementById('admToast');
  el.textContent = msg;
  el.className = 'af-toast show' + (type ? ' ' + type : '');
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.className = 'af-toast'; }, 3200);
}
function confirmDialog(title, text) {
  return new Promise((resolve) => {
    const ov = document.getElementById('admConfirmOverlay');
    document.getElementById('admConfirmTtl').textContent = title;
    document.getElementById('admConfirmTxt').textContent = text;
    ov.classList.add('open');
    const okBtn = document.getElementById('admConfirmOk');
    const cancelBtn = document.getElementById('admConfirmCancel');
    const cleanup = (result) => {
      ov.classList.remove('open');
      okBtn.onclick = null; cancelBtn.onclick = null;
      resolve(result);
    };
    okBtn.onclick = () => cleanup(true);
    cancelBtn.onclick = () => cleanup(false);
  });
}
async function uploadFileToStorage(file, pathPrefix) {
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const path = `${pathPrefix}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await sb.storage.from(BUCKET).upload(path, file, { upsert: false });
  if (error) throw error;
  const { data } = sb.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/* ═══════════════════════ AUTH ═══════════════════════ */
async function initAuth() {
  const { data: { session } } = await sb.auth.getSession();
  if (session) await onAuthed(session);
  else showLogin();

  sb.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') showLogin();
  });
}

function showLogin() {
  document.getElementById('admLogin').style.display = 'flex';
  document.getElementById('admDash').style.display = 'none';
}

async function onAuthed(session) {
  const { data: isAdmin, error } = await sb.rpc('is_admin');
  if (error || !isAdmin) {
    document.getElementById('admLoginErr').textContent = "Ce compte n'a pas les droits administrateur.";
    document.getElementById('admLoginErr').classList.add('show');
    await sb.auth.signOut();
    showLogin();
    return;
  }
  document.getElementById('admLogin').style.display = 'none';
  document.getElementById('admDash').style.display = 'block';
  document.getElementById('admUserEmail').textContent = session.user.email;
  await Promise.all([loadCatalogs(), loadProducts()]);
  renderProductList();
  renderCatalogList();
  switchTab('products');
}

document.getElementById('admLoginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('admEmail').value.trim();
  const password = document.getElementById('admPassword').value;
  const btn = document.getElementById('admLoginBtn');
  const errEl = document.getElementById('admLoginErr');
  errEl.classList.remove('show');
  btn.disabled = true;
  btn.innerHTML = '<span class="adm-spin"></span> Connexion…';
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  btn.disabled = false;
  btn.textContent = 'Se connecter';
  if (error) {
    errEl.textContent = 'Identifiants incorrects.';
    errEl.classList.add('show');
    return;
  }
  await onAuthed(data.session);
});

document.getElementById('admLogoutBtn').addEventListener('click', async () => {
  await sb.auth.signOut();
  showLogin();
});

/* ═══════════════════════ TABS ═══════════════════════ */
function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.adm-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.adm-tabpanel').forEach(p => p.style.display = 'none');
  document.getElementById('tab' + tab.charAt(0).toUpperCase() + tab.slice(1)).style.display = 'block';
  if (tab === 'reviews' && !REVIEWS.length) loadReviews().then(renderReviewList);
  if (tab === 'images') loadGallery();
}
document.querySelectorAll('.adm-tab').forEach(b => b.addEventListener('click', () => switchTab(b.dataset.tab)));

/* ═══════════════════════════════════════════════════════
   CATALOGUES
═══════════════════════════════════════════════════════ */
async function loadCatalogs() {
  const { data, error } = await sb.from('catalogs').select('*').order('sort_order');
  if (error) { toast('Erreur chargement catalogues: ' + error.message, 'error'); return; }
  CATALOGS = data || [];
  const sel = document.getElementById('admProductCatalogFilter');
  if (sel) {
    sel.innerHTML = '<option value="">Tous catalogues</option>' +
      CATALOGS.map(c => `<option value="${c.id}">${esc(c.name)}</option>`).join('');
  }
}

function renderCatalogList() {
  const wrap = document.getElementById('admCatalogList');
  if (!CATALOGS.length) { wrap.innerHTML = '<div class="admin-empty" style="height:auto;padding:30px 10px"><div class="admin-empty-ico">🗂️</div><div>Aucun catalogue.</div></div>'; return; }
  wrap.innerHTML = CATALOGS.map(c => `
    <div class="admin-litem ${draftCatalog && draftCatalog.id === c.id ? 'active' : ''}" onclick="openCatalog('${c.id}')">
      <div class="admin-litem-thumb" style="${c.image_url ? `background-image:url('${esc(c.image_url)}')` : ''}">${c.image_url ? '' : '🗂️'}</div>
      <div class="admin-litem-info">
        <div class="admin-litem-name">${esc(c.name)}</div>
        <div class="admin-litem-cap">${(c.products_count) || ''}</div>
      </div>
      <div class="admin-litem-r"><span class="adm-pill ${c.is_active ? 'on' : 'off'}">${c.is_active ? 'Actif' : 'Inactif'}</span></div>
    </div>
  `).join('');
}

function newCatalog() {
  draftCatalog = { id: null, name: '', slug: '', description: '', image_url: '', is_active: true, sort_order: CATALOGS.length, _file: null };
  renderCatalogForm();
  renderCatalogList();
}
function openCatalog(id) {
  const c = CATALOGS.find(x => x.id === id);
  draftCatalog = JSON.parse(JSON.stringify(c));
  draftCatalog._file = null;
  renderCatalogForm();
  renderCatalogList();
}
document.getElementById('admNewCatalogBtn').addEventListener('click', newCatalog);

function renderCatalogForm() {
  const c = draftCatalog;
  const wrap = document.getElementById('admCatalogFormWrap');
  wrap.innerHTML = `
    <div class="af-section">
      <div class="af-section-h">${c.id ? 'Modifier le catalogue' : 'Nouveau catalogue'}</div>
      <div class="af-row">
        <div class="af-fld">
          <label class="af-lbl">Nom <span class="adm-required">*</span></label>
          <input class="af-inp" id="catName" value="${esc(c.name)}" oninput="draftCatalog.name=this.value"/>
        </div>
        <div class="af-fld">
          <label class="af-lbl">Slug</label>
          <input class="af-inp" id="catSlug" value="${esc(c.slug)}" oninput="draftCatalog.slug=this.value"/>
        </div>
      </div>
      <div class="af-row full">
        <div class="af-fld">
          <label class="af-lbl">Description</label>
          <textarea class="af-tar" oninput="draftCatalog.description=this.value">${esc(c.description)}</textarea>
        </div>
      </div>
      <div class="af-row">
        <div class="af-fld">
          <label class="af-lbl">Ordre d'affichage</label>
          <input class="af-inp" type="number" value="${c.sort_order || 0}" oninput="draftCatalog.sort_order=parseInt(this.value||0)"/>
        </div>
        <div class="af-fld">
          <label class="af-lbl">Statut</label>
          <div class="adm-toggle-row">
            <span>Catalogue actif</span>
            <label class="adm-switch">
              <input type="checkbox" ${c.is_active ? 'checked' : ''} onchange="draftCatalog.is_active=this.checked"/>
              <span class="adm-switch-track"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="af-row full">
        <div class="af-fld">
          <label class="af-lbl">Image principale</label>
          <div class="af-photos">
            <label class="af-photo ${c.image_url || c._file ? '' : 'af-photo-add'}">
              ${c._file ? `<img src="${URL.createObjectURL(c._file)}"/>` : (c.image_url ? `<img src="${esc(c.image_url)}"/>` : `<div class="af-photo-add-ico">＋</div><div class="af-photo-add-txt">Ajouter</div>`)}
              <input type="file" accept="image/*" onchange="draftCatalog._file=this.files[0]; renderCatalogForm()"/>
            </label>
          </div>
        </div>
      </div>
      <div class="af-actions">
        <div class="af-actions-l">
          ${c.id ? `<button class="admin-btn admin-btn-dng" onclick="deleteCatalog('${c.id}')">Supprimer</button>` : ''}
        </div>
        <div class="af-actions-r">
          <button class="admin-btn admin-btn-sec" onclick="closeCatalogForm()">Annuler</button>
          <button class="admin-btn admin-btn-pri" id="catSaveBtn" onclick="saveCatalog()">Enregistrer</button>
        </div>
      </div>
    </div>
  `;
}
function closeCatalogForm() {
  draftCatalog = null;
  document.getElementById('admCatalogFormWrap').innerHTML = `<div class="admin-empty"><div class="admin-empty-ico">🗂️</div><div>Sélectionnez un catalogue ou créez-en un nouveau.</div></div>`;
  renderCatalogList();
}
async function saveCatalog() {
  const c = draftCatalog;
  if (!c.name || !c.name.trim()) { toast('Le nom est obligatoire.', 'error'); return; }
  const btn = document.getElementById('catSaveBtn');
  btn.disabled = true; btn.innerHTML = '<span class="adm-spin"></span> Sauvegarde…';
  try {
    let imageUrl = c.image_url;
    if (c._file) imageUrl = await uploadFileToStorage(c._file, `catalogs/${slugify(c.name)}`);
    const payload = {
      name: c.name.trim(),
      slug: c.slug ? slugify(c.slug) : slugify(c.name),
      description: c.description || null,
      image_url: imageUrl || null,
      is_active: !!c.is_active,
      sort_order: c.sort_order || 0
    };
    let error;
    if (c.id) {
      ({ error } = await sb.from('catalogs').update(payload).eq('id', c.id));
    } else {
      ({ error } = await sb.from('catalogs').insert(payload));
    }
    if (error) throw error;
    toast('Catalogue enregistré ✓', 'success');
    await loadCatalogs();
    closeCatalogForm();
  } catch (err) {
    toast('Erreur : ' + err.message, 'error');
  } finally {
    btn.disabled = false; btn.textContent = 'Enregistrer';
  }
}
async function deleteCatalog(id) {
  const ok = await confirmDialog('Supprimer ce catalogue ?', 'Les produits associés ne seront pas supprimés, mais deviendront sans catalogue.');
  if (!ok) return;
  const { error } = await sb.from('catalogs').delete().eq('id', id);
  if (error) { toast('Erreur : ' + error.message, 'error'); return; }
  toast('Catalogue supprimé', 'success');
  await loadCatalogs();
  closeCatalogForm();
}

/* ═══════════════════════════════════════════════════════
   PRODUITS
═══════════════════════════════════════════════════════ */
async function loadProducts() {
  const { data, error } = await sb.from('products')
    .select('id, name, catalog_id, price, stock, is_active, is_featured, avg_rating, capacity_label, sort_order, product_images(url, is_primary)')
    .order('sort_order');
  if (error) { toast('Erreur chargement produits: ' + error.message, 'error'); return; }
  PRODUCTS = data || [];
}

function productThumb(p) {
  const imgs = p.product_images || [];
  const primary = imgs.find(i => i.is_primary) || imgs[0];
  return primary ? primary.url : null;
}

function renderProductList() {
  const wrap = document.getElementById('admProductList');
  const search = (document.getElementById('admProductSearch').value || '').toLowerCase();
  const catFilter = document.getElementById('admProductCatalogFilter').value;
  let list = PRODUCTS.filter(p => p.name.toLowerCase().includes(search));
  if (catFilter) list = list.filter(p => p.catalog_id === catFilter);
  if (!list.length) { wrap.innerHTML = '<div class="admin-empty" style="height:auto;padding:30px 10px"><div class="admin-empty-ico">📦</div><div>Aucun produit.</div></div>'; return; }
  wrap.innerHTML = list.map(p => {
    const thumb = productThumb(p);
    return `
    <div class="admin-litem ${draftProduct && draftProduct.id === p.id ? 'active' : ''}" onclick="openProduct('${p.id}')">
      <div class="admin-litem-thumb" style="${thumb ? `background-image:url('${esc(thumb)}')` : ''}">${thumb ? '' : '📦'}</div>
      <div class="admin-litem-info">
        <div class="admin-litem-name">${esc(p.name)}${p.is_featured ? ' ⭐' : ''}</div>
        <div class="admin-litem-cap">${esc(p.capacity_label || '')}</div>
        <div class="admin-litem-price">${fmtPrice(p.price)} · Stock ${p.stock ?? 0}</div>
      </div>
      <div class="admin-litem-r"><span class="adm-pill ${p.is_active ? 'on' : 'off'}">${p.is_active ? 'Actif' : 'Inactif'}</span></div>
    </div>
  `; }).join('');
}
document.getElementById('admProductSearch').addEventListener('input', renderProductList);
document.getElementById('admProductCatalogFilter').addEventListener('change', renderProductList);
document.getElementById('admNewProductBtn').addEventListener('click', newProduct);

function newProduct() {
  draftProduct = {
    id: null, catalog_id: '', name: '', slug: '', short_description: '', long_description: '',
    price: null, compare_at_price: null, category_label: '', capacity_label: '', filter_key: '',
    icon: '📦', badge: '', sku: '', stock: 0, is_active: true, is_featured: false,
    tags: [], specs: {}, features: [], sort_order: PRODUCTS.length,
    colors: [], images: [], variants: []
  };
  renderProductForm();
  renderProductList();
}

async function openProduct(id) {
  const wrap = document.getElementById('admProductFormWrap');
  wrap.innerHTML = '<div class="adm-loading"><span class="adm-spin dark"></span> Chargement du produit…</div>';
  const { data, error } = await sb.from('products')
    .select('*, product_colors(*), product_images(*), product_variants(*)')
    .eq('id', id).single();
  if (error) { toast('Erreur : ' + error.message, 'error'); return; }
  draftProduct = {
    ...data,
    colors: (data.product_colors || []).sort((a, b) => a.sort_order - b.sort_order),
    images: (data.product_images || []).sort((a, b) => a.sort_order - b.sort_order),
    variants: (data.product_variants || []).sort((a, b) => a.sort_order - b.sort_order),
    tags: data.tags || [], specs: data.specs || {}, features: data.features || []
  };
  delete draftProduct.product_colors; delete draftProduct.product_images; delete draftProduct.product_variants;
  renderProductForm();
  renderProductList();
}

function closeProductForm() {
  draftProduct = null;
  document.getElementById('admProductFormWrap').innerHTML = `<div class="admin-empty"><div class="admin-empty-ico">📦</div><div>Sélectionnez un produit ou créez-en un nouveau.</div></div>`;
  renderProductList();
}

/* ── sous-blocs répétables : couleurs / variantes / specs / features ── */
function addColor() {
  draftProduct.colors.push({ id: tmpId(), name: '', hex: '#cccccc', sort_order: draftProduct.colors.length });
  renderProductForm();
}
function removeColor(id) {
  draftProduct.colors = draftProduct.colors.filter(c => c.id !== id);
  draftProduct.images = draftProduct.images.filter(i => i.color_id !== id);
  renderProductForm();
}
function addVariant() {
  draftProduct.variants.push({ id: tmpId(), name: '', sku: '', price_override: null, stock: null, sort_order: draftProduct.variants.length });
  renderProductForm();
}
function removeVariant(id) {
  draftProduct.variants = draftProduct.variants.filter(v => v.id !== id);
  renderProductForm();
}
function addSpec() {
  const keys = Object.keys(draftProduct.specs);
  draftProduct.specs['Nouveau champ ' + (keys.length + 1)] = '';
  renderProductForm();
}
function removeSpec(key) {
  delete draftProduct.specs[key];
  renderProductForm();
}
function addFeature() {
  draftProduct.features.push({ ico: '✨', title: '', txt: '' });
  renderProductForm();
}
function removeFeature(idx) {
  draftProduct.features.splice(idx, 1);
  renderProductForm();
}
async function pickColorImage(colorId, input) {
  const file = input.files[0];
  if (!file) return;
  draftProduct.images.push({
    id: tmpId(), color_id: colorId, url: null, _file: file,
    is_primary: !draftProduct.images.some(i => i.is_primary), sort_order: draftProduct.images.length
  });
  renderProductForm();
}
function removeImage(id) {
  draftProduct.images = draftProduct.images.filter(i => i.id !== id);
  renderProductForm();
}
function setPrimaryImage(id) {
  draftProduct.images.forEach(i => i.is_primary = (i.id === id));
  renderProductForm();
}

function renderProductForm() {
  const p = draftProduct;
  const wrap = document.getElementById('admProductFormWrap');
  const catOptions = CATALOGS.map(c => `<option value="${c.id}" ${p.catalog_id === c.id ? 'selected' : ''}>${esc(c.name)}</option>`).join('');

  wrap.innerHTML = `
    <div class="af-section">
      <div class="af-section-h">Informations générales</div>
      <div class="af-row">
        <div class="af-fld">
          <label class="af-lbl">Nom du produit <span class="adm-required">*</span></label>
          <input class="af-inp" value="${esc(p.name)}" oninput="draftProduct.name=this.value"/>
        </div>
        <div class="af-fld">
          <label class="af-lbl">Catalogue</label>
          <select class="af-sel" onchange="draftProduct.catalog_id=this.value">
            <option value="">— Aucun —</option>${catOptions}
          </select>
        </div>
      </div>
      <div class="af-row full">
        <div class="af-fld">
          <label class="af-lbl">Description courte</label>
          <textarea class="af-tar" style="min-height:60px" oninput="draftProduct.short_description=this.value">${esc(p.short_description)}</textarea>
        </div>
      </div>
      <div class="af-row full">
        <div class="af-fld">
          <label class="af-lbl">Description longue</label>
          <textarea class="af-tar" oninput="draftProduct.long_description=this.value">${esc(p.long_description)}</textarea>
        </div>
      </div>
      <div class="af-row">
        <div class="af-fld">
          <label class="af-lbl">Catégorie (affichage)</label>
          <input class="af-inp" value="${esc(p.category_label)}" oninput="draftProduct.category_label=this.value"/>
        </div>
        <div class="af-fld">
          <label class="af-lbl">Capacité (affichage)</label>
          <input class="af-inp" value="${esc(p.capacity_label)}" oninput="draftProduct.capacity_label=this.value"/>
        </div>
      </div>
      <div class="af-row">
        <div class="af-fld">
          <label class="af-lbl">Filtre site (1500 / 2000 / 3000)</label>
          <input class="af-inp" value="${esc(p.filter_key)}" oninput="draftProduct.filter_key=this.value"/>
        </div>
        <div class="af-fld">
          <label class="af-lbl">Icône emoji (repli si pas de photo)</label>
          <input class="af-inp" value="${esc(p.icon)}" oninput="draftProduct.icon=this.value"/>
        </div>
      </div>
      <div class="af-row">
        <div class="af-fld">
          <label class="af-lbl">Badge (ex: new)</label>
          <input class="af-inp" value="${esc(p.badge)}" oninput="draftProduct.badge=this.value"/>
        </div>
        <div class="af-fld">
          <label class="af-lbl">Tags (séparés par virgule)</label>
          <input class="af-inp" value="${esc((p.tags || []).join(', '))}" oninput="draftProduct.tags=this.value.split(',').map(s=>s.trim()).filter(Boolean)"/>
        </div>
      </div>
    </div>

    <div class="af-section">
      <div class="af-section-h">Tarif &amp; stock</div>
      <div class="af-row">
        <div class="af-fld">
          <label class="af-lbl">Prix (MAD)</label>
          <input class="af-inp" type="number" step="0.01" value="${p.price ?? ''}" oninput="draftProduct.price=this.value===''?null:parseFloat(this.value)"/>
        </div>
        <div class="af-fld">
          <label class="af-lbl">Ancien prix / prix barré</label>
          <input class="af-inp" type="number" step="0.01" value="${p.compare_at_price ?? ''}" oninput="draftProduct.compare_at_price=this.value===''?null:parseFloat(this.value)"/>
        </div>
      </div>
      <div class="af-row">
        <div class="af-fld">
          <label class="af-lbl">SKU</label>
          <input class="af-inp" value="${esc(p.sku)}" oninput="draftProduct.sku=this.value"/>
        </div>
        <div class="af-fld">
          <label class="af-lbl">Stock</label>
          <input class="af-inp" type="number" value="${p.stock ?? 0}" oninput="draftProduct.stock=parseInt(this.value||0)"/>
        </div>
      </div>
      <div class="af-row">
        <div class="af-fld">
          <label class="af-lbl">Statut</label>
          <div class="adm-toggle-row">
            <span>Produit actif (visible sur le site)</span>
            <label class="adm-switch">
              <input type="checkbox" ${p.is_active ? 'checked' : ''} onchange="draftProduct.is_active=this.checked"/>
              <span class="adm-switch-track"></span>
            </label>
          </div>
        </div>
        <div class="af-fld">
          <label class="af-lbl">Mise en avant</label>
          <div class="adm-toggle-row">
            <span>Produit mis en avant</span>
            <label class="adm-switch">
              <input type="checkbox" ${p.is_featured ? 'checked' : ''} onchange="draftProduct.is_featured=this.checked"/>
              <span class="adm-switch-track"></span>
            </label>
          </div>
        </div>
      </div>
      ${p.id ? `<div class="af-row"><div class="af-fld"><label class="af-lbl">Note moyenne (calculée automatiquement)</label><div style="padding:10px 0">${starRow(p.avg_rating)} <span style="font-size:12px;color:var(--mid);margin-left:8px">${p.avg_rating || 0}/5 · ${p.review_count || 0} avis</span></div></div></div>` : ''}
    </div>

    <div class="af-section">
      <div class="af-section-h">Couleurs disponibles <button class="af-add" onclick="addColor()">+ Ajouter une couleur</button></div>
      ${p.colors.map(c => `
        <div class="af-mini-row-3">
          <input class="af-inp" placeholder="Nom (ex: Beige)" value="${esc(c.name)}" oninput="(function(){const col=draftProduct.colors.find(x=>x.id==='${c.id}'); col.name=this.value;}).call(this)"/>
          <input type="color" class="af-color-sw" value="${c.hex || '#cccccc'}" oninput="(function(){const col=draftProduct.colors.find(x=>x.id==='${c.id}'); col.hex=this.value;}).call(this)"/>
          <label class="af-add" style="text-align:center;cursor:pointer">📷<input type="file" accept="image/*" style="display:none" onchange="pickColorImage('${c.id}', this)"/></label>
          <button class="af-rm" onclick="removeColor('${c.id}')">✕</button>
        </div>
        <div class="af-photos" style="margin-bottom:14px">
          ${draftProduct.images.filter(i => i.color_id === c.id).map(img => `
            <div class="af-photo">
              <img src="${img._file ? URL.createObjectURL(img._file) : esc(img.url)}"/>
              ${img.is_primary ? '<div class="adm-gal-primary-badge">Principale</div>' : ''}
              <button class="af-photo-rm" onclick="removeImage('${img.id}')">✕</button>
            </div>
          `).join('')}
        </div>
      `).join('')}
      ${!p.colors.length ? '<div class="adm-field-hint">Aucune couleur — ajoutez-en une pour pouvoir associer des photos.</div>' : ''}
    </div>

    <div class="af-section">
      <div class="af-section-h">Toutes les images ${p.images.length ? "· cliquez pour définir l'image principale" : ''}</div>
      <div class="af-photos">
        ${p.images.map(img => `
          <div class="af-photo" onclick="setPrimaryImage('${img.id}')" title="Définir comme image principale">
            <img src="${img._file ? URL.createObjectURL(img._file) : esc(img.url)}"/>
            ${img.is_primary ? '<div class="adm-gal-primary-badge">Principale</div>' : ''}
            <button class="af-photo-rm" onclick="event.stopPropagation();removeImage('${img.id}')">✕</button>
          </div>
        `).join('')}
      </div>
      ${!p.images.length ? '<div class="adm-field-hint">Aucune image. Ajoutez des photos depuis les couleurs ci-dessus.</div>' : ''}
    </div>

    <div class="af-section">
      <div class="af-section-h">Tailles / variantes <button class="af-add" onclick="addVariant()">+ Ajouter une variante</button></div>
      ${p.variants.map(v => `
        <div class="af-mini-row">
          <input class="af-inp" placeholder="Nom (ex: 800 ML)" value="${esc(v.name)}" oninput="(function(){const it=draftProduct.variants.find(x=>x.id==='${v.id}'); it.name=this.value;}).call(this)"/>
          <input class="af-inp" placeholder="SKU" value="${esc(v.sku || '')}" oninput="(function(){const it=draftProduct.variants.find(x=>x.id==='${v.id}'); it.sku=this.value;}).call(this)"/>
          <input class="af-inp" type="number" placeholder="Stock" value="${v.stock ?? ''}" oninput="(function(){const it=draftProduct.variants.find(x=>x.id==='${v.id}'); it.stock=this.value===''?null:parseInt(this.value);}).call(this)"/>
          <button class="af-rm" onclick="removeVariant('${v.id}')">✕</button>
        </div>
      `).join('')}
      ${!p.variants.length ? '<div class="adm-field-hint">Aucune variante (facultatif — utile pour un set de tailles).</div>' : ''}
    </div>

    <div class="af-section">
      <div class="af-section-h">Spécifications techniques <button class="af-add" onclick="addSpec()">+ Ajouter une ligne</button></div>
      ${Object.entries(p.specs).map(([k, v]) => `
        <div class="af-mini-row">
          <input class="af-inp" value="${esc(k)}" onchange="(function(){const val=draftProduct.specs['${esc(k)}']; delete draftProduct.specs['${esc(k)}']; draftProduct.specs[this.value]=val; renderProductForm();}).call(this)"/>
          <input class="af-inp" style="grid-column:span 2" value="${esc(v)}" oninput="draftProduct.specs['${esc(k)}']=this.value"/>
          <button class="af-rm" onclick="removeSpec('${esc(k)}')">✕</button>
        </div>
      `).join('')}
    </div>

    <div class="af-section">
      <div class="af-section-h">Points forts (features) <button class="af-add" onclick="addFeature()">+ Ajouter</button></div>
      ${p.features.map((f, idx) => `
        <div class="af-mini-row-feat">
          <input class="af-inp" placeholder="🌡️" value="${esc(f.ico)}" oninput="draftProduct.features[${idx}].ico=this.value"/>
          <div>
            <input class="af-inp" placeholder="Titre" style="margin-bottom:6px" value="${esc(f.title)}" oninput="draftProduct.features[${idx}].title=this.value"/>
            <textarea class="af-tar" style="min-height:50px" placeholder="Texte" oninput="draftProduct.features[${idx}].txt=this.value">${esc(f.txt)}</textarea>
          </div>
          <button class="af-rm" onclick="removeFeature(${idx})">✕</button>
        </div>
      `).join('')}
    </div>

    <div class="af-actions">
      <div class="af-actions-l">
        ${p.id ? `<button class="admin-btn admin-btn-dng" onclick="deleteProduct('${p.id}')">Supprimer le produit</button>` : ''}
      </div>
      <div class="af-actions-r">
        <button class="admin-btn admin-btn-sec" onclick="closeProductForm()">Annuler</button>
        <button class="admin-btn admin-btn-pri" id="prodSaveBtn" onclick="saveProduct()">Enregistrer</button>
      </div>
    </div>
  `;
}

async function saveProduct() {
  const p = draftProduct;
  if (!p.name || !p.name.trim()) { toast('Le nom du produit est obligatoire.', 'error'); return; }
  const btn = document.getElementById('prodSaveBtn');
  btn.disabled = true; btn.innerHTML = '<span class="adm-spin"></span> Sauvegarde…';
  try {
    const payload = {
      catalog_id: p.catalog_id || null,
      name: p.name.trim(),
      slug: p.slug ? slugify(p.slug) : slugify(p.name),
      short_description: p.short_description || null,
      long_description: p.long_description || null,
      price: p.price,
      compare_at_price: p.compare_at_price,
      category_label: p.category_label || null,
      capacity_label: p.capacity_label || null,
      filter_key: p.filter_key || null,
      icon: p.icon || null,
      badge: p.badge || null,
      sku: p.sku || null,
      stock: p.stock || 0,
      is_active: !!p.is_active,
      is_featured: !!p.is_featured,
      tags: p.tags || [],
      specs: p.specs || {},
      features: p.features || [],
      sort_order: p.sort_order || 0
    };

    let productId = p.id;
    if (productId) {
      const { error } = await sb.from('products').update(payload).eq('id', productId);
      if (error) throw error;
    } else {
      const { data, error } = await sb.from('products').insert(payload).select('id').single();
      if (error) throw error;
      productId = data.id;
    }

    /* couleurs : diff simple (upsert / delete) */
    const colorIdMap = {}; // tmp id -> real id
    for (const c of p.colors) {
      const isTmp = String(c.id).startsWith('tmp_');
      const row = { product_id: productId, name: c.name || '', hex: c.hex || '#cccccc', sort_order: c.sort_order || 0 };
      if (isTmp) {
        const { data, error } = await sb.from('product_colors').insert(row).select('id').single();
        if (error) throw error;
        colorIdMap[c.id] = data.id;
      } else {
        const { error } = await sb.from('product_colors').update(row).eq('id', c.id);
        if (error) throw error;
        colorIdMap[c.id] = c.id;
      }
    }
    // supprimer les couleurs retirées côté serveur
    if (productId && p.id) {
      const { data: existingColors } = await sb.from('product_colors').select('id').eq('product_id', productId);
      const keepIds = p.colors.filter(c => !String(c.id).startsWith('tmp_')).map(c => c.id);
      const toDelete = (existingColors || []).filter(c => !keepIds.includes(c.id)).map(c => c.id);
      if (toDelete.length) await sb.from('product_colors').delete().in('id', toDelete);
    }

    /* images : upload fichiers en attente puis upsert / delete */
    for (const img of p.images) {
      const realColorId = img.color_id ? (colorIdMap[img.color_id] || img.color_id) : null;
      if (img._file) {
        const url = await uploadFileToStorage(img._file, `products/${payload.slug}`);
        const { error } = await sb.from('product_images').insert({
          product_id: productId, color_id: realColorId, url,
          is_primary: !!img.is_primary, sort_order: img.sort_order || 0
        });
        if (error) throw error;
      } else if (img.id && !String(img.id).startsWith('tmp_')) {
        const { error } = await sb.from('product_images').update({
          is_primary: !!img.is_primary, sort_order: img.sort_order || 0, color_id: realColorId
        }).eq('id', img.id);
        if (error) throw error;
      }
    }
    if (productId && p.id) {
      const { data: existingImages } = await sb.from('product_images').select('id').eq('product_id', productId);
      const keepImgIds = p.images.filter(i => !String(i.id).startsWith('tmp_')).map(i => i.id);
      const toDelete = (existingImages || []).filter(i => !keepImgIds.includes(i.id)).map(i => i.id);
      if (toDelete.length) await sb.from('product_images').delete().in('id', toDelete);
    }

    /* variantes : diff simple */
    for (const v of p.variants) {
      const isTmp = String(v.id).startsWith('tmp_');
      const row = { product_id: productId, name: v.name || '', sku: v.sku || null, price_override: v.price_override, stock: v.stock, sort_order: v.sort_order || 0 };
      if (isTmp) {
        const { error } = await sb.from('product_variants').insert(row);
        if (error) throw error;
      } else {
        const { error } = await sb.from('product_variants').update(row).eq('id', v.id);
        if (error) throw error;
      }
    }
    if (productId && p.id) {
      const { data: existingVariants } = await sb.from('product_variants').select('id').eq('product_id', productId);
      const keepVarIds = p.variants.filter(v => !String(v.id).startsWith('tmp_')).map(v => v.id);
      const toDelete = (existingVariants || []).filter(v => !keepVarIds.includes(v.id)).map(v => v.id);
      if (toDelete.length) await sb.from('product_variants').delete().in('id', toDelete);
    }

    toast('Produit enregistré ✓', 'success');
    await loadProducts();
    await openProduct(productId);
  } catch (err) {
    toast('Erreur : ' + err.message, 'error');
  } finally {
    const b = document.getElementById('prodSaveBtn');
    if (b) { b.disabled = false; b.textContent = 'Enregistrer'; }
  }
}

async function deleteProduct(id) {
  const ok = await confirmDialog('Supprimer ce produit ?', 'Cette action supprimera aussi ses couleurs, images, variantes et avis associés. Irréversible.');
  if (!ok) return;
  const { error } = await sb.from('products').delete().eq('id', id);
  if (error) { toast('Erreur : ' + error.message, 'error'); return; }
  toast('Produit supprimé', 'success');
  await loadProducts();
  closeProductForm();
}

/* ═══════════════════════════════════════════════════════
   REVIEWS
═══════════════════════════════════════════════════════ */
async function loadReviews() {
  const { data, error } = await sb.from('product_reviews')
    .select('*, products(name)')
    .order('review_date', { ascending: false });
  if (error) { toast('Erreur chargement avis: ' + error.message, 'error'); return; }
  REVIEWS = data || [];
  const sel = document.getElementById('admReviewProductFilter');
  if (sel) sel.innerHTML = '<option value="">Tous produits</option>' + PRODUCTS.map(p => `<option value="${p.id}">${esc(p.name)}</option>`).join('');
}

function renderReviewList() {
  const wrap = document.getElementById('admReviewList');
  const filter = document.getElementById('admReviewProductFilter').value;
  let list = filter ? REVIEWS.filter(r => r.product_id === filter) : REVIEWS;
  if (!list.length) { wrap.innerHTML = '<div class="admin-empty" style="height:auto;padding:30px 10px"><div class="admin-empty-ico">💬</div><div>Aucun avis.</div></div>'; return; }
  wrap.innerHTML = list.map(r => `
    <div class="admin-litem ${draftReview && draftReview.id === r.id ? 'active' : ''}" onclick="openReview('${r.id}')">
      <div class="admin-litem-thumb">💬</div>
      <div class="admin-litem-info">
        <div class="admin-litem-name">${esc(r.customer_name)} — ${esc(r.products ? r.products.name : '')}</div>
        <div class="admin-litem-cap">${starRow(r.rating)} · ${esc(r.review_date)}</div>
      </div>
      <div class="admin-litem-r"><span class="adm-pill ${r.is_visible ? 'on' : 'off'}">${r.is_visible ? 'Visible' : 'Masqué'}</span></div>
    </div>
  `).join('');
}
document.getElementById('admReviewProductFilter').addEventListener('change', renderReviewList);
document.getElementById('admNewReviewBtn').addEventListener('click', newReview);

function newReview() {
  draftReview = { id: null, product_id: '', customer_name: '', rating: 5, comment: '', review_date: new Date().toISOString().slice(0, 10), is_visible: true };
  renderReviewForm();
  renderReviewList();
}
function openReview(id) {
  draftReview = JSON.parse(JSON.stringify(REVIEWS.find(r => r.id === id)));
  renderReviewForm();
  renderReviewList();
}
function closeReviewForm() {
  draftReview = null;
  document.getElementById('admReviewFormWrap').innerHTML = `<div class="admin-empty"><div class="admin-empty-ico">💬</div><div>Sélectionnez un avis ou créez-en un nouveau.</div></div>`;
  renderReviewList();
}
function renderReviewForm() {
  const r = draftReview;
  const wrap = document.getElementById('admReviewFormWrap');
  const prodOptions = PRODUCTS.map(p => `<option value="${p.id}" ${r.product_id === p.id ? 'selected' : ''}>${esc(p.name)}</option>`).join('');
  wrap.innerHTML = `
    <div class="af-section">
      <div class="af-section-h">${r.id ? "Modifier l'avis" : 'Nouvel avis'}</div>
      <div class="af-row">
        <div class="af-fld">
          <label class="af-lbl">Produit <span class="adm-required">*</span></label>
          <select class="af-sel" onchange="draftReview.product_id=this.value">
            <option value="">— Choisir —</option>${prodOptions}
          </select>
        </div>
        <div class="af-fld">
          <label class="af-lbl">Nom du client <span class="adm-required">*</span></label>
          <input class="af-inp" value="${esc(r.customer_name)}" oninput="draftReview.customer_name=this.value"/>
        </div>
      </div>
      <div class="af-row">
        <div class="af-fld">
          <label class="af-lbl">Note (1 à 5)</label>
          <select class="af-sel" onchange="draftReview.rating=parseInt(this.value)">
            ${[5,4,3,2,1].map(n => `<option value="${n}" ${r.rating===n?'selected':''}>${n} ★</option>`).join('')}
          </select>
        </div>
        <div class="af-fld">
          <label class="af-lbl">Date</label>
          <input class="af-inp" type="date" value="${esc(r.review_date)}" oninput="draftReview.review_date=this.value"/>
        </div>
      </div>
      <div class="af-row full">
        <div class="af-fld">
          <label class="af-lbl">Commentaire</label>
          <textarea class="af-tar" oninput="draftReview.comment=this.value">${esc(r.comment)}</textarea>
        </div>
      </div>
      <div class="af-row full">
        <div class="af-fld">
          <div class="adm-toggle-row">
            <span>Avis visible sur le site</span>
            <label class="adm-switch">
              <input type="checkbox" ${r.is_visible ? 'checked' : ''} onchange="draftReview.is_visible=this.checked"/>
              <span class="adm-switch-track"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="af-actions">
        <div class="af-actions-l">
          ${r.id ? `<button class="admin-btn admin-btn-dng" onclick="deleteReview('${r.id}')">Supprimer</button>` : ''}
        </div>
        <div class="af-actions-r">
          <button class="admin-btn admin-btn-sec" onclick="closeReviewForm()">Annuler</button>
          <button class="admin-btn admin-btn-pri" id="revSaveBtn" onclick="saveReview()">Enregistrer</button>
        </div>
      </div>
    </div>
  `;
}
async function saveReview() {
  const r = draftReview;
  if (!r.product_id || !r.customer_name || !r.customer_name.trim()) { toast('Produit et nom du client sont obligatoires.', 'error'); return; }
  const btn = document.getElementById('revSaveBtn');
  btn.disabled = true; btn.innerHTML = '<span class="adm-spin"></span> Sauvegarde…';
  try {
    const payload = {
      product_id: r.product_id, customer_name: r.customer_name.trim(), rating: r.rating || 5,
      comment: r.comment || null, review_date: r.review_date, is_visible: !!r.is_visible
    };
    let error;
    if (r.id) ({ error } = await sb.from('product_reviews').update(payload).eq('id', r.id));
    else ({ error } = await sb.from('product_reviews').insert(payload));
    if (error) throw error;
    toast('Avis enregistré ✓', 'success');
    await loadReviews();
    renderReviewList();
    closeReviewForm();
    await loadProducts(); // avg_rating a pu changer
  } catch (err) {
    toast('Erreur : ' + err.message, 'error');
  } finally {
    const b = document.getElementById('revSaveBtn');
    if (b) { b.disabled = false; b.textContent = 'Enregistrer'; }
  }
}
async function deleteReview(id) {
  const ok = await confirmDialog('Supprimer cet avis ?', 'Cette action est irréversible.');
  if (!ok) return;
  const { error } = await sb.from('product_reviews').delete().eq('id', id);
  if (error) { toast('Erreur : ' + error.message, 'error'); return; }
  toast('Avis supprimé', 'success');
  await loadReviews();
  renderReviewList();
  closeReviewForm();
  await loadProducts();
}

/* ═══════════════════════════════════════════════════════
   GALERIE D'IMAGES (vue globale)
═══════════════════════════════════════════════════════ */
async function loadGallery() {
  const wrap = document.getElementById('admGallery');
  wrap.innerHTML = '<div class="adm-loading"><span class="adm-spin dark"></span> Chargement…</div>';
  const { data, error } = await sb.from('product_images')
    .select('*, products(name), product_colors(name)')
    .order('created_at', { ascending: false });
  if (error) { toast('Erreur : ' + error.message, 'error'); return; }
  if (!data.length) { wrap.innerHTML = '<div class="admin-empty" style="height:auto;padding:40px"><div class="admin-empty-ico">🖼️</div><div>Aucune image pour le moment.</div></div>'; return; }
  wrap.innerHTML = data.map(img => `
    <div class="adm-gal-card">
      <div class="adm-gal-vis">
        <img src="${esc(img.url)}"/>
        ${img.is_primary ? '<div class="adm-gal-primary-badge">Principale</div>' : ''}
      </div>
      <div class="adm-gal-body">
        <div class="adm-gal-name">${esc(img.products ? img.products.name : '—')}</div>
        <div class="adm-gal-meta">${esc(img.product_colors ? img.product_colors.name : 'Sans couleur')}</div>
      </div>
      <div class="adm-gal-actions">
        ${!img.is_primary ? `<button class="adm-btn-xs" onclick="galSetPrimary('${img.id}','${img.product_id}')">Définir principale</button>` : ''}
        <button class="adm-btn-xs dng" onclick="galDelete('${img.id}')">Supprimer</button>
      </div>
    </div>
  `).join('');
}
async function galSetPrimary(imageId, productId) {
  await sb.from('product_images').update({ is_primary: false }).eq('product_id', productId);
  const { error } = await sb.from('product_images').update({ is_primary: true }).eq('id', imageId);
  if (error) { toast('Erreur : ' + error.message, 'error'); return; }
  toast('Image principale mise à jour ✓', 'success');
  loadGallery();
  loadProducts();
}
async function galDelete(imageId) {
  const ok = await confirmDialog('Supprimer cette image ?', 'Cette action est irréversible.');
  if (!ok) return;
  const { error } = await sb.from('product_images').delete().eq('id', imageId);
  if (error) { toast('Erreur : ' + error.message, 'error'); return; }
  toast('Image supprimée', 'success');
  loadGallery();
  loadProducts();
}

/* ═══════════════════════ INIT ═══════════════════════ */
initAuth();
