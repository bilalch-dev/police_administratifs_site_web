/* ==========================================================================
   ADMIN PORTAL SCRIPT - Municipal Officer JWT Login, Feed & Status Inspection
   ========================================================================== */

let adminComplaintsList = [];

document.addEventListener('DOMContentLoaded', () => {
  initAdminAuthCheck();
  initLoginForm();
});

/* Check Authentication State */
function initAdminAuthCheck() {
  const token = localStorage.getItem('police_admin_token');
  const user = localStorage.getItem('police_admin_user');

  const loginSec = document.getElementById('admin-login-section');
  const dashSec = document.getElementById('admin-dashboard-section');

  if (token && user) {
    if (loginSec) loginSec.style.display = 'none';
    if (dashSec) dashSec.style.display = 'block';

    const officerBadge = document.getElementById('officer-badge');
    if (officerBadge) officerBadge.innerText = `👤 الموظف: ${user}`;

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

    // Static fallback for offline testing (admin / admin123)
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('police_admin_token', 'demo_jwt_token_2026');
      localStorage.setItem('police_admin_user', 'admin');
      initAdminAuthCheck();
    } else {
      alert(lang === 'ar' ? 'اسم المستخدم أو كلمة المرور غير صحيحة' : 'Identifiants incorrects');
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
      c.id.toLowerCase().includes(search) || 
      c.name.toLowerCase().includes(search) ||
      c.title.toLowerCase().includes(search)
    );
  }

  if (cat !== 'ALL') {
    filtered = filtered.filter(c => c.category === cat);
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

  if (data.length === 0) {
    container.innerHTML = `<p style="text-align: center; color: var(--text-light); padding: 2rem;">${lang === 'ar' ? 'لا توجد شكايات تطابق الفلتر المختارة.' : 'Aucun signalement ne correspond au filtre.'}</p>`;
    return;
  }

  const stepBadges = {
    1: { bg: 'rgba(2, 132, 199, 0.1)', color: 'var(--info)', text: lang === 'ar' ? '1. تم الاستلام' : '1. Reçu' },
    2: { bg: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', text: lang === 'ar' ? '2. قيد المعاينة (BMH)' : '2. Inspection' },
    3: { bg: 'rgba(13, 148, 136, 0.1)', color: 'var(--primary-light)', text: lang === 'ar' ? '3. قيد الإجراء والتنفيذ' : '3. En cours' },
    4: { bg: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', text: lang === 'ar' ? '4. تم المعالجة والتسوية' : '4. Traité' }
  };

  container.innerHTML = `
    <table style="width: 100%; border-collapse: collapse; text-align: ${lang === 'ar' ? 'right' : 'left'}; font-size: 0.9rem;">
      <thead>
        <tr style="background: var(--bg-main); border-bottom: 2px solid var(--border-color);">
          <th style="padding: 0.85rem 1rem;">${lang === 'ar' ? 'رمز التتبع' : 'Code'}</th>
          <th style="padding: 0.85rem 1rem;">${lang === 'ar' ? 'المواطن والهاتف' : 'Citoyen & Tél'}</th>
          <th style="padding: 0.85rem 1rem;">${lang === 'ar' ? 'المجال' : 'Catégorie'}</th>
          <th style="padding: 0.85rem 1rem;">${lang === 'ar' ? 'موضوع البلاغ والموقع' : 'Sujet & Lieu'}</th>
          <th style="padding: 0.85rem 1rem;">${lang === 'ar' ? 'المرحلة الحالية' : 'Étape'}</th>
          <th style="padding: 0.85rem 1rem; text-align: center;">${lang === 'ar' ? 'الإجراءات' : 'Actions'}</th>
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
                  ⚙️ ${lang === 'ar' ? 'تحديث وملاحظات' : 'Inspecter'}
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

  const modalHtml = `
    <div id="admin-action-modal" class="search-modal active" onclick="if(event.target.id==='admin-action-modal') closeAdminActionModal()">
      <div class="search-box-card" style="max-width: 650px; padding: 2rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 1.5rem;">
          <h3 style="font-size: 1.3rem;">⚙️ ${lang === 'ar' ? `معالجة الشكاية: ${item.id}` : `Traitement: ${item.id}`}</h3>
          <button class="btn-icon" onclick="closeAdminActionModal()">❌</button>
        </div>

        <div style="background: var(--bg-main); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; border: 1px solid var(--border-color);">
          <p style="font-size: 0.95rem; margin-bottom: 0.4rem;"><strong>👤 ${lang === 'ar' ? 'المواطن:' : 'Citoyen:'}</strong> ${item.name} (${item.phone})</p>
          <p style="font-size: 0.95rem; margin-bottom: 0.4rem;"><strong>📍 ${lang === 'ar' ? 'الموقع:' : 'Lieu:'}</strong> ${item.location}</p>
          <p style="font-size: 0.95rem; margin-bottom: 0.4rem;"><strong>📝 ${lang === 'ar' ? 'تفاصيل البلاغ:' : 'Détails:'}</strong> ${item.details}</p>
        </div>

        <form id="admin-update-form" onsubmit="handleAdminStatusUpdate(event, '${item.id}')">
          <div style="margin-bottom: 1.25rem;">
            <label style="display: block; font-weight: 700; margin-bottom: 0.5rem;">${lang === 'ar' ? 'تحديث مرحلة المعالجة الحالية:' : 'Mise à jour de l\'étape :'}</label>
            <select id="modal-status-step" style="width: 100%; padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-surface); color: var(--text-main); font-weight: 700;">
              <option value="1" ${item.statusStep === 1 ? 'selected' : ''}>📥 1. تم الاستلام وتسجيل البلاغ</option>
              <option value="2" ${item.statusStep === 2 ? 'selected' : ''}>🔍 2. قيد المعاينة الميدانية (المكتب الصحي BMH)</option>
              <option value="3" ${item.statusStep === 3 ? 'selected' : ''}>⚙️ 3. قيد اتخاذ الإجراء الإداري والتنفيذ</option>
              <option value="4" ${item.statusStep === 4 ? 'selected' : ''}>✅ 4. تم المعالجة واختتام البلاغ بنجاح</option>
            </select>
          </div>

          <div style="margin-bottom: 1.75rem;">
            <label style="display: block; font-weight: 700; margin-bottom: 0.5rem;">${lang === 'ar' ? 'إضافة ملاحظة المصالح الجماعية للمواطن:' : 'Note officielle des services :'}</label>
            <textarea id="modal-notes" rows="3" style="width: 100%; padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-surface); color: var(--text-main); font-family: inherit;">${item.notes || ''}</textarea>
          </div>

          <div style="display: flex; gap: 1rem; justify-content: flex-end;">
            <button type="button" class="btn-outline" onclick="closeAdminActionModal()">${lang === 'ar' ? 'إلغاء' : 'Annuler'}</button>
            <button type="submit" class="btn-primary">💾 ${lang === 'ar' ? 'حفظ التحديثات' : 'Enregistrer'}</button>
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

  const stepLabels = {
    1: "تم الاستلام وتسجيل البلاغ",
    2: "قيد المعاينة الميدانية (BMH)",
    3: "قيد اتخاذ الإجراء الإداري والتنفيذ",
    4: "تم المعالجة واختتام البلاغ بنجاح"
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
      alert(lang === 'ar' ? 'تم تحديث حالة الشكاية بنجاح في القاعدة البيانات!' : 'Statut mis à jour avec succès !');
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

  alert(lang === 'ar' ? 'تم تحديث حالة الشكاية بنجاح!' : 'Statut mis à jour !');
  closeAdminActionModal();
  updateDashboardStats();
  renderAdminTable(adminComplaintsList);
}
