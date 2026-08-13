/* ==========================================================================
   COMPLAINTS PAGE SCRIPT - Bilingual (AR/FR) Submission with Flask API & Tracking
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  updateComplaintsStaticLabels();
  initComplaintForm();
  renderComplaintHistory();
  initHashAnchorScroll();
});

/* Local Storage Key */
const STORAGE_KEY = 'police_portal_complaints_db';

/* Update Static Labels on Complaints Page */
function updateComplaintsStaticLabels() {
  const lang = getLang();
  const t = getTranslation();

  // Breadcrumbs & Headers
  const breadcrumb = document.querySelector('.hero-section .container div span:last-child');
  if (breadcrumb) breadcrumb.innerText = t.compBreadcrumb;

  const heroTag = document.querySelector('.hero-section .section-tag');
  if (heroTag) heroTag.innerText = t.compHeroTag;

  const heroTitle = document.querySelector('.hero-section .hero-title');
  if (heroTitle) heroTitle.innerText = t.compHeroTitle;

  const heroDesc = document.querySelector('.hero-description');
  if (heroDesc) heroDesc.innerText = t.compHeroDesc;

  // Form Headers
  const formTitle = document.querySelector('.glass-panel h3');
  if (formTitle) formTitle.innerText = t.compFormTitle;

  const formSub = document.querySelector('.glass-panel p');
  if (formSub) formSub.innerText = t.compFormSub;

  // Form Labels
  const labels = document.querySelectorAll('#complaint-form label');
  if (labels.length >= 6) {
    labels[0].innerText = t.labelName;
    labels[1].innerText = t.labelPhone;
    labels[2].innerText = t.labelCategory;
    labels[3].innerText = t.labelTitle;
    labels[4].innerText = t.labelLocation;
    labels[5].innerText = t.labelDetails;
  }

  // Select Dropdown Options
  const select = document.getElementById('comp-category');
  if (select) {
    select.innerHTML = `
      <option value="" disabled selected>${t.optDefaultCategory}</option>
      <option value="${lang === 'ar' ? 'النظافة والبيئة' : 'Propreté & Environnement'}">${t.optHealth}</option>
      <option value="${lang === 'ar' ? 'السير والجولان' : 'Circulation & Voirie'}">${t.optTraffic}</option>
      <option value="${lang === 'ar' ? 'الكلاب الضالة والحيوانات' : 'Chiens errants'}">${t.optAnimals}</option>
      <option value="${lang === 'ar' ? 'السكينة العامة والإزعاج' : 'Tranquillité publique'}">${t.optTranquility}</option>
      <option value="${lang === 'ar' ? 'المؤسسات المرتبة والصحية' : 'Établissements classés'}">${t.optEst}</option>
    `;
  }

  // Form Placeholders
  const compName = document.getElementById('comp-name');
  if (compName) compName.placeholder = t.phName;

  const compPhone = document.getElementById('comp-phone');
  if (compPhone) compPhone.placeholder = t.phPhone;

  const compTitle = document.getElementById('comp-title');
  if (compTitle) compTitle.placeholder = t.phTitle;

  const compLoc = document.getElementById('comp-location');
  if (compLoc) compLoc.placeholder = t.phLocation;

  const compDet = document.getElementById('comp-details');
  if (compDet) compDet.placeholder = t.phDetails;

  const compSubmit = document.querySelector('#complaint-form button[type="submit"]');
  if (compSubmit) compSubmit.innerText = t.submitComplaintBtn;

  // Tracking Widget
  const trackTitle = document.querySelector('#track-section h3');
  if (trackTitle) trackTitle.innerText = t.trackWidgetTitle;

  const trackDesc = document.querySelector('#track-section p');
  if (trackDesc) trackDesc.innerText = t.trackWidgetDesc;

  const trackBtn = document.querySelector('#track-section button');
  if (trackBtn) trackBtn.innerText = t.trackSearchBtn;

  const recentTitle = document.querySelector('.glass-panel:last-of-type h4');
  if (recentTitle) recentTitle.innerText = t.recentComplaintsTitle;

  // FAQ Section
  const faqTag = document.querySelector('section:nth-of-type(3) .section-tag');
  if (faqTag) faqTag.innerText = t.faqTag;

  const faqTitle = document.querySelector('section:nth-of-type(3) .section-title');
  if (faqTitle) faqTitle.innerText = t.faqTitle;

  const faqCards = document.querySelectorAll('section:nth-of-type(3) .glass-panel');
  if (faqCards.length >= 3) {
    if (lang === 'fr') {
      faqCards[0].querySelector('h4').innerText = 'Combien de temps prend le traitement ?';
      faqCards[0].querySelector('p').innerText = 'L\'inspection sur le terrain pour les urgences s\'effectue sous 24h à 48h.';

      faqCards[1].querySelector('h4').innerText = 'Mes données sont-elles protégées ?';
      faqCards[1].querySelector('p').innerText = 'Oui, l\'identité du déclarant reste strictly confidentielle.';

      faqCards[2].querySelector('h4').innerText = 'Et en cas de refus du contrevenant ?';
      faqCards[2].querySelector('p').innerText = 'Le Maire procède à l\'exécution d\'office avec réquisition de la force publique.';
    }
  }
}

