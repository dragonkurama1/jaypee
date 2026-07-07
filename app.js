/* ════════════════════════════════════════════
   JAYPEE — APP.JS
   Logique commune : produits, navigation
════════════════════════════════════════════ */

/* ─── DONNÉES PRODUITS PAR DÉFAUT ─── */
const DEFAULT_PRODUCTS = [
  {
    id:0, name:"Luxura Klass", cat:"Récipient Isotherme", cap:"2000 ML",
    badge:"new", filter:"2000",
    desc:"Le Luxura Klass incarne l'excellence de la gamme JAYPEE. Conçu pour les amateurs d'art de vivre raffiné, ce récipient isotherme en acier inoxydable 18/8 de 2000 ml allie élégance architecturale et performance thermique de haute précision. Son couvercle à fermeture hermétique garantit une étanchéité parfaite, tandis que sa double paroi sous vide maintient vos plats à la température idéale jusqu'à 12 heures.",
    icon:"🍶", photos:[],
    colors:[
      {name:"Blanc Cassé", hex:"#f5f0e8", images:["images/luxura-klass-blanc-casse-mogcduue-0.jpg","images/luxura-klass-blanc-casse-mogcdx52-1.jpg","images/luxura-klass-blanc-casse-mogcdywu-2.jpg"], photo:"images/luxura-klass-blanc-casse-mogcduue-0.jpg"},
      {name:"Noir",        hex:"#1a1a1a", images:["images/luxura-klass-noir-mogce0if-0.jpg","images/luxura-klass-noir-mogce2ka-1.jpg"], photo:"images/luxura-klass-noir-mogce0if-0.jpg"},
      {name:"Camel",       hex:"#c4956a", images:[], photo:null}
    ],
    specs:{
      "Capacité":"2000 ML",
      "Matière":"Acier inoxydable 18/8",
      "Conservation chaud":"Jusqu'à 12h",
      "Conservation froid":"Jusqu'à 24h",
      "Fermeture":"Hermétique sous vide",
      "Coloris":"3 variantes",
      "Origine":"The Kitchen Collection"
    },
    features:[
      {ico:"🌡️", title:"Double paroi sous vide", txt:"Maintien optimal de la température — chaud ou froid — jusqu'à 24 heures."},
      {ico:"✨", title:"Finition premium mate", txt:"Surface traitement anti-traces pour un aspect toujours impeccable."},
      {ico:"🔒", title:"Fermeture hermétique", txt:"Couvercle à joint silicone pour une étanchéité totale, zéro fuite."},
      {ico:"🧼", title:"Facilement nettoyable", txt:"Inox alimentaire approuvé, lavage facile à la main ou partie amovible."}
    ]
  },
  {
    id:1, name:"Luxura", cat:"Récipient Isotherme", cap:"1500 ML",
    badge:"new", filter:"1500",
    desc:"Le Luxura, version compacte et élégante de la ligne signature JAYPEE. En acier inoxydable de première qualité, il s'impose comme le compagnon idéal des familles modernes et des petits intérieurs raffinés. Ses 1500 ml offrent la capacité parfaite pour deux à trois personnes, avec une isolation thermique qui maintient vos plats à bonne température pendant des heures.",
    icon:"🍶", photos:[],
    colors:[
      {name:"Écru",  hex:"#f2ede3", images:["images/luxura-ecru-mogcikjl-0.jpg","images/luxura-ecru-mogcin6v-1.jpg"], photo:"images/luxura-ecru-mogcikjl-0.jpg"},
      {name:"Noir",  hex:"#1a1a1a", images:["images/luxura-noir-mogcit52-0.jpg","images/luxura-noir-mogciv78-1.jpg"], photo:"images/luxura-noir-mogcit52-0.jpg"},
      {name:"Camel", hex:"#c4956a", images:["images/luxura-camel-mogciyx4-0.jpg","images/luxura-camel-mogcj35y-1.jpg"], photo:"images/luxura-camel-mogciyx4-0.jpg"}
    ],
    specs:{
      "Capacité":"1500 ML",
      "Matière":"Acier inoxydable 18/8",
      "Conservation chaud":"Jusqu'à 10h",
      "Conservation froid":"Jusqu'à 20h",
      "Fermeture":"Hermétique",
      "Coloris":"3 variantes",
      "Origine":"The Kitchen Collection"
    },
    features:[
      {ico:"🌡️", title:"Isolation thermique avancée", txt:"Double paroi vacuum pour garder vos plats à température idéale."},
      {ico:"🎨", title:"Coloris intemporels", txt:"3 teintes soigneusement sélectionnées pour s'harmoniser à votre intérieur."},
      {ico:"⚖️", title:"Format compact & léger", txt:"Ergonomique et pratique, parfait pour 2-3 personnes."},
      {ico:"🏆", title:"Qualité certifiée", txt:"Acier inoxydable alimentaire, sans BPA, pour une utilisation sécurisée."}
    ]
  },
  {
    id:2, name:"Gourmet", cat:"Récipient Isotherme", cap:"3000 ML",
    badge:null, filter:"3000",
    desc:"Le Gourmet 3000 est fait pour les grandes tablées et les repas généreux à la marocaine. Avec ses 3 litres de capacité en acier inoxydable premium, il conserve la chaleur de vos tajines, couscous et soupes familiales pendant de longues heures. Son format généreux et ses coloris naturels s'inscrivent parfaitement dans les cuisines contemporaines.",
    icon:"🥘", photos:[],
    colors:[
      {name:"Beige",       hex:"#d4c8b0", images:["images/gourmet-beige-mogckxjc-0.jpg","images/gourmet-beige-mogckzis-1.jpg","images/gourmet-beige-mogcl265-2.jpg"], photo:"images/gourmet-beige-mogckxjc-0.jpg"},
      {name:"Taupe",       hex:"#8e7d6e", images:["images/gourmet-taupe-mogcl6t7-0.jpg","images/gourmet-taupe-mogcl9ma-1.jpg"], photo:"images/gourmet-taupe-mogcl6t7-0.jpg"},
      {name:"Vert de gris", hex:"#7d9e8f", images:[], photo:null}
    ],
    specs:{
      "Capacité":"3000 ML",
      "Matière":"Acier inoxydable 18/8",
      "Conservation chaud":"Jusqu'à 14h",
      "Conservation froid":"Jusqu'à 28h",
      "Fermeture":"Couvercle verrouillant",
      "Coloris":"3 variantes",
      "Origine":"The Kitchen Collection"
    },
    features:[
      {ico:"👨‍👩‍👧‍👦", title:"Format grandes tablées", txt:"3 litres idéaux pour 4 à 6 personnes, parfait pour les repas familiaux."},
      {ico:"🌡️", title:"Conservation longue durée", txt:"Maintien de la chaleur jusqu'à 14 heures grâce à la double paroi."},
      {ico:"🎨", title:"Coloris naturels & élégants", txt:"Beige, Taupe, Vert de gris — en harmonie avec la déco marocaine moderne."},
      {ico:"🔒", title:"Couvercle verrouillant", txt:"Fermeture sécurisée pour le transport et le service sans risque de déversement."}
    ]
  },
  {
    id:3, name:"Gourmet XL", cat:"Récipient Isotherme", cap:"5000 ML",
    badge:null, filter:"3000",
    desc:"Le Gourmet XL s'adresse aux familles nombreuses et aux grandes occasions. Avec 5 litres de capacité en acier inoxydable de premier choix, c'est le récipient ultime pour vos marmites, harira du Ramadan, et grands plats festifs. Une présence impressionnante, une performance thermique imbattable.",
    icon:"🥘", photos:[],
    colors:[
      {name:"Beige",      hex:"#d4c8b0"},
      {name:"Taupe",      hex:"#8e7d6e"},
      {name:"Vert de gris", hex:"#7d9e8f"}
    ],
    specs:{
      "Capacité":"5000 ML",
      "Matière":"Acier inoxydable 18/8",
      "Conservation chaud":"Jusqu'à 16h",
      "Conservation froid":"Jusqu'à 32h",
      "Fermeture":"Couvercle XXL verrouillant",
      "Coloris":"3 variantes",
      "Origine":"The Kitchen Collection"
    },
    features:[
      {ico:"🎉", title:"Format événementiel", txt:"5 litres pour 8 à 12 personnes — idéal pour les grandes fêtes."},
      {ico:"🌡️", title:"Performance thermique XXL", txt:"Double paroi renforcée pour maintenir la chaleur jusqu'à 16 heures."},
      {ico:"💪", title:"Robustesse & durabilité", txt:"Construit pour durer, acier inoxydable alimentaire de haute résistance."},
      {ico:"🏠", title:"Présence en cuisine", txt:"Une pièce imposante et esthétique qui s'impose naturellement en cuisine."}
    ]
  },
  {
    id:4, name:"HotServe", cat:"Set de 3 Récipients", cap:"800 – 1500 ML",
    badge:"new", filter:"1500",
    desc:"Le HotServe est l'ensemble parfait pour les familles qui aiment tout avoir à portée de main. Ce set de 3 récipients isothermes en acier inoxydable (800 ml, 1200 ml, 1500 ml) vous offre la flexibilité d'organiser et de conserver plusieurs plats simultanément, avec le même niveau de qualité premium JAYPEE pour chacun d'eux.",
    icon:"🍱", photos:[],
    colors:[
      {name:"Beige",      hex:"#d4c8b0"},
      {name:"Blanc",      hex:"#f5f5f5"},
      {name:"Vert clair", hex:"#b8d4b0"}
    ],
    specs:{
      "Contenu":"3 récipients (800, 1200, 1500 ML)",
      "Matière":"Acier inoxydable 18/8",
      "Conservation chaud":"Jusqu'à 10h",
      "Conservation froid":"Jusqu'à 20h",
      "Fermeture":"Hermétique x3",
      "Coloris":"3 variantes",
      "Origine":"The Kitchen Collection"
    },
    features:[
      {ico:"🍱", title:"Set de 3 tailles", txt:"800 ml, 1200 ml et 1500 ml pour organiser entrée, plat et dessert."},
      {ico:"🌡️", title:"Triple isolation", txt:"Chacun des 3 récipients bénéficie de la double paroi sous vide JAYPEE."},
      {ico:"🎁", title:"Idéal cadeau", txt:"Présenté en set harmonieux — le cadeau parfait pour une maison premium."},
      {ico:"🔄", title:"Usage polyvalent", txt:"En cuisine, en pique-nique, au bureau — s'adapte à tous vos moments."}
    ]
  },
  {
    id:5, name:"Fabrene", cat:"Récipient Isotherme", cap:"3000 ML",
    badge:null, filter:"3000",
    desc:"Le Fabrene est une pièce au caractère affirmé. Ses courbes douces et sa silhouette élégante en font une présence remarquable sur n'importe quelle table. Avec 3 litres de capacité et une isolation thermique de premier ordre, il combine le fonctionnel et l'esthétique avec une rare élégance.",
    icon:"🍶", photos:[],
    colors:[
      {name:"Blanc Cassé", hex:"#f5f0e8"},
      {name:"Taupe",       hex:"#8e7d6e"}
    ],
    specs:{
      "Capacité":"3000 ML",
      "Matière":"Acier inoxydable 18/8",
      "Conservation chaud":"Jusqu'à 14h",
      "Conservation froid":"Jusqu'à 28h",
      "Fermeture":"Hermétique",
      "Coloris":"2 variantes",
      "Origine":"The Kitchen Collection"
    },
    features:[
      {ico:"✨", title:"Silhouette signature", txt:"Des courbes douces et une esthétique soignée pour une présence noble en cuisine."},
      {ico:"🌡️", title:"Isolation de référence", txt:"Paroi sous vide pour une conservation de la chaleur ou du froid exemplaire."},
      {ico:"🎨", title:"2 coloris épurés", txt:"Blanc Cassé et Taupe — l'élégance sobre à son sommet."},
      {ico:"🏆", title:"Gamme premium JAYPEE", txt:"Fabriqué selon les standards les plus exigeants de la collection."}
    ]
  },
  {
    id:6, name:"Wavelock Ultra", cat:"Récipient Isotherme", cap:"2000 ML",
    badge:null, filter:"2000",
    desc:"Le Wavelock Ultra se distingue par son design ondulé et sa prise en main remarquablement confortable. Ses 2 litres de capacité sont parfaits pour les familles de 3 à 4 personnes. La technologie de verrouillage avancée de son couvercle assure une étanchéité absolue, même lors des déplacements.",
    icon:"🍶", photos:[],
    colors:[
      {name:"Beige",        hex:"#d4c8b0"},
      {name:"Bleu",         hex:"#5b7fa8"},
      {name:"Vert de gris", hex:"#7d9e8f"}
    ],
    specs:{
      "Capacité":"2000 ML",
      "Matière":"Acier inoxydable 18/8",
      "Conservation chaud":"Jusqu'à 12h",
      "Conservation froid":"Jusqu'à 24h",
      "Fermeture":"Wavelock — verrouillage avancé",
      "Coloris":"3 variantes",
      "Origine":"The Kitchen Collection"
    },
    features:[
      {ico:"🌊", title:"Design Wavelock ondulé", txt:"Prise en main ergonomique grâce au profil ondulé breveté."},
      {ico:"🔒", title:"Système Wavelock Ultra", txt:"Verrouillage avancé garantissant une étanchéité totale pour le transport."},
      {ico:"🌡️", title:"Performance thermique", txt:"Double paroi sous vide pour 12h chaud / 24h froid."},
      {ico:"🎨", title:"3 coloris tendance", txt:"Beige, Bleu et Vert de gris — des teintes qui s'adaptent à tout intérieur."}
    ]
  },
  {
    id:7, name:"MicroSmart", cat:"Récipient Isotherme", cap:"1500 ML",
    badge:null, filter:"1500",
    desc:"Le MicroSmart 1500 est pensé pour les actifs qui ne transigent pas sur la qualité. Son format compact, son poids optimisé et ses coloris contemporains en font le compagnon idéal du quotidien — au bureau, en voyage, chez des amis. Facile à emporter, rapide à nettoyer, toujours parfait.",
    icon:"🍶", photos:[],
    colors:[
      {name:"Gris", hex:"#9a9a9a"},
      {name:"Bleu", hex:"#5b7fa8"},
      {name:"Rouge", hex:"#c0392b"}
    ],
    specs:{
      "Capacité":"1500 ML",
      "Matière":"Acier inoxydable 18/8",
      "Conservation chaud":"Jusqu'à 10h",
      "Conservation froid":"Jusqu'à 20h",
      "Fermeture":"Smart-Lock",
      "Coloris":"3 variantes",
      "Origine":"The Kitchen Collection"
    },
    features:[
      {ico:"🏃", title:"Conçu pour le mouvement", txt:"Format compact et léger, parfait pour être emporté partout."},
      {ico:"🔒", title:"Smart-Lock intégré", txt:"Fermeture rapide d'une main pour un accès pratique en déplacement."},
      {ico:"🎨", title:"Coloris contemporains", txt:"Gris, Bleu, Rouge — des teintes dynamiques pour une personnalité affirmée."},
      {ico:"🧼", title:"Entretien simplifié", txt:"Surface lisse et joint amovible pour un nettoyage en quelques secondes."}
    ]
  },
  {
    id:8, name:"MicroSmart Plus", cat:"Récipient Isotherme", cap:"2000 ML",
    badge:null, filter:"2000",
    desc:"Le MicroSmart Plus est la version grand format de la ligne Smart — plus de capacité, toujours autant de praticité. Avec 2 litres en acier inoxydable premium et son système Smart-Lock amélioré, il est parfait pour les repas plus généreux sans sacrifier la mobilité et le design soigné qui caractérisent la ligne MicroSmart.",
    icon:"🍶", photos:[],
    colors:[
      {name:"Taupe", hex:"#8e7d6e"},
      {name:"Blanc", hex:"#f5f5f5"},
      {name:"Beige", hex:"#d4c8b0"}
    ],
    specs:{
      "Capacité":"2000 ML",
      "Matière":"Acier inoxydable 18/8",
      "Conservation chaud":"Jusqu'à 12h",
      "Conservation froid":"Jusqu'à 24h",
      "Fermeture":"Smart-Lock Plus",
      "Coloris":"3 variantes",
      "Origine":"The Kitchen Collection"
    },
    features:[
      {ico:"📈", title:"Capacité augmentée", txt:"2 litres pour des repas plus généreux — idéal pour 2 à 3 personnes."},
      {ico:"🔒", title:"Smart-Lock Plus", txt:"Système de fermeture amélioré, encore plus pratique et sécurisé."},
      {ico:"🌡️", title:"Double isolation", txt:"Performance thermique maximale : 12h chaud, 24h froid."},
      {ico:"🎨", title:"Coloris neutres & luxueux", txt:"Taupe, Blanc et Beige — une palette sobre et élégante pour tous les intérieurs."}
    ]
  },
  {
    id:9, name:"Princeton", cat:"Récipient Isotherme", cap:"2500 ML",
    badge:null, filter:"3000",
    desc:"Le Princeton porte bien son nom — noble, distingué, de caractère. Avec 2500 ml en acier inoxydable de haute qualité, il est doté d'une silhouette verticale élancée et d'une palette de 4 coloris soigneusement sélectionnés. Le Princeton s'impose comme la pièce maîtresse d'une cuisine organisée et élégante.",
    icon:"🏆", photos:[],
    colors:[
      {name:"Écru",       hex:"#f2ede3"},
      {name:"Grège",      hex:"#c8bda8"},
      {name:"Camel",      hex:"#c4956a"},
      {name:"Vert clair", hex:"#b8d4b0"}
    ],
    specs:{
      "Capacité":"2500 ML",
      "Matière":"Acier inoxydable 18/8",
      "Conservation chaud":"Jusqu'à 13h",
      "Conservation froid":"Jusqu'à 26h",
      "Fermeture":"Princeton-Lock hermétique",
      "Coloris":"4 variantes",
      "Origine":"The Kitchen Collection"
    },
    features:[
      {ico:"👑", title:"Silhouette Princeton", txt:"Format vertical élancé pour une présence majestueuse sur la table ou en cuisine."},
      {ico:"🎨", title:"4 coloris exclusifs", txt:"Écru, Grège, Camel et Vert clair — la collection la plus généreuse en teintes."},
      {ico:"🌡️", title:"Isolation longue durée", txt:"13h chaud / 26h froid pour une conservation exemplaire."},
      {ico:"✨", title:"Finition haut de gamme", txt:"Chaque détail est travaillé — du couvercle à la base — pour un rendu irréprochable."}
    ]
  },
  {
    id:10, name:"Kingston", cat:"Récipient Isotherme", cap:"2500 ML",
    badge:null, filter:"3000",
    desc:"Le Kingston est la définition même du classicisme moderne. Ses lignes droites, sa capacité de 2500 ml et ses coloris naturels en font une pièce universellement appréciée. Robuste et élégant, il se destine aux familles qui veulent le meilleur sans ostentation — la discrétion du luxe véritable.",
    icon:"🍶", photos:[],
    colors:[
      {name:"Blanc Cassé", hex:"#f5f0e8"},
      {name:"Camel",       hex:"#c4956a"},
      {name:"Vert clair",  hex:"#b8d4b0"}
    ],
    specs:{
      "Capacité":"2500 ML",
      "Matière":"Acier inoxydable 18/8",
      "Conservation chaud":"Jusqu'à 13h",
      "Conservation froid":"Jusqu'à 26h",
      "Fermeture":"Hermétique renforcée",
      "Coloris":"3 variantes",
      "Origine":"The Kitchen Collection"
    },
    features:[
      {ico:"🏛️", title:"Design classique intemporel", txt:"Lignes droites et proportions parfaites pour un classicisme moderne."},
      {ico:"💎", title:"Luxe discret", txt:"La perfection dans la sobriété — pas besoin d'en faire plus pour être reconnu."},
      {ico:"🌡️", title:"Conservation optimale", txt:"Paroi double sous vide pour 13h chaud et 26h froid."},
      {ico:"🔒", title:"Fermeture renforcée", txt:"Joint silicone de qualité supérieure pour une étanchéité durable."}
    ]
  },
  {
    id:11, name:"Punch Prime", cat:"Bouteille Isotherme", cap:"650 ML",
    badge:"new", filter:"1500",
    desc:"Le Punch Prime est la bouteille isotherme qui réinvente votre hydratation. 650 ml en acier inoxydable premium, conçu pour les sportifs, les voyageurs et les actifs qui refusent de compromettre le style pour la praticité. Sa gamme de coloris bicolores lui confère une identité visuelle forte et reconnaissable.",
    icon:"🥤", photos:[],
    colors:[
      {name:"Blanc/Noir",   hex:"#1a1a1a"},
      {name:"Blanc/Orange", hex:"#d4621a"},
      {name:"Beige/Camel",  hex:"#c4956a"},
      {name:"Blanc/Dots",   hex:"#e8e4dc"}
    ],
    specs:{
      "Capacité":"650 ML",
      "Matière":"Acier inoxydable 18/8",
      "Conservation chaud":"Jusqu'à 8h",
      "Conservation froid":"Jusqu'à 18h",
      "Fermeture":"Bouchon twist sécurisé",
      "Coloris":"4 variantes bicolores",
      "Origine":"The Kitchen Collection"
    },
    features:[
      {ico:"💧", title:"Bouteille de sport premium", txt:"650 ml pour une hydratation optimale tout au long de la journée."},
      {ico:"🌡️", title:"Performance thermique", txt:"8h chaud / 18h froid — parfait pour vos aventures quotidiennes."},
      {ico:"🎨", title:"4 coloris bicolores exclusifs", txt:"Des combinaisons de couleurs uniques pour une identité visuelle affirmée."},
      {ico:"🔒", title:"Bouchon twist anti-fuite", txt:"Fermeture twist sécurisée pour zéro fuite en toutes circonstances."}
    ]
  }
];

