/* ==========================================================================
   LEGAL FRAMEWORK PAGE SCRIPT - Bilingual (AR/FR) Concepts, Measures & Authorities
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  updateLegalStaticLabels();
  renderLegalConcepts();
  renderExecutionMeasures();
  renderAuthoritiesDetailed();
  renderGovernancePrinciplesDetailed();
});

/* Static Labels Translator */
function updateLegalStaticLabels() {
  const lang = getLang();

  // Breadcrumbs
  const breadcrumb = document.querySelector('.hero-section .container div span:last-child');
  if (breadcrumb) breadcrumb.innerText = lang === 'ar' ? 'الإطار القانوني والأجهزة' : 'Cadre Légal & Autorités';

  const heroTag = document.querySelector('.hero-section .section-tag');
  if (heroTag) heroTag.innerText = lang === 'ar' ? 'النصوص التشريعية والميثاق الجماعي' : 'Textes Législatifs & Charte Communale';

  const heroTitle = document.querySelector('.hero-section .hero-title');
  if (heroTitle) heroTitle.innerText = lang === 'ar' ? 'الإطار القانوني والأجهزة الممارسة للشرطة الإدارية' : 'Cadre Juridique et Autorités de la Police Administrative';

  const heroDesc = document.querySelector('.hero-section .hero-description');
  if (heroDesc) heroDesc.innerText = lang === 'ar'
    ? 'منظومة قانونية محكمة تستمد قوتها من الدستور والميثاق الجماعي لتنظيم التدخل الإداري وتحديد حدود صلاحيات رئيس المجلس الجماعي، رجل السلطة المحلية، والمجلس الجماعي بما يضمن حماية حقوق وحريات الأفراد.'
    : 'Un cadre juridique rigoureux fondé sur la Constitution et la Charte Communale pour régir l\'intervention administrative et définir les prérogatives du Maire, de l\'Autorité Locale et du Conseil Communal.';

  // Section Headers
  const secTags = document.querySelectorAll('.section-tag');
  const secTitles = document.querySelectorAll('.section-title');
  const secDescs = document.querySelectorAll('.section-desc');

  if (secTags.length >= 4) {
    secTags[1].innerText = lang === 'ar' ? 'مفاهيم أساسية' : 'Notions Fondamentales';
    secTags[2].innerText = lang === 'ar' ? 'تدابير الممارسة العملية' : 'Modes d\'Intervention';
    secTags[3].innerText = lang === 'ar' ? 'توزيع الاختصاصات' : 'Répartition des Compétences';
    if (secTags[4]) secTags[4].innerText = lang === 'ar' ? 'ضوابط عدم التداخل' : 'Principes d\'Encadrement';
  }

  if (secTitles.length >= 4) {
    secTitles[0].innerText = lang === 'ar' ? 'ما هي الشرطة الإدارية؟' : 'Qu\'est-ce que la Police Administrative ?';
    secTitles[1].innerText = lang === 'ar' ? 'وسائل وآليات ممارسة الشرطة الإدارية' : 'Moyens et Instruments d\'Action';
    secTitles[2].innerText = lang === 'ar' ? 'الأجهزة والجهات الممارسة للشرطة الإدارية' : 'Autorités & Organes d\'Exécution';
    if (secTitles[3]) secTitles[3].innerText = lang === 'ar' ? 'المبادئ القانونية الثلاثة لضوابط الممارسة' : 'Les 3 Principes Fondamentaux de Gouvernance';
  }

  if (secDescs.length >= 4) {
    secDescs[0].innerText = lang === 'ar' ? 'الوسيلة القانونية التي تبيح للإدارة التدخل للحفاظ على النظام العام بعناصره الثلاثة: الأمن العام، السكينة العامة، والصحة العمومية.' : 'Moyen juridique permettant à l\'administration d\'intervenir pour préserver l\'ordre public (sécurité, tranquillité, salubrité).';
    secDescs[1].innerText = lang === 'ar' ? 'تتم ممارسة الشرطة الإدارية الجماعية عبر ثلاثة وسائل رئيسية حددها القانون والأنظمة الجاري بها العمل.' : 'L\'action de la police administrative s\'exerce à travers 3 modes d\'intervention principaux.';
    secDescs[2].innerText = lang === 'ar' ? 'تفصيل دقيق لصلاحيات كل طرف لمنع التداخل والنزاع بين الجماعات الترابية والإدارة المحلية.' : 'Répartition claire des rôles pour éviter les conflits d\'attributions entre la commune et l\'autorité locale.';
    if (secDescs[3]) secDescs[3].innerText = lang === 'ar' ? 'مبادئ مؤطرة لخضوع الشرطة الإدارية المحلية للقانون ومنع التضارب مع القرارات الوطنية.' : 'Règles juridiques encadrant la soumission des arrêtés communaux à la législation nationale.';
  }
}

