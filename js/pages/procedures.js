/* ==========================================================================
   PROCEDURES PAGE SCRIPT - Bilingual (AR/FR) Licensing Guides & Checklist Generator
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  updateProceduresStaticLabels();
  renderProceduresGrid('all');
});

/* Update Static Labels on Procedures Page */
function updateProceduresStaticLabels() {
  const lang = getLang();

  // Breadcrumbs & Headers
  const breadcrumb = document.querySelector('.hero-section .container div span:last-child');
  if (breadcrumb) breadcrumb.innerText = lang === 'ar' ? 'المساطر والترخيصات' : 'Procédures & Autorisations';

  const heroTag = document.querySelector('.hero-section .section-tag');
  if (heroTag) heroTag.innerText = lang === 'ar' ? 'دليل الترخيص والمساطر' : 'Guide des Autorisations Communales';

  const heroTitle = document.querySelector('.hero-section .hero-title');
  if (heroTitle) heroTitle.innerText = lang === 'ar' ? 'دليل المساطر والترخيصات الجماعية' : 'Guide des Procédures & Autorisations';

  const heroDesc = document.querySelector('.hero-description');
  if (heroDesc) heroDesc.innerText = lang === 'ar'
    ? 'دليل تفاعلي شامل لإيداع وتتبع طلبات رخص احتلال الملك العمومي، المؤسسات المرتبة، شواهد التعمير ورخص الدفن مع قائمة الوثائق المطلوبة لكل مسطرة.'
    : 'Guide interactif pour la constitution des dossiers d\'autorisation d\'occupation du domaine public, établissements classés, urbanisme et permis d\'inhumer.';

  // Filter Buttons
  const btns = document.querySelectorAll('.procedure-tab-btn');
  if (btns.length >= 6) {
    btns[0].innerText = lang === 'ar' ? '📋 جميع المساطر (5)' : '📋 Toutes les procédures (5)';
    btns[1].innerText = lang === 'ar' ? '🎪 احتلال الملك العمومي' : '🎪 Domaine Public';
    btns[2].innerText = lang === 'ar' ? '🏭 المؤسسات المرتبة' : '🏭 Établissements Classés';
    btns[3].innerText = lang === 'ar' ? '🏗️ التعمير والسكن' : '🏗️ Urbanisme & Permis';
    btns[4].innerText = lang === 'ar' ? '⚰️ الوقاية والجنائز' : '⚰️ Funérailles & Inhumation';
    btns[5].innerText = lang === 'ar' ? '⚡ التنفيذ التلقائي' : '⚡ Exécution d\'office';
  }
}