/* ─── STORAGE ─── */
const STORAGE_KEY = 'jaypee_products_v3';
const FOLDER_HANDLE_KEY = 'jaypee_folder_handle_v1';
// Clean up old version keys
try{ localStorage.removeItem('jaypee_products_v1'); }catch(e){}
try{ localStorage.removeItem('jaypee_products_v2'); }catch(e){}
let projectFolderHandle = null;

function migrateProducts(arr){
  arr.forEach(p=>{
    if(!Array.isArray(p.photos)) p.photos = [];
    if(typeof p.featured !== 'boolean') p.featured = (p.badge === 'new');
    if(Array.isArray(p.colors)){
      p.colors.forEach(c=>{
        // Migrate from `photo` (single string) to `images` (array of paths)
        if(!Array.isArray(c.images)){
          c.images = [];
          if(c.photo){ c.images.push(c.photo); }
        }
        // Keep `photo` field as legacy mirror of first image (back-compat)
        c.photo = c.images[0] || null;
      });
    }
  });
  return arr;
}

function loadProducts(){
  const cfgVersion = (window.JAYPEE_CONFIG && window.JAYPEE_CONFIG.version) || null;
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw){
      const data = JSON.parse(raw);
      if(Array.isArray(data) && data.length){
        // Si une version est définie dans config, vérifier qu'elle correspond
        if(cfgVersion){
          const storedVersion = localStorage.getItem(STORAGE_KEY + '_cfgver');
          if(storedVersion !== cfgVersion){
            // Version différente → on recharge depuis le fichier config
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(STORAGE_KEY + '_cfgver');
          } else {
            return migrateProducts(data);
          }
        } else {
          return migrateProducts(data);
        }
      }
    }
  }catch(e){ console.warn('loadProducts:', e); }
  // Utilise config/products.js si disponible, sinon les produits par défaut
  const base = (window.JAYPEE_PRODUCTS && window.JAYPEE_PRODUCTS.length)
    ? window.JAYPEE_PRODUCTS
    : DEFAULT_PRODUCTS;
  return migrateProducts(JSON.parse(JSON.stringify(base)));
}