/* Render Concepts */
function renderLegalConcepts() {
  const container = document.getElementById('legal-concepts-container');
  if (!container) return;

  const lang = getLang();

  const concepts = lang === 'ar' ? [
    {
      title: "الشرطة الإدارية العامة",
      badge: "عامة ومجردة",
      icon: "🏛️",
      desc: "مجموع الإجراءات والتدابير المتخذة للحفاظ على النظام العام (الأمن، السكينة، والصحة العمومية)، وتطبق على جميع الأنشطة دون تحديد أو تمييز."
    },
    {
      title: "الشرطة الإدارية الخاصة",
      badge: "نصوص خاصة",
      icon: "📜",
      desc: "الاختصاصات المخولة قانوناً لجهة معينة في ميدان محدد يتسم بالخصوصية (كشرطة التعمير، شرطة الصيد، شرطة المشروبات الكحولية)."
    },
    {
      title: "الشرطة الإدارية vs المرفق العام",
      badge: "تمييز وظيفي",
      icon: "⚖️",
      desc: "تهدف الشرطة الإدارية إلى حماية النظام العام (الضبط والمنع والترخيص)، في حين يهدف المرفق العام إلى تقديم خدمة ومصلحة عامة للمواطنين."
    }
  ] : [
    {
      title: "Police Administrative Générale",
      badge: "Générale & Abstraite",
      icon: "🏛️",
      desc: "Ensemble des mesures visant à préserver l'ordre public (sécurité, tranquillité et salubrité publique) applicables à tous sans distinction."
    },
    {
      title: "Police Administrative Spéciale",
      badge: "Textes Spéciaux",
      icon: "📜",
      desc: "Compétences attribuées par des lois particulières à un domaine précis (police de l'urbanisme, de la chasse, des débits de boissons)."
    },
    {
      title: "Police Administrative vs Service Public",
      badge: "Distinction Fonctionnelle",
      icon: "⚖️",
      desc: "La police administrative vise la protection de l'ordre public (réglementation, interdictions, autorisations), tandis que le service public fournit des prestations d'intérêt général."
    }
  ];

  container.innerHTML = concepts.map(c => `
    <div class="domain-card fade-in">
      <div class="domain-icon-box">${c.icon}</div>
      <span class="section-tag" style="align-self:flex-start; margin-bottom:0.75rem; font-size:0.75rem;">${c.badge}</span>
      <h3 class="domain-title">${c.title}</h3>
      <p class="domain-desc">${c.desc}</p>
    </div>
  `).join('');
}

/* Render Execution Measures */
function renderExecutionMeasures() {
  const container = document.getElementById('measures-container');
  if (!container) return;

  const lang = getLang();

  const measures = lang === 'ar' ? [
    {
      title: "التدابير التنظيمية (Décisions Réglementaires)",
      type: "قرارات عامة",
      icon: "📋",
      details: "قرارات ذات صبغة عامة ومجردة تفرض أمراً أو منعاً على سكان الجماعة أو فئة منهم. قابلة للتطبيق في كل وقت وحين، كأنظمة النظافة العامة وتشوير الطرق."
    },
    {
      title: "التدابير الفردية (Décisions Individuelles)",
      type: "حالات خاصة",
      icon: "📑",
      details: "قرارات فردية تتضمن أمراً أو منعاً أو إذناً تصدر عن رئيس المجلس الجماعي لحالة محددة وتطبق مرة واحدة. مثل قرار هدم بناية آيلة للسقوط أو إغلاق محل غير صحي."
    },
    {
      title: "التنفيذ التلقائي (Exécution d'office)",
      type: "المادة 52 و 53",
      icon: "⚡",
      details: "قيام رئيس المجلس الجماعي تلقائياً وعلى نفقة المعنيين بالأمر بتنفيذ التدابير الرامية إلى ضمان سلامة المرور والسكينة والصحة العمومية عند امتناع المخالفين."
    }
  ] : [
    {
      title: "Décisions Réglementaires",
      type: "Portée Générale",
      icon: "📋",
      details: "Arrêtés à caractère général et abstrait imposant des obligations ou interdictions à l'ensemble de la population (règlements de salubrité, voirie)."
    },
    {
      title: "Décisions Individuelles",
      type: "Cas Particuliers",
      icon: "📑",
      details: "Mesures nominatives contenant un ordre, une autorisation ou une interdiction visant un cas précis (permis de démolir, fermeture d'établissement)."
    },
    {
      title: "Exécution d'Office",
      type: "Articles 52 & 53",
      icon: "⚡",
      details: "Faculté pour le Maire d'exécuter d'office et aux frais du contrevenant les arrêtés de voirie, salubrité et tranquillité publique avec recours à la force publique."
    }
  ];

  container.innerHTML = measures.map(m => `
    <div class="glass-panel" style="padding:1.75rem; ${lang === 'ar' ? 'border-right:5px solid var(--primary-light)' : 'border-left:5px solid var(--primary-light)'};">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.75rem;">
        <h4 style="font-size:1.2rem; display:flex; align-items:center; gap:0.5rem;">
          <span>${m.icon}</span> ${m.title}
        </h4>
        <span class="ticker-badge">${m.type}</span>
      </div>
      <p style="color:var(--text-muted); font-size:0.975rem; line-height:1.7;">${m.details}</p>
    </div>
  `).join('');
}

