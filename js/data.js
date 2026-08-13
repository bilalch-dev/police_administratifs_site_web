/* ==========================================================================
   DATA STORE - Centralized Bilingual (Arabic & French) Dictionary
   ========================================================================== */

const policePortalTranslations = {
  ar: {
    // Header & Nav
    siteTitle: "الشرطة الإدارية الجماعية",
    siteSubtitle: "البوابة الرقمية الرسمية",
    navHome: "الرئيسية",
    navLegal: "الإطار القانوني",
    navDomains: "مجالات التدخل",
    navProcedures: "المساطر والترخيصات",
    navComplaints: "بوابة الشكايات",
    navResources: "المكتبة والمعجم",
    navAdmin: "لوحة القيادة",
    fileComplaintBtn: "إيداع شكاية",
    tickerNotice: "📢 إصدار الدليل التوجيهي الجديد للشرطة الإدارية الجماعية وفق آخر التعديلات التشريعية للميثاق الجماعي.",
    tickerBadge: "مستجدات",
    downloadPdf: "تحميل الدليل PDF",
    previewPdf: "معاينة الدليل PDF",
    exploreDomainsBtn: "استكشف مجالات التدخل",

    // Home Page
    homeHeroBadge: "🛡️ البوابة الرقمية التفاعلية الموحدة",
    homeHeroTitle: "دليلك الموثوق لفهم ممارسة <span>الشرطة الإدارية الجماعية</span>",
    homeHeroDesc: "مبادرة رقمية تهدف إلى تمكين المنتخبين، الممارسين، والمواطنين من الإلمام الشامل بالإطار القانوني للشرطة الإدارية الجماعية، مجالات تدخلها في الصحة العامة، السير والجولان، والسكينة العمومية.",
    searchHeader: "البحث السريع في الدليل الجماعي",
    searchBadge: "محدث 2026",
    searchPlaceholder: "ابحث عن مسطرة، رخصة، أو قانون...",
    mostSearched: "الكلمات الأكثر بحثاً:",
    modalStartText: "أدخل كلمة البحث للبدء...",
    modalNoResults: "لم يتم العثور على نتائج تطابق بحثك",

    // Home Stats
    stats: [
      { number: "03", label: "مجالات رئيسية للتدخل", icon: "🏛️" },
      { number: "50+", label: "اختصاص وخدمة تنظيمية", icon: "📋" },
      { number: "100%", label: "إطار قانوني ومشاريع معتمدة", icon: "⚖️" },
      { number: "24/7", label: "مواكبة وتلقي الشكايات", icon: "🛡️" }
    ],

    // Home Domains
    domainsTitle: "مجالات الشرطة الإدارية الجماعية",
    domainsDesc: "ارتكازاً على مقتضيات المواد 40، 49، و50 من الميثاق الجماعي، تتوزع الشرطة الإدارية الجماعية على ثلاثة مجالات حيوية ذات صلة بحياة المواطن اليومية.",
    domainsTag: "ميادين التدخل الأساسية",
    domains: [
      {
        id: "health-hygiene",
        title: "الصحة والنظافة العامة وحماية البيئة",
        subtitle: "المادة 40 و 50 من الميثاق الجماعي",
        icon: "🏥",
        desc: "تشمل مراقبة المحلات التجارية، جودة المواد الغذائية، جمع النفايات المنزلية، محاربة الأوبئة والمستنقعات، وشرطة الجنائز والمقابر.",
        tags: ["سلامة الأغذية", "المحلات العامة", "تدبير النفايات", "شرطة المقابر"]
      },
      {
        id: "traffic-transit",
        title: "شرطة السير والجولان والسلامة الطرقية",
        subtitle: "تنظيم الطرق والمرفق العمومي",
        icon: "🚦",
        desc: "تنظيم محطات الوقوف، التشوير الطرقي، رفع معرقلات السير، رخص احتلال الملك العمومي، ومراقبة حافلات وسيارة الأجرة.",
        tags: ["التشوير الطرقي", "احتلال الملك العمومي", "المحطات الطرقية", "سلامة المرور"]
      },
      {
        id: "rural-police",
        title: "الشرطة القروية وحماية السكينة",
        subtitle: "حماية البيئة والأملاك القروية",
        icon: "🌾",
        desc: "مكافحة داء السعار، تجميع الكلاب الضالة، تفادي شرود البهائم، تنظيم استعمال النار للوقاية من الحرائق، وحماية الأغراس.",
        tags: ["الكلاب الضالة", "داء السعار", "الوقاية من الحرائق", "حماية الأغراس"]
      }
    ],

    // Home Authorities
    authoritiesTag: "الحوكمة والتنظيم",
    authoritiesTitle: "توزيع الاختصاصات والأجهزة الممارسة",
    authoritiesDesc: "لضمان عدم تداخل السلطات، حصر المشرع الاختصاصات بين رئيس المجلس الجماعي، سلطات الإدارة الترابية (الباشوات والقواد)، والمجلس الجماعي ضمن ضوابط قانونية صارمة.",
    authorities: [
      {
        role: "رئيس المجلس الجماعي",
        scope: "السلطة التنفيذية المباشرة للشرطة الإدارية الجماعية",
        icon: "👤",
        duties: [
          "منح رخص البناء، السكن، واحتلال الملك العمومي.",
          "اتخاذ القرارات التنظيمية والفردية في الصحة والنظافة والسير.",
          "التنفيذ التلقائي (Exécution d'office) للقرارات عند الامتناع.",
          "طلب استصدار القوة العمومية لضمان احترام القرارات."
        ]
      },
      {
        role: "رجل السلطة المحلية (الباشا / القايد)",
        scope: "اختصاصات محددة على سبيل الحصر (المادة 49)",
        icon: "⚖️",
        duties: [
          "المحافظة على النظام والأمن العمومي والسكينة العامة.",
          "تأسيس الجمعيات، التجمعات العمومية، الصحافة، والانتخابات.",
          "تنظيم ومراقبة الباعة المتجولين والأسلحة والذخائر.",
          "مراقبة الأثمان وتنظيم الاتجار في المشروبات الكحولية."
        ]
      },
      {
        role: "المجلس الجماعي",
        scope: "التداول والمصادقة على الأنظمة العامة",
        icon: "🏛️",
        duties: [
          "تحديد وتصنيف الأملاك العامة الجماعية وتفويتها.",
          "المصادقة على ضوابط البناء والتهيئة العمرانية.",
          "المصادقة على الأنظمة العامة للنظافة والوقاية الصحية.",
          "إحداث وتنظيم المكاتب الجماعية للوقاية الصحية (BMH)."
        ]
      }
    ],

    // Governance Card
    govTitle: "المبادئ الأساسية لضبط الاختصاص",
    gov1Title: "1. مبدأ عدم التناقض",
    gov1Desc: "احترام القرارات الجماعية للمقتضيات التنظيمية الصادرة على المستوى الوطني.",
    gov2Title: "2. مبدأ عدم التطاول",
    gov2Desc: "منع ممارسة الاختصاصات الحصرية المسندة للسلطات الوطنية والشرطة الإدارية العامة.",
    gov3Title: "3. مبدأ عدم الحلول",
    gov3Desc: "منع السلطات الوطنية من الحلول محل الجماعة إلا بنص قانوني صريح.",

    // Home PDF Banner
    pdfTitle: "حمّل وتصفّح النسخة الكاملة من الدليل الرسمي للشرطة الإدارية",
    pdfDesc: "وثيقة مرجعية شاملة أعدتها المديرية العامة للجماعات الترابية لتمكين المنتخبين والممارسين من الإلمام بكافة ضوابط وميادين الشرطة الإدارية الجماعية (28 صفحة).",
    pdfPageCount: "28 صفحة",
    pdfSubText: "معاينة رقمية تفاعلية",

    // Home Citizen Callout
    citizenTitle: "هل لاحظت مخالفة في النظافة أو السير أو السكينة؟",
    citizenDesc: "يمكنك الآن إيداع بلاغ فوري أو شكاية مباشرة عبر البوابة الرقمية، والحصول على رمز تتبع لمتابعة المعالجة خطوة بخطوة.",
    citizenBtn: "🚀 إيداع شكاية أو بلاغ الآن",
    moreDetailsBtn: "تعرف على الإطار القانوني والمبادئ العامة ←",
    exploreRulesBtn: "استكشف المساطر والضوابط الكاملة ←",

    // Legal Page
    legalBreadcrumb: "الإطار القانوني والأجهزة",
    legalHeroTag: "النصوص التشريعية والميثاق الجماعي",
    legalHeroTitle: "الإطار القانوني والأجهزة الممارسة للشرطة الإدارية",
    legalHeroDesc: "منظومة قانونية محكمة تستمد قوتها من الدستور والميثاق الجماعي لتنظيم التدخل الإداري وتحديد حدود صلاحيات رئيس المجلس الجماعي، رجل السلطة المحلية، والمجلس الجماعي بما يضمن حماية حقوق وحريات الأفراد.",
    secTagConcepts: "مفاهيم أساسية",
    secTitleConcepts: "ما هي الشرطة الإدارية؟",
    secDescConcepts: "الوسيلة القانونية التي تبيح للإدارة التدخل للحفاظ على النظام العام بعناصره الثلاثة: الأمن العام، السكينة العامة، والصحة العمومية.",
    secTagMeasures: "تدابير الممارسة العملية",
    secTitleMeasures: "وسائل وآليات ممارسة الشرطة الإدارية",
    secDescMeasures: "تتم ممارسة الشرطة الإدارية الجماعية عبر ثلاثة وسائل رئيسية حددها القانون والأنظمة الجاري بها العمل.",
    secTagAuth: "توزيع الاختصاصات",
    secTitleAuth: "الأجهزة والجهات الممارسة للشرطة الإدارية",
    secDescAuth: "تفصيل دقيق لصلاحيات كل طرف لمنع التداخل والنزاع بين الجماعات الترابية والإدارة المحلية.",
    secTagGov: "ضوابط عدم التداخل",
    secTitleGov: "المبادئ القانونية الثلاثة لضوابط الممارسة",
    secDescGov: "مبادئ مؤطرة لخضوع الشرطة الإدارية المحلية للقانون ومنع التضارب مع القرارات الوطنية.",

    // Domains Page
    domainsBreadcrumb: "مجالات التدخل",
    domainsHeroTag: "الدليل العملي والمجالي",
    domainsHeroTitle: "مجالات وميادين التدخل للشرطة الإدارية الجماعية",
    domainsHeroDesc: "جرد شامل ومفصل لجميع القطاعات الحيوية المنصوص عليها في الميثاق الجماعي والأنظمة العامة لحفظ الصحة والنظافة العامة، السلامة الطرقية، حماية البيئة والوسط القروي.",
    tabAllDomains: "🌐 جميع المجالات (10)",
    tabHealth: "🏥 الصحة والنظافة والبيئة",
    tabTraffic: "🚦 السير والجولان والملك العمومي",
    tabRural: "🌾 الشرطة القروية والسكينة",
    specTagClassified: "الأنشطة المزعجة والخطيرة",
    specTitleClassified: "تصنيف المؤسسات المرتبة (Établissements Classés)",
    specDescClassified: "وفقاً لظهير 1914 والمادة 50، تنقسم المؤسسات المضرة أو الخطيرة إلى 3 درجات محددة لحماية السكان من التلوث والإزعاج.",

    // Procedures Page
    procBreadcrumb: "المساطر والترخيصات",
    procHeroTag: "دليل الترخيص والمساطر",
    procHeroTitle: "دليل المساطر والترخيصات الجماعية",
    procHeroDesc: "دليل تفاعلي شامل لإيداع وتتبع طلبات رخص احتلال الملك العمومي، المؤسسات المرتبة، شواهد التعمير ورخص الدفن مع قائمة الوثائق المطلوبة لكل مسطرة.",
    tabAllProcedures: "📋 جميع المساطر (5)",
    tabDomainOcc: "🎪 احتلال الملك العمومي",
    tabEstablishments: "🏭 المؤسسات المرتبة",
    tabBuilding: "🏗️ التعمير والسكن",
    tabHealthBurials: "⚰️ الوقاية والجنائز",
    tabExecution: "⚡ التنفيذ التلقائي",

    // Complaints Page
    compBreadcrumb: "بوابة الشكايات والبلاغات",
    compHeroTag: "خدمة المواطن والتبليغ المباشر",
    compHeroTitle: "البوابة الرقمية لإيداع وتتبع الشكايات والبلاغات",
    compHeroDesc: "قناة مواطنة مباشرة تتيح لك التبليغ عن أي مخالفة تمس بالصحة، النظافة، السير، أو السكينة العامة، ومتابعة مآل المعالجة برقم تتبع فريد يسلم لك فورياً.",
    compFormTitle: "نموذج إيداع بلاغ أو شكاية جديدة",
    compFormSub: "المرجو ملء المعطيات بدقة لتسهيل المعاينة والتدخل",
    labelName: "الاسم الكامل *",
    labelPhone: "رقم الهاتف *",
    labelCategory: "تصنيف البلاغ / الشكاية *",
    labelTitle: "موضوع البلاغ مختصر *",
    labelLocation: "موقع المخالفة / الحي والشارع *",
    labelDetails: "تفاصيل البلاغ والملاحظات *",
    phName: "أدخل اسمك الكامل",
    phPhone: "06XXXXXXXX",
    phTitle: "مثال: تراكم القمامات قرب المدرسة أو إزعاج محل تجاري...",
    phLocation: "أدخل العنوان التفصيلي أو اسم الحي والشارع",
    phDetails: "اشرح حالة المخالفة والأضرار الناجمة عنها بالتفصيل...",
    submitComplaintBtn: "🚀 إيداع الشكاية والحصول على رمز التتبع",
    trackWidgetTitle: "تتبع حالة شكاية مسجلة",
    trackWidgetDesc: "أدخل رمز التتبع الخاص بك (مثال: POL-2026-78A1B) للاطلاع على تقدم المعالجة:",
    trackSearchBtn: "بحث 🔍",
    optDefaultCategory: "اختر المجال المعني بالمخالفة...",
    optHealth: "🧹 النظافة والبيئة (نفايات، مستنقعات، روائح)",
    optTraffic: "🚦 السير والجولان (عرقلة، احتلال الملك العمومي)",
    optAnimals: "🐕 الكلاب الضالة والحيوانات السائبة",
    optTranquility: "🔊 السكينة العامة والإزعاج والمحلات المفتوحة",
    optEst: "🏭 المؤسسات المرتبة والمحلات التجارية",
    recentComplaintsTitle: "📋 البلاغات والشكايات المسجلة محلياً",
    faqTag: "الأسئلة الشائعة",
    faqTitle: "إرشادات تتبع الشكايات والبلاغات",

    // Resources Page
    resBreadcrumb: "المكتبة الرقمية والمعجم",
    resHeroTag: "القاموس والمستندات المرجعية",
    resHeroTitle: "معجم المصطلحات والمكتبة التشريعية",
    resHeroDesc: "قاموس قانوني تفاعلي يضم الشرح والتعريف المفصل لأهم مصطلحات الشرطة الإدارية الجماعية المقتبسة من الدليل الرسمي والنصوص التشريعية المغربية.",
    resSecTagDict: "القاموس القانوني التفاعلي",
    resSecTitleDict: "معجم مصطلحات الشرطة الإدارية",
    resSecDescDict: "ابحث في المصطلحات والتعاريف الفقهية أو صفّها حسب الحرف الأبجدي.",
    resSecTagDecrees: "الوثائق والنصوص المرجعية",
    resSecTitleDecrees: "المكتبة التشريعية والنصوص المؤطرة",
    resSecDescDecrees: "النصوص والمراسيم الصادرة في الجريدة الرسمية والمتعلقة بممارسة الشرطة الإدارية الجماعية.",
    resSearchPh: "ابحث عن مصطلح قانوني (مثال: السكينة العامة، التنفيذ التلقائي...)"
  },

  fr: {
    // Header & Nav
    siteTitle: "Police Administrative Communale",
    siteSubtitle: "Portail Numérique Officiel",
    navHome: "Accueil",
    navLegal: "Cadre Légal",
    navDomains: "Domaines d'Intervention",
    navProcedures: "Procédures & Autorisations",
    navComplaints: "Portail des Plaintes",
    navResources: "Ressources & Lexique",
    navAdmin: "Espace Agent",
    fileComplaintBtn: "Déposer une plainte",
    tickerNotice: "📢 Publication du nouveau guide d'orientation de la Police Administrative Communale selon la Charte Communale.",
    tickerBadge: "Actualités",
    downloadPdf: "Télécharger le Guide PDF",
    previewPdf: "Aperçu du Guide PDF",
    exploreDomainsBtn: "Explorer les domaines",

    // Home Page
    homeHeroBadge: "🛡️ Portail Numérique Officiel Interactif",
    homeHeroTitle: "Votre Guide Officiel sur la <span>Police Administrative Communale</span>",
    homeHeroDesc: "Une initiative numérique visant à sensibiliser les élus, les praticiens et les citoyens au cadre juridique de la police administrative communale, ses domaines d'intervention en santé, voirie et tranquillité publique.",
    searchHeader: "Recherche Rapide dans le Guide Communal",
    searchBadge: "Mis à jour 2026",
    searchPlaceholder: "Rechercher une procédure, autorisation ou loi...",
    mostSearched: "Recherches fréquentes :",
    modalStartText: "Entrez un mot-clé pour commencer...",
    modalNoResults: "Aucun résultat ne correspond à votre recherche",

    // Home Stats
    stats: [
      { number: "03", label: "Domaines Principaux d'Intervention", icon: "🏛️" },
      { number: "50+", label: "Compétences & Services Réglementés", icon: "📋" },
      { number: "100%", label: "Conformité Légale & Textes Officiels", icon: "⚖️" },
      { number: "24/7", label: "Suivi & Réception des Signalements", icon: "🛡️" }
    ],

    // Home Domains
    domainsTitle: "Domaines d'Intervention de la Police Administrative",
    domainsDesc: "En vertu des articles 40, 49 et 50 de la Charte Communale, les attributions s'articulent autour de 3 axes essentiels liés à la vie quotidienne du citoyen.",
    domainsTag: "Domaines Majeurs d'Intervention",
    domains: [
      {
        id: "health-hygiene",
        title: "Santé, Hygiène Publique & Protection de l'Environnement",
        subtitle: "Articles 40 & 50 de la Charte Communale",
        icon: "🏥",
        desc: "Contrôle des établissements commerciaux, sécurité alimentaire, collecte des déchets, lutte contre les épidémies, et police des funérailles.",
        tags: ["Sécurité Alimentaire", "Établissements Publics", "Gestion des Déchets", "Police des Funérailles"]
      },
      {
        id: "traffic-transit",
        title: "Police de la Circulation, Voirie & Domaine Public",
        subtitle: "Réglementation de la Voirie et Services Publics",
        icon: "🚦",
        desc: "Signalisation routière, gares routières, stationnement, enlèvement des obstacles sur la voie publique et autorisations d'occupation temporaire.",
        tags: ["Signalisation Routière", "Domaine Public", "Gares Routières", "Sécurité Routière"]
      },
      {
        id: "rural-police",
        title: "Police Rurale & Tranquillité Publique",
        subtitle: "Protection de l'Environnement et des Biens Ruraux",
        icon: "🌾",
        desc: "Lutte contre la rage, capture des chiens errants, divagation du bétail, prévention des incendies de forêt et protection des cultures.",
        tags: ["Chiens Errants", "Lutte contre la Rage", "Prévention Incendies", "Protection des Cultures"]
      }
    ],

    // Home Authorities
    authoritiesTag: "Gouvernance & Organisation",
    authoritiesTitle: "Répartition des Compétences & Autorités",
    authoritiesDesc: "Pour éviter tout chevauchement de pouvoirs, le législateur a strictement défini les rôles entre le Président du Conseil, les Autorités Locales (Pacha/Caïd) et le Conseil Communal.",
    authorities: [
      {
        role: "Président du Conseil Communal",
        scope: "Pouvoir Exécutif Direct de la Police Administrative Communale",
        icon: "👤",
        duties: [
          "Délivrance des permis de construire, d'habiter et d'occupation du domaine public.",
          "Prise des décisions réglementaires et individuelles en hygiène, santé et voirie.",
          "Exécution d'office des décisions administratives en cas de refus.",
          "Réquisition de la force publique pour garantir le respect des arrêtés."
        ]
      },
      {
        role: "Autorité Locale (Pacha / Caïd)",
        scope: "Compétences Limitativement Énumérées (Article 49)",
        icon: "⚖️",
        duties: [
          "Maintien de l'ordre public, de la sécurité et de la tranquillité publique.",
          "Réglementation des associations, rassemblements publics, presse et élections.",
          "Contrôle des vendeurs ambulants, armes, munitions et débits de boissons.",
          "Surveillance des prix et répression des fraudes."
        ]
      },
      {
        role: "Le Conseil Communal",
        scope: "Délibération et Approbation des Règlements Généraux",
        icon: "🏛️",
        duties: [
          "Classement et gestion du domaine public communal.",
          "Approbation des règlements d'urbanisme et de construction.",
          "Adoption des règlements généraux d'hygiène et de salubrité publique.",
          "Création et organisation du Bureau Municipal d'Hygiène (BMH)."
        ]
      }
    ],

    // Governance Card
    govTitle: "Principes Fondamentaux de Gouvernance",
    gov1Title: "1. Principe de Non-Contradiction",
    gov1Desc: "Respect obligatoire des règlements nationaux par les arrêtés communaux.",
    gov2Title: "2. Principe de Non-Empiètement",
    gov2Desc: "Interdiction d'exercer les compétences réservées à la police nationale.",
    gov3Title: "3. Principe de Non-Substitution",
    gov3Desc: "Interdiction de substitution par l'autorité centrale sauf texte législatif express.",

    // Home PDF Banner
    pdfTitle: "Téléchargez et Consultez le Guide Officiel de la Police Administrative",
    pdfDesc: "Un document de référence complet préparé par la Direction Générale des Collectivités Territoriales pour sensibiliser les élus et praticiens (28 pages).",
    pdfPageCount: "28 Pages",
    pdfSubText: "Aperçu numérique interactif",

    // Home Citizen Callout
    citizenTitle: "Avez-vous remarqué une infraction d'hygiène, de voirie ou de tranquillité ?",
    citizenDesc: "Vous pouvez désormais déposer un signalement instantané sur le portail et recevoir un code de suivi unique.",
    citizenBtn: "🚀 Déposer un signalement maintenant",
    moreDetailsBtn: "Découvrir le cadre légal et les principes généraux →",
    exploreRulesBtn: "Explorer toutes les procédures & règles →",

    // Legal Page
    legalBreadcrumb: "Cadre Légal & Autorités",
    legalHeroTag: "Textes Législatifs & Charte Communale",
    legalHeroTitle: "Cadre Juridique et Autorités de la Police Administrative",
    legalHeroDesc: "Un cadre juridique rigoureux fondé sur la Constitution et la Charte Communale pour régir l'intervention administrative et définir les prérogatives du Maire, de l'Autorité Locale et du Conseil Communal.",
    secTagConcepts: "Notions Fondamentales",
    secTitleConcepts: "Qu'est-ce que la Police Administrative ?",
    secDescConcepts: "Moyen juridique permettant à l'administration d'intervenir pour préserver l'ordre public (sécurité, tranquillité, salubrité).",
    secTagMeasures: "Modes d'Intervention",
    secTitleMeasures: "Moyens et Instruments d'Action",
    secDescMeasures: "L'action de la police administrative s'exerce à travers 3 modes d'intervention principaux.",
    secTagAuth: "Répartition des Compétences",
    secTitleAuth: "Autorités & Organes d'Exécution",
    secDescAuth: "Répartition claire des rôles pour éviter les conflits d'attributions entre la commune et l'autorité locale.",
    secTagGov: "Principes d'Encadrement",
    secTitleGov: "Les 3 Principes Fondamentaux de Gouvernance",
    secDescGov: "Règles juridiques encadrant la soumission des arrêtés communaux à la législation nationale.",

    // Domains Page
    domainsBreadcrumb: "Domaines d'Intervention",
    domainsHeroTag: "Guide Pratique par Domaine",
    domainsHeroTitle: "Domaines d'Intervention de la Police Administrative",
    domainsHeroDesc: "Inventaire détaillé de tous les secteurs régis par la Charte Communale pour la salubrité publique, la sécurité routière et l'environnement.",
    tabAllDomains: "🌐 Tous les domaines (10)",
    tabHealth: "🏥 Santé & Hygiène",
    tabTraffic: "🚦 Voirie & Domaine Public",
    tabRural: "🌾 Police Rurale",
    specTagClassified: "Établissements Incommodes & Dangereux",
    specTitleClassified: "Classification des Établissements Classés",
    specDescClassified: "Selon le dahir de 1914 et l'art. 50, les établissements classés sont divisés en 3 catégories.",

    // Procedures Page
    procBreadcrumb: "Procédures & Autorisations",
    procHeroTag: "Guide des Autorisations Communales",
    procHeroTitle: "Guide des Procédures & Autorisations",
    procHeroDesc: "Guide interactif pour la constitution des dossiers d'autorisation d'occupation du domaine public, établissements classés, urbanisme et permis d'inhumer.",
    tabAllProcedures: "📋 Toutes les procédures (5)",
    tabDomainOcc: "🎪 Domaine Public",
    tabEstablishments: "🏭 Établissements Classés",
    tabBuilding: "🏗️ Urbanisme & Permis",
    tabHealthBurials: "⚰️ Funérailles & Inhumation",
    tabExecution: "⚡ Exécution d'office",

    // Complaints Page
    compBreadcrumb: "Portail des Signalements",
    compHeroTag: "Service Citoyen & Signalement Direct",
    compHeroTitle: "Portail Numérique des Signalements & Plaintes",
    compHeroDesc: "Canal citoyen direct vous permettant de signaler toute infraction à la salubrité, voirie ou tranquillité publique avec suivi par code unique.",
    compFormTitle: "Formulaire de Signalement / Plainte",
    compFormSub: "Veuillez remplir le formulaire avec précision.",
    labelName: "Nom Complet *",
    labelPhone: "Numéro de Téléphone *",
    labelCategory: "Catégorie du Signalement *",
    labelTitle: "Sujet du Signalement *",
    labelLocation: "Lieu / Adresse de l'infraction *",
    labelDetails: "Détails & Description *",
    phName: "Entrez votre nom complet",
    phPhone: "06XXXXXXXX",
    phTitle: "Ex: Dépôt sauvage d'ordures ou bruit nocturne...",
    phLocation: "Adresse précise ou nom du quartier/rue",
    phDetails: "Décrivez l'infraction et les détails pertinents...",
    submitComplaintBtn: "🚀 Soumettre & Obtenir le Code de Suivi",
    trackWidgetTitle: "Suivi de Signalement",
    trackWidgetDesc: "Entrez votre code de suivi (Ex: POL-2026-78A1B) :",
    trackSearchBtn: "Rechercher 🔍",
    optDefaultCategory: "Sélectionnez la catégorie...",
    optHealth: "🧹 Propreté & Environnement (déchets, odeurs)",
    optTraffic: "🚦 Circulation & Voirie (obstacles, domaine public)",
    optAnimals: "🐕 Chiens errants & animaux en divagation",
    optTranquility: "🔊 Tranquillité publique & bruits nocturnes",
    optEst: "🏭 Établissements classés & commerces",
    recentComplaintsTitle: "📋 Signalements enregistrés localement",
    faqTag: "Foire Aux Questions",
    faqTitle: "Guide de Traitement des Plaintes",

    // Resources Page
    resBreadcrumb: "Ressources & Lexique",
    resHeroTag: "Lexique & Textes de Référence",
    resHeroTitle: "Lexique Juridique & Textes Législatifs",
    resHeroDesc: "Dictionnaire juridique interactif avec définitions détaillées des termes de la police administrative issus des textes législatifs marocains.",
    resSecTagDict: "Lexique Juridique Interactif",
    resSecTitleDict: "Lexique de la Police Administrative",
    resSecDescDict: "Recherchez un terme juridique ou filtrez par ordre alphabétique.",
    resSecTagDecrees: "Textes de Référence",
    resSecTitleDecrees: "Bibliothèque Législative",
    resSecDescDecrees: "Lois, décrets et dahirs régissant la police administrative communale au Maroc.",
    resSearchPh: "Rechercher un terme (ex: Ordre Public, Exécution d'office...)"
  }
};

// Helper getters
function getLang() {
  return localStorage.getItem('police_portal_lang') || 'ar';
}

function getTranslation() {
  return policePortalTranslations[getLang()] || policePortalTranslations.ar;
}

const policePortalData = getTranslation();