function saveProducts(){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(PRODUCTS));
    const cfgVersion = (window.JAYPEE_CONFIG && window.JAYPEE_CONFIG.version) || null;
    if(cfgVersion) localStorage.setItem(STORAGE_KEY + '_cfgver', cfgVersion);
    return true;
  }catch(e){
    afToast('Erreur — quota localStorage atteint. Réduisez la taille des images.', 'error');
    console.error(e);
    return false;
  }
}

let PRODUCTS = loadProducts();

/* ─── SUPABASE — SOURCE DE DONNÉES DYNAMIQUE ───
   Si config/supabase-config.js est chargé (window.sb disponible), on
   remplace silencieusement PRODUCTS par les données live de Supabase
   dès qu'elles arrivent (fallback = données statiques ci-dessus, donc
   aucune page blanche même hors-ligne ou si Supabase est indisponible). */
function mapSupabaseProduct(row) {
  const colors = (row.product_colors || []).slice().sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  const imagesByColor = {};
  (row.product_images || []).forEach(img => {
    const key = img.color_id || '_none';
    (imagesByColor[key] = imagesByColor[key] || []).push(img);
  });
  Object.keys(imagesByColor).forEach(k => imagesByColor[k].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)));
  return {
    id: row.sort_order,
    name: row.name,
    cat: row.category_label || '',
    cap: row.capacity_label || '',
    badge: row.badge || null,
    filter: row.filter_key || '',
    desc: row.long_description || row.short_description || '',
    icon: row.icon || '📦',
    photos: [],
    featured: !!row.is_featured,
    colors: colors.map(c => {
      const imgs = (imagesByColor[c.id] || []).map(i => i.url);
      return { name: c.name, hex: c.hex || '#cccccc', images: imgs, photo: imgs[0] || null };
    }),
    specs: row.specs || {},
    features: row.features || []
  };
}

