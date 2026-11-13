import {
  Course,
  Product,
  HairSalonService,
  Registration,
  Order,
  AppointmentBooking,
  GalleryItem,
  Testimonial,
  ContactMessage,
  SiteSettings,
} from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-gateau-traditionnel',
    slug: 'gateau-traditionnel',
    category: 'pastry',
    title: {
      fr: 'Gâteau traditionnel',
      ar: 'الحلويات التقليدية الجزائرية والشرقية',
    },
    shortDesc: {
      fr: 'Maîtrisez les gâteaux traditionnels : Baklawa, Tcharek, Makroud, Knidlette et Dziriette avec façonnage d’art.',
      ar: 'إتقان صناعة البقلاوة، التشارك، المقروض، الكنيدلات والدزيريات بالتزيين المتقن.',
      en: 'Master heritage pastries: Baklava, Tcharek, Makroud, Knidlette, and Dziriette with artisan shaping.',
    },
    fullDesc: {
      fr: 'Formation d’excellence dispensée par Chef Benzaza. Apprenez le choix des amandes, la confection des pates fines sans repos, la cuisson dorée au miel pur et la décoration minutieuse pour mariages et fêtes.',
      ar: 'دورة تميز تحت إشراف الشيف بن زازة. تعلم اختيار المكسرات، العجائن الدقيقة، التعسيل المثالي، والتزيين العصري والمحترف للمناسبات والأعراس.',
      en: 'Masterclass led by Chef Benzaza. Learn nut selection, paper-thin pastry rolling, honey soaking, and delicate decorative finishes for celebrations.',
    },
    image: '/chef%20benzaza%20.png',
    priceDZD: 38000,
    duration: {
      fr: '2 Mois (100 Heures pratiques)',
      ar: 'شهران (100 ساعة تطبيقية)',
      en: '2 Months (100 Practical Hours)',
    },
    schedules: {
      fr: ['Matinée (09h00 - 13h00)', 'Après-midi (14h00 - 18h00)', 'Session Weekend'],
      ar: ['الفترة الصباحية (09:00 - 13:00)', 'فترة ما بعد الزوال (14:00 - 18:00)', 'فترة نهاية الأسبوع'],
      en: ['Morning (09:00 - 13:00)', 'Afternoon (14:00 - 18:00)', 'Weekend Cohort'],
    },
    objectives: {
      fr: [
        'Confection des pâtes traditionnelles et façonnage manuel de précision',
        'Préparation des farces aux amandes, noix et pistaches parfumées',
        'Techniques de cuisson, glaçage royal et dorure au miel naturel',
        'Présentation professionnelle pour commandes d’événements et fêtes',
      ],
      ar: [
        'تحضير العجائن التقليدية والتشكيل اليدوي الدقيق',
        'إعداد حشوات اللوز والجوز المعطرة بماء الزهر',
        'تقنيات الخبز، الطلاء الملوكي والتعسيل الطبيعي',
        'تغليف وتنسيق الطلبيات الفاخرة للأعراس والحفلات',
      ],
      en: [
        'Preparation of heritage doughs and manual shaping',
        'Almond, walnut, and orange blossom filling blends',
        'Baking techniques, royal icing, and honey dipping',
        'Professional gift packaging and event catering orders',
      ],
    },
    modules: [
      {
        title: {
          fr: 'Module 1 : Pâtes et Farces Traditionnelles',
          ar: 'المحور 1: العجائن والحشوات التقليدية',
          en: 'Module 1: Traditional Doughs & Nut Fillings',
        },
        content: {
          fr: 'Pâte à Baklawa, pâte à Tcharek et dosage parfait de la pâte d’amande.',
          ar: 'عجينة البقلاوة، عجينة التشارك والنسب المثالية لحشوة اللوز.',
          en: 'Baklava pastry layers, Tcharek dough, and spiced almond paste.',
        },
      },
      {
        title: {
          fr: 'Module 2 : Façonnage et Décoration Fine',
          ar: 'المحور 2: التشكيل النقش والزينة الفاخرة',
          en: 'Module 2: Shaping & Artistic Decoration',
        },
        content: {
          fr: 'Pincage Nekkach, Dziriette moulées, Knidlette et décors en pâte à sucre.',
          ar: 'نقش التشارك، الدزيريات، الكنيدلات والزخرفة الدقيقة.',
          en: 'Nekkach pinching, Dziriette pinching, and sugar paste flower accents.',
        },
      },
    ],
    instructor: {
      name: 'Chef Benzaza',
      role: {
        fr: 'Chef Fondateur & Maître Pâtissier Traditionnel',
        ar: 'الشيف المؤسس ومدرب الحلويات التقليدية',
        en: 'Founder Chef & Master Heritage Pastry Chef',
      },
      experience: {
        fr: 'Plus de 20 ans d’expérience dans l’art culinaire et la pâtisserie traditionnelle',
        ar: 'أكثر من 20 سنة خبرة في صناعة الحلويات التقليدية الفاخرة',
        en: 'Over 20 years dedicated to traditional Algerian culinary arts',
      },
    },
    featured: true,
  },
  {
    id: 'course-patisserie',
    slug: 'patisserie-fine',
    category: 'pastry',
    title: {
      fr: 'Pâtisserie',
      ar: 'صناعة الحلويات العصرية والمخبوزات الفرنسية',
    },
    shortDesc: {
      fr: 'Maîtrisez les entremets modernes, le travail du chocolat, les pâtes levées feuilletées et le glaçage miroir.',
      ar: 'إتقان صناعة الكعك العصري، فنون الشوكولاتة، العجائن المورقة والطلاء اللامع.',
      en: 'Master modern entremets, chocolate tempering, laminated viennoiserie, and mirror glazes.',
    },
    fullDesc: {
      fr: 'Sous la direction de Chef Khaled, découvrez la haute pâtisserie internationale : mousse chocolat grand cru, inserts fruités, viennoiserie pur beurre alvéolée et montages d’exception.',
      ar: 'تحت إشراف الشيف خالد، تعلم أرقى حلويات الفنادق العالمية: الموس الفاخر، الحشوات المبتكرة، الكرواسون المورق بالزبدة، والتزيين المخملي.',
      en: 'Guided by Chef Khaled, master international haute pâtisserie: fine mousse cakes, fruit inserts, honeycomb laminated croissants, and mirror glazes.',
    },
    image: '/chef%20khaled.png',
    priceDZD: 42000,
    duration: {
      fr: '3 Mois (140 Heures pratiques)',
      ar: '3 أشهر (140 ساعة تطبيقية)',
      en: '3 Months (140 Practical Hours)',
    },
    schedules: {
      fr: ['Matinée (09h00 - 13h00)', 'Après-midi (14h00 - 18h00)', 'Session Weekend'],
      ar: ['الفترة الصباحية (09:00 - 13:00)', 'فترة ما بعد الزوال (14:00 - 18:00)', 'فترة نهاية الأسبوع'],
      en: ['Morning (09:00 - 13:00)', 'Afternoon (14:00 - 18:00)', 'Weekend Cohort'],
    },
    objectives: {
      fr: [
        'Maîtriser les pâtes de base (sablée, feuilletée inversée, pâte à choux)',
        'Techniques avancées du tempérage de chocolat et montages contemporains',
        'Création d’entremets avec inserts croustillants et mousses bavaroises',
        'Hygiène HACCP et calcul des coûts de revient',
      ],
      ar: [
        'التمكن من العجائن الأساسية والمورقة الكلاسيكية والعصرية',
        'تقنيات الشوكولاتة والزخرفة الاحترافية',
        'ابتكار قوالب الكعك العصرية وتنسيق النكهات والقوام',
        'معايير النظافة والسلامة الصحية وحساب التكاليف',
      ],
      en: [
        'Master base doughs, choux, and inverse puff pastry',
        'Advanced chocolate tempering and decorative modeling',
        'Contemporary layered entremets with fruit inserts',
        'Food safety and ingredient cost engineering',
      ],
    },
    modules: [
      {
        title: {
          fr: 'Module 1 : Entremets et Mousses',
          ar: 'المحور 1: الكعك العصري والموس',
          en: 'Module 1: Modern Entremets & Mousses',
        },
        content: {
          fr: 'Montage en cercle, ganaches montées, inserts et biscuiterie.',
          ar: 'إعداد الكعك الطبقي، الجناش المخفوق، والحشوات.',
          en: 'Layered entremet assembly, whipped ganache, and biscuit bases.',
        },
      },
      {
        title: {
          fr: 'Module 2 : Viennoiserie et Glaçages',
          ar: 'المحور 2: المخبوزات والطلاء اللامع',
          en: 'Module 2: Viennoiserie & Mirror Glazes',
        },
        content: {
          fr: 'Croissants feuilletés au beurre doux, brioches et glaçage miroir.',
          ar: 'الكرواسون الفرنسي، البريوش والطلاء الملمع.',
          en: 'Pure butter croissants, brioches, and glossy mirror finishes.',
        },
      },
    ],
    instructor: {
      name: 'Chef Khaled',
      role: {
        fr: 'Chef Formateur Pâtissier Exécutif',
        ar: 'شيف مدرب في صناعة الحلويات العصرية',
        en: 'Master Pastry Chef & Technical Trainer',
      },
      experience: {
        fr: '16 ans d’expérience dans les grands laboratoires de pâtisserie fine',
        ar: '16 سنة خبرة في أعرق مخابر الحلويات الفاخرة',
        en: '16 years of expertise in high-end pastry labs',
      },
    },
    featured: true,
  },
  {
    id: 'course-cuisine-restauration',
    slug: 'cuisine-de-restauration',
    category: 'culinary',
    title: {
      fr: 'Cuisine de restauration',
      ar: 'طبخ المطاعم والطهي العصري الاحترافي',
    },
    shortDesc: {
      fr: 'Gestion de brigade, taillage de précision, cuissons sous-vide, fonds réduits et dressage à l’assiette.',
      ar: 'إدارة مطابخ المطاعم، تقطيع الخضار واللحوم، الطهي البطيء والصلصات المركزة.',
      en: 'Kitchen brigade control, precision knife cuts, sous-vide precision, and modern plating.',
    },
    fullDesc: {
      fr: 'Spécialement conçue par Chef Nounou pour former des cuisiniers d’exception et chefs de partie. Maîtrisez l’organisation du coup de feu, les viandes nobles, les poissons et le dressage moderne.',
      ar: 'دورة مكثفة مع الشيف نونو لإعداد طهاة محترفين للمطاعم والفنادق. تعلم تنظيم المطبخ في أوقات الذروة، طهي اللحوم والأسماك الفاخرة، وإعداد أطباق جذابة.',
      en: 'Intensive culinary program with Chef Nounou for aspiring line and head chefs. Master rush-hour organization, prime meats, seafood cookery, and plate design.',
    },
    image: '/chef%20nouou.png',
    priceDZD: 48000,
    duration: {
      fr: '4 Mois (180 Heures en cuisine)',
      ar: '4 أشهر (180 ساعة في المطبخ)',
      en: '4 Months (180 Kitchen Hours)',
    },
    schedules: {
      fr: ['Matinée (08h30 - 13h00)', 'Session Weekend'],
      ar: ['الفترة الصباحية (08:30 - 13:00)', 'فترة نهاية الأسبوع'],
      en: ['Morning (08:30 - 13:00)', 'Weekend Cohort'],
    },
    objectives: {
      fr: [
        'Taillages réglementaires et sécurité en cuisine professionnelle',
        'Élaboration des sauces mères et jus corsés réduits',
        'Cuissons à juste température (poêlage, rôtissage, sous-vide)',
        'Gestion des bons de commande et dressage gastronomique',
      ],
      ar: [
        'تقنيات التقطيع الدقيق والسرعة في الأداء',
        'تحضير الصلصات الكلاسيكية والعصائر المركزة',
        'طرق الطهي الحديثة والطهي تحت التفريغ',
        'تنسيق الأطباق العصرية وإدارة طلبات المطعم',
      ],
      en: [
        'Standard knife skills and commercial kitchen safety',
        'Preparation of mother sauces and rich pan glaces',
        'Modern thermal cooking and precision sous-vide',
        'Ticket management and high-end plate staging',
      ],
    },
    modules: [
      {
        title: {
          fr: 'Module 1 : Découpes et Fondamentaux',
          ar: 'المحور 1: التقطيع والقواعد الأساسية',
          en: 'Module 1: Knife Cuts & Culinary Foundations',
        },
        content: {
          fr: 'Brunoise, julienne, mirepoix et maniement des couteaux de chef.',
          ar: 'تقنيات التقطيع السريع والتحكم بالسكاكين الاحترافية.',
          en: 'Standard geometric cuts and knife maintenance.',
        },
      },
      {
        title: {
          fr: 'Module 2 : Sauces et Plats Chauds',
          ar: 'المحور 2: الصلصات والأطباق الساخنة',
          en: 'Module 2: Sauces & Hot Entrees',
        },
        content: {
          fr: 'Demi-glace, veloutés, poissons pochés et viandes poêlées.',
          ar: 'مرق العجل المركز، الأسماك واللحوم المطهوة بإتقان.',
          en: 'Demi-glace, poached seafood, and seared meats.',
        },
      },
    ],
    instructor: {
      name: 'Chef Nounou',
      role: {
        fr: 'Chef Cuisinier de Restauration',
        ar: 'شيف مطبخ واحترافي إدارة المطاعم',
        en: 'Executive Restaurant Chef',
      },
      experience: {
        fr: '15 ans de direction de cuisines de restaurants et traiteurs',
        ar: '15 سنة في قيادة مطابخ المطاعم الكبرى والخدمات الفندقية',
        en: '15 years managing high-volume restaurant kitchens',
      },
    },
    featured: true,
  },
  {
    id: 'course-cuisine-traditionnelle',
    slug: 'cuisine-traditionnelle',
    category: 'culinary',
    title: {
      fr: 'Cuisine traditionnelle',
      ar: 'المطبخ التقليدي الجزائري الأصيل',
    },
    shortDesc: {
      fr: 'Couscous royal, Rechta artisanale, Chakhchoukha, Chorba Frik et plats mijotés du terroir algérien.',
      ar: 'الكسكسي الأصيل، الرشتة، الشخشوخة، الشوربة فريك والأطباق التقليدية العريقة.',
      en: 'Handmade Rechta, Royal Couscous, Chakhchoukha, Chorba Frik, and slow-simmered regional stews.',
    },
    fullDesc: {
      fr: 'Formez-vous avec Chef Benzaza aux véritables recettes ancestrales algériennes. Apprenez le roulage du couscous à la main, la cuisson à la vapeur au kaskas, la préparation des épices maison et la sauce rouge ou blanche mijotée.',
      ar: 'دورة عريقة مع الشيف بن زازة لتعلم أسرار الطبخ التقليدي الجزائري. تعلم فتل الكسكسي والرشتة يدوياً، إعداد البهارات العطرية، والأطباق التي تشرفك في المناسبات والأعراس.',
      en: 'Immerse in authentic Algerian heritage cookery with Chef Benzaza. Learn hand-rolled couscous, steamed Rechta ribbons, aromatic spice roasting, and slow-simmered regional celebratory feasts.',
    },
    image: '/benzaza.png',
    priceDZD: 40000,
    duration: {
      fr: '3 Mois (120 Heures pratiques)',
      ar: '3 أشهر (120 ساعة تطبيقية)',
      en: '3 Months (120 Practical Hours)',
    },
    schedules: {
      fr: ['Matinée (09h00 - 13h00)', 'Session Weekend'],
      ar: ['الفترة الصباحية (09:00 - 13:00)', 'فترة نهاية الأسبوع'],
      en: ['Morning (09:00 - 13:00)', 'Weekend Cohort'],
    },
    objectives: {
      fr: [
        'Roulage et cuissons à la vapeur des semoules (Couscous, Seffa, Mesfouf)',
        'Confection artisanale de la pâte à Rechta et Trida',
        'Mijotés traditionnels : Tajine Zitoune, Lham Lahlou, Mtewem, Chakhchoukha',
        'Présentation d’exception pour buffets traditionnels et fêtes',
      ],
      ar: [
        'فتل الكسكسي وطهيه على البخار بمختلف أنواعه',
        'إعداد عجينة الرشتة والثريد اليدوية',
        'طهي الطواجن التقليدية: طاجين الزيتون، اللحم الحلو، المتوم، والشخشوخة',
        'تنسيق بوفيهات المناسبات والحفلات الجزائرية الاصيلة',
      ],
      en: [
        'Hand-rolling and triple-steaming semolina grains',
        'Artisan Rechta pasta sheeting and noodle cutting',
        'Heritage tagines: Tajine Zitoune, Lham Lahlou, Mtewem, Chakhchoukha',
        'Traditional banquet buffet staging for weddings and festivals',
      ],
    },
    modules: [
      {
        title: {
          fr: 'Module 1 : Pâtes et Semoules du Terroir',
          ar: 'المحور 1: المعجنات والسميد التقليدي',
          en: 'Module 1: Heritage Grains & Handmade Pasta',
        },
        content: {
          fr: 'Roulage du couscous fine/moyen, pâte à Rechta et séchage.',
          ar: 'فتل الكسكسي، عجينة الرشتة وتقطيعها اليدوي.',
          en: 'Couscous rolling, Rechta dough sheeting, and steaming.',
        },
      },
      {
        title: {
          fr: 'Module 2 : Plats de Fêtes et Tajines',
          ar: 'المحور 2: أطباق الأعراس والطواجن',
          en: 'Module 2: Celebratory Feasts & Tagines',
        },
        content: {
          fr: 'Chorba frik à l’agneau, Tajine Lham Lahlou aux fruits secs et Mtewem.',
          ar: 'الشوربة فريك باللحم، اللحم الحلو بالفواكه المجففة والمتوم.',
          en: 'Lamb Chorba Frik, sweet prune Lham Lahlou, and Mtewem.',
        },
      },
    ],
    instructor: {
      name: 'Chef Benzaza',
      role: {
        fr: 'Chef Formateur Terroir & Tradition',
        ar: 'شيف مدرب في الطبخ التقليدي والتراث',
        en: 'Master Heritage Cuisine Chef',
      },
      experience: {
        fr: 'Spécialiste reconnu de la gastronomie traditionnelle algérienne',
        ar: 'خبير معروف في المطبخ الجزائري الأصيل والأطباق التقليدية',
        en: 'Renowned expert in authentic regional Algerian gastronomy',
      },
    },
    featured: true,
  },
  {
    id: 'course-pizza',
    slug: 'pizzaiolo-professionnel',
    category: 'pizza',
    title: {
      fr: 'Pizzaiolo',
      ar: 'صانع البيتزا المحترف والبيتزا الإيطالية',
    },
    shortDesc: {
      fr: 'Maturation lente des pâtes (48-72h), étalage à la main sans rouleau et cuisson au four à bois.',
      ar: 'التخمير البطيء للعجينة (48-72 ساعة)، التشكيل اليدوي الإيطالي والخبز في أفران الحطب.',
      en: 'Slow fermentation (48-72h), manual dough slap technique, and stone oven baking.',
    },
    fullDesc: {
      fr: 'Formation de pizzaiolo certifiée dispensée par Chef Garraoui. Apprenez les pré-ferments Biga et Poolish, le taux d’hydratation des farines, les sauces artisanales et la cuisson éclair à 450°C.',
      ar: 'تكوين احترافي مع الشيف قراوي لتعلم أسرار البيتزا الإيطالية النابوليتانية. نغطي التخمير بالبيغا، الفتح اليدوي، اختيار الأجبان والصلصات، والخبز السريع.',
      en: 'Certified pizzaiolo masterclass led by Chef Garraoui. Master preferments Biga & Poolish, high-hydration doughs, sauce blending, and 90-second wood-fired baking.',
    },
    image: '/chef%20garraoui.png',
    priceDZD: 35000,
    duration: {
      fr: '1 Mois (60 Heures intensives)',
      ar: 'شهر واحد (60 ساعة مكثفة)',
      en: '1 Month (60 Intensive Hours)',
    },
    schedules: {
      fr: ['Matinée (09h00 - 13h00)', 'Session Soirée (17h00 - 20h00)', 'Session Weekend'],
      ar: ['الفترة الصباحية (09:00 - 13:00)', 'الفترة المسائية (17:00 - 20:00)', 'فترة نهاية الأسبوع'],
      en: ['Morning (09:00 - 13:00)', 'Evening Session (17:00 - 20:00)', 'Weekend Cohort'],
    },
    objectives: {
      fr: [
        'Choix des farines italiennes Type 00 et calcul d’hydratation',
        'Préparation des levains Biga et Poolish pour pâtes très digestes',
        'Geste traditionnel napolitain "Schiaffo" sans écraser les bords',
        'Gestion des cuissons en four à bois et four à sole réfractaire',
      ],
      ar: [
        'فهم خصائص الدقيق الإيطالي وحساب نسب الماء',
        'إعداد خلطات التخمير المسبق لضمان سهولة الهضم وقرمشة العجينة',
        'إتقان حركة التشكيل اليدوي الإيطالي الأصيل دون استعمال الشوبك',
        'التحكم في درجات حرارة الأفران الخشبية والكهربائية',
      ],
      en: [
        'Italian Type 00 flour selection and hydration math',
        'Biga and Poolish preferments for maximum digestive lightness',
        'Authentic Neapolitan manual stretching ("Schiaffo")',
        'Wood-fired and refractory deck thermal baking control',
      ],
    },
    modules: [
      {
        title: {
          fr: 'Module 1 : Pâtes et Maturation',
          ar: 'المحور 1: العجائن والتخمير',
          en: 'Module 1: Doughs & Fermentation',
        },
        content: {
          fr: 'Hydratation 65% à 80%, températures et repos au froid.',
          ar: 'نسب الترطيب من 65% إلى 80%، والتخمير البارد.',
          en: '65% to 80% hydration profiles and cold maturation.',
        },
      },
      {
        title: {
          fr: 'Module 2 : Façonnage et Cuisson',
          ar: 'المحور 2: التشكيل والخبز',
          en: 'Module 2: Stretching & Wood-fired Baking',
        },
        content: {
          fr: 'Étalage manuel, bordures alvéolées et cuisson à 450°C.',
          ar: 'الفتح اليدوي الحفاظ على الحواف الهوائية والخبز في 450 درجة.',
          en: 'Manual stretching, cornicione preservation, and 450°C bake.',
        },
      },
    ],
    instructor: {
      name: 'Chef Garraoui',
      role: {
        fr: 'Maître Pizzaiolo & Expert Empâtements',
        ar: 'أستاذ خبير في صناعة البيتزا والتخمير',
        en: 'Certified Master Pizzaiolo',
      },
      experience: {
        fr: '14 ans d’expérience en pizzeria artisanale et formation professionnelle',
        ar: '14 سنة خبرة في إيطاليا والجزائر وتكوين صناع البيتزا',
        en: '14 years mastering artisan pizza crafting and teaching',
      },
    },
    featured: true,
  },
  {
    id: 'course-coiffure-femme',
    slug: 'coiffure-femme',
    category: 'hairdressing',
    title: {
      fr: 'Coiffure femme',
      ar: 'الحلاقة النسائية، علم الألوان وتصفيف الشعر',
      en: 'Women’s Hairstyling, Colorimetry & Visagism',
    },
    shortDesc: {
      fr: 'Balayages californiens, brushings sculptés, coupes tendances et chignons de mariée.',
      ar: 'تقنيات البالاج العصري، السيشوار المتدرج، قصات الموضة وتسريحات العرائس.',
      en: 'Luminous balayage, bouncy blowouts, precision scissor cuts, and bridal up-dos.',
    },
    fullDesc: {
      fr: 'Formation d’excellence dirigée par Djamila Laleg. Apprenez la colorimétrie pour réussir les décolorations sans abîmer la fibre capillaire, les mèches au pinceau, les brushings glamour et les attaches événementielles.',
      ar: 'تكوين احترافي عالي المستوى مع الماستر جميلة لاليغ. تعلمي صبغات الشعر، سحب اللون الآمن، تركيب الخصلات المضيئة، القصات الحديثة وتسريحات الأعراس الراقية.',
      en: 'Masterclass program led by Djamila Laleg. Learn hair color theory, safe lightener lifting, freehand balayage highlights, bouncy blowouts, and intricate bridal chignons.',
    },
    image: '/laleg%20djamila.png',
    priceDZD: 38000,
    duration: {
      fr: '3 Mois (120 Heures pratiques)',
      ar: '3 أشهر (120 ساعة تطبيقية)',
      en: '3 Months (120 Practical Hours)',
    },
    schedules: {
      fr: ['Matinée (09h00 - 13h00)', 'Après-midi (14h00 - 18h00)', 'Session Weekend'],
      ar: ['الفترة الصباحية (09:00 - 13:00)', 'فترة ما بعد الزوال (14:00 - 18:00)', 'فترة نهاية الأسبوع'],
      en: ['Morning (09:00 - 13:00)', 'Afternoon (14:00 - 18:00)', 'Weekend Cohort'],
    },
    objectives: {
      fr: [
        'Maîtrise du cercle chromatique et neutralisation des faux reflets',
        'Techniques de balayage ombré hair et highlights',
        'Coupes géométriques aux ciseaux droits et sculpteurs',
        'Chignons de mariée contemporains et coiffures de soirée',
      ],
      ar: [
        'التمكن من دائرة الألوان وسحب اللون بطريقة صحية دون إتلاف الشعر',
        'تقنيات البالاج والأومبري العصرية',
        'قص الشعر بمختلف الزوايا واستخدام مقصات التفريغ',
        'إنجاز تسريحات الخطوبة والأعراس الراقية والمبتكرة',
      ],
      en: [
        'Color wheel mastery and tone neutralization',
        'Ombré hair balayage and foil highlighting',
        'Precision haircutting angles and texturizing',
        'Bridal up-dos and gala evening hairstyling',
      ],
    },
    modules: [
      {
        title: {
          fr: 'Module 1 : Colorimétrie et Soins',
          ar: 'المحور 1: علم الألوان والعناية',
          en: 'Module 1: Color Theory & Treatments',
        },
        content: {
          fr: 'Diagnostic capillaire, volumes d’oxydant et patines.',
          ar: 'تشخيص نوعية الشعر، درجات الأكسجين والمصححات.',
          en: 'Hair diagnosis, developer selection, and color toners.',
        },
      },
      {
        title: {
          fr: 'Module 2 : Coupes et Chignons',
          ar: 'المحور 2: القص والتسريحات الفاخرة',
          en: 'Module 2: Cutting & Bridal Styling',
        },
        content: {
          fr: 'Carrés structurés, dégradés et chignons de mariée.',
          ar: 'قصة الكاري، التدرج وتسريحات الأعراس.',
          en: 'Structured bobs, textured layers, and bridal up-dos.',
        },
      },
    ],
    instructor: {
      name: 'Djamila Laleg',
      role: {
        fr: 'Formatrice Experte Haute Coiffure Femme',
        ar: 'أستاذة خبيرة في التصفيف والتجميل النسائي',
        en: 'Master Women’s Hairstylist & Educator',
      },
      experience: {
        fr: '18 ans d’expertise en salons de prestige et événements de mode',
        ar: '18 سنة من التجربة في كبرى صالونات التجميل والمناسبات',
        en: '18 years leading top bridal beauty academies',
      },
    },
    featured: true,
  },
  {
    id: 'course-coiffure-homme',
    slug: 'coiffure-homme',
    category: 'barber',
    title: {
      fr: 'Coiffure homme',
      ar: 'الحلاقة الرجالية وتصفيف اللحية',
      en: 'Men’s Grooming & Master Barbering',
    },
    shortDesc: {
      fr: 'Dégradés américains (Fade), rasage traditionnel au coupe-choux et soin de barbe à la serviette chaude.',
      ar: 'قصات التدرج الأمريكية (Fade)، الحلاقة بالموس الكلاسيكي، والعناية باللحية بالمنشفة الساخنة.',
      en: 'American skin fades, straight razor shaves, and hot towel beard rejuvenation.',
    },
    fullDesc: {
      fr: 'Sous le mentorat d’Adem Boukhatem, devenez un barbier d’exception. Formez-vous aux dégradés à blanc ultra-précis (Low, Mid, High Fade), au traçage de barbe au coupe-choux et aux soins du visage masculin.',
      ar: 'تكوين تطبيقي احترافي مع الأستاذ آدم بوخاتم لتعلم الحلاقة الرجالية العصرية. تعلم التدرج السلس للقصات، التحديد بالموس، والعناية بالبشرة بالبخار والزيوت.',
      en: 'Master men’s grooming with Adem Boukhatem. Learn seamless skin fades, straight razor beard sculpting, and luxury hot towel facial treatments.',
    },
    image: '/src/assets/images/barber_coiffure_master_1794418834548.jpg',
    priceDZD: 32000,
    duration: {
      fr: '2 Mois (90 Heures en salon)',
      ar: 'شهران (90 ساعة في الصالون)',
      en: '2 Months (90 Salon Hours)',
    },
    schedules: {
      fr: ['Matinée (09h00 - 13h00)', 'Après-midi (14h00 - 18h00)', 'Session Weekend'],
      ar: ['الفترة الصباحية (09:00 - 13:00)', 'فترة ما بعد الزوال (14:00 - 18:00)', 'فترة نهاية الأسبوع'],
      en: ['Morning (09:00 - 13:00)', 'Afternoon (14:00 - 18:00)', 'Weekend Cohort'],
    },
    objectives: {
      fr: [
        'Maîtrise de la tondeuse : Low fade, Mid fade, High fade, Taper fade',
        'Maniement du rasoir droit (coupe-choux) et traçage de barbe',
        'Morpho-visagisme masculin et conseils de style',
        'Stérilisation des outils et gestion d’un salon barbier',
      ],
      ar: [
        'التحكم بآلات الحلاقة وقصات التدرج العصري',
        'الاستعمال الآمن للموس المستقيم وتحديد اللحية',
        'دراسة ملامح الوجه واختيار القصة المناسبة',
        'التعقيم وتسيير صالون الحلاقة',
      ],
      en: [
        'Clipper mastery: Low, Mid, High skin fades & Tapers',
        'Straight razor precision beard lining',
        'Male facial morphology and styling advisory',
        'Sanitation protocols and barber shop management',
      ],
    },
    modules: [
      {
        title: {
          fr: 'Module 1 : Tondeuse et Dégradés',
          ar: 'المحور 1: الماكينات وتدرجات الشعر',
          en: 'Module 1: Clippers & Fade Mastery',
        },
        content: {
          fr: 'Réglage des sabots, effacement des lignes et finitions.',
          ar: 'ضبط درجات الأمشاط، محو خطوط التدرج واللمسات الأخيرة.',
          en: 'Guard lever control, line blending, and outline edging.',
        },
      },
      {
        title: {
          fr: 'Module 2 : Rasage et Soin Barbe',
          ar: 'المحور 2: الحلاقة الكلاسيكية والعناية باللحية',
          en: 'Module 2: Traditional Shave & Beard Care',
        },
        content: {
          fr: 'Préparation de la peau, coupe-choux et serviettes chaudes.',
          ar: 'تهيئة البشرة، استخدام الموس والمناشف الدافئة.',
          en: 'Skin prep, straight razor lining, and steam towel treatment.',
        },
      },
    ],
    instructor: {
      name: 'Adem Boukhatem',
      role: {
        fr: 'Maître Barbier & Spécialiste Fade',
        ar: 'أستاذ حلاق متخصص في القصات العصرية والتدرج',
      },
      experience: {
        fr: '14 ans dans les salons de coiffure masculine de prestige',
        ar: '14 سنة خبرة في أرقى صالونات الحلاقة الرجالية',
      },
    },
    featured: true,
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-entremet-chocolat',
    name: {
      fr: 'Entremet Signature Chocolat Noir & Feuillantine',
      ar: 'كعكة الشوكولاتة الفاخرة بالفويتين المقرمش',
      en: 'Signature Dark Chocolate & Feuillantine Entremet',
    },
    description: {
      fr: 'Glaçage miroir chocolat grand cru Valrhona, mousse chocolat noir 70%, insert praliné croustillant et biscuit joconde.',
      ar: 'طلاء لامع من أفخر أنواع الشوكولاتة، موس ناعم بنسبة 70%، حشوة براليني مقرمشة وبسكويت جوكند.',
      en: 'Grand cru Valrhona dark mirror glaze, 70% dark mousse, crispy hazelnut praline insert, and joconde sponge.',
    },
    priceDZD: 3800,
    category: 'pastry',
    image: '/src/assets/images/pastry_luxury_entremet_1794418831448.jpg',
    stock: 8,
    isPopular: true,
  },
  {
    id: 'prod-pizza-burrata',
    name: {
      fr: 'Pizza Napolitaine Truffe & Burrata Fraîche',
      ar: 'بيتزا نابوليتانية بجبن البوراتا وزيت الكمأة',
      en: 'Truffle & Fresh Burrata Neapolitan Pizza',
    },
    description: {
      fr: 'Pâte maturée 72 heures, sauce tomate San Marzano D.O.P, burrata entière crémeuse, roquette sauvage et huile de truffe.',
      ar: 'عجينة مخمرة لمدة 72 ساعة، صلصة طماطم إيطالية أصلية، جبن بوراتا كريمي طازج، جرجير بري وزيت الكمأة.',
      en: '72-hour slow fermented dough, San Marzano tomato base, whole creamy burrata ball, fresh wild arugula, and truffle oil drizzle.',
    },
    priceDZD: 1850,
    category: 'pizza',
    image: '/src/assets/images/pizza_artisanale_woodfire_1794418833765.jpg',
    stock: 15,
    isPopular: true,
  },
  {
    id: 'prod-tarte-framboise',
    name: {
      fr: 'Tartelette Sablée Framboises Fraîches & Pistache',
      ar: 'تارت الفستق والتوت البري الطازج',
      en: 'Fresh Raspberry & Pistachio Sable Tart',
    },
    description: {
      fr: 'Fond de tarte croustillant au beurre doux, ganache montée pistache de Bronte et framboises fraîches garnies de coulis.',
      ar: 'قاعدة مقرمشة بالزبدة الطبيعية، جناش فستق إيطالي خفيف وتوت بري طازج مع خلاصة الفواكه.',
      en: 'Crisp sweet butter pastry shell, whipped Bronte pistachio ganache, fresh raspberries filled with homemade raspberry coulis.',
    },
    priceDZD: 650,
    category: 'pastry',
    image: '/src/assets/images/pastry_luxury_entremet_1794418831448.jpg',
    stock: 24,
    isPopular: true,
  },
  {
    id: 'prod-croissant-beurre',
    name: {
      fr: 'Boîte de 6 Croissants Pur Beurre Feuilletés',
      ar: 'علبة 6 قطع كرواسون فرنسي مورق بالزبدة',
      en: 'Box of 6 Pure Butter Laminated Croissants',
    },
    description: {
      fr: 'Viennoiserie artisanale dorée et croustillante, feuilletage au beurre 84%, alvéolage parfait selon la méthode traditionnelle.',
      ar: 'مخبوزات مورقة مقرمشة مصنوعة يدوياً بالزبدة الطبيعية 84% وفق الأصول الفرنسية التقليدية.',
      en: 'Golden hand-laminated artisan croissants, 84% butter fat layering, beautiful honeycomb crumb structure.',
    },
    priceDZD: 720,
    category: 'bakery',
    image: '/src/assets/images/pastry_luxury_entremet_1794418831448.jpg',
    stock: 12,
    isPopular: false,
  },
  {
    id: 'prod-pizza-margherita',
    name: {
      fr: 'Pizza Margherita Classica D.O.P',
      ar: 'بيتزا مارغريتا كلاسيكية بالريحان الطازج',
      en: 'Artisan Margherita Classica D.O.P',
    },
    description: {
      fr: 'Mozzarella fior di latte, sauce tomate maison mijotée, basilic frais du jardin et filet d’huile d’olive extra vierge.',
      ar: 'جبن موزاريلا إيطالي، صلصة طماطم متبلة بالأعشاب، ريحان طازج وزيت زيتون بكر ممتاز.',
      en: 'Fresh fior di latte mozzarella, slow-simmered tomato sauce, garden basil leaves, and extra virgin olive oil.',
    },
    priceDZD: 1200,
    category: 'pizza',
    image: '/src/assets/images/pizza_artisanale_woodfire_1794418833765.jpg',
    stock: 20,
    isPopular: true,
  },
  {
    id: 'prod-plat-filet-boeuf',
    name: {
      fr: 'Pavé de Bœuf Rossini & Mousseline Truffée (Plat Traiteur)',
      ar: 'شريحة لحم بقر فاخرة مع كريمة البطاطا بالكمأة',
      en: 'Pan-Seared Beef Tournedos & Truffled Mousseline',
    },
    description: {
      fr: 'Plat signature cuisiné par nos chefs : filet de bœuf tendre, jus corsé au romarin, mousseline de pommes de terre onctueuse.',
      ar: 'طبق رئيسي فاخر محضر من قبل أساتذة الطبخ: لحم بقر طري، مرق لحم مركز بالأعشاب، وبيوريه بطاطا ناعمة.',
      en: 'Signature chef dish: prime tenderloin, rosemary demi-glace reduction, and velvety truffled potato mousseline.',
    },
    priceDZD: 2600,
    category: 'meals',
    image: '/src/assets/images/hero_chef_kitchen_1794418831073.jpg',
    stock: 10,
    isPopular: false,
  },
  {
    id: 'prod-pain-campagne',
    name: {
      fr: 'Pain de Campagne Artisanal au Levain Naturel (800g)',
      ar: 'خبز ريفي تقليدي بالخميرة الطبيعية (800غ)',
      en: 'Artisanal Country Sourdough Loaf (800g)',
    },
    description: {
      fr: 'Farine de meule tradition, croûte épaisse et caramélisée, mie sauvage et digeste avec fermentation longue de 36 heures.',
      ar: 'خبز مخبوز بدقيق مطاحن تقليدي، قشرة مقرمشة سميكة، ولب هوائي سهل الهضم بتخمير طبيعي 36 ساعة.',
      en: 'Stone-milled flour, blistered caramelized crust, open airy crumb, naturally fermented over 36 hours.',
    },
    priceDZD: 380,
    category: 'bakery',
    image: '/src/assets/images/pizza_artisanale_woodfire_1794418833765.jpg',
    stock: 18,
    isPopular: false,
  },
];

