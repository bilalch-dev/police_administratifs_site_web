/* ==========================================================================
   ADMIN PORTAL SCRIPT - Municipal Officer JWT Login, Feed & Status Inspection
   ========================================================================== */

let adminComplaintsList = [];

document.addEventListener('DOMContentLoaded', () => {
  updateAdminStaticLabels();
  initAdminAuthCheck();
  initLoginForm();
});

/* Update ALL Static Labels on Admin Page according to Language */
function updateAdminStaticLabels() {
  const lang = getLang();
  const t = getTranslation();
  if (!t) return;

  if (t.adminTitle) document.title = t.adminTitle;

  // Login Section
  const loginTag = document.getElementById('admin-login-tag');
  if (loginTag) loginTag.innerText = t.adminLoginTag || (lang === 'ar' ? 'فضاء الأطر والموظفين' : 'Espace Cadres & Agents');

  const loginTitle = document.getElementById('admin-login-title');
  if (loginTitle) loginTitle.innerText = t.adminLoginTitle || (lang === 'ar' ? 'تسجيل الدخول للوحة التحكم' : 'Connexion au Tableau de Bord');

  const loginDesc = document.getElementById('admin-login-desc');
  if (loginDesc) loginDesc.innerText = t.adminLoginDesc || (lang === 'ar' ? 'أدخل حساب الموظف للوصول إلى نظام تدبير وتتبع الشكايات الجماعية.' : 'Accédez à votre compte pour gérer et instruire les signalements des citoyens.');

  const userLabel = document.getElementById('admin-user-label');
  if (userLabel) userLabel.innerText = t.adminUserLabel || (lang === 'ar' ? 'اسم المستخدم *' : 'Nom d\'utilisateur *');

  const userInput = document.getElementById('admin-username');
  if (userInput) userInput.placeholder = t.adminUserPlaceholder || (lang === 'ar' ? 'اسم المستخدم (مثال: admin)' : 'Nom d\'utilisateur (ex: admin)');

  const passLabel = document.getElementById('admin-pass-label');
  if (passLabel) passLabel.innerText = t.adminPassLabel || (lang === 'ar' ? 'كلمة المرور *' : 'Mot de passe *');

  const loginBtn = document.getElementById('admin-login-btn');
  if (loginBtn) loginBtn.innerText = t.adminLoginBtn || (lang === 'ar' ? '🔑 تسجيل الدخول إلى النظام' : '🔑 Se connecter au système');

  const demoHint = document.getElementById('admin-demo-hint');
  if (demoHint) demoHint.innerHTML = t.adminDemoHint || (lang === 'ar' ? '💡 الحساب الافتراضي للتجربة: <strong>admin</strong> / كلمة السر: <strong>admin123</strong>' : '💡 Compte démo : <strong>admin</strong> / Mot de passe : <strong>admin123</strong>');

  // Dashboard Header
  const dashTag = document.getElementById('admin-dash-tag');
  if (dashTag) dashTag.innerText = t.adminDashTag || (lang === 'ar' ? 'لوحة القيادة والمعالجة التفاعلية' : 'Tableau de Bord & Traitement Interactif');

  const dashTitle = document.getElementById('admin-dash-title');
  if (dashTitle) dashTitle.innerText = t.adminDashTitle || (lang === 'ar' ? 'تدبير ومعالجة الشكايات الجماعية' : 'Gestion & Traitement des Réclamations');

  const user = localStorage.getItem('police_admin_user') || 'admin';
  const officerBadge = document.getElementById('officer-badge');
  if (officerBadge) officerBadge.innerText = `${t.adminOfficerPrefix || (lang === 'ar' ? '👤 الموظف: ' : '👤 Agent : ')}${user}`;

  const logoutBtn = document.getElementById('admin-logout-btn');
  if (logoutBtn) logoutBtn.innerText = t.adminLogoutBtn || (lang === 'ar' ? '🚪 تسجيل الخروج' : '🚪 Déconnexion');

  // Stats Labels
  const statTotal = document.getElementById('stat-total-label');
  if (statTotal) statTotal.innerText = t.adminStatTotal || (lang === 'ar' ? 'إجمالي البلاغات' : 'Total des signalements');

  const statStep1 = document.getElementById('stat-step1-label');
  if (statStep1) statStep1.innerText = t.adminStatStep1 || (lang === 'ar' ? '📥 1. تم الاستلام' : '📥 1. Reçu');

  const statStep2 = document.getElementById('stat-step2-label');
  if (statStep2) statStep2.innerText = t.adminStatStep2 || (lang === 'ar' ? '🔍 2. قيد المعاينة (BMH)' : '🔍 2. Inspection (BMH)');

  const statStep3 = document.getElementById('stat-step3-label');
  if (statStep3) statStep3.innerText = t.adminStatStep3 || (lang === 'ar' ? '⚙️ 3. قيد التنفيذ' : '⚙️ 3. En cours d\'action');

  const statStep4 = document.getElementById('stat-step4-label');
  if (statStep4) statStep4.innerText = t.adminStatStep4 || (lang === 'ar' ? '✅ 4. تم المعالجة واختتامها' : '✅ 4. Traité & Clôturé');

  // Toolbar
  const searchLabel = document.getElementById('admin-search-label');
  if (searchLabel) searchLabel.innerText = t.adminSearchLabel || (lang === 'ar' ? 'بحث بالرمز أو اسم المواطن:' : 'Rechercher par code ou citoyen :');

  const searchInput = document.getElementById('admin-search-input');
  if (searchInput) searchInput.placeholder = t.adminSearchPlaceholder || (lang === 'ar' ? 'مثال: POL-2026-78A1B...' : 'Ex: POL-2026-78A1B...');

  const catLabel = document.getElementById('admin-cat-label');
  if (catLabel) catLabel.innerText = t.adminCategoryLabel || (lang === 'ar' ? 'تصفية حسب مجال المخالفة:' : 'Filtrer par domaine d\'infraction :');

  const catFilter = document.getElementById('admin-category-filter');
  if (catFilter) {
    const currentCat = catFilter.value;
    catFilter.innerHTML = `
      <option value="ALL">${t.adminCatAll || (lang === 'ar' ? 'جميع المجالات' : 'Tous les domaines')}</option>
      <option value="health">${t.adminCatHealth || (lang === 'ar' ? 'النظافة والبيئة' : 'Propreté & Environnement')}</option>
      <option value="traffic">${t.adminCatTraffic || (lang === 'ar' ? 'السير والجولان' : 'Circulation & Voirie')}</option>
      <option value="animals">${t.adminCatAnimals || (lang === 'ar' ? 'الكلاب الضالة والحيوانات' : 'Chiens errants & Animaux')}</option>
      <option value="tranquility">${t.adminCatTranquility || (lang === 'ar' ? 'السكينة العامة والإزعاج' : 'Tranquillité publique & Bruit')}</option>
      <option value="est">${t.adminCatEst || (lang === 'ar' ? 'المؤسسات المرتبة والصحية' : 'Établissements classés & Commerces')}</option>
    `;
    catFilter.value = currentCat || 'ALL';
  }

  const stepLabel = document.getElementById('admin-step-label');
  if (stepLabel) stepLabel.innerText = t.adminStepLabel || (lang === 'ar' ? 'تصفية حسب مرحلة المعالجة:' : 'Filtrer par étape de traitement :');

  const stepFilter = document.getElementById('admin-step-filter');
  if (stepFilter) {
    const currentStep = stepFilter.value;
    stepFilter.innerHTML = `
      <option value="ALL">${t.adminStepAll || (lang === 'ar' ? 'جميع المراحل (1 - 4)' : 'Toutes les étapes (1 - 4)')}</option>
      <option value="1">${t.adminStep1Opt || (lang === 'ar' ? '1. تم الاستلام' : '1. Reçu')}</option>
      <option value="2">${t.adminStep2Opt || (lang === 'ar' ? '2. قيد المعاينة (BMH)' : '2. Inspection (BMH)')}</option>
      <option value="3">${t.adminStep3Opt || (lang === 'ar' ? '3. قيد الإجراء والتنفيذ' : '3. Procédure & Exécution')}</option>
      <option value="4">${t.adminStep4Opt || (lang === 'ar' ? '4. تم المعالجة والتسوية' : '4. Traité & Régularisé')}</option>
    `;
    stepFilter.value = currentStep || 'ALL';
  }

  // Table header & loading
  const tableTitle = document.getElementById('admin-table-title');
  if (tableTitle) tableTitle.innerText = t.adminTableTitle || (lang === 'ar' ? '📋 قائمة الشكايات والمخالفات' : '📋 Liste des Signalements & Infractions');

  const refreshBtn = document.getElementById('admin-refresh-btn');
  if (refreshBtn) refreshBtn.innerText = t.adminRefreshBtn || (lang === 'ar' ? '🔄 تحديث المعطيات' : '🔄 Actualiser les données');

  const loadingText = document.getElementById('admin-loading-text');
  if (loadingText) loadingText.innerText = t.adminLoadingText || (lang === 'ar' ? 'جاري تحميل المعطيات من النظام...' : 'Chargement des données depuis le système...');
}

