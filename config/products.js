/* ════════════════════════════════════════════════════════════════
   JAYPEE — CONFIG / PRODUCTS.JS
   Modifiez ce fichier pour gérer vos produits et photos.

   PHOTO D'ACCUEIL
   ───────────────
   Changez heroImage ci-dessous.
   Mettez votre photo dans le dossier images/ et écrivez son nom.
   Exemple : "images/ma-photo.jpg"

   VERSION
   ───────
   Si les images n'apparaissent pas après une modification,
   changez le numéro de version (ex: "2", "3"...) pour forcer
   le rechargement depuis ce fichier.

   NOMMAGE DES IMAGES
   ──────────────────
   Format : {produit}-{couleur}-{numéro}.jpg
   Exemples :
     luxura-klass-blanc-casse-0.jpg  → 1re photo
     luxura-klass-blanc-casse-1.jpg  → 2e photo
     gourmet-beige-0.jpg
   Placez toutes les images dans le dossier images/
════════════════════════════════════════════════════════════════ */

window.JAYPEE_CONFIG = {
  version:   "1",
  heroImage: "images/accueil.jpg"
};

window.JAYPEE_PRODUCTS = [

  /* ── Luxura Klass — 2000 ML ── */
  {
    id: 0, name: "Luxura Klass", cat: "Récipient Isotherme", cap: "2000 ML",
    badge: "new", filter: "2000",
    desc: "Le Luxura Klass incarne l'excellence de la gamme JAYPEE. Conçu pour les amateurs d'art de vivre raffiné, ce récipient isotherme en acier inoxydable 18/8 de 2000 ml allie élégance architecturale et performance thermique de haute précision.",
    icon: "🍶", photos: [],
    colors: [
      {
        name: "Blanc Cassé", hex: "#f5f0e8",
        images: [
          "images/JAYPEE WEB IMAGESArtboard 1.jpg",
          "images/luxura-klass-blanc-casse-mogcdx52-1.jpg",
          "images/luxura-klass-blanc-casse-mogcdywu-2.jpg"
        ],
        photo: "images/JAYPEE WEB IMAGESArtboard 1.jpg"
      },
      {
        name: "Noir", hex: "#1a1a1a",
        images: [
          "images/luxura-klass-noir-mogce0if-0.jpg",
          "images/luxura-klass-noir-mogce2ka-1.jpg"
        ],
        photo: "images/luxura-klass-noir-mogce0if-0.jpg"
      },
      { name: "Camel", hex: "#c4956a", images: [], photo: null }
    ],
    specs: {
      "Capacité": "2000 ML", "Matière": "Acier inoxydable 18/8",
      "Conservation chaud": "Jusqu'à 12h", "Conservation froid": "Jusqu'à 24h",
      "Fermeture": "Hermétique sous vide", "Coloris": "3 variantes", "Origine": "The Kitchen Collection"
    },
    features: [
      { ico: "🌡️", title: "Double paroi sous vide",  txt: "Maintien optimal de la température jusqu'à 24 heures." },
      { ico: "✨",  title: "Finition premium mate",   txt: "Surface anti-traces pour un aspect toujours impeccable." },
      { ico: "🔒", title: "Fermeture hermétique",     txt: "Couvercle à joint silicone, zéro fuite." },
      { ico: "🧼", title: "Facilement nettoyable",    txt: "Inox alimentaire approuvé, lavage facile à la main." }
    ]
  },

  /* ── Luxura — 1500 ML ── */
  {
    id: 1, name: "Luxura", cat: "Récipient Isotherme", cap: "1500 ML",
    badge: "new", filter: "1500",
    desc: "Le Luxura, version compacte et élégante de la ligne signature JAYPEE. En acier inoxydable de première qualité, il s'impose comme le compagnon idéal des familles modernes.",
    icon: "🍶", photos: [],
    colors: [
      {
        name: "Écru", hex: "#f2ede3",
        images: [
          "images/JAYPEE WEB IMAGESArtboard 2.jpg",
          "images/luxura-ecru-mogcin6v-1.jpg"
        ],
        photo: "images/JAYPEE WEB IMAGESArtboard 2.jpg"
      },
      {
        name: "Noir", hex: "#1a1a1a",
        images: [
          "images/luxura-noir-mogcit52-0.jpg",
          "images/luxura-noir-mogciv78-1.jpg"
        ],
        photo: "images/luxura-noir-mogcit52-0.jpg"
      },
      {
        name: "Camel", hex: "#c4956a",
        images: [
          "images/luxura-camel-mogciyx4-0.jpg",
          "images/luxura-camel-mogcj35y-1.jpg"
        ],
        photo: "images/luxura-camel-mogciyx4-0.jpg"
      }
    ],
    specs: {
      "Capacité": "1500 ML", "Matière": "Acier inoxydable 18/8",
      "Conservation chaud": "Jusqu'à 10h", "Conservation froid": "Jusqu'à 20h",
      "Fermeture": "Hermétique", "Coloris": "3 variantes", "Origine": "The Kitchen Collection"
    },
    features: [
      { ico: "🌡️", title: "Isolation thermique avancée", txt: "Double paroi vacuum pour garder vos plats à température idéale." },
      { ico: "🎨", title: "Coloris intemporels",          txt: "3 teintes soigneusement sélectionnées pour votre intérieur." },
      { ico: "⚖️", title: "Format compact & léger",       txt: "Ergonomique et pratique, parfait pour 2-3 personnes." },
      { ico: "🏆", title: "Qualité certifiée",             txt: "Acier inoxydable alimentaire, sans BPA." }
    ]
  },

  /* ── Gourmet — 3000 ML ── */
  {
    id: 2, name: "Gourmet", cat: "Récipient Isotherme", cap: "3000 ML",
    badge: null, filter: "3000",
    desc: "Le Gourmet 3000 est fait pour les grandes tablées et les repas généreux à la marocaine. Avec ses 3 litres, il conserve la chaleur de vos tajines, couscous et soupes familiales pendant de longues heures.",
    icon: "🥘", photos: [],
    colors: [
      {
        name: "Beige", hex: "#d4c8b0",
        images: [
          "images/gourmet-beige-0.jpg",
          "images/gourmet-beige-2.jpg"
        ],
        photo: "images/gourmet-beige-0.jpg"
      },
      {
        name: "Taupe", hex: "#8e7d6e",
        images: [
          "images/gourmet-taupe-mogcl6t7-0.jpg"
        ],
        photo: "images/gourmet-taupe-mogcl6t7-0.jpg"
      },
      { name: "Vert de gris", hex: "#7d9e8f", images: [], photo: null }
    ],
    specs: {
      "Capacité": "3000 ML", "Matière": "Acier inoxydable 18/8",
      "Conservation chaud": "Jusqu'à 14h", "Conservation froid": "Jusqu'à 28h",
      "Fermeture": "Couvercle verrouillant", "Coloris": "3 variantes", "Origine": "The Kitchen Collection"
    },
    features: [
      { ico: "👨‍👩‍👧‍👦", title: "Format grandes tablées",      txt: "3 litres idéaux pour 4 à 6 personnes." },
      { ico: "🌡️",     title: "Conservation longue durée", txt: "Maintien de la chaleur jusqu'à 14 heures." },
      { ico: "🎨",     title: "Coloris naturels",           txt: "Beige, Taupe, Vert de gris." },
      { ico: "🔒",     title: "Couvercle verrouillant",     txt: "Fermeture sécurisée pour le transport." }
    ]
  },

  /* ── Gourmet XL — 5000 ML ── */
  {
    id: 3, name: "Gourmet XL", cat: "Récipient Isotherme", cap: "5000 ML",
    badge: null, filter: "3000",
    desc: "Le Gourmet XL s'adresse aux familles nombreuses et aux grandes occasions. Avec 5 litres, c'est le récipient ultime pour vos marmites, harira du Ramadan, et grands plats festifs.",
    icon: "🥘", photos: [],
    colors: [
      {
        name: "Beige", hex: "#d4c8b0",
        images: [
          "images/gourmet-xl-beige-0.jpg",
          "images/gourmet-xl-beige-1.jpg",
          "images/gourmet-xl-beige-2.jpg"
        ],
        photo: "images/gourmet-xl-beige-0.jpg"
      },
      {
        name: "Taupe", hex: "#8e7d6e",
        images: [
          "images/gourmet-xl-taupe-mogdh08r-0.jpg",
          "images/gourmet-xl-taupe-mogdh0b2-1.jpg",
          "images/gourmet-xl-taupe-mogdh0da-2.jpg"
        ],
        photo: "images/gourmet-xl-taupe-mogdh08r-0.jpg"
      },
      {
        name: "Vert de gris", hex: "#7d9e8f",
        images: [
          "images/gourmet-xl-vert-de-gris-mogdh59q-0.jpg",
          "images/gourmet-xl-vert-de-gris-mogdh5bt-1.jpg",
          "images/gourmet-xl-vert-de-gris-mogdh5dd-2.jpg"
        ],
        photo: "images/gourmet-xl-vert-de-gris-mogdh59q-0.jpg"
      }
    ],
    specs: {
      "Capacité": "5000 ML", "Matière": "Acier inoxydable 18/8",
      "Conservation chaud": "Jusqu'à 16h", "Conservation froid": "Jusqu'à 32h",
      "Fermeture": "Couvercle XXL verrouillant", "Coloris": "3 variantes", "Origine": "The Kitchen Collection"
    },
    features: [
      { ico: "🎉", title: "Format événementiel",       txt: "5 litres pour 8 à 12 personnes." },
      { ico: "🌡️", title: "Performance thermique XXL", txt: "Double paroi renforcée, chaleur jusqu'à 16 heures." },
      { ico: "💪", title: "Robustesse & durabilité",   txt: "Acier inoxydable alimentaire haute résistance." },
      { ico: "🏠", title: "Présence en cuisine",        txt: "Une pièce imposante et esthétique." }
    ]
  },

  /* ── HotServe — Set de 3 ── */
  {
    id: 4, name: "HotServe", cat: "Set de 3 Récipients", cap: "800 – 1500 ML",
    badge: "new", filter: "1500",
    desc: "Le HotServe est l'ensemble parfait pour les familles. Ce set de 3 récipients isothermes (800 ml, 1200 ml, 1500 ml) vous offre la flexibilité d'organiser plusieurs plats simultanément.",
    icon: "🍱", photos: [],
    colors: [
      {
        name: "Beige", hex: "#d4c8b0",
        images: [
          "images/images/hotserve-beige-mogecjix-0.jpg",
          "images/images/hotserve-beige-mogecqko-1.jpg"
        ],
        photo: "images/images/hotserve-beige-mogecjix-0.jpg"
      },
      {
        name: "Blanc", hex: "#f5f5f5",
        images: [
          "images/hotserve-blanc-mogdelq3-1.jpg"
        ],
        photo: "images/hotserve-blanc-mogdelq3-1.jpg"
      },
      { name: "Vert clair", hex: "#b8d4b0", images: ["images/gourmet-beige-0.jpg"], photo: null }
    ],
    specs: {
      "Contenu": "3 récipients (800, 1200, 1500 ML)", "Matière": "Acier inoxydable 18/8",
      "Conservation chaud": "Jusqu'à 10h", "Conservation froid": "Jusqu'à 20h",
      "Fermeture": "Hermétique x3", "Coloris": "3 variantes", "Origine": "The Kitchen Collection"
    },
    features: [
      { ico: "🍱", title: "Set de 3 tailles",   txt: "800, 1200 et 1500 ml pour entrée, plat et dessert." },
      { ico: "🌡️", title: "Triple isolation",   txt: "Chaque récipient bénéficie de la double paroi sous vide." },
      { ico: "🎁", title: "Idéal cadeau",        txt: "Le cadeau parfait pour une maison premium." },
      { ico: "🔄", title: "Usage polyvalent",    txt: "Cuisine, pique-nique, bureau — partout." }
    ]
  },

  /* ── Fabrene — 3000 ML ── */
  {
    id: 5, name: "Fabrene", cat: "Récipient Isotherme", cap: "3000 ML",
    badge: null, filter: "3000",
    desc: "Le Fabrene est une pièce au caractère affirmé. Ses courbes douces et sa silhouette élégante en font une présence remarquable sur n'importe quelle table.",
    icon: "🍶", photos: [],
    colors: [
      { name: "Blanc Cassé", hex: "#f5f0e8", images: [
        "images/1111-1.jpg",
    "images/2222-0.jpg"
      ], photo: "images/1111.jpg" },
      
      { name: "Taupe",       hex: "#8e7d6e", images: ["images/fabrenetaupe-0.jpg"], photo: null }
    ],
    specs: {
      "Capacité": "3000 ML", "Matière": "Acier inoxydable 18/8",
      "Conservation chaud": "Jusqu'à 14h", "Conservation froid": "Jusqu'à 28h",
      "Fermeture": "Hermétique", "Coloris": "2 variantes", "Origine": "The Kitchen Collection"
    },
    features: [
      { ico: "✨", title: "Silhouette signature",   txt: "Courbes douces pour une présence noble en cuisine." },
      { ico: "🌡️", title: "Isolation de référence", txt: "Paroi sous vide pour une conservation exemplaire." },
      { ico: "🎨", title: "2 coloris épurés",        txt: "Blanc Cassé et Taupe — l'élégance sobre." },
      { ico: "🏆", title: "Gamme premium JAYPEE",    txt: "Standards les plus exigeants de la collection." }
    ]
  },

  /* ── Wavelock Ultra — 2000 ML ── */
  {
    id: 6, name: "Wavelock Ultra", cat: "Récipient Isotherme", cap: "2000 ML",
    badge: null, filter: "2000",
    desc: "Le Wavelock Ultra se distingue par son design ondulé et sa prise en main remarquablement confortable. La technologie Wavelock assure une étanchéité absolue.",
    icon: "🍶", photos: [],
    colors: [
      { name: "Beige",        hex: "#d4c8b0", images: ["images/gourmet-beige-0.jpg"], photo: null },
      { name: "Bleu",         hex: "#5b7fa8", images: ["images/gourmet-beige-0.jpg"], photo: null },
      { name: "Vert de gris", hex: "#7d9e8f", images: ["images/gourmet-beige-0.jpg"], photo: null }
    ],
    specs: {
      "Capacité": "2000 ML", "Matière": "Acier inoxydable 18/8",
      "Conservation chaud": "Jusqu'à 12h", "Conservation froid": "Jusqu'à 24h",
      "Fermeture": "Wavelock — verrouillage avancé", "Coloris": "3 variantes", "Origine": "The Kitchen Collection"
    },
    features: [
      { ico: "🌊", title: "Design Wavelock ondulé",   txt: "Prise en main ergonomique grâce au profil ondulé." },
      { ico: "🔒", title: "Système Wavelock Ultra",   txt: "Étanchéité totale pour le transport." },
      { ico: "🌡️", title: "Performance thermique",    txt: "12h chaud / 24h froid." },
      { ico: "🎨", title: "3 coloris tendance",       txt: "Beige, Bleu et Vert de gris." }
    ]
  },

  /* ── MicroSmart — 1500 ML ── */
  {
    id: 7, name: "MicroSmart", cat: "Récipient Isotherme", cap: "1500 ML",
    badge: null, filter: "1500",
    desc: "Le MicroSmart 1500 est pensé pour les actifs. Son format compact et ses coloris contemporains en font le compagnon idéal du quotidien.",
    icon: "🍶", photos: [],
    colors: [
      { name: "Gris",  hex: "#9a9a9a", images: ["images/gourmet-beige-0.jpg"], photo: null },
      { name: "Bleu",  hex: "#5b7fa8", images: ["images/gourmet-beige-0.jpg"], photo: null },
      { name: "Rouge", hex: "#c0392b", images: ["images/gourmet-beige-0.jpg"], photo: null }
    ],
    specs: {
      "Capacité": "1500 ML", "Matière": "Acier inoxydable 18/8",
      "Conservation chaud": "Jusqu'à 10h", "Conservation froid": "Jusqu'à 20h",
      "Fermeture": "Smart-Lock", "Coloris": "3 variantes", "Origine": "The Kitchen Collection"
    },
    features: [
      { ico: "🏃", title: "Conçu pour le mouvement",  txt: "Format compact et léger." },
      { ico: "🔒", title: "Smart-Lock intégré",        txt: "Fermeture rapide d'une main." },
      { ico: "🎨", title: "Coloris contemporains",     txt: "Gris, Bleu, Rouge." },
      { ico: "🧼", title: "Entretien simplifié",       txt: "Joint amovible, nettoyage en quelques secondes." }
    ]
  },

  /* ── MicroSmart Plus — 2000 ML ── */
  {
    id: 8, name: "MicroSmart Plus", cat: "Récipient Isotherme", cap: "2000 ML",
    badge: null, filter: "2000",
    desc: "Le MicroSmart Plus — plus de capacité, toujours autant de praticité. 2 litres avec le système Smart-Lock amélioré.",
    icon: "🍶", photos: [],
    colors: [
      { name: "Taupe", hex: "#8e7d6e", images: ["images/gourmet-beige-0.jpg"], photo: null },
      { name: "Blanc", hex: "#f5f5f5", images: ["images/gourmet-beige-0.jpg"], photo: null },
      { name: "Beige", hex: "#d4c8b0", images: ["images/gourmet-beige-0.jpg"], photo: null }
    ],
    specs: {
      "Capacité": "2000 ML", "Matière": "Acier inoxydable 18/8",
      "Conservation chaud": "Jusqu'à 12h", "Conservation froid": "Jusqu'à 24h",
      "Fermeture": "Smart-Lock Plus", "Coloris": "3 variantes", "Origine": "The Kitchen Collection"
    },
    features: [
      { ico: "📈", title: "Capacité augmentée",       txt: "2 litres pour des repas plus généreux." },
      { ico: "🔒", title: "Smart-Lock Plus",           txt: "Fermeture améliorée, pratique et sécurisée." },
      { ico: "🌡️", title: "Double isolation",          txt: "12h chaud, 24h froid." },
      { ico: "🎨", title: "Coloris neutres & luxueux", txt: "Taupe, Blanc et Beige." }
    ]
  },

  /* ── Princeton — 2500 ML ── */
  {
    id: 9, name: "Princeton", cat: "Récipient Isotherme", cap: "2500 ML",
    badge: null, filter: "3000",
    desc: "Le Princeton — noble, distingué, de caractère. Silhouette verticale élancée, 4 coloris soigneusement sélectionnés.",
    icon: "🏆", photos: [],
    colors: [
      { name: "Écru",       hex: "#f2ede3", images: ["images/gourmet-beige-0.jpg"], photo: null },
      { name: "Grège",      hex: "#c8bda8", images: ["images/gourmet-beige-0.jpg"], photo: null },
      { name: "Camel",      hex: "#c4956a", images: ["images/gourmet-beige-0.jpg"], photo: null },
      { name: "Vert clair", hex: "#b8d4b0", images: ["images/gourmet-beige-0.jpg"], photo: null }
    ],
    specs: {
      "Capacité": "2500 ML", "Matière": "Acier inoxydable 18/8",
      "Conservation chaud": "Jusqu'à 13h", "Conservation froid": "Jusqu'à 26h",
      "Fermeture": "Princeton-Lock hermétique", "Coloris": "4 variantes", "Origine": "The Kitchen Collection"
    },
    features: [
      { ico: "👑", title: "Silhouette Princeton",     txt: "Format vertical élancé, présence majestueuse." },
      { ico: "🎨", title: "4 coloris exclusifs",      txt: "Écru, Grège, Camel et Vert clair." },
      { ico: "🌡️", title: "Isolation longue durée",   txt: "13h chaud / 26h froid." },
      { ico: "✨", title: "Finition haut de gamme",    txt: "Chaque détail travaillé pour un rendu irréprochable." }
    ]
  },

  /* ── Kingston — 2500 ML ── */
  {
    id: 10, name: "Kingston", cat: "Récipient Isotherme", cap: "2500 ML",
    badge: null, filter: "3000",
    desc: "Le Kingston — classicisme moderne. Lignes droites, coloris naturels, robustesse et élégance sans ostentation.",
    icon: "🍶", photos: [],
    colors: [
      { name: "Blanc Cassé", hex: "#f5f0e8", images: ["images/gourmet-beige-0.jpg"], photo: null },
      { name: "Camel",       hex: "#c4956a", images: ["images/gourmet-beige-0.jpg"], photo: null },
      { name: "Vert clair",  hex: "#b8d4b0", images: ["images/gourmet-beige-0.jpg"], photo: null }
    ],
    specs: {
      "Capacité": "2500 ML", "Matière": "Acier inoxydable 18/8",
      "Conservation chaud": "Jusqu'à 13h", "Conservation froid": "Jusqu'à 26h",
      "Fermeture": "Hermétique renforcée", "Coloris": "3 variantes", "Origine": "The Kitchen Collection"
    },
    features: [
      { ico: "🏛️", title: "Design classique intemporel", txt: "Lignes droites et proportions parfaites." },
      { ico: "💎", title: "Luxe discret",                 txt: "La perfection dans la sobriété." },
      { ico: "🌡️", title: "Conservation optimale",        txt: "13h chaud / 26h froid." },
      { ico: "🔒", title: "Fermeture renforcée",          txt: "Joint silicone de qualité supérieure." }
    ]
  },

  /* ── Punch Prime — 650 ML ── */
  {
    id: 11, name: "Punch Prime", cat: "Bouteille Isotherme", cap: "650 ML",
    badge: "new", filter: "1500",
    desc: "Le Punch Prime réinvente votre hydratation. 650 ml en acier inoxydable premium pour les sportifs et les actifs.",
    icon: "🥤", photos: [],
    colors: [
      { name: "Blanc/Noir",   hex: "#1a1a1a", images: ["images/gourmet-beige-0.jpg"], photo: null },
      { name: "Blanc/Orange", hex: "#d4621a", images: ["images/gourmet-beige-0.jpg"], photo: null },
      { name: "Beige/Camel",  hex: "#c4956a", images: ["images/gourmet-beige-0.jpg"], photo: null },
      { name: "Blanc/Dots",   hex: "#e8e4dc", images: ["images/gourmet-beige-0.jpg"], photo: null }
    ],
    specs: {
      "Capacité": "650 ML", "Matière": "Acier inoxydable 18/8",
      "Conservation chaud": "Jusqu'à 8h", "Conservation froid": "Jusqu'à 18h",
      "Fermeture": "Bouchon twist sécurisé", "Coloris": "4 variantes bicolores", "Origine": "The Kitchen Collection"
    },
    features: [
      { ico: "💧", title: "Bouteille de sport premium", txt: "650 ml pour une hydratation optimale." },
      { ico: "🌡️", title: "Performance thermique",      txt: "8h chaud / 18h froid." },
      { ico: "🎨", title: "4 coloris bicolores",        txt: "Combinaisons uniques pour une identité visuelle forte." },
      { ico: "🔒", title: "Bouchon twist anti-fuite",   txt: "Zéro fuite en toutes circonstances." }
    ]
  }

  /* ── AJOUTER UN NOUVEAU PRODUIT : copiez un bloc ci-dessus,
        changez l'id (prochain numéro libre) et adaptez. ── */

];
