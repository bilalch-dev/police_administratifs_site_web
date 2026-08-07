/* ==========================================================================
   PROCEDURES PAGE SCRIPT - Interactive Licensing Guides & Checklist Generator
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderProceduresGrid('all');
});

/* Detailed Procedures Dataset */
const proceduresData = [
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

/* Filter and Render Procedures */
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

  const filtered = filterCategory === 'all' 
    ? proceduresData 
    : proceduresData.filter(p => p.category === filterCategory);

  if (filtered.length === 0) {
    container.innerHTML = `<p style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-light);">لم يتم العثور على مساطر في الفئة المختارة.</p>`;
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
          <span style="font-size:0.8rem; color:var(--text-light); font-weight:700;">⏳ أجل المعالجة:</span>
          <p style="font-size:0.9rem; font-weight:700; color:var(--text-main);">${p.timeline}</p>
        </div>
        <div>
          <span style="font-size:0.8rem; color:var(--text-light); font-weight:700;">💰 الواجبات والرسوم:</span>
          <p style="font-size:0.9rem; font-weight:700; color:var(--text-main);">${p.fee}</p>
        </div>
      </div>

      <h4 style="font-size:1rem; margin-bottom:0.75rem; color:var(--text-main);">📄 قائمة الوثائق والمستندات المطلوبة:</h4>
      <ul style="display:flex; flex-direction:column; gap:0.5rem; margin-bottom:1.5rem;">
        ${p.docs.map(doc => `
          <li style="font-size:0.9rem; color:var(--text-muted); display:flex; align-items:flex-start; gap:0.5rem;">
            <span style="color:var(--primary-light); font-weight:bold;">▪</span> ${doc}
          </li>
        `).join('')}
      </ul>

      <button class="btn-primary" style="width:100%; font-size:0.9rem;" onclick="generateProcedureChecklist('${p.id}')">
        📋 تحميل طباعة قائمة الوثائق الخاصة بهذه المسطرة
      </button>
    </div>
  `).join('');
}

/* Print/Copy Checklist Modal */
function generateProcedureChecklist(id) {
  const item = proceduresData.find(p => p.id === id);
  if (!item) return;

  const checklistText = `دليل وثائق: ${item.title}\nالجهة المختصة: ${item.authority}\n\nالوثائق المطلوبة:\n` + 
    item.docs.map((d, i) => `${i+1}. ${d}`).join('\n');

  const modalHtml = `
    <div id="checklist-modal" class="search-modal active" onclick="if(event.target.id==='checklist-modal') closeChecklistModal()">
      <div class="search-box-card" style="max-width:650px; padding:2rem;">
        <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid var(--border-color); padding-bottom:1rem; margin-bottom:1.5rem;">
          <h3 style="font-size:1.3rem;">📋 قائمة وثائق: ${item.title}</h3>
          <button class="btn-icon" onclick="closeChecklistModal()">❌</button>
        </div>

        <div style="background:var(--bg-main); padding:1.25rem; border-radius:var(--radius-md); font-family:monospace; font-size:0.9rem; color:var(--text-main); white-space:pre-wrap; margin-bottom:1.5rem; border:1px solid var(--border-color);">
${checklistText}
        </div>

        <div style="display:flex; gap:1rem; justify-content:flex-end;">
          <button class="btn-accent" onclick="navigator.clipboard.writeText(\`${checklistText.replace(/`/g, '\\`')}\`); alert('تم نسخ القائمة بنجاح!');">
            📋 نسخ النص
          </button>
          <button class="btn-outline" onclick="window.print()">
            🖨️ طباعة
          </button>
          <button class="btn-primary" onclick="closeChecklistModal()">
            تم
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
