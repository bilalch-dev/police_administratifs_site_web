/* ==========================================================================
   DOMAINS PAGE SCRIPT - Interactive Tab Filter, Sub-domain Modals & Search
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderDetailedDomainsGrid('all');
  initDomainHashNavigation();
});

/* Detailed Domain Cards Array */
const detailedDomainsData = [
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
    category: "traffic",
    categoryLabel: "الشرطة القروية",
    category: "rural",
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

  const filtered = filterCategory === 'all' 
    ? detailedDomainsData 
    : detailedDomainsData.filter(d => d.category === filterCategory);

  if (filtered.length === 0) {
    container.innerHTML = `<p style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-light);">لم يتم العثور على مجالات في الفئة المختارة.</p>`;
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
        عرض كافة الضوابط والمساطر التفصيلية ←
      </button>
    </div>
  `).join('');
}

/* Domain Detail Modal */
function openDomainModal(id) {
  const item = detailedDomainsData.find(d => d.id === id);
  if (!item) return;

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

        <h4 style="font-size:1.1rem; margin-bottom:1rem; color:var(--text-main);">📌 الضوابط والتكليفات الصريحة:</h4>
        <ul style="display:flex; flex-direction:column; gap:0.75rem; margin-bottom:2rem;">
          ${item.points.map(p => `
            <li style="background:var(--bg-main); padding:0.85rem 1.25rem; border-radius:var(--radius-md); border-right:4px solid var(--primary-light); font-size:0.95rem; color:var(--text-muted);">
              ✔ ${p}
            </li>
          `).join('')}
        </ul>

        <div style="display:flex; justify-content:space-between; align-items:center; pt-1rem; border-top:1px solid var(--border-color);">
          <a href="procedures.html" class="btn-primary" style="font-size:0.875rem;">المساطر والترخيصات المتعلقة ←</a>
          <button class="btn-outline" onclick="closeDomainModal()">إغلاق النافذة</button>
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
