/* ==========================================================================
   LEGAL FRAMEWORK PAGE SCRIPT - Authorities Tabs, Interactive Accordions, Filter
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderLegalConcepts();
  renderExecutionMeasures();
  renderAuthoritiesDetailed();
  renderGovernancePrinciplesDetailed();
});

/* Render Legal Concepts Breakdown */
function renderLegalConcepts() {
  const container = document.getElementById('legal-concepts-container');
  if (!container) return;

  const concepts = [
    {
      title: "الشرطة الإدارية العامة",
      badge: "عامة ومجردة",
      icon: "🏛️",
      desc: "مجموع الإجراءات والتدابير المتخذة للحفاظ على النظام العام (الأمن، السكينة، والصحة العمومية)، وتطبق على جميع الأنشطة دون تحديد أو تمييز. تضمن العقوبات الجنائية والمخالفات العامة."
    },
    {
      title: "الشرطة الإدارية الخاصة",
      badge: "نصوص خاصة",
      icon: "📜",
      desc: "الاختصاصات المخولة قانوناً لجهة معينة في ميدان محدد يتسم بالخصوصية (كشرطة التعمير، شرطة الصيد، شرطة المشروبات الكحولية). تطبق على فئة أو أنشطة محددة."
    },
    {
      title: "الشرطة الإدارية vs المرفق العام",
      badge: "تمميز وظيفي",
      icon: "⚖️",
      desc: "تهدف الشرطة الإدارية إلى حماية النظام العام (الضبط والمنع والترخيص)، في حين يهدف المرفق العام إلى تقديم خدمة ومصلحة عامة للمواطنين. وضع علامة طرقية لتخفيض السرعة هو تدبير ضبط، بينما الإعلام بوجود منعرج خدمة مرفقية."
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

  const measures = [
    {
      title: "التدابير التنظيمية (Décisions Réglementaires)",
      type: "قرارات عامة",
      icon: "📋",
      details: "قرارات ذات صبغة عامة ومجردة تفرض أمراً أو منعاً على سكان الجماعة أو فئة منهم. قابلة للتطبيق في كل وقت وحين، كأنظمة النظافة العامة، تشوير الطرق، وتنظيم الأنشطة التجارية غير المنظمة."
    },
    {
      title: "التدابير الفردية (Décisions Individuelles)",
      type: "حالات خاصة",
      icon: "📑",
      details: "قرارات فردية تتضمن أمراً أو منعاً أو إذناً تصدر عن رئيس المجلس الجماعي لحالة محددة وتطبق مرة واحدة. مثل قرار هدم بناية آيلة للسقوط، قرار إزالة ركام بالشارع، أو إغلاق محل غير صحي."
    },
    {
      title: "التنفيذ التلقائي (Exécution d'office)",
      type: "المادة 52 و 53",
      icon: "⚡",
      details: "قيام رئيس المجلس الجماعي تلقائياً وعلى نفقة المعنيين بالأمر بتنفيذ التدابير الرامية إلى ضمان سلامة المرور والسكينة والصحة العمومية عند امتناع المخالفين، مع إمكانية تسخير القوة العمومية."
    }
  ];

  container.innerHTML = measures.map(m => `
    <div class="glass-panel" style="padding:1.75rem; border-right:5px solid var(--primary-light);">
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

/* Render Detailed Authorities Table & Accordion */
function renderAuthoritiesDetailed() {
  const container = document.getElementById('authorities-detail-container');
  if (!container || !policePortalData || !policePortalData.authorities) return;

  container.innerHTML = policePortalData.authorities.map((a, index) => `
    <div class="glass-panel" style="padding:2rem; margin-bottom:1.5rem;">
      <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1.25rem; border-bottom:1px solid var(--border-color); padding-bottom:1rem;">
        <div class="domain-icon-box" style="width:50px; height:50px; font-size:1.5rem; margin-bottom:0;">${a.icon}</div>
        <div>
          <h3 style="font-size:1.3rem;">${a.role}</h3>
          <span style="font-size:0.875rem; color:var(--primary-light); font-weight:700;">${a.scope}</span>
        </div>
      </div>
      <h4 style="font-size:1rem; margin-bottom:0.75rem; color:var(--text-main);">أبرز الاختصاصات والمهام:</h4>
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
  if (!container || !policePortalData || !policePortalData.principles) return;

  container.innerHTML = policePortalData.principles.map(p => `
    <div style="background:var(--bg-surface-elevated); padding:1.75rem; border-radius:var(--radius-lg); border:1px solid var(--border-color); box-shadow:var(--shadow-sm);">
      <h4 style="font-size:1.2rem; color:var(--primary-light); margin-bottom:0.5rem; display:flex; align-items:center; gap:0.5rem;">
        <span>⚖️</span> ${p.title}
      </h4>
      <p style="color:var(--text-muted); font-size:0.95rem; line-height:1.7;">${p.desc}</p>
    </div>
  `).join('');
}