export const INITIAL_SERVICES: HairSalonService[] = [
  {
    id: 'serv-fade-beard',
    title: {
      fr: 'Formule Master Barber : Coupe Fade & Soin Barbe Complet',
      ar: 'باقة الحلاق المتميز: تدرج عصري والعناية باللحية بالمنشفة الساخنة',
      en: 'Master Barber Package: Precision Fade & Hot Towel Beard',
    },
    description: {
      fr: 'Dégradé américain à blanc ou progressif, traçage de la barbe au coupe-choux, serviette chaude parfumée et huile nourrissante.',
      ar: 'قصة شعر متدرجة بدقة عالية، تحديد اللحية بالموس، منشفة بخارية دافئة وزيوت مغذية للبشرة.',
      en: 'Custom precision taper/fade, straight-edge beard contouring, aromatic hot towel ritual, and conditioning oils.',
    },
    priceDZD: 1600,
    durationMinutes: 45,
    category: 'men',
    image: '/src/assets/images/barber_coiffure_master_1794418834548.jpg',
  },
  {
    id: 'serv-coupe-homme-classique',
    title: {
      fr: 'Coupe Homme aux Ciseaux & Coiffage',
      ar: 'قصة شعر رجالية كلاسيكية بالمقص والتصفيف',
      en: 'Men’s Classic Scissor Cut & Styling',
    },
    description: {
      fr: 'Shampoing purifiant, coupe structurée aux ciseaux, massage crânien léger et coiffage avec cire matte.',
      ar: 'غسيل شعر منعش، قصة متناسقة بالمقص، تدليك خفيف وتصفيف بالواكس الطبيعي.',
      en: 'Purifying shampoo, sculpted scissor cut, gentle scalp massage, and matte clay styling.',
    },
    priceDZD: 1000,
    durationMinutes: 30,
    category: 'men',
    image: '/src/assets/images/barber_coiffure_master_1794418834548.jpg',
  },
  {
    id: 'serv-femme-brushing',
    title: {
      fr: 'Brushing Glamour & Soin Kératine Express',
      ar: 'سيشوار متألق مع علاج الكيراتين السريع',
      en: 'Glamour Blowout & Express Keratin Infusion',
    },
    description: {
      fr: 'Lavage délicat avec masque nourrissant, brushing souple ou ondulé (wavy) longue tenue et spray brillance.',
      ar: 'غسيل لطيف مع قناع مغذي، سيشوار حريري أو تسريحة ويفي متموجة تدوم طويلاً مع ملمع الشعر.',
      en: 'Deep nourishing treatment mask, structured blowout or voluminous wavy curls, and gloss mist.',
    },
    priceDZD: 2200,
    durationMinutes: 50,
    category: 'women',
    image: '/src/assets/images/barber_coiffure_master_1794418834548.jpg',
  },
  {
    id: 'serv-femme-balayage',
    title: {
      fr: 'Balayage Signature & Patine Brillance',
      ar: 'بالاج عصري احترافي مع رنساج ملمع',
      en: 'Signature Balayage & Glossing Toner',
    },
    description: {
      fr: 'Éclaircissement fondu sur mesure, patine neutralisante, coupe des pointes et brushing d’exception.',
      ar: 'تفتيح طبيعي متدرج للشعر، توحيد اللون بدون لمعان غير مرغوب، تشذيب الأطراف وتصفيف متكامل.',
      en: 'Custom hand-painted balayage highlights, gloss toner to neutralize undertones, split-end trim, and finishing blowout.',
    },
    priceDZD: 6500,
    durationMinutes: 120,
    category: 'women',
    image: '/src/assets/images/barber_coiffure_master_1794418834548.jpg',
  },
];

