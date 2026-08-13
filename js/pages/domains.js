/* ==========================================================================
   DOMAINS PAGE SCRIPT - Bilingual (AR/FR) Interactive Tab Filter & Modals
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  updateDomainsStaticLabels();
  renderDetailedDomainsGrid('all');
  initDomainHashNavigation();
});

/* Update Static Labels on Domains Page */
function updateDomainsStaticLabels() {
  const lang = getLang();

  // Breadcrumbs & Headers
  const breadcrumb = document.querySelector('.hero-section .container div span:last-child');
  if (breadcrumb) breadcrumb.innerText = lang === 'ar' ? 'مجالات التدخل' : 'Domaines d\'Intervention';

  const heroTag = document.querySelector('.hero-section .section-tag');
  if (heroTag) heroTag.innerText = lang === 'ar' ? 'الدليل العملي والمجالي' : 'Guide Pratique par Domaine';

  const heroTitle = document.querySelector('.hero-section .hero-title');
  if (heroTitle) heroTitle.innerText = lang === 'ar' ? 'مجالات وميادين التدخل للشرطة الإدارية الجماعية' : 'Domaines d\'Intervention de la Police Administrative';

  const heroDesc = document.querySelector('.hero-section .hero-description');
  if (heroDesc) heroDesc.innerText = lang === 'ar'
    ? 'جرد شامل ومفصل لجميع القطاعات الحيوية المنصوص عليها في الميثاق الجماعي والأنظمة العامة لحفظ الصحة والنظافة العامة، السلامة الطرقية، حماية البيئة والوسط القروي.'
    : 'Inventaire détaillé de tous les secteurs régis par la Charte Communale pour la salubrité publique, la sécurité routière et l\'environnement.';

  // Filter Buttons
  const btns = document.querySelectorAll('.domain-tab-btn');
  if (btns.length >= 4) {
    btns[0].innerText = lang === 'ar' ? '🌐 جميع المجالات (10)' : '🌐 Tous les domaines (10)';
    btns[1].innerText = lang === 'ar' ? '🏥 الصحة والنظافة والبيئة' : '🏥 Santé & Hygiène';
    btns[2].innerText = lang === 'ar' ? '🚦 السير والجولان والملك العمومي' : '🚦 Voirie & Domaine Public';
    btns[3].innerText = lang === 'ar' ? '🌾 الشرطة القروية والسكينة' : '🌾 Police Rurale';
  }

  // Classified Establishments Section
  const specTag = document.querySelector('section:nth-of-type(3) .section-tag');
  if (specTag) specTag.innerText = lang === 'ar' ? 'الأنشطة المزعجة والخطيرة' : 'Établissements Incommodes & Dangereux';

  const specTitle = document.querySelector('section:nth-of-type(3) .section-title');
  if (specTitle) specTitle.innerText = lang === 'ar' ? 'تصنيف المؤسسات المرتبة (Établissements Classés)' : 'Classification des Établissements Classés';

  const specDesc = document.querySelector('section:nth-of-type(3) .section-desc');
  if (specDesc) specDesc.innerText = lang === 'ar' 
    ? 'وفقاً لظهير 1914 والمادة 50، تنقسم المؤسسات المضرة أو الخطيرة إلى 3 درجات محددة لحماية السكان من التلوث والإزعاج.'
    : 'Selon le dahir de 1914 et l\'art. 50, les établissements classés sont divisés en 3 catégories.';

  // Class Cards
  const classCards = document.querySelectorAll('section:nth-of-type(3) .glass-panel');
  if (classCards.length >= 3) {
    if (lang === 'fr') {
      classCards[0].querySelector('.ticker-badge').innerText = '1ère Classe (Haute Dangerosité)';
      classCards[0].querySelector('h3').innerText = 'Établissements de 1ère Classe';
      classCards[0].querySelector('p').innerText = 'Autorisation et fermeture réservées au Ministre des Travaux Publics. Établissements créant des risques environnementaux majeurs.';

      classCards[1].querySelector('.ticker-badge').innerText = '2ème Classe (Risque Moyen)';
      classCards[1].querySelector('h3').innerText = 'Établissements de 2ème Classe';
      classCards[1].querySelector('p').innerText = 'Autorisation et contrôle délivrés par le Maire pour préserver la salubrité publique.';

      classCards[2].querySelector('.ticker-badge').innerText = '3ème Classe (Risque Limité)';
      classCards[2].querySelector('h3').innerText = 'Établissements de 3ème Classe';
      classCards[2].querySelector('p').innerText = 'Autorisés sur simple déclaration auprès du Maire avec délivrance d\'un récépissé.';
    }
  }
}

