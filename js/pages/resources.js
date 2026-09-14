/* ==========================================================================
   RESOURCES & GLOSSARY PAGE SCRIPT - Bilingual (AR/FR) Searchable Glossary
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  updateResourcesStaticLabels();
  renderGlossaryGrid('all');
  renderAlphabetFilter();
});

/* Update Static Labels on Resources Page */
function updateResourcesStaticLabels() {
  const lang = getLang();

  // Breadcrumbs & Headers
  const breadcrumbHome = document.querySelector('.hero-section .container div a');
  if (breadcrumbHome) breadcrumbHome.innerText = lang === 'ar' ? 'الرئيسية' : 'Accueil';

  const breadcrumb = document.querySelector('.hero-section .container div span:last-child');
  if (breadcrumb) breadcrumb.innerText = lang === 'ar' ? 'المكتبة الرقمية والمعجم' : 'Ressources & Lexique';

  const heroTag = document.querySelector('.hero-section .section-tag');
  if (heroTag) heroTag.innerText = lang === 'ar' ? 'القاموس والمستندات المرجعية' : 'Lexique & Textes de Référence';

  const heroTitle = document.querySelector('.hero-section .hero-title');
  if (heroTitle) heroTitle.innerText = lang === 'ar' ? 'معجم المصطلحات والمكتبة التشريعية' : 'Lexique Juridique & Textes Législatifs';

  const heroDesc = document.querySelector('.hero-description');
  if (heroDesc) heroDesc.innerText = lang === 'ar'
    ? 'قاموس قانوني تفاعلي يضم الشرح والتعريف المفصل لأهم مصطلحات الشرطة الإدارية الجماعية المقتبسة من الدليل الرسمي والنصوص التشريعية المغربية.'
    : 'Dictionnaire juridique interactif avec définitions détaillées des termes de la police administrative issus des textes législatifs marocains.';

  // Section 1: Glossary Headers
  const glossarySection = document.querySelector('section:nth-of-type(2)');
  if (glossarySection) {
    const tag = glossarySection.querySelector('.section-tag');
    if (tag) tag.innerText = lang === 'ar' ? 'القاموس القانوني التفاعلي' : 'Lexique Juridique Interactif';

    const title = glossarySection.querySelector('.section-title');
    if (title) title.innerText = lang === 'ar' ? 'معجم مصطلحات الشرطة الإدارية' : 'Lexique de la Police Administrative';

    const desc = glossarySection.querySelector('.section-desc');
    if (desc) desc.innerText = lang === 'ar' 
      ? 'ابحث في المصطلحات والتعاريف الفقهية أو صفّها حسب الحرف الأبجدي.' 
      : 'Recherchez un terme juridique ou filtrez par ordre alphabétique.';
  }

  const searchInput = document.getElementById('glossary-search-input');
  if (searchInput) searchInput.placeholder = lang === 'ar' ? 'ابحث عن مصطلح قانوني (مثال: السكينة العامة، التنفيذ التلقائي...)' : 'Rechercher un terme (ex: Ordre Public, Exécution d\'office...)';

  // Section 2: Legislative Library Section & Cards
  const libSection = document.getElementById('legislative-library') || document.querySelector('section:nth-of-type(3)');
  if (libSection) {
    const tag = libSection.querySelector('.section-tag');
    if (tag) tag.innerText = lang === 'ar' ? 'الوثائق والنصوص المرجعية' : 'Textes de Référence';

    const title = libSection.querySelector('.section-title');
    if (title) title.innerText = lang === 'ar' ? 'المكتبة التشريعية والنصوص المؤطرة' : 'Bibliothèque Législative';

    const desc = libSection.querySelector('.section-desc');
    if (desc) desc.innerText = lang === 'ar' 
      ? 'النصوص والمراسيم الصادرة في الجريدة الرسمية والمتعلقة بممارسة الشرطة الإدارية الجماعية.' 
      : 'Lois, décrets et dahirs régissant la police administrative communale au Maroc.';

    const decreeCards = libSection.querySelectorAll('.glass-panel');
    if (decreeCards.length >= 4) {
      if (lang === 'fr') {
        decreeCards[0].querySelector('span').innerText = 'Charte Communale';
        decreeCards[0].querySelector('h4').innerText = 'Loi n° 78.00 modifiée par la Loi 17.08';
        decreeCards[0].querySelector('p').innerText = 'Texte fondamental définissant les compétences du Maire (art. 50, 52, 53) et du Conseil (art. 37 à 40).';

        decreeCards[1].querySelector('span').innerText = "Exécution d'Office";
        decreeCards[1].querySelector('h4').innerText = 'Décret n° 2.78.157 (26 mai 1980)';
        decreeCards[1].querySelector('p').innerText = "Conditions d'exécution d'office des arrêtés de voirie, de salubrité et de tranquillité publique.";

        decreeCards[2].querySelector('span').innerText = 'Établissements Classés';
        decreeCards[2].querySelector('h4').innerText = 'Dahir du 17 août 1914';
        decreeCards[2].querySelector('p').innerText = 'Réglementation des établissements insalubres, incommodes ou dangereux et leur classification en 3 catégories.';

        decreeCards[3].querySelector('span').innerText = 'Urbanisme';
        decreeCards[3].querySelector('h4').innerText = "Loi n° 12.90 relative à l'Urbanisme";
        decreeCards[3].querySelector('p').innerText = "Règles relatives aux permis de construire, d'habiter, certificats de conformité et voirie.";
      } else {
        decreeCards[0].querySelector('span').innerText = 'الميثاق الجماعي';
        decreeCards[0].querySelector('h4').innerText = 'القانون رقم 78.00 المعدل بالقانون 17.08';
        decreeCards[0].querySelector('p').innerText = 'النص الأساسي المحدد لاختصاصات رئيس الجماعة في المواد 50، 52، و53 والمجلس الجماعي في المواد 37 إلى 40.';

        decreeCards[1].querySelector('span').innerText = 'التنفيذ التلقائي';
        decreeCards[1].querySelector('h4').innerText = 'المرسوم رقم 2.78.157 (26 ماي 1980)';
        decreeCards[1].querySelector('p').innerText = 'تحديد الشروط والإجراءات التي تنفذ بها تلقائياً التدابير الرامية إلى ضمان سلامة المرور والصحة العمومية والسكينة.';

        decreeCards[2].querySelector('span').innerText = 'المؤسسات المرتبة';
        decreeCards[2].querySelector('h4').innerText = 'ظهير 25 شوال 1332 (17 أغسطس 1914)';
        decreeCards[2].querySelector('p').innerText = 'الظهير الشريف المنظم للمؤسسات المضرة أو المزعجة أو الخطيرة وتحديد درجات تصنيفها وضوابط فتحها وإغلاقها.';

        decreeCards[3].querySelector('span').innerText = 'قوانين التعمير';
        decreeCards[3].querySelector('h4').innerText = 'القانون رقم 12.90 المتعلق بالتعمير';
        decreeCards[3].querySelector('p').innerText = 'ضوابط رخص البناء، السكن، شهادات المطابقة، ورخص احتلال الملك العمومي لغرض البناء وزجر المخالفات.';
      }
    }
  }
}

