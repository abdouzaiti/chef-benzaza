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
    id: 'course-patisserie',
    slug: 'patisserie-fine',
    category: 'pastry',
    title: {
      fr: 'Pâtisserie Fine & Viennoiserie Artisanale',
      ar: 'صناعة الحلويات الراقية والمخبوزات الفرنسية',
      en: 'Fine Pastry & Artisan Viennoiserie',
    },
    shortDesc: {
      fr: 'Maîtrisez les entremets modernes, le travail du chocolat, les pâtes levées feuilletées et le glaçage miroir.',
      ar: 'إتقان صناعة الكعك العصري، فنون الشوكولاتة، العجائن المورقة والطلاء اللامع.',
      en: 'Master modern entremets, chocolate artistry, laminated viennoiserie, and mirror glazes.',
    },
    fullDesc: {
      fr: "Cette formation intensive d'excellence vous plonge au cœur de la haute pâtisserie internationale. Dispensée dans notre laboratoire climatisé à Oran, vous apprendrez les techniques rigoureuses de pesée, de cristallisation du chocolat, d'élaboration de mousses aériennes, d'inserts fruités et de tartes signatures.",
      ar: 'دورة تدريبية مكثفة وعالية المستوى في صناعة أرقى الحلويات العالمية داخل مخبرنا المجهز بوهران. تعلم تقنيات الشوكولاتة، الموس، الحشوات، والمخبوزات المورقة بمعايير احترافية.',
      en: 'An intensive premier vocational program immersing you in haute pâtisserie. Taught in our climate-controlled lab in Oran, learn precision chocolate tempering, fruit inserts, airy mousses, and signature tarts.',
    },
    image: '/src/assets/images/pastry_luxury_entremet_1794418831448.jpg',
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
        'Maîtriser les bases fondamentales des pâtes (sablée, brisée, feuilletée inversée)',
        'Techniques avancées du tempérage et montages artistiques en chocolat',
        'Création d’entremets contemporains avec inserts gélifiés et croustillants',
        'Gestion de la chaîne du froid, hygiène HACCP et calcul des coûts de revient',
      ],
      ar: [
        'التمكن من العجائن الأساسية والمورقة الكلاسيكية والعصرية',
        'تقنيات تذويب وتشكيل الشوكولاتة والزخرفة الدقيقة',
        'ابتكار قوالب الكعك العصرية وتنسيق النكهات والقوام',
        'معايير النظافة والسلامة الصحية وحساب تكاليف الإنتاج والتسعير',
      ],
      en: [
        'Master base doughs, inverse puff pastry, and sweet pastes',
        'Advanced chocolate tempering and decorative modeling',
        'Contemporary layered entremets with crunchy and jelly inserts',
        'Food safety, HACCP workflow, and ingredient cost engineering',
      ],
    },
    modules: [
      {
        title: {
          fr: 'Module 1 : Pâtes de base et Biscuits',
          ar: 'المحور 1: العجائن الأساسية والبسكويت',
          en: 'Module 1: Base Pastries and Sponges',
        },
        content: {
          fr: 'Pâtes sablées, sucrées, génoises légères, dacquoises et joconde.',
          ar: 'عجائن الصابلي، الجنواز الخفيفة، الداكواز وبسكويت الجوكند.',
          en: 'Sablé, shortcrust, airy genoise, dacquoise, and joconde sponges.',
        },
      },
      {
        title: {
          fr: 'Module 2 : Crèmes, Mousses et Textures',
          ar: 'المحور 2: الكريمات، الموس والقوام',
          en: 'Module 2: Creams, Mousses and Textures',
        },
        content: {
          fr: 'Ganaches montées, crèmes diplomates, mousses bavaroises et pralinés maison.',
          ar: 'الجناش المخفوق، كريم ديبلومات، بافارواز والبراليني المصنوع يدوياً.',
          en: 'Whipped ganache, diplomat cream, Bavarian mousse, and artisan praline.',
        },
      },
      {
        title: {
          fr: 'Module 3 : Viennoiserie et Feuilletage',
          ar: 'المحور 3: المخبوزات والتوريق الفرنسي',
          en: 'Module 3: Viennoiserie and Lamination',
        },
        content: {
          fr: 'Croissants alvéolés, pains au chocolat, brioches feuilletées au beurre doux.',
          ar: 'الكرواسون الفرنسي، البان أو شوكولا، والبريوش المورق بالزبدة.',
          en: 'Airy croissants, pains au chocolat, and laminated butter brioches.',
        },
      },
      {
        title: {
          fr: 'Module 4 : Finitions, Glaçages et Décor',
          ar: 'المحور 4: التزيين، الطلاء اللامع واللمسات الأخيرة',
          en: 'Module 4: Mirror Glazes, Velvet Spray and Presentation',
        },
        content: {
          fr: 'Glaçage miroir brillant, effet velours au pistolet et décors sculptés.',
          ar: 'الطلاء اللامع المرآتي، رش الشوكولاتة المخملي والزينة الفاخرة.',
          en: 'Mirror gloss glaze, spray velvet chocolate finish, and sculptural decor.',
        },
      },
    ],
    instructor: {
      name: 'Chef Mohamed Benzaza',
      role: {
        fr: 'Chef Pâtissier Exécutif & Maître Formateur',
        ar: 'شيف تنفيذي في صناعة الحلويات ومدرب رئيسي',
        en: 'Executive Pastry Chef & Master Trainer',
      },
      experience: {
        fr: '18 ans d’expérience en hôtellerie de luxe et compétitions culinaires',
        ar: '18 سنة خبرة في الفنادق الفاخرة والمسابقات الدولية',
        en: '18 years leading luxury pastry brigades and culinary contests',
      },
    },
    featured: true,
  },
  {
    id: 'course-pizza',
    slug: 'pizza-artisanale',
    category: 'pizza',
    title: {
      fr: 'Pizza Napolitaine & Pizzeria Professionnelle',
      ar: 'البيتزا النابوليتانية الإيطالية وتسيير المطاعم',
      en: 'Neapolitan Artisan Pizza & Pizzeria Operations',
    },
    shortDesc: {
      fr: 'Apprenez la maturation lente des pâtes (48-72h), le façonnage à la main et la cuisson au four à bois.',
      ar: 'تعلم التخمير البطيء للعجينة (48-72 ساعة)، التشكيل اليدوي والخبز في أفران الحطب.',
      en: 'Learn slow fermentation (48-72h), manual dough slapping, and high-temp stone oven baking.',
    },
    fullDesc: {
      fr: 'Devenez un véritable pizzaiolo capable de lancer ou de gérer une pizzeria à succès. Cette formation aborde l’hydratation précise des farines, le choix des levains naturels (Biga, Poolish), la sauce tomate San Marzano et l’enfournement à 450°C.',
      ar: 'تكوين شامل يؤهلك لتصبح صانع بيتزا محترف أو إطلاق مشروعك الخاص. نغطي نسبة الرطوبة، التخمير بالبيغا والبوليش، اختيار الأجبان والصلصات، وتقنيات الخبز السريع بدرجة 450 مئوية.',
      en: 'Become a certified pizzaiolo capable of running a bustling artisanal pizzeria. Covers flour hydration, pre-ferments (Biga, Poolish), San Marzano sauce blending, and blistered crust baking.',
    },
    image: '/src/assets/images/pizza_artisanale_woodfire_1794418833765.jpg',
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
        'Comprendre la biochimie des farines (W, élasticité, absorption)',
        'Maîtrise des pré-ferments Biga et Poolish pour une digestion parfaite',
        'Technique du geste traditionnel napolitain "Schiaffo" sans rouleau',
        'Gestion des cuissons en four à bois et four électrique à sole',
      ],
      ar: [
        'فهم خصائص الدقيق وقوة التمدد ونسب امتصاص الماء',
        'إعداد خلطات التخمير المسبق لضمان سهولة هضم العجينة وقرمشتها',
        'إتقان حركة التشكيل اليدوي الإيطالي الأصيل دون استعمال الشوبك',
        'التحكم في درجات حرارة الأفران الحجرية والخشبية',
      ],
      en: [
        'Understand flour rheology and protein strength index',
        'Biga and Poolish preferment preparation for maximum digestibility',
        'Authentic Neapolitan manual stretching technique ("Schiaffo")',
        'Wood-fired and refractory deck oven thermal management',
      ],
    },
    modules: [
      {
        title: {
          fr: 'Module 1 : Farines et Fermentation',
          ar: 'المحور 1: أنواع الدقيق والتخمير العلمي',
          en: 'Module 1: Flours and Fermentation',
        },
        content: {
          fr: 'Hydratation de 65% à 80%, températures de pâte et pointage.',
          ar: 'نسب الترطيب من 65% إلى 80%، درجات الحرارة وأوقات الراحة.',
          en: 'Hydration profiles from 65% to 80%, temperature control, bulk rest.',
        },
      },
      {
        title: {
          fr: 'Module 2 : Façonnage et Sauces',
          ar: 'المحور 2: التشكيل، الصلصات والمكونات',
          en: 'Module 2: Shaping, Sauces and Toppings',
        },
        content: {
          fr: 'Étalage manuel sans écraser les alvéoles de la corniche.',
          ar: 'الفتح اليدوي والمحافظة على حواف البيتزا المنتفخة الهوائية.',
          en: 'Gentle stretching to preserve airy outer crust bubbles.',
        },
      },
      {
        title: {
          fr: 'Module 3 : Cuisson à Haute Température',
          ar: 'المحور 3: الخبز في درجات الحرارة العالية',
          en: 'Module 3: High Heat Stone Deck Baking',
        },
        content: {
          fr: 'Gestion de la flamme, rotation de la pizza et temps de cuisson de 90 secondes.',
          ar: 'تعديل اللهب، تدوير البيتزا والخبز السريع في 90 ثانية.',
          en: 'Flame control, peel turning, and 90-second cooking cycle.',
        },
      },
    ],
    instructor: {
      name: 'Chef Karim Belkacem',
      role: {
        fr: 'Maître Pizzaiolo Certifié',
        ar: 'أستاذ خبير في صناعة البيتزا الإيطالية',
        en: 'Certified Master Pizzaiolo',
      },
      experience: {
        fr: '12 ans d’expérience en Italie et Algérie, formateur de plus de 300 pizzaiolos',
        ar: '12 سنة خبرة في إيطاليا والجزائر، درب أكثر من 300 صاحب مشروع',
        en: '12 years in Italy & Algeria, trained over 300 culinary entrepreneurs',
      },
    },
    featured: true,
  },
  {
    id: 'course-cuisine',
    slug: 'cuisine-gastronomique',
    category: 'culinary',
    title: {
      fr: 'Cuisine Gastronomique & Gestion de Brigade',
      ar: 'فنون الطهي الراقي وإدارة المطابخ الفندقية',
      en: 'Gastronomic Culinary Arts & Kitchen Brigade Management',
    },
    shortDesc: {
      fr: 'Taillage des légumes, cuissons sous-vide, fonds & sauces réduites, dressage à l’assiette moderne.',
      ar: 'تقطيع الخضار الاحترافي، الطهي البطيء، الصلصات المركزة وتنسيق الأطباق العصرية.',
      en: 'Precision knife cuts, sous-vide cookery, classical stocks, and modern plate staging.',
    },
    fullDesc: {
      fr: 'Une formation complète pour futurs chefs de partie et traiteurs. Plongez dans les secrets des jus corsés, de la cuisson basse température, des poissons nobles et de la valorisation du terroir méditerranéen et algérien.',
      ar: 'تكوين متكامل للمتربصين الراغبين في قيادة المطابخ أو إطلاق خدمات الإطعام. تعلم إعداد المرق المركز، طهي اللحوم والأسماك الفاخرة، والدمج الذكي بين الوصفات الجزائرية الأصيلة والتقنيات العالمية.',
      en: 'Comprehensive culinary education for future executive chefs and caterers. Master rich reductions, vacuum cooking, premium seafood handling, and elevated Mediterranean gastronomic plating.',
    },
    image: '/src/assets/images/hero_chef_kitchen_1794418831073.jpg',
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
        'Maîtrise des tailles de précision (brunoise, julienne, mirepoix)',
        'Élaboration des 5 sauces mères et déclinaisons contemporaines',
        'Techniques de cuisson (rôtissage, pochage, braisage, sous-vide)',
        'Organisation d’un coup de feu et dressage esthétique des assiettes',
      ],
      ar: [
        'التحكم في تقنيات التقطيع السريع والدقيق للخضار واللحوم',
        'تحضير الصلصات الكلاسيكية وتطوير نكهات مبتكرة',
        'طرق الطهي المتنوعة: الشواء، السلق الهادئ، والطهي بالحرارة المنخفضة',
        'إدارة ضغط العمل في أوقات الذروة وتنسيق الأطباق الجذابة',
      ],
      en: [
        'Master classical knife cuts with speed and precision',
        'Prepare mother sauces and contemporary emulsion reductions',
        'Diverse thermal cooking (roasting, braising, sous-vide precision)',
        'Rush-hour kitchen brigade communication and plate composition',
      ],
    },
    modules: [
      {
        title: {
          fr: 'Module 1 : Bases culinaires et Découpes',
          ar: 'المحور 1: القواعد الأساسية وتقنيات السكين',
          en: 'Module 1: Culinary Foundations & Knife Skills',
        },
        content: {
          fr: 'Sécurité en cuisine, entretien des lames, taillages réglementaires.',
          ar: 'السلامة واستخدام السكاكين الاحترافية والتقطيع القياسي.',
          en: 'Sharpening, knife control, and standardized geometric cuts.',
        },
      },
      {
        title: {
          fr: 'Module 2 : Fonds, Jus et Sauces',
          ar: 'المحور 2: المرق، العصائر والصلصات',
          en: 'Module 2: Stocks, Glaces and Sauces',
        },
        content: {
          fr: 'Fonds brun de veau, fumet de poisson, veloutés et émulsions stables.',
          ar: 'مرق العجل البني، مرق السمك المركز، والصلصات المستحلبة.',
          en: 'Veal demi-glace, fish fumet, reductions, and warm emulsions.',
        },
      },
      {
        title: {
          fr: 'Module 3 : Viandes, Volailles et Produits de la Mer',
          ar: 'المحور 3: اللحوم، الدواجن وثمار البحر',
          en: 'Module 3: Meats, Poultry and Seafood',
        },
        content: {
          fr: 'Désossage, bardage, cuisson des filets et cuissons sous-vide.',
          ar: 'تقطيع وتجهيز اللحوم، طهي الأسماك والطهي في أكياس التفريغ.',
          en: 'Butchery, fish filleting, and precise temperature cookery.',
        },
      },
    ],
    instructor: {
      name: 'Chef Yacine Mansouri',
      role: {
        fr: 'Chef Cuisinier & Ancien Chef de Brigade Hôtelière',
        ar: 'شيف مطبخ ورئيس طهاة فنادق 5 نجوم سابقاً',
        en: 'Head Chef & Former 5-Star Hotel Brigade Leader',
      },
      experience: {
        fr: '15 ans dans les grandes maisons en Algérie et en France',
        ar: '15 سنة في أعرق المطاعم والفنادق الكبرى',
        en: '15 years across renowned gastronomic restaurants',
      },
    },
    featured: true,
  },
  {
    id: 'course-barber',
    slug: 'coiffure-homme-barbier',
    category: 'barber',
    title: {
      fr: 'Coiffure Homme & Art du Barbier Traditionnel',
      ar: 'الحلاقة الرجالية وفنون تصفيف اللحية التقليدية',
      en: 'Men’s Grooming & Traditional Master Barbering',
    },
    shortDesc: {
      fr: 'Dégradés américains (Fade), rasage traditionnel au coupe-choux, soins de barbe à la serviette chaude.',
      ar: 'قصات التدرج الأمريكية (Fade)، الحلاقة بالموس الكلاسيكي، والعناية باللحية بالمنشفة الساخنة.',
      en: 'American skin fades, straight razor hot towel shaves, and modern beard contour sculpting.',
    },
    fullDesc: {
      fr: 'Le métier de barbier connaît une renaissance spectaculaire. Dans notre salon d’application moderne, formez-vous aux dégradés à blanc ultra-précis, à l’utilisation du coupe-choux, au traçage de la barbe au millimètre et aux protocoles de soins du visage masculin.',
      ar: 'دورة تطبيقية شاملة في صالون المدرسة الحديث لتعلم أدق تقنيات الحلاقة الرجالية. تعلم التدرج السلس للقصات، التحديد الدقيق بالموس، العناية بالبشرة واللحية بالبخار والمناشف المعطرة.',
      en: 'Experience the renaissance of master barbering. Learn seamless skin fades, straight razor ergonomics, beard linework, and premium hot towel facial rejuvenation rituals.',
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
        'Maîtrise complète de la tondeuse : Low fade, Mid fade, High fade, Taper',
        'Maniement sécurisé et fluide du rasoir droit (coupe-choux)',
        'Morpho-visagisme et conseils personnalisés pour la clientèle',
        'Hygiène, stérilisation des outils et gestion d’un salon barbier',
      ],
      ar: [
        'التحكم الاحترافي بآلات الحلاقة وقصات التدرج بمختلف مستوياتها',
        'الاستعمال الآمن والمتقن للموس المستقيم الكلاسيكي',
        'دراسة ملامح الوجه واختيار القصة المناسبة لكل زبون',
        'التعقيم الصارم للأدوات وتسيير صالون الحلاقة بنجاح',
      ],
      en: [
        'Complete clipper control: low, mid, high taper and skin fades',
        'Safe, fluid straight-razor glide on curves and necklines',
        'Face morphology analysis and client styling consultation',
        'Tool sanitation, Barbicide protocols, and barber shop economics',
      ],
    },
    modules: [
      {
        title: {
          fr: 'Module 1 : Prise en main et Dégradés',
          ar: 'المحور 1: استخدام الماكينات وتدرجات الشعر',
          en: 'Module 1: Machine Control & Fades',
        },
        content: {
          fr: 'Réglage des sabots, élimination des démarcations (blending) et finitions.',
          ar: 'ضبط درجات الأمشاط، محو خطوط التدرج واللمسات الأخيرة.',
          en: 'Guard lever adjustments, line blending, and clean edges.',
        },
      },
      {
        title: {
          fr: 'Module 2 : Rasage Traditionnel et Barbe',
          ar: 'المحور 2: الحلاقة الكلاسيكية والعناية باللحية',
          en: 'Module 2: Traditional Shave & Beard Craft',
        },
        content: {
          fr: 'Préparation de la peau, blaireau, serviettes chaudes et huiles essentielles.',
          ar: 'تهيئة البشرة، رغوة الصابون بالفرشاة، المناشف الدافئة والزيوت الطبيعية.',
          en: 'Skin prep, badger lathering, steam towel relaxation, and beard oils.',
        },
      },
    ],
    instructor: {
      name: 'Maître Adel Benmoussa',
      role: {
        fr: 'Maître Barbier & Spécialiste Fade International',
        ar: 'أستاذ حلاق متخصص في القصات العصرية والتدرج',
        en: 'Master Barber & Fade Specialist',
      },
      experience: {
        fr: '14 ans dans les salons de prestige à Oran et Alger',
        ar: '14 سنة في أرقى صالونات الحلاقة بوهران والجزائر',
        en: '14 years across top grooming salons in Oran and Algiers',
      },
    },
    featured: true,
  },
  {
    id: 'course-hairdressing',
    slug: 'coiffure-femme-visagisme',
    category: 'hairdressing',
    title: {
      fr: 'Coiffure Femme, Colorimétrie & Visagisme',
      ar: 'الحلاقة النسائية، علم الألوان وتصفيف الشعر الراقي',
      en: 'Women’s Hairstyling, Colorimetry & Visagism',
    },
    shortDesc: {
      fr: 'Balayages lumineux, brushings sculptés, coupes tendances et chignons de mariée.',
      ar: 'تقنيات البالاج العصري، السيشوار المتدرج، قصات الموضة وتسريحات العرائس.',
      en: 'Luminous balayage, bouncy blowouts, precision scissor cuts, and bridal up-dos.',
    },
    fullDesc: {
      fr: 'Une formation complète dédiée aux arts de la coiffure féminine. Apprenez le cercle chromatique pour réussir les décolorations sans abîmer la fibre, les techniques de mèches au pinceau, les brushings lisses ou ondulés et les attaches sophistiquées.',
      ar: 'تكوين احترافي متقدم للمرأة العصرية الراغبة في فتح صالونها الخاص. نركز على الصبغات، سحب اللون الآمن، تركيب الخصلات المضيئة، القصات المتنوعة وتسريحات السهرات والمناسبات.',
      en: 'A high-level training program in women’s hair styling and salon artistry. Master color theory, gentle lifting, freehand balayage, contour blowouts, and intricate bridal chignons.',
    },
    image: '/src/assets/images/barber_coiffure_master_1794418834548.jpg',
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
        'Maîtrise de la colorimétrie et neutralisation des reflets indésirables',
        'Techniques de balayage californien, ombré hair et mèches papillotées',
        'Coupes géométriques aux ciseaux droits et ciseaux sculpteurs',
        'Coiffures événementielles et chignons de mariage contemporains',
      ],
      ar: [
        'التمكن من دائرة الألوان وسحب اللون بطريقة صحية دون إتلاف الشعر',
        'تقنيات البالاج، الأومبري، والهايلايت العصري',
        'قص الشعر بمختلف الزوايا الهندسية واستخدام مقصات التفريغ',
        'إنجاز تسريحات الخطوبة والأعراس الراقية والمبتكرة',
      ],
      en: [
        'Color wheel mastery and undertone neutralization',
        'Balayage, ombré transitions, and foil highlights',
        'Geometric haircutting angles and texturizing shears',
        'Sophisticated bridal chignons and gala up-dos',
      ],
    },
    modules: [
      {
        title: {
          fr: 'Module 1 : Colorimétrie et Décoloration',
          ar: 'المحور 1: دراسة الألوان وسحب اللون',
          en: 'Module 1: Color Theory & Bleaching',
        },
        content: {
          fr: 'Diagnostic capillaire, volumes d’oxydant et patines correctrices.',
          ar: 'تشخيص نوعية الشعر، درجات ماء الأكسجين والمصححات اللونية.',
          en: 'Hair diagnosis, developer volumes, and toning glosses.',
        },
      },
      {
        title: {
          fr: 'Module 2 : Coupes et Coiffages',
          ar: 'المحور 2: القص والتسريح',
          en: 'Module 2: Cutting & Blowouts',
        },
        content: {
          fr: 'Carrés plongeants, dégradés effilés et brushings hollywoodiens.',
          ar: 'قصة الكاري، التدرج الخفيف والسيشوار باللفافات الكبيرة.',
          en: 'Bobs, long textured layers, and voluminous Hollywood waves.',
        },
      },
    ],
    instructor: {
      name: 'Mme Amel Zerrouki',
      role: {
        fr: 'Formatrice Experte Haute Coiffure',
        ar: 'أستاذة خبيرة في التصفيف والتجميل النسائي',
        en: 'Haute Coiffure Master Stylist',
      },
      experience: {
        fr: '16 ans d’expertise en Algérie et salons internationaux',
        ar: '16 سنة من التجربة في كبرى صالونات التجميل',
        en: '16 years leading high-end bridal beauty academies',
      },
    },
    featured: false,
  },
  {
    id: 'course-informatique',
    slug: 'informatique-bureautique',
    category: 'it',
    title: {
      fr: 'Informatique Appliquée & Bureautique de Gestion',
      ar: 'الإعلام الآلي التطبيقي وبرمجيات التسيير المكتبي',
      en: 'Applied Information Technology & Office Management',
    },
    shortDesc: {
      fr: 'Pack Office professionnel (Excel avancé, Word), gestion commerciale, création graphique et cybersécurité de base.',
      ar: 'حزمة أوفيس المهنية (إكسل متقدم، وورد)، برمجيات إدارة المبيعات، التصميم الرقمي والأمن المعلوماتي.',
      en: 'Professional Office Suite (Advanced Excel, Word), inventory tracking, digital design, and cybersecurity fundamentals.',
    },
    fullDesc: {
      fr: 'Conçue pour les futurs secrétaires, gestionnaires d’établissements, restaurateurs et commerçants. Apprenez à gérer vos stocks sur tableur, créer des factures et bons de commande, concevoir des visuels promotionnels et sécuriser les données de votre entreprise.',
      ar: 'دورة مثالية لأصحاب المشاريع، مدراء المطاعم، والموظفين الإداريين. تعلم تسيير المخزون وإعداد الفواتير عبر إكسل، تصميم الإعلانات الرقمية، واستخدام الحواسيب بكفاءة عالية في بيئة العمل.',
      en: 'Tailored for hospitality managers, office administrators, and business owners. Learn advanced Excel automated bookkeeping, digital invoicing, promotional flyer creation, and business workstation ergonomics.',
    },
    image: '/src/assets/images/informatique_lab_modern_1794418834066.jpg',
    priceDZD: 24000,
    duration: {
      fr: '2 Mois (70 Heures en salle PC)',
      ar: 'شهران (70 ساعة في قاعة الحاسوب)',
      en: '2 Months (70 Lab Hours)',
    },
    schedules: {
      fr: ['Matinée (09h00 - 12h00)', 'Après-midi (14h00 - 17h00)', 'Session Weekend'],
      ar: ['الفترة الصباحية (09:00 - 12:00)', 'فترة ما بعد الزوال (14:00 - 17:00)', 'فترة نهاية الأسبوع'],
      en: ['Morning (09:00 - 12:00)', 'Afternoon (14:00 - 17:00)', 'Weekend Cohort'],
    },
    objectives: {
      fr: [
        'Maîtrise d’Excel : formules avancées, tableaux croisés dynamiques, gestion de stock',
        'Rédaction administrative impeccable sur Word et mise en page de contrats',
        'Création de supports graphiques (menus, affiches, réseaux sociaux) sur Canva & Photoshop',
        'Bonnes pratiques de sécurité numérique et sauvegarde cloud',
      ],
      ar: [
        'إتقان برنامج إكسل: المعادلات المتقدمة، الجداول المحورية، ومتابعة المخزون',
        'صياغة المراسلات الإدارية والعقود الرسمية على وورد باحترافية',
        'تصميم قوائم الطعام والمنشورات الدعائية لمواقع التواصل الاجتماعي',
        'أساسيات الحماية الرقمية والنسخ الاحتياطي السحابي للملفات',
      ],
      en: [
        'Excel mastery: advanced formulas, pivot tables, and automated stock balances',
        'Professional business documents, formal contracts, and invoices in Word',
        'Visual design for menus and social media flyers with Canva & Photoshop',
        'Data hygiene, ransomware avoidance, and reliable cloud backups',
      ],
    },
    modules: [
      {
        title: {
          fr: 'Module 1 : Tableurs et Gestion Financière',
          ar: 'المحور 1: الجداول الرقمية والتسيير المحاسبي',
          en: 'Module 1: Spreadsheets & Commercial Calculation',
        },
        content: {
          fr: 'Formules SI, RECHERCHEV/XLOOKUP, graphiques de vente et facturation.',
          ar: 'دوال البحث، الحساب التلقائي، الرسوم البيانية وفواتير الزبائن.',
          en: 'Conditional formulas, VLOOKUP/XLOOKUP, and sales summary dashboards.',
        },
      },
      {
        title: {
          fr: 'Module 2 : Communication Digitale et Outils Web',
          ar: 'المحور 2: التواصل الرقمي وأدوات الويب',
          en: 'Module 2: Digital Marketing & Online Presence',
        },
        content: {
          fr: 'Création de cartes de visite, affiches d’offres et gestion des courriels pro.',
          ar: 'تصميم بطاقات العمل، إعلانات العروض، وإدارة البريد المهني.',
          en: 'Branded business collateral, promotion cards, and email workflows.',
        },
      },
    ],
    instructor: {
      name: 'Ing. Sofiane Hadjadj',
      role: {
        fr: 'Ingénieur en Systèmes d’Information & Formateur Bureautique',
        ar: 'مهندس في أنظمة المعلومات ومدرب برمجيات مكتبية',
        en: 'Information Systems Engineer & IT Trainer',
      },
      experience: {
        fr: '10 ans en formation professionnelle et digitalisation des PME',
        ar: '10 سنوات في التكوين المهني ورقمنة المؤسسات',
        en: '10 years in enterprise digital literacy and SME training',
      },
    },
    featured: false,
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
    courseTitle: 'Pâtisserie Fine & Viennoiserie Artisanale',
    fullName: 'Amine Benali',
    phone: '0552 14 38 90',
    email: 'amine.benali@gmail.com',
    dateOfBirth: '1998-05-14',
    preferredSchedule: 'Matinée (09h00 - 13h00)',
    message: 'Je souhaite ouvrir un salon de thé et pâtisserie à Oran.',
    status: 'confirmed',
    createdAt: '2026-11-10T14:30:00Z',
  },
  {
    id: 'reg-2',
    registrationCode: 'EB-2026-1043',
    courseId: 'course-pizza',
    courseTitle: 'Pizza Napolitaine & Pizzeria Professionnelle',
    fullName: 'Yacine Djelloul',
    phone: '0770 45 88 12',
    email: 'yacine.pizza@outlook.com',
    dateOfBirth: '2001-09-22',
    preferredSchedule: 'Session Soirée (17h00 - 20h00)',
    message: 'Projet de pizzeria artisanale à Bir El Djir.',
    status: 'contacted',
    createdAt: '2026-11-11T08:15:00Z',
  },
  {
    id: 'reg-3',
    registrationCode: 'EB-2026-1044',
    courseId: 'course-barber',
    courseTitle: 'Coiffure Homme & Art du Barbier Traditionnel',
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
    wilaya: 'Oran',
    commune: 'Bir El Djir',
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
    wilaya: 'Oran',
    commune: 'Akid Lotfi',
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
      fr: "Grâce à l'École Chef Benzaza, j'ai acquis la rigueur et la précision de la haute pâtisserie. Aujourd'hui, je suis fier d'avoir ouvert ma propre boutique artisanale à Oran. Les formateurs ne gardent aucun secret pour eux.",
      ar: 'بفضل مدرسة الشيف بن زازة، تعلمت أسرار الحلويات الراقية والدقة المتناهية. اليوم افتتحت مشروعي الخاص بوهران وحققت حلمي. الأساتذة يقدمون كل خبرتهم بصدق وإخلاص.',
      en: 'Thanks to Chef Benzaza Academy, I acquired the precision and rigor of fine pastry. Today, I proudly opened my own artisanal bakery boutique in Oran.',
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
    email: 'fz.oran@gmail.com',
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
  city: 'Oran',
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
  mapLat: 35.7056,
  mapLng: -0.6315,
};