async function fetchProductsFromSupabase() {
  if (!window.sb) return false;
  try {
    const { data, error } = await window.sb
      .from('products')
      .select('*, product_colors(*), product_images(*)')
      .eq('is_active', true)
      .order('sort_order');
    if (error || !data || !data.length) return false;
    PRODUCTS = data.map(mapSupabaseProduct);
    return true;
  } catch (e) {
    console.warn('Supabase indisponible, conservation des données locales.', e);
    return false;
  }
}

let currentPDP = 0;
let currentPDPColorIdx = 0;
let currentPDPImageIdx = 0;
let currentFilter = 'all';

/* ─── ÉCHAPPEMENT HTML ─── */
function esc(s){
  if(s==null) return '';
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

/* ─── RENDER GRID PRODUITS ─── */
function renderGrid(filter){
  const grid = document.getElementById('prodGrid');
  if(!grid) return;
  currentFilter = filter || currentFilter || 'all';
  const list = currentFilter === 'all' ? PRODUCTS : PRODUCTS.filter(p=>p.filter===currentFilter);
  if(!list.length){
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--mid);font-family:var(--caps);font-size:11px;letter-spacing:.18em;text-transform:uppercase">Aucun produit dans cette catégorie.</div>`;
    return;
  }
  grid.innerHTML = list.map((p,i)=>{
    const colorPhoto = (p.colors||[]).map(c=>(c.images&&c.images[0])||c.photo).find(Boolean);
    const mainPhoto = colorPhoto || (p.photos && p.photos[0]) || null;
    return `
    <div class="pcard" onclick="openPDP(${p.id})" style="animation-delay:${i*0.05}s">
      <div class="pcard-vis">
        ${mainPhoto
          ? `<img class="pcard-img" src="${esc(mainPhoto)}" alt="${esc(p.name)}"/>`
          : `<div class="pcard-ph">
              <div class="pcard-ph-ico">${p.icon||'📦'}</div>
              <div class="pcard-ph-txt">Visuel à venir</div>
            </div>`}
        ${p.badge?`<div class="pbadge new">Nouveau</div>`:''}
        <div class="pcard-ov">
          <button class="pcard-ov-btn">Découvrir</button>
        </div>
      </div>
      <div class="pcard-body">
        <div class="pcard-cat">${esc(p.cat)} · ${esc(p.cap)}</div>
        <div class="pcard-name">${esc(p.name)}</div>
        <div class="pcard-desc">${esc((p.desc||'').substring(0,90))}…</div>
        <div class="pcard-meta">
          <div class="pcols">
            ${(p.colors||[]).map(c=>`<div class="pcol-dot" style="background:${esc(c.hex)}" title="${esc(c.name)}"></div>`).join('')}
          </div>
          <button class="pcard-act" onclick="event.stopPropagation();openPDP(${p.id})">Découvrir</button>
        </div>
      </div>
    </div>
  `;}).join('');
}