/* Detailed Domain Dataset */
function getDetailedDomainsData() {
  const lang = getLang();

  if (lang === 'fr') {
    return [
      {
        id: "health-hygiene-streets",
        category: "health",
        categoryLabel: "Santé & Hygiène",
        title: "Salubrité Publique & Propreté des Voies",
        icon: "🧹",
        desc: "Interdiction des dépôts sauvages d'ordures, collecte et évacuation des déchets ménagers, entretien des espaces publics.",
        legalBasis: "Article 50 de la Charte Communale",
        points: [
          "Interdiction de jeter les ordures et détritus sur les voies et places publiques.",
          "Organisation de la collecte des déchets ménagers et fixation des sites de décharge.",
          "Interdiction d'exercer des métiers polluants sur la voie publique (mécanique, soudure).",
          "Nettoyage et désinfection des terrains vagues contre la prolifération d'insectes.",
          "Entretien et protection des espaces verts et jardins publics."
        ]
      },
      {
        id: "health-housing",
        category: "health",
        categoryLabel: "Santé & Hygiène",
        title: "Salubrité des Logements & Environnement",
        icon: "🏡",
        desc: "Contrôle de la salubrité de l'habitat, assèchement des marécages, interdiction des élevages d'animaux en zones résidentielles.",
        legalBasis: "Articles 40 & 50 de la Charte Communale",
        points: [
          "Démolition des logements insalubres constituant un danger pour la santé.",
          "Assèchement des eaux stagnantes et curage des réseaux d'assainissement.",
          "Interdiction des élevages de bétail et volailles dans les zones résidentielles.",
          "Lutte contre la pollution de l'eau et de l'air d'origine industrielle.",
          "Déclaration obligatoire des maladies épidémiques auprès des autorités sanitaires."
        ]
      },
      {
        id: "health-public-places",
        category: "health",
        categoryLabel: "Santé & Hygiène",
        title: "Hygiène dans les Établissements Publics",
        icon: "🍽️",
        desc: "Contrôle de salubrité des cafés, restaurants, hôtels, bains publics (hammams), boulangeries, piscines et salles de fêtes.",
        legalBasis: "Article 50 - Paragraphe 9",
        points: [
          "Contrôle de l'hygiène dans les établissements ouverts au public et fixation des horaires.",
          "Contrôle des cartes sanitaires du personnel préparant des denrées alimentaires.",
          "Inspections de la qualité des denrées, viandes et boissons proposées à la consommation.",
          "Fermeture des établissements ne respectant pas les normes d'hygiène."
        ]
      },
      {
        id: "health-classified-establishments",
        category: "health",
        categoryLabel: "Santé & Hygiène",
        title: "Établissements Classés (Insalubres ou Dangereux)",
        icon: "🏭",
        desc: "Réglementation et autorisations des établissements industriels et commerciaux divisés en 3 classes selon leur niveau de risque.",
        legalBasis: "Dahir de 1914 & Article 50",
        points: [
          "1ère Classe : Autorisation réservée au Ministre des Travaux Publics (usines d'engrais).",
          "2ème Classe : Autorisation délivrée par le Maire (dépôts d'hydrocarbures, grandes menuiseries).",
          "3ème Classe : Déclaration préalable auprès du Maire (ateliers de peinture, métallurgie).",
          "Fermeture immédiate en cas de violation des normes d'hygiène et de sécurité."
        ]
      },
      {
        id: "health-burials",
        category: "health",
        categoryLabel: "Santé & Hygiène",
        title: "Police des Funérailles & Cimetières",
        icon: "⚰️",
        desc: "Constatation médicale des décès, délivrance des permis d'inhumer, exhumation et transport des corps.",
        legalBasis: "Article 50 - Paragraphe 23",
        points: [
          "Constatation médicale immédiate du décès par le Bureau Municipal d'Hygiène (BMH).",
          "Délivrance des permis d'inhumer et d'autorisations de transport de corps.",
          "Autorisation d'exhumation des sépultures selon les conditions légales.",
          "Gestion et entretien des cimetières et du service de transport de corps."
        ]
      },

      {
        id: "traffic-signage",
        category: "traffic",
        categoryLabel: "Voirie & Circulation",
        title: "Signalisation Routière & Sécurité",
        icon: "🚦",
        desc: "Réglementation de la signalisation routière (horizontale et verticale), feux de circulation et fluidité du trafic.",
        legalBasis: "Article 50 - Paragraphes 10 & 17",
        points: [
          "Organisation de la signalisation routière dans le périmètre communal.",
          "Enlèvement des encombrants sur les voies publiques et éclairage urbain.",
          "Interdiction de poser des objets sur les fenêtres et balcons risquant de chuter.",
          "Réparation ou démolition des édifices menaçant ruine bordant la voie publique."
        ]
      },
      {
        id: "traffic-stations",
        category: "traffic",
        categoryLabel: "Voirie & Circulation",
        title: "Gares Routières & Stationnement",
        icon: "🚌",
        desc: "Réglementation des gares routières, arrêts de bus, taxis, véhicules de marchandises et parkings publics.",
        legalBasis: "Article 50 - Paragraphe 13",
        points: [
          "Organisation des gares routières et arrêts de véhicules de transport en commun.",
          "Fixation des stations de taxis (grands et petits) et zones de livraison.",
          "Gestion et réglementation des parkings publics payants et horodateurs.",
          "Délimitation des sens de circulation et zones piétonnes."
        ]
      },
      {
        id: "traffic-public-domain",
        category: "traffic",
        categoryLabel: "Voirie & Circulation",
        title: "Occupation Temporaire du Domaine Public",
        icon: "🎪",
        desc: "Délivrance des autorisations d'occupation du domaine public sans construction pour terrasses de cafés et commerces.",
        legalBasis: "Articles 37 & 50 de la Charte Communale",
        points: [
          "Délivrance des permis d'occupation temporaire du domaine public communal.",
          "Réglementation des panneaux publicitaires, enseignes et mobilier urbain.",
          "Répression des occupations illicites des trottoirs par les étalages.",
          "Saisie des marchandises et matériels obstruant le passage des piétons."
        ]
      },

      {
        id: "rural-animals",
        category: "rural",
        categoryLabel: "Police Rurale",
        title: "Chiens Errants & Lutte contre la Rage",
        icon: "🐕",
        desc: "Capture des animaux errants, mise en fourrière, contrôle de la rage et protection du bétail contre la divagation.",
        legalBasis: "Article 50 - Paragraphe 12",
        points: [
          "Capture des chiens errants en zone urbaine et rurale et mise en fourrière.",
          "Campagnes de lutte contre la rage en coordination avec le service vétérinaire.",
          "Surveillance vétérinaire des animaux mordeurs mis en observation.",
          "Prévention de la divagation du bétail endommageant les récoltes."
        ]
      },
      {
        id: "rural-forest-fire",
        category: "rural",
        categoryLabel: "Police Rurale",
        title: "Prévention des Incendies & Risques Naturels",
        icon: "🔥",
        desc: "Réglementation de l'usage du feu en zones agricoles et forestières, et mesures d'urgence lors de catastrophes.",
        legalBasis: "Article 50 - Paragraphes 14 & 15",
        points: [
          "Réglementation de l'emploi du feu pour prévenir les incendies de forêt.",
          "Protection des cultures et arbres fruitiers contre les parasites et le bétail.",
          "Mesures d'urgence lors des inondations et catastrophes naturelles.",
          "Protection et désinfection des points d'eau potables et d'irrigation."
        ]
      }
    ];
  }

  // Default Arabic
  return [
    {
      id: "health-hygiene-streets",
      category: "health",
      categoryLabel: "الصحة والنظافة",
      title: "النظافة العامة بالطرق والساحات العمومية",
      icon: "🧹",
      desc: "منع رمي الأزبال والنفايات، جمع وإفراغ القمامات المنزلية، وتحديد أماكن تفريغها ومنع الحرف الملوثة بالطريق العام.",
      legalBasis: "المادة 50 من الميثاق الجماعي",
      points: [
        "منع رمي الأزبال والنفايات بالطرق والساحات العمومية.",
        "جمع وإفراغ القمامات المنزلية وتحديد ساحات وأماكن الإفراغ.",
        "منع مزاولة بعض الحرف الملوثة بالطريق العام (كالميكانيك والتلحيم).",
        "تمسيح الأراضي العارية وتنظيفها تفادياً لانتشار الحشرات والطفيليات.",
        "المحافظة على المساحات الخضراء والحدائق الملحقة بالطريق العام."
      ]
    },
    {
      id: "health-housing",
      category: "health",
      categoryLabel: "الصحة والنظافة",
      title: "صحة السكن والوسط والبيئة",
      icon: "🏡",
      desc: "مراقبة سلامة السكن، إزالة المستنقعات والبرك المائية الراكدة، منع تربية المواشي والأغنام بالأحياء السكنية.",
      legalBasis: "المادة 40 و 50 من الميثاق الجماعي",
      points: [
        "الأمر بهدم أو إزالة المساكن ودور القصدير المعتبرة غير صحية.",
        "إزالة المستنقعات والبرك المائية الراكدة وتنظيف قنوات الصرف الصحي.",
        "منع إقامة محلات لتربية المواشي والدواجن بالتجمعات السكنية.",
        "محاربة تلوث الماء والهواء الناتج عن المنشآت الصناعية والعربات.",
        "التصريح الفوري بالأمراض المعدية المتفشية والتنسيق مع وزارة الصحة."
      ]
    },
    {
      id: "health-public-places",
      category: "health",
      categoryLabel: "الصحة والنظافة",
      title: "حفظ الصحة بالمحلات العامة والمطاعم",
      icon: "🍽️",
      desc: "شروط النظافة بالمقاهي، المطاعم، الفنادق، الحمامات، الأفرنة، المسابح وقاعات المشاهد والملاعب الرياضية.",
      legalBasis: "المادة 50 - الفقرة 9",
      points: [
        "مراقبة سلامة ونظافة المحلات المفتوحة للعموم وتحديد مواقيت فتحها وإغلاقها.",
        "التحقق من صحة وشواهد المستجوبين العاملين بإعداد وتحضير الوجبات.",
        "مراقبة جودة المواد الغذائية، التوابل، والمشروبات المعروضة للاستهلاك.",
        "إغلاق المحلات المخالفة لشروط الصحة العامة وسحب تراخيص استغلالها."
      ]
    },
    {
      id: "health-classified-establishments",
      category: "health",
      categoryLabel: "الصحة والنظافة",
      title: "المؤسسات المرتبة (المضرة والمزعجة والخطيرة)",
      icon: "🏭",
      desc: "تنظيم ورخص المؤسسات الصناعية والتجارية المقسمة إلى 3 درجات حسب مستوى خطورتها وتأثيرها على البيئة.",
      legalBasis: "ظهير 1914 والمادة 50 من الميثاق الجماعي",
      points: [
        "مؤسسات الدرجة الأولى: يختص بالترخيص بفتحها وإغلاقها وزير الأشغال العمومية (معامل الأسمدة والكيماويات).",
        "مؤسسات الدرجة الثانية: يختص بالترخيص بفتحها رئيس المجلس الجماعي (المحروقات، ورشات النجارة الكبرى).",
        "مؤسسات الدرجة الثالثة: يختص بها رئيس الجماعة وتفتح بمجرد تصريح ووصل (ورشات الصباغة والحدادة).",
        "إغلاق المؤسسات فوراً في حالة مخالفة ضوابط الصحة والسلامة البيئية."
      ]
    },
    {
      id: "health-burials",
      category: "health",
      categoryLabel: "الصحة والنظافة",
      title: "شرطة الجنائز والمقابر ونقل الجثث",
      icon: "⚰️",
      desc: "معاينة الوفاة عبر المكتب الصحي، تسليم رخص الدفن واستخراج الجثث، تنظيم مرفق نقل الجثث وتطهير المكان.",
      legalBasis: "المادة 50 - الفقرة 23",
      points: [
        "المعاينة الطبية الفورية للوفاة عبر أعوان المكتب الصحي الجماعي (BMH).",
        "تسليم رخص الدفن ورخص نقل الجثث داخل أو خارج التراب الجماعي.",
        "الترخيص باستخراج الجثث وفق الشروط التشريعية والتنظيمية.",
        "تنظيم وصيانة المقابر الإسلامية وإدارة مرفق سيارات نقل الأموات."
      ]
    },

    {
      id: "traffic-signage",
      category: "traffic",
      categoryLabel: "السير والجولان",
      title: "التشوير الطرقي والسلامة الطرقية",
      icon: "🚦",
      desc: "ضبط وتنظيم علامات التشوير الأفقي والعمودي، الإشارات الضوئية، وتسهيل حركة المرور بالشارع العام.",
      legalBasis: "المادة 50 - الفقرة 10 و 17",
      points: [
        "ضبط وتنظيم تشوير الطرق العمومية داخل تراب الجماعة.",
        "رفع معرقلات السير وتنظيف الطرقات وتجهيزها بالإنارة العمومية.",
        "منع وضع الأشياء بالنوافذ والأصوار التي تشكل خطراً بسقوطها على المارة.",
        "إتلاف أو إصلاح البنايات الآيلة للسقوط المحاذية للشارع العام."
      ]
    },
    {
      id: "traffic-stations",
      category: "traffic",
      categoryLabel: "السير والجولان",
      title: "المحطات الطرقية ومواقف السيارات",
      icon: "🚌",
      desc: "تنظيم محطات وقوف حافلات المسافرين، النقل العمومي، سيارات الأجرة، وعربات نقل البضائع ومواقف السيارات.",
      legalBasis: "المادة 50 - الفقرة 13",
      points: [
        "تنظيم ومراقبة المحطات الطرقية ومحطات وقوف حافلات المسافرين.",
        "تحديد أماكن وقوف سيارات الأجرة الصغرى والكبرى وعربات نقل البضائع.",
        "تنظيم وتدبير مواقف السيارات والدراجات النارية والتحصيل الجماعي.",
        "تحديد اتجاهات حركة السير ومناطق تفريغ الشحنات التجارية."
      ]
    },
    {
      id: "traffic-public-domain",
      category: "traffic",
      categoryLabel: "السير والجولان",
      title: "احتلال الملك العمومي الجماعي مؤقتاً",
      icon: "🎪",
      desc: "منح رخص الاستغلال المؤقت للملك العمومي بدون إقامة بناء للمقاهي والمحلات والأنشطة التجارية والإعلانات.",
      legalBasis: "المادة 37 و 50 من الميثاق الجماعي",
      points: [
        "منح رخص احتلال الملك العمومي الجماعي لغرض البناء أو التجارة بدون إقامة بناء.",
        "تنظيم واستغلال الأثاث الحضري واللوحات الإعلانية والشعارات الطريقية.",
        "زجر وتثبيت المخالفات المتعلقة بالاستغلال العشوائي وغير الترخيصي للملك العمومي.",
        "حجز السلع والمعدات المعرقلة للرصيف أو حركة المرور."
      ]
    },

    {
      id: "rural-animals",
      category: "rural",
      categoryLabel: "الشرطة القروية",
      title: "تجميع الكلاب الضالة ومكافحة داء السعار",
      icon: "🐕",
      desc: "تجميع الكلاب الشاردة بالمحجز الجماعي، مراقبة داء السعار، وحماية السكان والمواشي من أخطار الحيوانات المفترسة.",
      legalBasis: "المادة 50 - الفقرة 12",
      points: [
        "تجميع الكلاب الضالة بالشوارع داخل المدار الحضري والقروي وحجزها بالمحجز الجماعي.",
        "مكافحة داء السعار والتنسيق مع المصالح البيطرية لإجراء التلقيحات الضرورية.",
        "وضع الحيوانات المعضوضة أو المصابة تحت الحراسة البيطرية المباشرة.",
        "تفادي شرود البهائم والمواشي الضارة بالأغراس والمزروعات."
      ]
    },
    {
      id: "rural-forest-fire",
      category: "rural",
      categoryLabel: "الشرطة القروية",
      title: "الوقاية من الحرائق والآفات الطبيعية",
      icon: "🔥",
      desc: "تنظيم استعمال النار للوقاية من حرائق الغابات والمزروعات، واتخاذ التدابير العاجلة في حالات الفيضانات والكوارث.",
      legalBasis: "المادة 50 - الفقرة 14 و 15",
      points: [
        "تنظيم استعمال النار لتفادي الحرائق التي تهدد المساكن والنباتات والأغراس.",
        "حماية الأشجار والأغراس القروية من الطفيليات والحيوانات السائبة.",
        "اتخاذ تدابير الوقاية من الفيضانات والكوارث الطبيعية بتنسيق مع السلطات المحلية.",
        "ضمان حماية وتطهير نقاط المياه المخصصة للشرب والسقي."
      ]
    }
  ];
}