/* Render Authorities */
function renderAuthoritiesDetailed() {
  const container = document.getElementById('authorities-detail-container');
  const t = getTranslation();
  if (!container || !t || !t.authorities) return;

  const lang = getLang();

  container.innerHTML = t.authorities.map(a => `
    <div class="glass-panel" style="padding:2rem; margin-bottom:1.5rem;">
      <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1.25rem; border-bottom:1px solid var(--border-color); padding-bottom:1rem;">
        <div class="domain-icon-box" style="width:50px; height:50px; font-size:1.5rem; margin-bottom:0;">${a.icon}</div>
        <div>
          <h3 style="font-size:1.3rem;">${a.role}</h3>
          <span style="font-size:0.875rem; color:var(--primary-light); font-weight:700;">${a.scope}</span>
        </div>
      </div>
      <h4 style="font-size:1rem; margin-bottom:0.75rem; color:var(--text-main);">${lang === 'ar' ? 'أبرز الاختصاصات والمهام:' : 'Principales compétences :'}</h4>
      <ul style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.75rem;">
        ${a.duties.map(d => `
          <li style="background:var(--bg-main); padding:0.75rem 1rem; border-radius:var(--radius-md); border:1px solid var(--border-color); font-size:0.925rem; color:var(--text-muted); display:flex; align-items:flex-start; gap:0.5rem;">
            <span style="color:var(--primary-light); font-weight:bold;">✔</span> ${d}
          </li>
        `).join('')}
      </ul>
    </div>
  `).join('');
}

/* Render Governance Principles */
function renderGovernancePrinciplesDetailed() {
  const container = document.getElementById('governance-principles-container');
  const t = getTranslation();
  if (!container || !t || !t.principles) return;

  const lang = getLang();

  container.innerHTML = t.principles.map(p => `
    <div class="glass-panel fade-in" style="padding:1.75rem; display:flex; flex-direction:column; justify-content:space-between; border-top:4px solid var(--primary-light); box-shadow:var(--shadow-sm);">
      <div>
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem;">
          <div style="width:44px; height:44px; border-radius:var(--radius-md); background:rgba(13,148,136,0.1); display:flex; align-items:center; justify-content:center; font-size:1.4rem;">
            ${p.icon || '⚖️'}
          </div>
          ${p.badge ? `<span class="ticker-badge" style="font-size:0.75rem;">${p.badge}</span>` : ''}
        </div>
        <h4 style="font-size:1.15rem; color:var(--text-main); margin-bottom:0.75rem;">
          ${p.title}
        </h4>
        <p style="color:var(--text-muted); font-size:0.925rem; line-height:1.7; margin-bottom:1.25rem;">
          ${p.desc}
        </p>
      </div>
      ${p.rule ? `
        <div style="background:var(--bg-main); padding:0.75rem 1rem; border-radius:var(--radius-md); ${lang === 'ar' ? 'border-right:3px solid var(--accent)' : 'border-left:3px solid var(--accent)'}; font-size:0.85rem; color:var(--text-muted);">
          <strong style="color:var(--text-main); display:block; margin-bottom:0.25rem;">${lang === 'ar' ? '📌 الضابط القانوني:' : '📌 Règle juridique :'}</strong>
          ${p.rule}
        </div>
      ` : ''}
    </div>
  `).join('');
}
