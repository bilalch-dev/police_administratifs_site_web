/* ==========================================================================
   GLOBAL APP LOGIC - Language Switcher (AR/FR), Theme Manager, Shared Header/Footer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLanguageManager();
  initThemeManager();
  renderSharedHeader();
  renderSharedFooter();
  initGlobalSearchModal();
});

/* Language Manager */
function initLanguageManager() {
  const currentLang = localStorage.getItem('police_portal_lang') || 'ar';
  applyLanguageSettings(currentLang);
}

function toggleLanguage() {
  const current = localStorage.getItem('police_portal_lang') || 'ar';
  const next = current === 'ar' ? 'fr' : 'ar';
  localStorage.setItem('police_portal_lang', next);
  location.reload();
}

function applyLanguageSettings(lang) {
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
}

/* Theme Manager */
function initThemeManager() {
  const savedTheme = localStorage.getItem('police_portal_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('police_portal_theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('title', theme === 'dark' ? 'Mode Clair' : 'Mode Sombre');
  }
}

/* Shared Header Component */
function renderSharedHeader() {
  const headerEl = document.getElementById('main-header');
  if (!headerEl) return;

  const lang = getLang();
  const t = getTranslation();
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  headerEl.className = 'site-header';
  headerEl.innerHTML = `
    <!-- Ticker Bar -->
    <div class="ticker-bar">
      <div class="container ticker-content">
        <span class="ticker-badge">${t.tickerBadge}</span>
        <div class="ticker-text">
          <span>${t.tickerNotice}</span>
        </div>
        <a href="Guide_police_administrative.pdf" target="_blank" class="ticker-badge" style="background:#ffffff; color:#0f172a;">${t.downloadPdf}</a>
      </div>
    </div>

    <!-- Main Navigation -->
    <div class="container navbar">
      <a href="index.html" class="logo-brand">
        <div class="logo-icon">⚖️</div>
        <div class="logo-text">
          <h1>${t.siteTitle}</h1>
          <span>${t.siteSubtitle}</span>
        </div>
      </a>

      <nav class="nav-menu">
        <a href="index.html" class="nav-link ${currentPath === 'index.html' || currentPath === '' ? 'active' : ''}">${t.navHome}</a>
        <a href="legal.html" class="nav-link ${currentPath === 'legal.html' ? 'active' : ''}">${t.navLegal}</a>
        <a href="domains.html" class="nav-link ${currentPath === 'domains.html' ? 'active' : ''}">${t.navDomains}</a>
        <a href="procedures.html" class="nav-link ${currentPath === 'procedures.html' ? 'active' : ''}">${t.navProcedures}</a>
        <a href="complaints.html" class="nav-link ${currentPath === 'complaints.html' ? 'active' : ''}">${t.navComplaints}</a>
        <a href="resources.html" class="nav-link ${currentPath === 'resources.html' ? 'active' : ''}">${t.navResources}</a>
        <a href="admin.html" class="nav-link ${currentPath === 'admin.html' ? 'active' : ''}" style="color:var(--primary-light); font-weight:800;">🔐 ${t.navAdmin}</a>
      </nav>

      <div class="nav-actions">
        <button id="lang-toggle-btn" class="btn-outline" style="padding:0.35rem 0.75rem; font-size:0.85rem;" onclick="toggleLanguage()">
          🌐 ${lang === 'ar' ? 'Français' : 'العربية'}
        </button>
        <button id="search-trigger-btn" class="btn-icon" title="Search" onclick="openSearchModal()">🔍</button>
        <button id="theme-toggle-btn" class="btn-icon" onclick="toggleTheme()">🌙</button>
        <a href="complaints.html" class="btn-primary" style="display: none; @media(min-width:768px){display:inline-flex;}">${t.fileComplaintBtn}</a>
      </div>
    </div>
  `;

  updateThemeIcon(document.documentElement.getAttribute('data-theme') || 'light');
}