export const INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: 'reg-1',
    registrationCode: 'EB-2026-1042',
    courseId: 'course-patisserie',
    courseTitle: 'Pâtisserie',
    fullName: 'Amine Benali',
    phone: '0552 14 38 90',
    email: 'amine.benali@gmail.com',
    dateOfBirth: '1998-05-14',
    preferredSchedule: 'Matinée (09h00 - 13h00)',
    message: 'Je souhaite ouvrir un salon de thé et pâtisserie à Mostaganem.',
    status: 'confirmed',
    createdAt: '2026-11-10T14:30:00Z',
  },
  {
    id: 'reg-2',
    registrationCode: 'EB-2026-1043',
    courseId: 'course-pizza',
    courseTitle: 'Pizzaiolo',
    fullName: 'Yacine Djelloul',
    phone: '0770 45 88 12',
    email: 'yacine.pizza@outlook.com',
    dateOfBirth: '2001-09-22',
    preferredSchedule: 'Session Soirée (17h00 - 20h00)',
    message: 'Projet de pizzeria artisanale à Mostaganem.',
    status: 'contacted',
    createdAt: '2026-11-11T08:15:00Z',
  },
  {
    id: 'reg-3',
    registrationCode: 'EB-2026-1044',
    courseId: 'course-coiffure-homme',
    courseTitle: 'Coiffure homme',
    fullName: 'Walid Belhadj',
    phone: '0661 89 23 45',
    preferredSchedule: 'Session Weekend',
    status: 'pending',
    createdAt: '2026-11-11T09:00:00Z',
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderCode: 'CMD-2026-8801',
    items: [
      {
        productId: 'prod-entremet-chocolat',
        name: 'Entremet Signature Chocolat Noir',
        quantity: 1,
        unitPrice: 3800,
        image: '/src/assets/images/pastry_luxury_entremet_1794418831448.jpg',
      },
      {
        productId: 'prod-croissant-beurre',
        name: 'Boîte de 6 Croissants Pur Beurre',
        quantity: 1,
        unitPrice: 720,
        image: '/src/assets/images/pastry_luxury_entremet_1794418831448.jpg',
      },
    ],
    subtotal: 4520,
    deliveryFee: 400,
    total: 4920,
    customerName: 'Samir Bouzid',
    customerPhone: '0555 33 22 11',
    deliveryType: 'delivery',
    address: 'Résidence El Bahia, Bâtiment C N° 14',
    wilaya: 'Mostaganem',
    commune: 'Mostaganem Centre',
    notes: 'Sonner à l’interphone Bouzid svp.',
    paymentMethod: 'cod',
    status: 'preparing',
    createdAt: '2026-11-11T08:45:00Z',
  },
  {
    id: 'ord-102',
    orderCode: 'CMD-2026-8802',
    items: [
      {
        productId: 'prod-pizza-burrata',
        name: 'Pizza Napolitaine Truffe & Burrata',
        quantity: 2,
        unitPrice: 1850,
        image: '/src/assets/images/pizza_artisanale_woodfire_1794418833765.jpg',
      },
    ],
    subtotal: 3700,
    deliveryFee: 0,
    total: 3700,
    customerName: 'Leila Kaddour',
    customerPhone: '0772 90 11 44',
    deliveryType: 'pickup',
    wilaya: 'Mostaganem',
    commune: 'Salamandre',
    notes: 'Retrait prévu vers 12h30.',
    paymentMethod: 'pickup_cash',
    status: 'preparing',
    createdAt: '2026-11-11T09:10:00Z',
  },
];