/* Check Authentication State */
function initAdminAuthCheck() {
  const token = localStorage.getItem('police_admin_token');
  const user = localStorage.getItem('police_admin_user');
  const t = getTranslation();
  const lang = getLang();

  const loginSec = document.getElementById('admin-login-section');
  const dashSec = document.getElementById('admin-dashboard-section');

  if (token && user) {
    if (loginSec) loginSec.style.display = 'none';
    if (dashSec) dashSec.style.display = 'block';

    const officerBadge = document.getElementById('officer-badge');
    if (officerBadge) officerBadge.innerText = `${t.adminOfficerPrefix || (lang === 'ar' ? '👤 الموظف: ' : '👤 Agent : ')}${user}`;

    loadAdminDashboardData();
  } else {
    if (loginSec) loginSec.style.display = 'flex';
    if (dashSec) dashSec.style.display = 'none';
  }
}

/* Handle Admin JWT Login */
function initLoginForm() {
  const form = document.getElementById('admin-login-form');
  if (!form) return;

  const lang = getLang();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('admin-username').value.trim();
    const password = document.getElementById('admin-password').value.trim();

    if (!username || !password) return;

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('police_admin_token', data.token);
        localStorage.setItem('police_admin_user', data.user.username);
        initAdminAuthCheck();
        return;
      }
    } catch (err) {
      console.log('Flask API offline, checking default static credentials...');
    }

  });
}