/* Detailed Procedures Dataset */
function getBilingualProceduresData() {
  const lang = getLang();

  if (lang === 'fr') {
    return [
      {
        id: "public-domain-occ",
        category: "domain",
        categoryLabel: "Domaine Public",
        title: "Permis d'Occupation Temporaire du Domaine Public",
        authority: "Président du Conseil Communal (Article 50)",
        icon: "🎪",
        timeline: "15 jours à compter du dépôt",
        fee: "Selon le barème fiscal communal",
        desc: "Autorise les commerces, cafés et étalages temporaires à occuper le trottoir sans construction.",
        docs: [
          "Demande manuscrite adressée au Président de la Commune.",
          "Copie de la Carte d'Identité Nationale (CIN).",
          "Plan descriptif de la surface d'occupation en m².",
          "Copie de l'autorisation d'exercer ou registre du commerce.",
          "Attestation de quitus fiscal communal."
        ]
      },
      {
        id: "classified-establishment-23",
        category: "establishments",
        categoryLabel: "Établissements Classés",
        title: "Autorisation / Déclaration d'Établissement Classé (2e & 3e Classe)",
        authority: "Président du Conseil Communal (Article 50)",
        icon: "🏭",
        timeline: "30 jours (2e classe) / Récépissé immédiat (3e classe)",
        fee: "Selon la catégorie de l'établissement",
        desc: "Formalité obligatoire pour l'ouverture d'établissements industriels ou commerciaux insalubres ou dangereux.",
        docs: [
          "Demande d'autorisation (2e classe) ou déclaration préalable (3e classe).",
          "Plan détaillé des locaux et liste des machines/moteurs avec leur puissance.",
          "Étude d'impact et conformité aux normes de prévention incendie.",
          "Titre de propriété ou contrat de bail commercial.",
          "Avis favorable de la Protection Civile et des services d'hygiène."
        ]
      },
      {
        id: "building-occupancy-permit",
        category: "building",
        categoryLabel: "Urbanisme & Permis",
        title: "Permis de Construire, Permis d'Habiter & Conformité",
        authority: "Président du Conseil / Président d'Arrondissement (Art. 50 & 104)",
        icon: "🏗️",
        timeline: "Selon les délais de la loi d'urbanisme 12.90",
        fee: "Taxes et redevances communales d'urbanisme",
        desc: "Délivrance des permis de construire, de morcellement, permis d'habiter et certificats de conformité.",
        docs: [
          "Plans architecturaux neufs approuvés par l'architecte du projet.",
          "Titre foncier ou certificat de propriété du terrain.",
          "Avis de la commission régionale d'urbanisme.",
          "Cahier des charges et règlements de construction.",
          "Rapport de fin de chantier pour la délivrance du permis d'habiter."
        ]
      },
      {
        id: "burial-transportation-permit",
        category: "health",
        categoryLabel: "Funérailles & Inhumation",
        title: "Permis d'Inhumer, d'Exhumer & Transport de Corps",
        authority: "Président du Conseil & Bureau Municipal d'Hygiène (BMH)",
        icon: "⚰️",
        timeline: "Délivrance immédiate 24h/24",
        fee: "Gratuit / Tarif du transport communal",
        desc: "Constatation médicale du décès et délivrance des autorisations légales pour l'inhumation ou le transport de corps.",
        docs: [
          "Certificat médical de décès délivré par le médecin du BMH.",
          "Copie de la CIN du défunt et du déclarant.",
          "Autorisation de l'autorité locale en cas de décès suspect.",
          "Autorisation du Procureur du Roi si nécessaire.",
          "Autorisation sanitaire pour le transport de corps."
        ]
      },
      {
        id: "execution-office-procedure",
        category: "execution",
        categoryLabel: "Exécution d'Office",
        title: "Procédure d'Exécution d'Office des Arrêtés Communaux",
        authority: "Président du Conseil & Force Publique (Articles 52 & 53)",
        icon: "⚡",
        timeline: "À l'expiration de la mise en demeure",
        fee: "Intégralement aux frais du contrevenant",
        desc: "Procédure d'exception permettant à la commune d'exécuter d'office et aux frais du contrevenant les travaux de voirie et de salubrité.",
        docs: [
          "Procès-verbal de constatation de l'infraction sur la voie publique.",
          "Mise en demeure officielle avec délai de régularisation.",
          "Arrêté d'exécution d'office pris par le Maire.",
          "Réquisition de la force publique auprès du Pacha/Caïd.",
          "Ordre de recouvrement des frais engagés par la commune."
        ]
      }
    ];
  }

  // Default Arabic
  return [
    {
      id: "public-domain-occ",
      category: "domain",
      categoryLabel: "احتلال الملك العمومي",
      title: "رخصة احتلال الملك العمومي الجماعي مؤقتاً",
      authority: "رئيس المجلس الجماعي (المادة 50)",
      icon: "🎪",
      timeline: "15 يوماً من تاريخ التقديم",
      fee: "حسب القرار التنظيمي الجبائي الجماعي",
      desc: "تسمح للمحلات التجارية والمقاهي والاستغلاليات المؤقتة باحتلال أجزاء من الرصيف أو الشارع العام بدون إقامة بناء.",
      docs: [
        "طلب خطي موجه إلى السيد رئيس المجلس الجماعي.",
        "نسخة من بطاقة التعريف الوطنية للمستفيد.",
        "تصميم هندسي أو بيان توضيحي للمساحة المراد احتلالها بالمتر المربع.",
        "نسخة من رخصة ممارسة النشاط التجاري أو السجل التجاري.",
        "شهادة إبراء الذمة من المستحقات الجماعية الجبائية."
      ]
    },
    {
      id: "classified-establishment-23",
      category: "establishments",
      categoryLabel: "المؤسسات المرتبة",
      title: "ترخيص/تصريح فتح مؤسسة مرتبة (الدرجة 2 و 3)",
      authority: "رئيس المجلس الجماعي (المادة 50)",
      icon: "🏭",
      timeline: "30 يوماً (الدرجة 2) / وصل فوري (الدرجة 3)",
      fee: "حسب طبيعة النشاط والدرجة",
      desc: "إجراء إجباري لفتح الأنشطة الصناعية والتجارية المضرة أو المزعجة أو الخطيرة لحماية البيئة وصحة السكان.",
      docs: [
        "طلب رخصة فتح (الدرجة 2) أو تصريح بالإيداع (الدرجة 3).",
        "تصميم تفصيلي للمحل وبيان الآلات والمحركات المستعملة وقوتها.",
        "دراسة التثبت من معايير الوقاية من الحريق والسلامة المهنية.",
        "عقد الملكية أو الكراء للمحل المخصص للنشاط.",
        "موافقة الوقاية المدنية والمصالح الصحية المختصة."
      ]
    },
    {
      id: "building-occupancy-permit",
      category: "building",
      categoryLabel: "التعمير والسكن",
      title: "رخص البناء، السكن وشواهد المطابقة",
      authority: "رئيس المجلس الجماعي / رئيس المقاطعة (المادة 50 و 104)",
      icon: "🏗️",
      timeline: "وفق ضوابط قانون التعمير 12.90",
      fee: "رسوم البناء والتعمير الجماعية",
      desc: "تسليم رخص البناء والتجزئة والتقسيم ورخص السكن وشواهد المطابقة للبنايات الواقعة داخل النفوذ الترابي للجماعة.",
      docs: [
        "التصاميم المعمارية والهندسية المصادق عليها من المهندس المعماري.",
        "شهادة الملكية العقارية أو التصميم العقاري.",
        "موافقة اللجنة الإقليمية المختصة بالتعمير.",
        "دفتر الشروط والضوابط البنائية الجماعية.",
        "تقرير انتهاء الأشغال لإصدار رخصة السكن."
      ]
    },
    {
      id: "burial-transportation-permit",
      category: "health",
      categoryLabel: "الوقاية والجنائز",
      title: "رخصة الدفن ونقل الجثث وشرطة الجنائز",
      authority: "رئيس المجلس الجماعي والمكتب الصحي الجماعي (BMH)",
      icon: "⚰️",
      timeline: "تسليم فوري (مستعجل 24/24)",
      fee: "مجاني / رسوم نقل الأموات الجماعي",
      desc: "المعاينة الطبية للوفاة وتوفير الترخيص القانوني لدفن المتوفى أو نقل الجثة داخل أو خارج الجماعة.",
      docs: [
        "شهادة الوفاة الطبية المسلمة من الطبيب المعاين بالمكتب الصحي.",
        "نسخة من بطاقة التعريف الوطنية للمتوفى والمصرح بالوفاة.",
        "إذن السلطة المحلية (الباشا أو القايد) فور ثبوت الوفاة غير العادية.",
        "إذن وكيل الملك بالدفن في الحالات القضائية.",
        "ترخيص صحي لنقل الجثة في حالة الوفاة بأمراض معدية."
      ]
    },
    {
      id: "execution-office-procedure",
      category: "execution",
      categoryLabel: "التنفيذ التلقائي",
      title: "مسطرة التنفيذ التلقائي لقرارات الجماعة",
      authority: "رئيس الجماعة والقوة العمومية (المادة 52 و 53)",
      icon: "⚡",
      timeline: "فور فوات أجل الإعذار أو مستعجل",
      fee: "على نفقة المخالف بالكامل",
      desc: "مسطرة استثنائية تمكن الجماعة من إزالة المخالفات المهددة للنظافة أو السير أو الصحة تلقائياً وعلى نفقة المخالف.",
      docs: [
        "محضر معاينة ثبت فيه الضرر القائم بالشارع العام أو الصحة.",
        "توجيه إعذار رسمي للمخالف مع تحديد أجل لإزالة الضرر.",
        "قرار رئيس الجماعة بالتنفيذ التلقائي فور الامتناع.",
        "طلب تسخير القوة العمومية من السلطة المحلية إن اقتضى الحال.",
        "أمر بتأدية المصاريف الجماعية على نفقة المعني بالأمر."
      ]
    }
  ];
}