export const INITIAL_APPOINTMENTS: AppointmentBooking[] = [
  {
    id: 'app-201',
    bookingCode: 'RDV-2026-4401',
    serviceId: 'serv-fade-beard',
    serviceTitle: 'Formule Master Barber : Coupe Fade & Soin Barbe Complet',
    customerName: 'Nadir Cherif',
    customerPhone: '0560 77 88 99',
    date: '2026-11-12',
    timeSlot: '11:00',
    notes: 'Dégradé mi-bas s’il vous plaît.',
    status: 'confirmed',
    createdAt: '2026-11-10T16:00:00Z',
  },
  {
    id: 'app-202',
    bookingCode: 'RDV-2026-4402',
    serviceId: 'serv-femme-brushing',
    serviceTitle: 'Brushing Glamour & Soin Kératine Express',
    customerName: 'Nassima Rahal',
    customerPhone: '0665 12 87 34',
    date: '2026-11-12',
    timeSlot: '14:30',
    status: 'pending',
    createdAt: '2026-11-11T08:30:00Z',
  },
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: {
      fr: 'Entremet Miroir aux Trois Chocolats',
      ar: 'كعكة الشوكولاتة الثلاثية بالطلاء المرآتي',
      en: 'Triple Chocolate Mirror Glazed Entremet',
    },
    category: 'pastry',
    image: '/src/assets/images/pastry_luxury_entremet_1794418831448.jpg',
    studentName: 'Atelier Promotion Pâtisserie 2026',
  },
  {
    id: 'gal-2',
    title: {
      fr: 'Pizza Napolitaine Alvéolée au Feu de Bois',
      ar: 'بيتزا نابوليتانية منتفخة الحواف مطهوة على الحطب',
      en: 'Wood-Fired Neapolitan Pizza with Blistered Crust',
    },
    category: 'pizza',
    image: '/src/assets/images/pizza_artisanale_woodfire_1794418833765.jpg',
    studentName: 'Atelier Pizzaiolo Masterclass',
  },
  {
    id: 'gal-3',
    title: {
      fr: 'Dégradé Américain et Finition Barbe au Rasoir',
      ar: 'تدرج شعر عصري وتحديد اللحية بالموس',
      en: 'Precision Fade & Sharp Razor Lineup',
    },
    category: 'hair',
    image: '/src/assets/images/barber_coiffure_master_1794418834548.jpg',
    studentName: 'Session Barbering & Men Styling',
  },
  {
    id: 'gal-4',
    title: {
      fr: 'Dressage Haute Gastronomie & Tournedos Rossini',
      ar: 'تنسيق طبق راقي في ورشة الطبخ الفندقي',
      en: 'Gourmet Beef Medallion Plate Staging',
    },
    category: 'culinary',
    image: '/src/assets/images/hero_chef_kitchen_1794418831073.jpg',
    studentName: 'Atelier Cuisine d’Excellence',
  },
  {
    id: 'gal-5',
    title: {
      fr: 'Laboratoire Informatique & Formation Tableur Avancé',
      ar: 'قاعة الإعلام الآلي وورشة التسيير الرقمي',
      en: 'IT Lab & Advanced Digital Spreadsheet Workshop',
    },
    category: 'it',
    image: '/src/assets/images/informatique_lab_modern_1794418834066.jpg',
    studentName: 'Session Informatique Professionnelle',
  },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Khaled Benyahia',
    course: {
      fr: 'Diplômé Pâtisserie & Viennoiserie (Promotion 2025)',
      ar: 'خريج تخصص الحلويات والمخبوزات (دفعة 2025)',
      en: 'Pastry & Viennoiserie Graduate (Class of 2025)',
    },
    comment: {
      fr: "Grâce à l'École Chef Benzaza, j'ai acquis la rigueur et la précision de la haute pâtisserie. Aujourd'hui, je suis fier d'avoir ouvert ma propre boutique artisanale à Mostaganem. Les formateurs ne gardent aucun secret pour eux.",
      ar: 'بفضل مدرسة الشيف بن زازة، تعلمت أسرار الحلويات الراقية والدقة المتناهية. اليوم افتتحت مشروعي الخاص بمستغانم وحققت حلمي. الأساتذة يقدمون كل خبرتهم بصدق وإخلاص.',
      en: 'Thanks to Chef Benzaza Academy, I acquired the precision and rigor of fine pastry. Today, I proudly opened my own artisanal bakery boutique in Mostaganem.',
    },
    rating: 5,
    year: '2025',
  },
  {
    id: 'test-2',
    name: 'Mohamed Reda Mebarki',
    course: {
      fr: 'Diplômé Pizza Napolitaine (Promotion 2026)',
      ar: 'خريج تخصص البيتزا النابوليتانية (دفعة 2026)',
      en: 'Neapolitan Pizza Graduate (Class of 2026)',
    },
    comment: {
      fr: "La formation au feu de bois et la maîtrise de la biga ont complètement transformé ma vision. En seulement un mois, j'ai appris des techniques que des années d'essais ne m'auraient jamais apportées.",
      ar: 'التكوين على الأفران الحجرية والتخمير البطيء غير نظرتي تماماً للمهنة. في شهر واحد تعلمت تقنيات احترافية لا تُقدر بثمن.',
      en: 'Training with live wood-fire ovens and mastering preferments completely transformed my craft. In just one month, I gained professional skills that would take years to master alone.',
    },
    rating: 5,
    year: '2026',
  },
  {
    id: 'test-3',
    name: 'Fouad Senhadji',
    course: {
      fr: 'Diplômé Coiffure Homme & Barbier',
      ar: 'خريج تخصص الحلاقة الرجالية والباربر',
      en: 'Men’s Grooming & Master Barber Graduate',
    },
    comment: {
      fr: "Le salon d'application est magnifique, on travaille sur de vrais modèles avec des tondeuses de haute gamme. J'ai été embauché dès la fin de ma session dans un salon réputé à Akid Lotfi.",
      ar: 'صالون التطبيق مجهز بأحدث ماكينات الحلاقة ونعمل على زبائن حقيقيين تحت إشراف الأستاذ. تم توظيفي مباشرة بعد التخرج في صالون معروف بعكيد لطفي.',
      en: 'The practical salon is gorgeous; we trained on live models using premium clippers. I was hired immediately upon graduation at a renowned salon in Akid Lotfi.',
    },
    rating: 5,
    year: '2026',
  },
];