function logoutAdmin() {
  localStorage.removeItem('police_admin_token');
  localStorage.removeItem('police_admin_user');
  initAdminAuthCheck();
}

/* Load All Complaints Data */
async function loadAdminDashboardData() {
  const token = localStorage.getItem('police_admin_token');
  const lang = getLang();
  adminComplaintsList = [];

  // Try fetching from Flask API
  try {
    const response = await fetch('/api/admin/complaints', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (response.ok) {
      const data = await response.json();
      adminComplaintsList = data.complaints;
    }
  } catch (err) {
    console.log('Flask API offline, loading from local cache...');
  }

  // Fallback to local storage
  if (adminComplaintsList.length === 0) {
    const local = localStorage.getItem('police_portal_complaints_db');
    if (local) {
      try { adminComplaintsList = JSON.parse(local); } catch(e) { adminComplaintsList = []; }
    }
  }

  // Seed default demo if empty
  if (adminComplaintsList.length === 0) {
    adminComplaintsList = [
      {
        id: "POL-2026-78A1B",
        name: "أحمد بناني",
        phone: "0661234567",
        category: "النظافة والبيئة",
        title: "تجمع نفايات هامشية بشارع الحسن الثاني",
        location: "حي السلام - قرب المدرسة الابتدائية",
        details: "تراكم الأزبال والنفايات المنزلية قرب المدرسة الابتدائية مما يسبب روائح وانزعاجاً للساكنة.",
        status: "قيد المعاينة الميدانية (BMH)",
        statusStep: 2,
        date: "2026-08-05",
        notes: "تم إرسال فريق المكتب الصحي الجماعي للمعاينة واتخاذ الإجراء."
      }
    ];
  }

  updateDashboardStats();
  renderAdminTable(adminComplaintsList);
}

/* Update Stats Overview Cards */
function updateDashboardStats() {
  const total = adminComplaintsList.length;
  const s1 = adminComplaintsList.filter(c => c.statusStep === 1).length;
  const s2 = adminComplaintsList.filter(c => c.statusStep === 2).length;
  const s3 = adminComplaintsList.filter(c => c.statusStep === 3).length;
  const s4 = adminComplaintsList.filter(c => c.statusStep === 4).length;

  document.getElementById('stat-total').innerText = total;
  document.getElementById('stat-step1').innerText = s1;
  document.getElementById('stat-step2').innerText = s2;
  document.getElementById('stat-step3').innerText = s3;
  document.getElementById('stat-step4').innerText = s4;
}

/* Filter Complaints Function */
function filterAdminComplaints() {
  const search = document.getElementById('admin-search-input').value.trim().toLowerCase();
  const cat = document.getElementById('admin-category-filter').value;
  const step = document.getElementById('admin-step-filter').value;

  let filtered = adminComplaintsList;

  if (search) {
    filtered = filtered.filter(c => 
      (c.id && c.id.toLowerCase().includes(search)) || 
      (c.name && c.name.toLowerCase().includes(search)) ||
      (c.title && c.title.toLowerCase().includes(search)) ||
      (c.location && c.location.toLowerCase().includes(search))
    );
  }

  if (cat !== 'ALL') {
    filtered = filtered.filter(c => {
      if (!c.category) return false;
      const catNorm = c.category.toLowerCase();
      if (cat === 'health') return catNorm.includes('نظافة') || catNorm.includes('بيئة') || catNorm.includes('propreté') || catNorm.includes('santé') || catNorm.includes('déchet') || c.category === 'health';
      if (cat === 'traffic') return catNorm.includes('سير') || catNorm.includes('جولان') || catNorm.includes('circulation') || catNorm.includes('voirie') || c.category === 'traffic';
      if (cat === 'animals') return catNorm.includes('كلاب') || catNorm.includes('حيوان') || catNorm.includes('chien') || catNorm.includes('anim') || c.category === 'animals';
      if (cat === 'tranquility') return catNorm.includes('سكينة') || catNorm.includes('إزعاج') || catNorm.includes('ضوضاء') || catNorm.includes('tranquillité') || catNorm.includes('bruit') || c.category === 'tranquility';
      if (cat === 'est') return catNorm.includes('مرتبة') || catNorm.includes('مؤسسات') || catNorm.includes('commer') || catNorm.includes('classé') || c.category === 'est';
      return c.category === cat;
    });
  }

  if (step !== 'ALL') {
    filtered = filtered.filter(c => c.statusStep === parseInt(step));
  }

  renderAdminTable(filtered);
}

/* Render Complaints Data Table */
function renderAdminTable(data) {
  const container = document.getElementById('admin-table-container');
  if (!container) return;

  const lang = getLang();
  const t = getTranslation() || {};

  if (data.length === 0) {
    container.innerHTML = `<p style="text-align: center; color: var(--text-light); padding: 2rem;">${lang === 'ar' ? 'لا توجد شكايات تطابق الفلتر المختارة.' : 'Aucun signalement ne correspond au filtre.'}</p>`;
    return;
  }

  const stepBadges = {
    1: { bg: 'rgba(2, 132, 199, 0.1)', color: 'var(--info)', text: lang === 'ar' ? '1. تم الاستلام' : '1. Reçu' },
    2: { bg: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', text: lang === 'ar' ? '2. قيد المعاينة (BMH)' : '2. Inspection (BMH)' },
    3: { bg: 'rgba(13, 148, 136, 0.1)', color: 'var(--primary-light)', text: lang === 'ar' ? '3. قيد الإجراء والتنفيذ' : '3. En cours d\'action' },
    4: { bg: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', text: lang === 'ar' ? '4. تم المعالجة والتسوية' : '4. Traité & Clôturé' }
  };

  container.innerHTML = `
    <table style="width: 100%; border-collapse: collapse; text-align: ${lang === 'ar' ? 'right' : 'left'}; font-size: 0.9rem;">
      <thead>
        <tr style="background: var(--bg-main); border-bottom: 2px solid var(--border-color);">
          <th style="padding: 0.85rem 1rem;">${t.adminColCode || (lang === 'ar' ? 'رمز التتبع' : 'Code')}</th>
          <th style="padding: 0.85rem 1rem;">${t.adminColCitizen || (lang === 'ar' ? 'المواطن والهاتف' : 'Citoyen & Tél')}</th>
          <th style="padding: 0.85rem 1rem;">${t.adminColCategory || (lang === 'ar' ? 'المجال' : 'Catégorie')}</th>
          <th style="padding: 0.85rem 1rem;">${t.adminColSubject || (lang === 'ar' ? 'موضوع البلاغ والموقع' : 'Sujet & Lieu')}</th>
          <th style="padding: 0.85rem 1rem;">${t.adminColStage || (lang === 'ar' ? 'المرحلة الحالية' : 'Étape')}</th>
          <th style="padding: 0.85rem 1rem; text-align: center;">${t.adminColActions || (lang === 'ar' ? 'الإجراءات' : 'Actions')}</th>
        </tr>
      </thead>
      <tbody>
        ${data.map(item => {
          const badge = stepBadges[item.statusStep] || stepBadges[1];
          return `
            <tr style="border-bottom: 1px solid var(--border-color); transition: background var(--transition-fast);" onmouseover="this.style.background='var(--bg-main)'" onmouseout="this.style.background='transparent'">
              <td style="padding: 1rem; font-weight: 800; font-family: monospace; color: var(--primary-light);">${item.id}</td>
              <td style="padding: 1rem;">
                <strong>${item.name}</strong><br>
                <span style="font-size: 0.8rem; color: var(--text-light);">${item.phone}</span>
              </td>
              <td style="padding: 1rem;">
                <span class="ticker-badge" style="font-size: 0.75rem;">${item.category}</span>
              </td>
              <td style="padding: 1rem; max-width: 260px;">
                <strong>${item.title}</strong><br>
                <span style="font-size: 0.8rem; color: var(--text-muted);">📍 ${item.location}</span>
              </td>
              <td style="padding: 1rem;">
                <span style="display: inline-block; padding: 0.3rem 0.75rem; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 700; background: ${badge.bg}; color: ${badge.color};">
                  ${badge.text}
                </span>
              </td>
              <td style="padding: 1rem; text-align: center;">
                <button class="btn-primary" style="font-size: 0.8rem; padding: 0.4rem 0.85rem;" onclick="openAdminActionModal('${item.id}')">
                  ${t.adminInspectBtn || (lang === 'ar' ? '⚙️ تحديث وملاحظات' : '⚙️ Inspecter')}
                </button>
              </td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
}

/* Open Admin Action & Status Update Modal */
function openAdminActionModal(id) {
  const item = adminComplaintsList.find(c => c.id === id);
  if (!item) return;

  const lang = getLang();
  const t = getTranslation() || {};

  const modalHtml = `
    <div id="admin-action-modal" class="search-modal active" onclick="if(event.target.id==='admin-action-modal') closeAdminActionModal()">
      <div class="search-box-card" style="max-width: 650px; padding: 2rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 1.5rem;">
          <h3 style="font-size: 1.3rem;">⚙️ ${(t.adminModalTitle || (lang === 'ar' ? 'معالجة الشكاية: ' : 'Traitement: '))}${item.id}</h3>
          <button class="btn-icon" onclick="closeAdminActionModal()">❌</button>
        </div>

        <div style="background: var(--bg-main); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; border: 1px solid var(--border-color); text-align: start;">
          <p style="font-size: 0.95rem; margin-bottom: 0.4rem;"><strong>👤 ${t.adminModalCitizen || (lang === 'ar' ? 'المواطن:' : 'Citoyen :')}</strong> ${item.name} (${item.phone})</p>
          <p style="font-size: 0.95rem; margin-bottom: 0.4rem;"><strong>📍 ${t.adminModalLocation || (lang === 'ar' ? 'الموقع:' : 'Lieu :')}</strong> ${item.location}</p>
          <p style="font-size: 0.95rem; margin-bottom: 0.4rem;"><strong>📝 ${t.adminModalDetails || (lang === 'ar' ? 'تفاصيل البلاغ:' : 'Détails :')}</strong> ${item.details}</p>
        </div>

        <form id="admin-update-form" onsubmit="handleAdminStatusUpdate(event, '${item.id}')">
          <div style="margin-bottom: 1.25rem; text-align: start;">
            <label style="display: block; font-weight: 700; margin-bottom: 0.5rem;">${t.adminModalStageLabel || (lang === 'ar' ? 'تحديث مرحلة المعالجة الحالية:' : 'Mise à jour de l\'étape :')}</label>
            <select id="modal-status-step" style="width: 100%; padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-surface); color: var(--text-main); font-weight: 700;">
              <option value="1" ${item.statusStep === 1 ? 'selected' : ''}>${t.adminModalStep1 || (lang === 'ar' ? '📥 1. تم الاستلام وتسجيل البلاغ' : '📥 1. Reçu et enregistré')}</option>
              <option value="2" ${item.statusStep === 2 ? 'selected' : ''}>${t.adminModalStep2 || (lang === 'ar' ? '🔍 2. قيد المعاينة الميدانية (المكتب الصحي BMH)' : '🔍 2. Inspection sur le terrain (BMH)')}</option>
              <option value="3" ${item.statusStep === 3 ? 'selected' : ''}>${t.adminModalStep3 || (lang === 'ar' ? '⚙️ 3. قيد اتخاذ الإجراء الإداري والتنفيذ' : '⚙️ 3. Mesures administratives & Exécution')}</option>
              <option value="4" ${item.statusStep === 4 ? 'selected' : ''}>${t.adminModalStep4 || (lang === 'ar' ? '✅ 4. تم المعالجة واختتام البلاغ بنجاح' : '✅ 4. Traité et clôturé avec succès')}</option>
            </select>
          </div>

          <div style="margin-bottom: 1.75rem; text-align: start;">
            <label style="display: block; font-weight: 700; margin-bottom: 0.5rem;">${t.adminModalNotesLabel || (lang === 'ar' ? 'إضافة ملاحظة المصالح الجماعية للمواطن:' : 'Note officielle des services :')}</label>
            <textarea id="modal-notes" rows="3" style="width: 100%; padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-surface); color: var(--text-main); font-family: inherit;">${item.notes || ''}</textarea>
          </div>

          <div style="display: flex; gap: 1rem; justify-content: flex-end;">
            <button type="button" class="btn-outline" onclick="closeAdminActionModal()">${t.adminModalCancel || (lang === 'ar' ? 'إلغاء' : 'Annuler')}</button>
            <button type="submit" class="btn-primary">${t.adminModalSave || (lang === 'ar' ? '💾 حفظ التحديثات' : '💾 Enregistrer')}</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const existing = document.getElementById('admin-action-modal');
  if (existing) existing.remove();

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeAdminActionModal() {
  const modal = document.getElementById('admin-action-modal');
  if (modal) modal.remove();
}

/* Save Admin Status Update (Flask API + Local Storage Sync) */
async function handleAdminStatusUpdate(e, id) {
  e.preventDefault();

  const step = parseInt(document.getElementById('modal-status-step').value);
  const notes = document.getElementById('modal-notes').value.trim();
  const token = localStorage.getItem('police_admin_token');
  const lang = getLang();

  const stepLabels = lang === 'ar' ? {
    1: "تم الاستلام وتسجيل البلاغ",
    2: "قيد المعاينة الميدانية (BMH)",
    3: "قيد اتخاذ الإجراء الإداري والتنفيذ",
    4: "تم المعالجة واختتام البلاغ بنجاح"
  } : {
    1: "Signalement reçu et enregistré",
    2: "Inspection sur le terrain (BMH)",
    3: "Mesures administratives & Exécution",
    4: "Signalement traité et clôturé avec succès"
  };

  try {
    const response = await fetch(`/api/admin/complaints/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ statusStep: step, status: stepLabels[step], notes })
    });

    if (response.ok) {
      alert(lang === 'ar' ? 'تم تحديث حالة الشكاية بنجاح في القاعدة البيانات!' : 'Statut mis à jour avec succès dans la base de données !');
      closeAdminActionModal();
      loadAdminDashboardData();
      return;
    }
  } catch (err) {
    console.log('Flask API offline, updating local cache...');
  }

  // Local Storage Fallback
  const item = adminComplaintsList.find(c => c.id === id);
  if (item) {
    item.statusStep = step;
    item.status = stepLabels[step];
    item.notes = notes;
    localStorage.setItem('police_portal_complaints_db', JSON.stringify(adminComplaintsList));
  }

  alert(lang === 'ar' ? 'تم تحديث حالة الشكاية بنجاح!' : 'Statut mis à jour avec succès !');
  closeAdminActionModal();
  updateDashboardStats();
  renderAdminTable(adminComplaintsList);
}