/* Complete Bilingual Glossary Dataset */
function getBilingualGlossaryData() {
  const lang = getLang();

  if (lang === 'fr') {
    return [
      {
        letter: "P",
        term: "Police Administrative",
        def: "Moyen juridique permettant à l'administration d'intervenir pour préserver l'ordre public sous toutes ses formes."
      },
      {
        letter: "P",
        term: "Police Administrative Générale",
        def: "Ensemble des mesures visant à préserver l'ordre public (sécurité, tranquillité et salubrité publique) applicables à tous sans distinction."
      },
      {
        letter: "P",
        term: "Police Administrative Spéciale",
        def: "Compétences attribuées par des lois particulières à un domaine précis (police de l'urbanisme, de la chasse, des débits de boissons)."
      },
      {
        letter: "O",
        term: "Ordre Public",
        def: "Ensemble des règles fondamentales garantissant la sécurité publique, la tranquillité publique et la salubrité publique."
      },
      {
        letter: "T",
        term: "Tranquillité Publique",
        def: "Maintien de la paix sociale et prévention des nuisances sonores et rassemblements perturbateurs sur la voie publique."
      },
      {
        letter: "S",
        term: "Salubrité Publique",
        def: "Protection de la population contre les épidémies, la pollution et contrôle de l'hygiène des denrées et établissements publics."
      },
      {
        letter: "E",
        term: "Exécution d'Office",
        def: "Faculté pour l'administration d'exécuter d'office ses décisions aux frais du contrevenant en cas de refus d'obtempérer."
      },
      {
        letter: "E",
        term: "Établissements Classés",
        def: "Établissements insalubres, incommodes ou dangereux réglementés par le dahir de 1914 et divisés en 3 catégories."
      },
      {
        letter: "D",
        term: "Décisions Réglementaires",
        def: "Arrêtés à caractère général et abstrait imposant des obligations ou interdictions à l'ensemble de la population."
      },
      {
        letter: "D",
        term: "Décisions Individuelles",
        def: "Mesures nominatives contenant un ordre, une autorisation ou une interdiction visant un cas précis."
      },
      {
        letter: "C",
        term: "Conseil Communal",
        def: "Organe délibérant de la commune chargé du classement du domaine public et de l'adoption des règlements d'hygiène."
      },
      {
        letter: "M",
        term: "Maire / Président du Conseil",
        def: "Autorité exécutive directe titulaire des pouvoirs de police administrative communale en vertu de l'article 50."
      },
      {
        letter: "A",
        term: "Autorité Locale (Pacha / Caïd)",
        def: "Représentant du pouvoir central titulaire des compétences de sécurité publique énumérées à l'article 49."
      },
      {
        letter: "B",
        term: "Bureau Municipal d'Hygiène (BMH)",
        def: "Service communal chargé des constatations médicales de décès, de la désinfection et du contrôle d'hygiène."
      },
      {
        letter: "O",
        term: "Occupation du Domaine Public",
        def: "Autorisation temporaire d'exploiter une portion du domaine public communal (terrasses, étalages) sans construction."
      }
    ];
  }

  // Default Arabic
  return [
    {
      letter: "ش",
      term: "الشرطة الإدارية",
      def: "الوسيلة القانونية التي تبيح للإدارة التدخل للحفاظ على النظام العام بكافة مدلولاته في إطار الاختصاصات المنوطة بها."
    },
    {
      letter: "ش",
      term: "الشرطة الإدارية العامة",
      def: "مجموع الإجراءات والتدابير المتخذة للحفاظ على النظام العام، بغض النظر عن المخاطبين، وتطبق على جميع الأنشطة دون تحديد أو تمييز."
    },
    {
      letter: "ش",
      term: "الشرطة الإدارية الخاصة",
      def: "الاختصاصات التي خولها القانون لجهة معينة في ميدان محدد يتسم بالخصوصية (كشرطة التعمير، شرطة الصيد، شرطة المشروبات الكحولية)."
    },
    {
      letter: "ن",
      term: "النظام العام",
      def: "مجموع القواعد الجوهرية والاستقرار المجتمعي الذي يضمن الأمن العام، السكينة العامة، والصحة العمومية داخل تراب الجماعة."
    },
    {
      letter: "س",
      term: "السكينة العامة",
      def: "ضمان الطمأنينة وعدم إزعاج السكان بالضوضاء، الأصوات النكراء، والتجمع المقلق للراحة بالشارع العام والمحلات العمومية."
    },
    {
      letter: "ص",
      term: "الصحة العمومية",
      def: "حماية المجتمع من انتشار الأمراض الوبائية والتلوث، وضمان شروط النظافة والسلامة بالمحلات والمأكولات والمياه."
    },
    {
      letter: "ت",
      term: "التنفيذ التلقائي (Exécution d'office)",
      def: "قيام رئيس المجلس الجماعي بتنفيذ القرارات بنفسه وعلى نفقة المعنيين بالأمر عند امتناعهم عن إزالة الضرر، واستعمال القوة العمومية."
    },
    {
      letter: "م",
      term: "المؤسسات المرتبة",
      def: "المؤسسات المضرة أو المزعجة أو الخطيرة المنظمة بموجب ظهير 1914، والمقسمة إلى ثلاث درجات حسب خطورتها على الصحة والبيئة."
    },
    {
      letter: "ق",
      term: "القرارات التنظيمية",
      def: "قرارات ذات صبغة عامة ومجردة تفرض أمراً أو منعاً على سكان الجماعة، وتتميز بقابليتها للتطبيق في كل وقت وحين."
    },
    {
      letter: "ق",
      term: "القرارات الفردية",
      def: "قرارات تتضمن أمراً أو منعاً أو إذناً تهم حالات خاصة ولا تطبق إلا مرة واحدة (كقرار إغلاق محل أو هدم بناية آيلة للسقوط)."
    },
    {
      letter: "م",
      term: "المجلس الجماعي",
      def: "الهيئة التداولية للجماعة المخولة بتحديد وتصنيف الأملاك العامة، والمصادقة على الأنظمة العامة للنظافة والوقاية الصحية."
    },
    {
      letter: "ر",
      term: "رئيس المجلس الجماعي",
      def: "السلطة التنفيذية المباشرة الممارسة للشرطة الإدارية الجماعية بموجب المادة 50 من الميثاق الجماعي."
    },
    {
      letter: "ر",
      term: "رجل السلطة المحلية (الباشا / القايد)",
      def: "ممارس اختصاصات الشرطة الإدارية المحصورة بموجب المادة 49 (الأمن، الجمعيات، الباعة المتجولين، المشروبات الكحولية)."
    },
    {
      letter: "م",
      term: "المكتب الجماعي للوقاية الصحية (BMH)",
      def: "المرفق التابع للجماعة المكلف بالمعاينة الطبية للوفيات، محاربة الحشرات والأوبئة، ومراقبة الجودة بالمحلات العامة."
    },
    {
      letter: "ح",
      term: "احتلال الملك العمومي مؤقتاً",
      def: "الترخيص الجماعي المستمر أو الفصلي للاستغلال المؤقت للرصيف أو الطرقات الجماعية بدون إقامة بناء لغرض تجاري أو حرفي."
    }
  ];
}