/* ─── RENDER PRODUITS VEDETTES (accueil) ─── */
function renderFeatured(){
  const grid = document.getElementById('featGrid');
  if(!grid) return;
  let list = PRODUCTS.filter(p=>p.featured);
  if(!list.length) list = PRODUCTS.slice(0,4);
  list = list.slice(0,4);
  grid.innerHTML = list.map((p,i)=>{
    const colorPhoto = (p.colors||[]).map(c=>(c.images&&c.images[0])||c.photo).find(Boolean);
    const mainPhoto = colorPhoto || (p.photos && p.photos[0]) || null;
    return `
    <div class="pcard reveal d${(i%4)+1}" onclick="openPDP(${p.id})">
      <div class="pcard-vis">
        ${mainPhoto
          ? `<img class="pcard-img" src="${esc(mainPhoto)}" alt="${esc(p.name)}"/>`
          : `<div class="pcard-ph">
              <div class="pcard-ph-ico">${p.icon||'📦'}</div>
              <div class="pcard-ph-txt">Visuel à venir</div>
            </div>`}
        ${p.badge?`<div class="pbadge new">Nouveau</div>`:''}
        <div class="pcard-ov">
          <button class="pcard-ov-btn">Découvrir</button>
        </div>
      </div>
      <div class="pcard-body">
        <div class="pcard-cat">${esc(p.cat)} · ${esc(p.cap)}</div>
        <div class="pcard-name">${esc(p.name)}</div>
        <div class="pcard-meta">
          <div class="pcols">
            ${(p.colors||[]).map(c=>`<div class="pcol-dot" style="background:${esc(c.hex)}" title="${esc(c.name)}"></div>`).join('')}
          </div>
          <button class="pcard-act" onclick="event.stopPropagation();openPDP(${p.id})">Découvrir</button>
        </div>
      </div>
    </div>
  `;}).join('');
  checkReveals();
}