/* Filter and Render Domains */
function filterDomains(cat, btn) {
  if (btn) {
    document.querySelectorAll('.domain-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  renderDetailedDomainsGrid(cat);
}

function renderDetailedDomainsGrid(filterCategory = 'all') {
  const container = document.getElementById('detailed-domains-grid');
  if (!container) return;

  const data = getDetailedDomainsData();
  const lang = getLang();
  const filtered = filterCategory === 'all' 
    ? data 
    : data.filter(d => d.category === filterCategory);

  if (filtered.length === 0) {
    container.innerHTML = `<p style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-light);">${lang === 'ar' ? 'لم يتم العثور على مجالات في الفئة المختارة.' : 'Aucun domaine trouvé dans cette catégorie.'}</p>`;
    return;
  }

  container.innerHTML = filtered.map(d => `
    <div class="domain-card fade-in" id="${d.id}">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem;">
        <div class="domain-icon-box" style="margin-bottom:0;">${d.icon}</div>
        <span class="ticker-badge" style="background:rgba(13,148,136,0.1); color:var(--primary-light);">${d.categoryLabel}</span>
      </div>

      <h3 class="domain-title" style="font-size:1.3rem;">${d.title}</h3>
      <p style="font-size:0.825rem; color:var(--primary-light); font-weight:700; margin-bottom:0.75rem;">📜 ${d.legalBasis}</p>
      <p class="domain-desc" style="font-size:0.95rem;">${d.desc}</p>

      <button class="btn-outline" style="width:100%; font-size:0.875rem; padding:0.6rem;" onclick="openDomainModal('${d.id}')">
        ${lang === 'ar' ? 'عرض كافة الضوابط والمساطر التفصيلية ←' : 'Consulter toutes les règles →'}
      </button>
    </div>
  `).join('');
}

/* Domain Detail Modal */
function openDomainModal(id) {
  const data = getDetailedDomainsData();
  const item = data.find(d => d.id === id);
  if (!item) return;

  const lang = getLang();

  const modalHtml = `
    <div id="domain-detail-modal" class="search-modal active" onclick="if(event.target.id==='domain-detail-modal') closeDomainModal()">
      <div class="search-box-card" style="max-width:720px; padding:2rem;">
        <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid var(--border-color); padding-bottom:1rem; margin-bottom:1.5rem;">
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <span style="font-size:2rem;">${item.icon}</span>
            <div>
              <h3 style="font-size:1.4rem; color:var(--text-main);">${item.title}</h3>
              <span style="font-size:0.85rem; color:var(--primary-light); font-weight:700;">${item.legalBasis}</span>
            </div>
          </div>
          <button class="btn-icon" onclick="closeDomainModal()">❌</button>
        </div>

        <p style="font-size:1.05rem; color:var(--text-muted); line-height:1.7; margin-bottom:1.5rem;">${item.desc}</p>

        <h4 style="font-size:1.1rem; margin-bottom:1rem; color:var(--text-main);">${lang === 'ar' ? '📌 الضوابط والتكليفات الصريحة:' : '📌 Règles & Obligations Légales :'}</h4>
        <ul style="display:flex; flex-direction:column; gap:0.75rem; margin-bottom:2rem;">
          ${item.points.map(p => `
            <li style="background:var(--bg-main); padding:0.85rem 1.25rem; border-radius:var(--radius-md); ${lang === 'ar' ? 'border-right:4px solid var(--primary-light)' : 'border-left:4px solid var(--primary-light)'}; font-size:0.95rem; color:var(--text-muted);">
              ✔ ${p}
            </li>
          `).join('')}
        </ul>

        <div style="display:flex; justify-content:space-between; align-items:center; pt-1rem; border-top:1px solid var(--border-color);">
          <a href="procedures.html" class="btn-primary" style="font-size:0.875rem;">${lang === 'ar' ? 'المساطر والترخيصات المتعلقة ←' : 'Procédures associées →'}</a>
          <button class="btn-outline" onclick="closeDomainModal()">${lang === 'ar' ? 'إغلاق النافذة' : 'Fermer'}</button>
        </div>
      </div>
    </div>
  `;

  const existing = document.getElementById('domain-detail-modal');
  if (existing) existing.remove();

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeDomainModal() {
  const modal = document.getElementById('domain-detail-modal');
  if (modal) modal.remove();
}

/* Handle Hash Link Scroll */
function initDomainHashNavigation() {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }
}
