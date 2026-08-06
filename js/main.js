/* ==========================================================================
   GLOBAL APP LOGIC - Theme Switcher, Shared Header/Footer, Search Modal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeManager();
  renderSharedHeader();
  renderSharedFooter();
  initGlobalSearchModal();
});

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
    btn.setAttribute('title', theme === 'dark' ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي');
  }
}

/* Shared Header Component */
function renderSharedHeader() {
  const headerEl = document.getElementById('main-header');
  if (!headerEl) return;

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  headerEl.className = 'site-header';
  headerEl.innerHTML = `
    <!-- Ticker Bar -->
    <div class="ticker-bar">
      <div class="container ticker-content">
        <span class="ticker-badge">مستجدات قانونية</span>
        <div class="ticker-text">
          <span>📢 إصدار الدليل التوجيهي الجديد للشرطة الإدارية الجماعية وفق آخر التعديلات التشريعية للميثاق الجماعي.</span>
        </div>
        <a href="Guide_police_administrative.pdf" target="_blank" class="ticker-badge" style="background:#ffffff; color:#0f172a;">تحميل الدليل PDF</a>
      </div>
    </div>

    <!-- Main Navigation -->
    <div class="container navbar">
      <a href="index.html" class="logo-brand">
        <div class="logo-icon">⚖️</div>
        <div class="logo-text">
          <h1>الشرطة الإدارية</h1>
          <span>البوابة الرسمية الجماعية</span>
        </div>
      </a>

      <nav class="nav-menu">
        <a href="index.html" class="nav-link ${currentPath === 'index.html' || currentPath === '' ? 'active' : ''}">الرئيسية</a>
        <a href="legal.html" class="nav-link ${currentPath === 'legal.html' ? 'active' : ''}">الإطار القانوني</a>
        <a href="domains.html" class="nav-link ${currentPath === 'domains.html' ? 'active' : ''}">مجالات التدخل</a>
        <a href="procedures.html" class="nav-link ${currentPath === 'procedures.html' ? 'active' : ''}">المساطر والترخيصات</a>
        <a href="complaints.html" class="nav-link ${currentPath === 'complaints.html' ? 'active' : ''}">بوابة الشكايات</a>
        <a href="resources.html" class="nav-link ${currentPath === 'resources.html' ? 'active' : ''}">المكتبة والمعجم</a>
      </nav>

      <div class="nav-actions">
        <button id="search-trigger-btn" class="btn-icon" title="البحث الشامل" onclick="openSearchModal()">🔍</button>
        <button id="theme-toggle-btn" class="btn-icon" onclick="toggleTheme()">🌙</button>
        <a href="complaints.html" class="btn-primary" style="display: none; @media(min-width:768px){display:inline-flex;}">إيداع شكاية</a>
      </div>
    </div>
  `;

  updateThemeIcon(document.documentElement.getAttribute('data-theme') || 'light');
}

/* Shared Footer Component */
function renderSharedFooter() {
  const footerEl = document.getElementById('main-footer');
  if (!footerEl) return;

  footerEl.className = 'site-footer';
  footerEl.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>الشرطة الإدارية الجماعية</h3>
          <p>البوابة الرقمية الموحدة لنشر ثقافة الشرطة الإدارية الجماعية، تيسير مساطر الترخيص، وتوفير قناة رقمية موثوقة لتقديم شكايات وبلاغات المواطنين بالحضر والريف.</p>
          <a href="Guide_police_administrative.pdf" target="_blank" class="btn-accent" style="font-size:0.875rem; padding:0.5rem 1.25rem;">
            📄 تحميل الدليل الرسمـي (PDF)
          </a>
        </div>

        <div class="footer-col">
          <h4>روابط السريعة</h4>
          <ul class="footer-links">
            <li><a href="index.html">الصفحة الرئيسية</a></li>
            <li><a href="legal.html">الإطار القانوني والأجهزة</a></li>
            <li><a href="domains.html">مجالات التدخل الرئيسية</a></li>
            <li><a href="procedures.html">دليل المساطر والترخيصات</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>خدمات المواطن</h4>
          <ul class="footer-links">
            <li><a href="complaints.html">إيداع بلاغ أو شكاية</a></li>
            <li><a href="complaints.html#track">تتبع حالة الشكاية</a></li>
            <li><a href="resources.html">معجم المصطلحات القانونية</a></li>
            <li><a href="Guide_police_administrative.pdf" target="_blank">تحميل الوثائق المرجعية</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>الميادين الأساسية</h4>
          <ul class="footer-links">
            <li><a href="domains.html#health">الصحة والنظافة والبيئة</a></li>
            <li><a href="domains.html#traffic">شرطة السير والجولان</a></li>
            <li><a href="domains.html#rural">الشرطة القروية وحماية البيئة</a></li>
            <li><a href="legal.html#authorities">اختصاصات رئيس الجماعة</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© 2026 البوابة الرقمية للشرطة الإدارية الجماعية - مستوحى من الدليل الرسمي للمديرية العامة للجماعات الترابية.</p>
        <p>تصميم مريح يدعم الوصول الشامل والتصفح الآمن.</p>
      </div>
    </div>
  `;
}

/* Global Search Modal */
function initGlobalSearchModal() {
  const modalHtml = `
    <div id="global-search-modal" class="search-modal" onclick="closeSearchModalOnBackdrop(event)">
      <div class="search-box-card">
        <div class="search-input-wrapper">
          <span>🔍</span>
          <input type="text" id="modal-search-input" placeholder="ابحث في القوانين، المجالات، المساطر، أو المصطلحات..." oninput="handleModalSearch(this.value)">
          <button class="btn-icon" onclick="closeSearchModal()">❌</button>
        </div>
        <div id="modal-search-results" class="search-results-list">
          <p style="text-align:center; color:var(--text-light); padding:2rem;">أدخل كلمة البحث للبدء...</p>
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

  if (!q) {
    resultsContainer.innerHTML = `<p style="text-align:center; color:var(--text-light); padding:2rem;">أدخل كلمة البحث للبدء...</p>`;
    return;
  }

  let matches = [];

  // Search domains
  if (policePortalData && policePortalData.domains) {
    policePortalData.domains.forEach(d => {
      if (d.title.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q)) {
        matches.push({ type: 'مجال تدخل', title: d.title, desc: d.desc, link: 'domains.html' });
      }
    });
  }

  // Search glossary
  if (policePortalData && policePortalData.glossary) {
    policePortalData.glossary.forEach(g => {
      if (g.term.toLowerCase().includes(q) || g.def.toLowerCase().includes(q)) {
        matches.push({ type: 'مصطلح قانوني', title: g.term, desc: g.def, link: 'resources.html' });
      }
    });
  }

  if (matches.length === 0) {
    resultsContainer.innerHTML = `<p style="text-align:center; color:var(--text-light); padding:2rem;">لم يتم العثور على نتائج تطابق "${query}"</p>`;
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