/* Shared Footer Component */
function renderSharedFooter() {
  const footerEl = document.getElementById('main-footer');
  if (!footerEl) return;

  const lang = getLang();
  const t = getTranslation();

  footerEl.className = 'site-footer';
  footerEl.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>${t.siteTitle}</h3>
          <p>${lang === 'ar' 
            ? 'البوابة الرقمية الموحدة لنشر ثقافة الشرطة الإدارية الجماعية، تيسير مساطر الترخيص، وتوفير قناة رقمية موثوقة لتقديم شكايات وبلاغات المواطنين بالحضر والريف.' 
            : 'Le portail numérique officiel dédié à la sensibilisation sur la police administrative communale, la simplification des procédures d\'autorisation et le traitement des plaintes.'}</p>
          <a href="Guide_police_administrative.pdf" target="_blank" class="btn-accent" style="font-size:0.875rem; padding:0.5rem 1.25rem;">
            📄 ${t.downloadPdf}
          </a>
        </div>

        <div class="footer-col">
          <h4>${lang === 'ar' ? 'روابط سريعة' : 'Liens Rapides'}</h4>
          <ul class="footer-links">
            <li><a href="index.html">${t.navHome}</a></li>
            <li><a href="legal.html">${t.navLegal}</a></li>
            <li><a href="domains.html">${t.navDomains}</a></li>
            <li><a href="procedures.html">${t.navProcedures}</a></li>
            <li><a href="admin.html">🔐 ${t.navAdmin}</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>${lang === 'ar' ? 'خدمات المواطن' : 'Services Citoyens'}</h4>
          <ul class="footer-links">
            <li><a href="complaints.html">${t.navComplaints}</a></li>
            <li><a href="complaints.html#track">${lang === 'ar' ? 'تتبع حالة الشكاية' : 'Suivi de plainte'}</a></li>
            <li><a href="resources.html">${t.navResources}</a></li>
            <li><a href="Guide_police_administrative.pdf" target="_blank">${t.downloadPdf}</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>${lang === 'ar' ? 'الميادين الأساسية' : 'Domaines Clés'}</h4>
          <ul class="footer-links">
            <li><a href="domains.html#health">${lang === 'ar' ? 'الصحة والنظافة والبيئة' : 'Santé & Environnement'}</a></li>
            <li><a href="domains.html#traffic">${lang === 'ar' ? 'شرطة السير والجولان' : 'Circulation & Voirie'}</a></li>
            <li><a href="domains.html#rural">${lang === 'ar' ? 'الشرطة القروية' : 'Police Rurale'}</a></li>
            <li><a href="legal.html#authorities">${lang === 'ar' ? 'اختصاصات رئيس الجماعة' : 'Maire & Prérogatives'}</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© 2026 ${t.siteTitle} - ${lang === 'ar' ? 'مستوحى من الدليل الرسمي للمديرية العامة للجماعات الترابية.' : 'Inspiré du guide officiel de la DGCT.'}</p>
        <p>${lang === 'ar' ? 'تصميم مريح يدعم الوصول الشامل والتصفح الآمن.' : 'Conception accessible et sécurisée.'}</p>
      </div>
    </div>
  `;
}

/* Global Search Modal */
function initGlobalSearchModal() {
  const lang = getLang();
  const t = getTranslation();
  const modalHtml = `
    <div id="global-search-modal" class="search-modal" onclick="closeSearchModalOnBackdrop(event)">
      <div class="search-box-card">
        <div class="search-input-wrapper">
          <span>🔍</span>
          <input type="text" id="modal-search-input" placeholder="${t.searchPlaceholder}" oninput="handleModalSearch(this.value)">
          <button class="btn-icon" onclick="closeSearchModal()">❌</button>
        </div>
        <div id="modal-search-results" class="search-results-list">
          <p style="text-align:center; color:var(--text-light); padding:2rem;">${t.modalStartText}</p>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function openSearchModal() {
  const modal = document.getElementById('global-search-modal');
  if (modal) {
    modal.classList.add('active');
    setTimeout(() => document.getElementById('modal-search-input').focus(), 100);
  }
}

function closeSearchModal() {
  const modal = document.getElementById('global-search-modal');
  if (modal) modal.classList.remove('active');
}

function closeSearchModalOnBackdrop(e) {
  if (e.target.id === 'global-search-modal') closeSearchModal();
}

function handleModalSearch(query) {
  const resultsContainer = document.getElementById('modal-search-results');
  const q = query.trim().toLowerCase();
  const lang = getLang();
  const t = getTranslation();

  if (!q) {
    resultsContainer.innerHTML = `<p style="text-align:center; color:var(--text-light); padding:2rem;">${t.modalStartText}</p>`;
    return;
  }

  let matches = [];

  if (t.domains) {
    t.domains.forEach(d => {
      if (d.title.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q)) {
        matches.push({ type: lang === 'ar' ? 'مجال تدخل' : 'Domaine', title: d.title, desc: d.desc, link: 'domains.html' });
      }
    });
  }

  if (matches.length === 0) {
    resultsContainer.innerHTML = `<p style="text-align:center; color:var(--text-light); padding:2rem;">${t.modalNoResults}</p>`;
    return;
  }

  resultsContainer.innerHTML = matches.map(m => `
    <div style="padding:1rem; border-bottom:1px solid var(--border-color); cursor:pointer;" onclick="window.location.href='${m.link}'">
      <span style="font-size:0.75rem; background:rgba(13,148,136,0.1); color:var(--primary-light); padding:0.2rem 0.5rem; border-radius:4px; font-weight:700;">${m.type}</span>
      <h4 style="margin:0.4rem 0 0.2rem 0; font-size:1.05rem;">${m.title}</h4>
      <p style="font-size:0.875rem; color:var(--text-muted);">${m.desc}</p>
    </div>
  `).join('');
}

/* Global PDF Preview Viewer Modal */
function openPdfPreviewModal() {
  const lang = getLang();
  const modalHtml = `
    <div id="pdf-preview-modal" class="search-modal active" onclick="if(event.target.id==='pdf-preview-modal') closePdfPreviewModal()">
      <div class="search-box-card" style="max-width:900px; width:92%; height:82vh; padding:1.5rem; display:flex; flex-direction:column;">
        <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid var(--border-color); padding-bottom:1rem; margin-bottom:1rem;">
          <h3 style="font-size:1.3rem;">📘 ${lang === 'ar' ? 'معاينة وتصفح الدليل الرسمي للشرطة الإدارية الجماعية' : 'Aperçu du Guide Officiel de la Police Administrative'}</h3>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <a href="Guide_police_administrative.pdf" download class="btn-accent" style="font-size:0.85rem; padding:0.4rem 1rem;">📥 ${lang === 'ar' ? 'تنزيل الملف' : 'Télécharger'}</a>
            <button class="btn-icon" onclick="closePdfPreviewModal()">❌</button>
          </div>
        </div>

        <div style="flex:1; width:100%; background:var(--bg-main); border-radius:var(--radius-md); overflow:hidden;">
          <iframe src="Guide_police_administrative.pdf" style="width:100%; height:100%; border:none;"></iframe>
        </div>
      </div>
    </div>
  `;

  const existing = document.getElementById('pdf-preview-modal');
  if (existing) existing.remove();

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closePdfPreviewModal() {
  const modal = document.getElementById('pdf-preview-modal');
  if (modal) modal.remove();
}