/* Filter and Render Procedures Grid */
function filterProcedures(cat, btn) {
  if (btn) {
    document.querySelectorAll('.procedure-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  renderProceduresGrid(cat);
}

function renderProceduresGrid(filterCategory = 'all') {
  const container = document.getElementById('procedures-grid');
  if (!container) return;

  const data = getBilingualProceduresData();
  const lang = getLang();
  const filtered = filterCategory === 'all' 
    ? data 
    : data.filter(p => p.category === filterCategory);

  if (filtered.length === 0) {
    container.innerHTML = `<p style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-light);">${lang === 'ar' ? 'لم يتم العثور على مساطر في الفئة المختارة.' : 'Aucune procédure trouvée dans cette catégorie.'}</p>`;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="glass-panel fade-in" style="padding:2rem;" id="${p.id}">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem; border-bottom:1px solid var(--border-color); padding-bottom:1rem;">
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <span style="font-size:2rem;">${p.icon}</span>
          <div>
            <h3 style="font-size:1.3rem;">${p.title}</h3>
            <span style="font-size:0.825rem; color:var(--primary-light); font-weight:700;">🏛️ ${p.authority}</span>
          </div>
        </div>
        <span class="ticker-badge" style="background:rgba(13,148,136,0.1); color:var(--primary-light);">${p.categoryLabel}</span>
      </div>

      <p style="color:var(--text-muted); font-size:0.975rem; line-height:1.7; margin-bottom:1.5rem;">${p.desc}</p>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1.5rem; background:var(--bg-main); padding:1rem; border-radius:var(--radius-md);">
        <div>
          <span style="font-size:0.8rem; color:var(--text-light); font-weight:700;">⏳ ${lang === 'ar' ? 'أجل المعالجة:' : 'Délai de traitement :'}</span>
          <p style="font-size:0.9rem; font-weight:700; color:var(--text-main);">${p.timeline}</p>
        </div>
        <div>
          <span style="font-size:0.8rem; color:var(--text-light); font-weight:700;">💰 ${lang === 'ar' ? 'الواجبات والرسوم:' : 'Frais & Redevances :'}</span>
          <p style="font-size:0.9rem; font-weight:700; color:var(--text-main);">${p.fee}</p>
        </div>
      </div>

      <h4 style="font-size:1rem; margin-bottom:0.75rem; color:var(--text-main);">📄 ${lang === 'ar' ? 'قائمة الوثائق والمستندات المطلوبة:' : 'Documents requis :'}</h4>
      <ul style="display:flex; flex-direction:column; gap:0.5rem; margin-bottom:1.5rem;">
        ${p.docs.map(doc => `
          <li style="font-size:0.9rem; color:var(--text-muted); display:flex; align-items:flex-start; gap:0.5rem;">
            <span style="color:var(--primary-light); font-weight:bold;">▪</span> ${doc}
          </li>
        `).join('')}
      </ul>

      <button class="btn-primary" style="width:100%; font-size:0.9rem;" onclick="generateProcedureChecklist('${p.id}')">
        📋 ${lang === 'ar' ? 'تحميل / طباعة قائمة الوثائق الخاصة بهذه المسطرة' : 'Imprimer / Copier la liste des documents'}
      </button>
    </div>
  `).join('');
}

/* Print/Copy Checklist Modal */
function generateProcedureChecklist(id) {
  const data = getBilingualProceduresData();
  const item = data.find(p => p.id === id);
  if (!item) return;

  const lang = getLang();
  const titleHeader = lang === 'ar' ? `دليل وثائق: ${item.title}` : `Liste des documents : ${item.title}`;
  const authHeader = lang === 'ar' ? `الجهة المختصة: ${item.authority}` : `Autorité compétente : ${item.authority}`;
  const docsHeader = lang === 'ar' ? `الوثائق المطلوبة:` : `Documents requis :`;

  const checklistText = `${titleHeader}\n${authHeader}\n\n${docsHeader}\n` + 
    item.docs.map((d, i) => `${i+1}. ${d}`).join('\n');

  const modalHtml = `
    <div id="checklist-modal" class="search-modal active" onclick="if(event.target.id==='checklist-modal') closeChecklistModal()">
      <div class="search-box-card" style="max-width:650px; padding:2rem;">
        <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid var(--border-color); padding-bottom:1rem; margin-bottom:1.5rem;">
          <h3 style="font-size:1.3rem;">📋 ${titleHeader}</h3>
          <button class="btn-icon" onclick="closeChecklistModal()">❌</button>
        </div>

        <div style="background:var(--bg-main); padding:1.25rem; border-radius:var(--radius-md); font-family:monospace; font-size:0.9rem; color:var(--text-main); white-space:pre-wrap; margin-bottom:1.5rem; border:1px solid var(--border-color);">
${checklistText}
        </div>

        <div style="display:flex; gap:1rem; justify-content:flex-end;">
          <button class="btn-accent" onclick="navigator.clipboard.writeText(\`${checklistText.replace(/`/g, '\\`')}\`); alert('${lang === 'ar' ? 'تم نسخ القائمة بنجاح!' : 'Liste copiée !'}');">
            📋 ${lang === 'ar' ? 'نسخ النص' : 'Copier'}
          </button>
          <button class="btn-outline" onclick="window.print()">
            🖨️ ${lang === 'ar' ? 'طباعة' : 'Imprimer'}
          </button>
          <button class="btn-primary" onclick="closeChecklistModal()">
            ${lang === 'ar' ? 'تم' : 'Fermer'}
          </button>
        </div>
      </div>
    </div>
  `;

  const existing = document.getElementById('checklist-modal');
  if (existing) existing.remove();

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeChecklistModal() {
  const modal = document.getElementById('checklist-modal');
  if (modal) modal.remove();
}