/* Render Alphabet Filter */
function renderAlphabetFilter() {
  const container = document.getElementById('alphabet-filter-container');
  if (!container) return;

  const lang = getLang();
  const letters = lang === 'ar' 
    ? ['الكل', 'أ', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ر', 'س', 'ش', 'ص', 'ط', 'ع', 'ق', 'م', 'ن']
    : ['Tous', 'A', 'B', 'C', 'D', 'E', 'M', 'O', 'P', 'S', 'T'];

  container.innerHTML = letters.map((l, idx) => `
    <button class="glossary-letter-btn ${idx === 0 ? 'active' : ''}" onclick="filterGlossaryByLetter('${l}', this)">
      ${l}
    </button>
  `).join('');
}

/* Filter Glossary Functions */
function filterGlossaryByLetter(letter, btn) {
  if (btn) {
    document.querySelectorAll('.glossary-letter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  renderGlossaryGrid(letter);
}

function searchGlossaryLive(query) {
  renderGlossaryGrid('all', query.trim().toLowerCase());
}

function renderGlossaryGrid(letterFilter = 'all', searchQuery = '') {
  const container = document.getElementById('glossary-cards-container');
  if (!container) return;

  const lang = getLang();
  const data = getBilingualGlossaryData();
  let filtered = data;

  if (letterFilter !== 'الكل' && letterFilter !== 'Tous' && letterFilter !== 'all') {
    filtered = filtered.filter(item => item.letter === letterFilter || item.term.toUpperCase().startsWith(letterFilter));
  }

  if (searchQuery) {
    filtered = filtered.filter(item => 
      item.term.toLowerCase().includes(searchQuery) || 
      item.def.toLowerCase().includes(searchQuery)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `<p style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-light);">${lang === 'ar' ? 'لم يتم العثور على مصطلحات تطابق البحث.' : 'Aucun terme ne correspond à la recherche.'}</p>`;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="glass-panel fade-in" style="padding:1.75rem; ${lang === 'ar' ? 'border-right:4px solid var(--primary-light)' : 'border-left:4px solid var(--primary-light)'};">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.75rem;">
        <h3 style="font-size:1.25rem; color:var(--text-main);">${item.term}</h3>
        <span class="ticker-badge" style="background:rgba(13,148,136,0.1); color:var(--primary-light);">${item.letter}</span>
      </div>
      <p style="font-size:0.95rem; color:var(--text-muted); line-height:1.7;">${item.def}</p>
    </div>
  `).join('');
}