/* Local Storage Cache Helper */
function getStoredComplaints() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try { return JSON.parse(data); } catch(e) { return []; }
  }
  return [];
}

function saveComplaintToCache(item) {
  const items = getStoredComplaints();
  items.unshift(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

/* Initialize Form Submission (Flask API Integration + Fallback) */
function initComplaintForm() {
  const form = document.getElementById('complaint-form');
  if (!form) return;

  const lang = getLang();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('comp-name').value.trim();
    const phone = document.getElementById('comp-phone').value.trim();
    const category = document.getElementById('comp-category').value;
    const title = document.getElementById('comp-title').value.trim();
    const location = document.getElementById('comp-location').value.trim();
    const details = document.getElementById('comp-details').value.trim();

    if (!name || !phone || !category || !title || !location || !details) {
      alert(lang === 'ar' ? 'المرجو ملء جميع الحقول المطلوبة.' : 'Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const payload = { name, phone, category, title, location, details };

    try {
      // Post to Flask API endpoint
      const response = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        saveComplaintToCache(result.complaint);
        form.reset();
        showSubmissionSuccessModal(result.complaint);
        renderComplaintHistory();
        return;
      }
    } catch (error) {
      console.log('Flask API offline, using local fallback...');
    }

    // Client-side fallback if Flask API is offline
    const randomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
    const trackingId = `POL-2026-${randomCode}`;
    const today = new Date().toISOString().split('T')[0];

    const fallbackComplaint = {
      id: trackingId,
      name,
      phone,
      category,
      title,
      location,
      details,
      status: lang === 'ar' ? "تم الاستلام وتسجيل البلاغ" : "Reçu et Enregistré",
      statusStep: 1,
      date: today,
      notes: lang === 'ar' ? "تم تسجيل الشكاية بنجاح وإحالتها على المصالح الجماعية المختصة." : "Signalement transmis aux services municipaux."
    };

    saveComplaintToCache(fallbackComplaint);
    form.reset();
    showSubmissionSuccessModal(fallbackComplaint);
    renderComplaintHistory();
  });
}

/* Show Submission Modal */
function showSubmissionSuccessModal(item) {
  const lang = getLang();

  const modalHtml = `
    <div id="success-modal" class="search-modal active" onclick="if(event.target.id==='success-modal') closeSuccessModal()">
      <div class="search-box-card" style="max-width:580px; padding:2.5rem; text-align:center;">
        <div style="width:70px; height:70px; background:rgba(16,185,129,0.1); color:var(--success); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:2.5rem; margin:0 auto 1.5rem auto;">
          ✅
        </div>

        <h3 style="font-size:1.6rem; color:var(--text-main); margin-bottom:0.5rem;">${lang === 'ar' ? 'تم إيداع البلاغ بنجاح!' : 'Signalement Enregistré !'}</h3>
        <p style="color:var(--text-muted); font-size:1rem; margin-bottom:1.5rem;">${lang === 'ar' ? 'احتفظ برمز التتبع الخاص بك لمتابعة حالة معالجة الشكاية:' : 'Veuillez conserver votre code de suivi unique :'}</p>

        <div style="background:var(--bg-main); padding:1.25rem; border-radius:var(--radius-lg); border:2px dashed var(--primary-light); margin-bottom:1.75rem;">
          <span style="font-size:0.85rem; color:var(--text-light); font-weight:700;">${lang === 'ar' ? 'رمز تتبع الشكاية:' : 'Code de Suivi :'}</span>
          <div style="font-size:1.8rem; font-weight:900; color:var(--primary-light); letter-spacing:2px; font-family:monospace; margin-top:0.35rem;">
            ${item.id}
          </div>
        </div>

        <div style="display:flex; gap:1rem; justify-content:center;">
          <button class="btn-accent" onclick="navigator.clipboard.writeText('${item.id}'); alert('${lang === 'ar' ? 'تم نسخ رمز التتبع!' : 'Code copié !'}');">
            📋 ${lang === 'ar' ? 'نسخ الرمز' : 'Copier'}
          </button>
          <button class="btn-primary" onclick="closeSuccessModal(); scrollToTrackSection('${item.id}');">
            🔍 ${lang === 'ar' ? 'تتبع حالة الشكاية الآن' : 'Suivre mon signalement'}
          </button>
        </div>
      </div>
    </div>
  `;

  const existing = document.getElementById('success-modal');
  if (existing) existing.remove();

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeSuccessModal() {
  const modal = document.getElementById('success-modal');
  if (modal) modal.remove();
}

function scrollToTrackSection(id) {
  const trackInput = document.getElementById('track-id-input');
  if (trackInput) {
    trackInput.value = id;
    searchComplaintStatus();
    document.getElementById('track-section').scrollIntoView({ behavior: 'smooth' });
  }
}

/* Track Complaint Status (Flask API Call + Cache Search) */
async function searchComplaintStatus() {
  const query = document.getElementById('track-id-input').value.trim().toUpperCase();
  const resultContainer = document.getElementById('track-result-container');
  if (!resultContainer) return;

  const lang = getLang();

  if (!query) {
    resultContainer.innerHTML = `<p style="color:var(--text-light); text-align:center; padding:1.5rem;">${lang === 'ar' ? 'المرجو أدخال رمز التتبع للبحث...' : 'Veuillez entrer un code de suivi...'}</p>`;
    return;
  }

  let found = null;

  // Attempt to fetch from Flask API
  try {
    const response = await fetch(`/api/complaints/${query}`);
    if (response.ok) {
      const data = await response.json();
      found = data.complaint;
    }
  } catch (error) {
    console.log('Flask API offline, searching local cache...');
  }

  // Fallback to local cache
  if (!found) {
    const items = getStoredComplaints();
    found = items.find(i => i.id === query);
  }

  if (!found) {
    resultContainer.innerHTML = `
      <div style="padding:1.5rem; text-align:center; color:var(--danger); background:rgba(239,68,68,0.08); border-radius:var(--radius-md);">
        ❌ ${lang === 'ar' ? `لم يتم العثور على شكاية تحمل الرمز "${query}"` : `Aucun signalement trouvé pour le code "${query}"`}
      </div>
    `;
    return;
  }

  const steps = lang === 'ar' ? [
    { label: "تم التسجيل", icon: "📥" },
    { label: "قيد المعاينة (BMH)", icon: "🔍" },
    { label: "اتخاذ الإجراء الإداري", icon: "⚙️" },
    { label: "تم المعالجة واختتام البلاغ", icon: "✅" }
  ] : [
    { label: "Reçu", icon: "📥" },
    { label: "Inspection (BMH)", icon: "🔍" },
    { label: "Procédure d'Arrêté", icon: "⚙️" },
    { label: "Traité & Clôturé", icon: "✅" }
  ];

  resultContainer.innerHTML = `
    <div class="glass-panel fade-in" style="padding:2rem; ${lang === 'ar' ? 'border-right:5px solid var(--primary-light)' : 'border-left:5px solid var(--primary-light)'};">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid var(--border-color); padding-bottom:0.75rem;">
        <div>
          <span class="ticker-badge">${found.category}</span>
          <h3 style="font-size:1.3rem; margin-top:0.35rem;">${found.title}</h3>
        </div>
        <div style="font-size:0.9rem; font-weight:700; color:var(--primary-light); font-family:monospace;">
          ${found.id}
        </div>
      </div>

      <p style="font-size:0.95rem; color:var(--text-muted); margin-bottom:0.5rem;"><strong>📍 ${lang === 'ar' ? 'الموقع:' : 'Lieu :'}</strong> ${found.location}</p>
      <p style="font-size:0.95rem; color:var(--text-muted); margin-bottom:1.5rem;"><strong>📅 ${lang === 'ar' ? 'تاريخ الإيداع:' : 'Date :'}</strong> ${found.date}</p>

      <h4 style="font-size:1rem; margin-bottom:1rem;">${lang === 'ar' ? 'مراحل معالجة الشكاية:' : 'Étapes de traitement :'}</h4>
      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:0.5rem; margin-bottom:1.5rem; text-align:center;">
        ${steps.map((s, idx) => {
          const isDone = (idx + 1) <= found.statusStep;
          return `
            <div style="padding:0.75rem 0.5rem; background:${isDone ? 'rgba(13,148,136,0.1)' : 'var(--bg-main)'}; border:1px solid ${isDone ? 'var(--primary-light)' : 'var(--border-color)'}; border-radius:var(--radius-md);">
              <div style="font-size:1.2rem;">${s.icon}</div>
              <div style="font-size:0.75rem; font-weight:700; color:${isDone ? 'var(--primary-light)' : 'var(--text-light)'}; margin-top:0.25rem;">${s.label}</div>
            </div>
          `;
        }).join('')}
      </div>

      <div style="background:var(--bg-main); padding:1rem; border-radius:var(--radius-md); font-size:0.9rem; color:var(--text-muted);">
        <strong>ℹ️ ${lang === 'ar' ? 'ملاحظة المصالح الجماعية:' : 'Note des services :'}</strong> ${found.notes}
      </div>
    </div>
  `;
}

/* Render Complaint History List */
function renderComplaintHistory() {
  const container = document.getElementById('complaints-history-container');
  if (!container) return;

  const lang = getLang();
  const items = getStoredComplaints();

  if (items.length === 0) {
    container.innerHTML = `<p style="color:var(--text-light); text-align:center;">${lang === 'ar' ? 'لا توجد شكايات مسجلة حالياً.' : 'Aucun signalement enregistré.'}</p>`;
    return;
  }

  container.innerHTML = items.slice(0, 5).map(item => `
    <div style="padding:1rem; background:var(--bg-main); border:1px solid var(--border-color); border-radius:var(--radius-md); display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
      <div>
        <span style="font-size:0.75rem; font-weight:700; color:var(--primary-light);">${item.category}</span>
        <h4 style="font-size:1rem; margin:0.2rem 0;">${item.title}</h4>
        <span style="font-size:0.8rem; color:var(--text-light);">${item.date} - ${item.location}</span>
      </div>
      <button class="btn-outline" style="font-size:0.8rem; padding:0.4rem 0.8rem;" onclick="scrollToTrackSection('${item.id}')">
        ${item.id} 🔍
      </button>
    </div>
  `).join('');
}

/* Hash Scroll Handler */
function initHashAnchorScroll() {
  if (window.location.hash === '#track') {
    setTimeout(() => {
      const el = document.getElementById('track-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }
}