function filterProd(f, btn){
  document.querySelectorAll('.flt').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  renderGrid(f);
}

/* ─── PDP ─── */
function openPDP(id){
  if(!document.getElementById('pdpOverlay')){
    // PDP not on this page — go to produits page
    window.location.href = `produits.html?id=${id}`;
    return;
  }
  currentPDP = id;
  renderPDP(id);
  document.getElementById('pdpOverlay').classList.add('open');
  document.getElementById('pdpPanel').classList.add('open');
  document.body.style.overflow='hidden';
}

function closePDP(){
  const ov = document.getElementById('pdpOverlay');
  const pn = document.getElementById('pdpPanel');
  if(ov) ov.classList.remove('open');
  if(pn) pn.classList.remove('open');
  document.body.style.overflow='';
}

function navPDP(dir){
  const idx = PRODUCTS.findIndex(p=>p.id===currentPDP);
  const newIdx = (idx + dir + PRODUCTS.length) % PRODUCTS.length;
  currentPDP = PRODUCTS[newIdx].id;
  renderPDP(currentPDP);
  document.getElementById('pdpPanel').scrollTop = 0;
}

function renderPDP(id){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return;
  currentPDPColorIdx = 0;
  currentPDPImageIdx = 0;
  const related = PRODUCTS.filter(x=>x.id!==id).slice(0,3);
  const colors = p.colors || [];
  const fallbackPhoto = (p.photos && p.photos[0]) || null;
  const firstColor = colors[0];
  const firstImages = (firstColor && firstColor.images) || [];
  const mainPhoto = firstImages[0] || (firstColor && firstColor.photo) || fallbackPhoto;
  const hasMultiImages = firstImages.length > 1;
  document.getElementById('pdpContent').innerHTML = `
    <div class="pdp-visual">
      ${mainPhoto
        ? `<img class="pdp-visual-img" id="pdpMainImg" src="${esc(mainPhoto)}" alt="${esc(p.name)}" onerror="this.style.display='none'"/>`
        : `<div class="pdp-visual-ph" id="pdpMainPh">
            <div class="pdp-ph-ico">${p.icon||'📦'}</div>
            <div class="pdp-ph-txt">Photo produit à intégrer — ${esc(p.name)}</div>
          </div>`}
      <button class="pdp-visual-nav pdp-visual-nav-prev" id="pdpNavPrev" onclick="navPDPImage(-1)" aria-label="Image précédente" style="${hasMultiImages?'':'display:none'}">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button class="pdp-visual-nav pdp-visual-nav-next" id="pdpNavNext" onclick="navPDPImage(1)" aria-label="Image suivante" style="${hasMultiImages?'':'display:none'}">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
      </button>
      ${colors.length?`
        <div class="pdp-visual-color-tag" id="pdpColorTag">
          <span class="pdp-color-name">${esc(firstColor?firstColor.name:'')}</span>
          <span class="pdp-image-counter" id="pdpImgCounter" style="${hasMultiImages?'':'display:none'}">1 / ${firstImages.length}</span>
        </div>
      `:''}
      <div class="pdp-badge-zone">
        ${p.badge?`<div class="pdp-badge new-b">Nouveau</div>`:''}
        <div class="pdp-badge">JAYPEE</div>
      </div>
    </div>

    <div class="pdp-thumbs" id="pdpThumbs">
      ${firstImages.map((src,i)=>`
        <div class="pdp-thumb pdp-thumb-img ${i===0?'active':''}" onclick="navPDPImageTo(${i})" style="background-image:url('${esc(src)}');background-size:cover;background-position:center"></div>
      `).join('')}
    </div>

    <div class="pdp-info">
      <div class="pdp-cat">${esc(p.cat)}</div>
      <div class="pdp-name">${esc(p.name)}</div>
      <div class="pdp-cap">${esc(p.cap)}</div>
      <div class="pdp-divider"></div>
      <p class="pdp-desc-block">${esc(p.desc)}</p>

      <div class="pdp-section-lbl">Couleurs disponibles</div>
      <div class="pdp-colors" id="pdpColors">
        ${colors.map((c,i)=>`
          <div class="pdp-col ${i===0?'sel':''}" onclick="navPDPColorTo(${i})" data-name="${esc(c.name)}">
            <div class="pdp-col-swatch" style="background:${esc(c.hex)}"></div>
            <div class="pdp-col-name">${esc(c.name)}</div>
          </div>
        `).join('')}
      </div>

      <div class="pdp-section-lbl" style="margin-bottom:14px">Points forts</div>
      <div class="pdp-features">
        ${(p.features||[]).map(f=>`
          <div class="pdp-feat">
            <div class="pdp-feat-ico">${f.ico||'•'}</div>
            <div>
              <div class="pdp-feat-ttl">${esc(f.title)}</div>
              <div class="pdp-feat-txt">${esc(f.txt)}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="pdp-specs">
        <div class="pdp-specs-ttl">Spécifications techniques</div>
        ${Object.entries(p.specs||{}).map(([k,v])=>`
          <div class="pdp-spec-row">
            <span class="pdp-spec-key">${esc(k)}</span>
            <span class="pdp-spec-val">${esc(v)}</span>
          </div>
        `).join('')}
      </div>

      <div class="pdp-cta-zone">
        <button class="pdp-cta-primary" onclick="goToContact()">
          Nous contacter pour commander
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        <button class="pdp-cta-sec" onclick="closePDP()">← Retour</button>
      </div>
    </div>

    <div class="pdp-related">
      <div class="pdp-related-ttl">Vous aimerez aussi</div>
      <div class="pdp-related-grid">
        ${related.map(r=>{
          const rColorPhoto = (r.colors||[]).map(c=>(c.images&&c.images[0])||c.photo).find(Boolean);
          const rPhoto = rColorPhoto || (r.photos && r.photos[0]) || null;
          return `
          <div class="pdp-rel-card" onclick="renderPDP(${r.id});document.getElementById('pdpPanel').scrollTop=0">
            <div class="pdp-rel-vis">${rPhoto?`<img src="${esc(rPhoto)}" style="width:100%;height:100%;object-fit:cover" alt="${esc(r.name)}"/>`:(r.icon||'📦')}</div>
            <div class="pdp-rel-body">
              <div class="pdp-rel-name">${esc(r.name)}</div>
              <div class="pdp-rel-cap">${esc(r.cap)}</div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>
  `;
}

function navPDPImage(dir){
  const p = PRODUCTS.find(x=>x.id===currentPDP);
  if(!p) return;
  const c = (p.colors || [])[currentPDPColorIdx];
  if(!c) return;
  const imgs = c.images || [];
  if(imgs.length < 2) return;
  currentPDPImageIdx = (currentPDPImageIdx + dir + imgs.length) % imgs.length;
  updatePDPView(p);
}

function navPDPImageTo(idx){
  const p = PRODUCTS.find(x=>x.id===currentPDP);
  if(!p) return;
  const c = (p.colors || [])[currentPDPColorIdx];
  if(!c) return;
  const imgs = c.images || [];
  if(idx < 0 || idx >= imgs.length) return;
  currentPDPImageIdx = idx;
  updatePDPView(p);
}

function navPDPColorTo(idx){
  const p = PRODUCTS.find(x=>x.id===currentPDP);
  if(!p) return;
  const colors = p.colors || [];
  if(idx < 0 || idx >= colors.length) return;
  currentPDPColorIdx = idx;
  currentPDPImageIdx = 0;
  // Re-render thumbnails since they reflect current color's images
  rerenderPDPThumbs(p);
  updatePDPView(p);
}

function rerenderPDPThumbs(p){
  const thumbs = document.getElementById('pdpThumbs');
  if(!thumbs) return;
  const colors = p.colors || [];
  const c = colors[currentPDPColorIdx] || {};
  const imgs = c.images || [];
  thumbs.innerHTML = imgs.map((src,i)=>`
    <div class="pdp-thumb pdp-thumb-img ${i===currentPDPImageIdx?'active':''}" onclick="navPDPImageTo(${i})" style="background-image:url('${esc(src)}');background-size:cover;background-position:center"></div>
  `).join('');
}

function updatePDPView(p){
  const colors = p.colors || [];
  const c = colors[currentPDPColorIdx];
  if(!c) return;
  const imgs = c.images || [];
  const fallbackPhoto = c.photo || (p.photos && p.photos[0]) || null;
  const img = imgs[currentPDPImageIdx] || fallbackPhoto;
  const mainImg = document.getElementById('pdpMainImg');
  const visual = document.querySelector('.pdp-visual');
  if(mainImg){
    if(img){
      mainImg.style.display = '';
      mainImg.style.opacity = '0';
      setTimeout(()=>{ mainImg.src = img; mainImg.style.opacity = '1'; }, 50);
    }
  } else if(visual && img){
    const ph = document.getElementById('pdpMainPh');
    if(ph) ph.remove();
    const newImg = document.createElement('img');
    newImg.id = 'pdpMainImg';
    newImg.className = 'pdp-visual-img';
    newImg.src = img;
    newImg.alt = p.name;
    newImg.onerror = ()=>{ newImg.style.display='none'; };
    visual.insertBefore(new