export const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    fullName: 'Mourad Belkheir',
    phone: '0551 22 33 44',
    email: 'mourad.b@yahoo.fr',
    subject: 'Renseignement session cours du soir cuisine',
    message: 'Bonjour, proposez-vous des sessions de cuisine gastronomique en soirée après 18h pour les personnes en activité ? Merci d’avance.',
    status: 'read',
    createdAt: '2026-11-10T11:20:00Z',
  },
  {
    id: 'msg-2',
    fullName: 'Fatima Zohra',
    phone: '0778 44 55 66',
    email: 'fz.mostaganem@gmail.com',
    subject: 'Inscription formation coiffure femme',
    message: 'Salam alaykom, je souhaite connaître la date de rentrée pour la prochaine session de coiffure et visagisme femme. Cordialement.',
    status: 'unread',
    createdAt: '2026-11-11T09:05:00Z',
  },
];

export const INITIAL_SETTINGS: SiteSettings = {
  schoolName: 'ÉCOLE CHEF BENZAZA',
  slogan: {
    fr: "L'excellence par la formation.",
    ar: 'التميز من خلال التكوين.',
    en: 'Excellence through training.',
  },
  address: 'Boulevard Akid Lotfi (Face au centre médical)',
  city: 'Mostaganem',
  country: 'Algérie',
  phone: '+213 41 82 34 50',
  phoneSecondary: '+213 550 78 92 10',
  whatsapp: '+213550789210',
  email: 'contact@chefbenzaza.dz',
  openingHours: {
    fr: 'Samedi au Jeudi : 08h30 - 18h00 | Vendredi : Fermé',
    ar: 'السبت إلى الخميس: 08:30 - 18:00 | الجمعة: عطلة',
    en: 'Saturday to Thursday: 08:30 - 18:00 | Friday: Closed',
  },
  standardDeliveryFee: 400,
  freeDeliveryThreshold: 5000,
  mapLat: 35.9311,
  mapLng: 0.0892,
};
