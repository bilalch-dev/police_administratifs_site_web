/* ==========================================================================
   HOMEPAGE SCRIPT - 100% Bilingual (AR/FR) Search, Stats, Domains, Legal & Governance
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderHomeStats();
  renderFeaturedDomains();
  renderLegalAuthoritiesSummary();
  initHeroQuickSearch();
  updateHomeStaticLabels();
});

/* Update ALL Static Labels on Home Page according to language */
function updateHomeStaticLabels() {
  const lang = getLang();
  const t = getTranslation();

  const heroBadge = document.querySelector('.hero-badge');
  if (heroBadge) heroBadge.innerHTML = `<span>🛡️</span> ${t.homeHeroBadge}`;

  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) heroTitle.innerHTML = t.homeHeroTitle;

  const heroDesc = document.querySelector('.hero-description');
  if (heroDesc) heroDesc.innerHTML = t.homeHeroDesc;

  const searchInput = document.getElementById('hero-search-input');
  if (searchInput) searchInput.placeholder = t.searchPlaceholder;

  // Search Card Header & Most Searched
  const searchHeader = document.querySelector('.hero-card-header h4');
  if (searchHeader) searchHeader.innerHTML = `<span>🔍</span> ${t.searchHeader}`;

  const searchBadge = document.querySelector('.hero-card-header .ticker-badge');
  if (searchBadge) searchBadge.innerText = t.searchBadge;

  const mostSearched = document.querySelector('.hero-graphic-card p');
  if (mostSearched) mostSearched.innerText = t.mostSearched;

  // Hero CTAs
  const ctas = document.querySelectorAll('.hero-ctas a, .hero-ctas button');
  if (ctas.length >= 3) {
    ctas[0].innerHTML = `<span>🏛️</span> ${t.exploreDomainsBtn}`;
    ctas[1].innerHTML = `<span>📝</span> ${t.fileComplaintBtn}`;
    ctas[2].innerHTML = `<span>👁️</span> ${t.previewPdf}`;
  }

  // Section Headers
  const domainTag = document.querySelector('.domains-section .section-tag');
  if (domainTag) domainTag.innerText = t.domainsTag;

  const domainTitle = document.querySelector('.domains-section .section-title');
  if (domainTitle) domainTitle.innerText = t.domainsTitle;

  const domainDesc = document.querySelector('.domains-section .section-desc');
  if (domainDesc) domainDesc.innerText = t.domainsDesc;

  const authTag = document.querySelector('.legal-highlight-section .section-tag');
  if (authTag) authTag.innerText = t.authoritiesTag;

  const authTitle = document.querySelector('.legal-highlight-section .section-title');
  if (authTitle) authTitle.innerText = t.authoritiesTitle;

  const authDesc = document.querySelector('.legal-highlight-section p');
  if (authDesc) authDesc.innerText = t.authoritiesDesc;

  const moreDetailsBtn = document.querySelector('.legal-highlight-section .btn-primary');
  if (moreDetailsBtn) moreDetailsBtn.innerText = t.moreDetailsBtn;

  // Governance Principles Card
  const govCardTitle = document.querySelector('.glass-panel h3');
  if (govCardTitle) govCardTitle.innerHTML = `<span>⚖️</span> ${t.govTitle}`;

  const govItems = document.querySelectorAll('.glass-panel div > div[style*="padding:1rem"]');
  if (govItems.length >= 3) {
    govItems[0].querySelector('h4').innerText = t.gov1Title;
    govItems[0].querySelector('p').innerText = t.gov1Desc;

    govItems[1].querySelector('h4').innerText = t.gov2Title;
    govItems[1].querySelector('p').innerText = t.gov2Desc;

    govItems[2].querySelector('h4').innerText = t.gov3Title;
    govItems[2].querySelector('p').innerText = t.gov3Desc;
  }

  // Citizen Callout
  const citizenSection = document.getElementById('home-citizen-cta') || document.querySelector('.container:last-of-type');
  if (citizenSection) {
    const citizenTag = citizenSection.querySelector('.section-tag');
    if (citizenTag) citizenTag.innerText = t.citizenTag || (lang === 'ar' ? 'خدمة المواطن' : 'Service Citoyen');

    const citizenTitle = citizenSection.querySelector('h2');
    if (citizenTitle) citizenTitle.innerText = t.citizenTitle;

    const citizenDesc = citizenSection.querySelector('p');
    if (citizenDesc) citizenDesc.innerText = t.citizenDesc;

    const citizenBtn = citizenSection.querySelector('.btn-primary');
    if (citizenBtn) citizenBtn.innerText = t.citizenBtn;
  }

  // PDF Banner
  const pdfTitle = document.querySelector('.pdf-banner-content h3');
  if (pdfTitle) pdfTitle.innerText = lang === 'ar' ? 'حمّل وتصفّح النسخة الكاملة من الدليل الرسمي للشرطة الإدارية' : 'Téléchargez et Consultez le Guide Officiel de la Police Administrative';

  const pdfDesc = document.querySelector('.pdf-banner-content p');
  if (pdfDesc) pdfDesc.innerText = lang === 'ar' 
    ? 'وثيقة مرجعية شاملة أعدتها المديرية العامة للجماعات الترابية لتمكين المنتخبين والممارسين من الإلمام بكافة ضوابط وميادين الشرطة الإدارية الجماعية (28 صفحة).'
    : 'Un document de référence complet préparé par la Direction Générale des Collectivités Territoriales (28 pages).';

  const pdfDownload = document.querySelector('.pdf-banner-content .btn-accent');
  if (pdfDownload) pdfDownload.innerText = `📥 ${t.downloadPdf}`;

  const pdfPreview = document.querySelector('.pdf-banner-content .btn-outline');
  if (pdfPreview) pdfPreview.innerText = `👁️ ${t.previewPdf}`;

  const pdfCount = document.querySelector('.pdf-banner-action h4');
  if (pdfCount) pdfCount.innerText = t.pdfPageCount;

  const pdfSub = document.querySelector('.pdf-banner-action p');
  if (pdfSub) pdfSub.innerText = t.pdfSubText;

  // Pills
  const pills = document.querySelectorAll('.hero-pill');
  if (pills.length >= 5) {
    if (lang === 'fr') {
      pills[0].innerText = 'Santé & Hygiène';
      pills[1].innerText = 'Domaine Public';
      pills[2].innerText = 'Établissements Classés';
      pills[3].innerText = 'Chiens Errants';
      pills[4].innerText = 'Lutte contre la Rage';
    } else {
      pills[0].innerText = 'الصحة والنظافة';
      pills[1].innerText = 'احتلال الملك العمومي';
      pills[2].innerText = 'المؤسسات المرتبة';
      pills[3].innerText = 'الكلاب الضالة';
      pills[4].innerText = 'داء السعار';
    }
  }
}

/* Render Stats Counters */
function renderHomeStats() {
  const container = document.getElementById('stats-grid-container');
  const t = getTranslation();
  if (!container || !t || !t.stats) return;

  container.innerHTML = t.stats.map(s => `
    <div class="stat-item fade-in">
      <div style="font-size: 2rem; margin-bottom: 0.25rem;">${s.icon}</div>
      <div class="stat-number">${s.number}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');
}

/* Render Featured Domains Grid */
function renderFeaturedDomains() {
  const container = document.getElementById('featured-domains-container');
  const lang = getLang();
  const t = getTranslation();
  if (!container || !t || !t.domains) return;

  container.innerHTML = t.domains.map(d => `
    <div class="domain-card fade-in">
      <div class="domain-icon-box">${d.icon}</div>
      <span class="section-tag" style="align-self: flex-start; margin-bottom: 0.75rem; font-size: 0.75rem;">${d.subtitle}</span>
      <h3 class="domain-title">${d.title}</h3>
      <p class="domain-desc">${d.desc}</p>
      
      <div class="domain-tags">
        ${d.tags.map(tag => `<span class="domain-tag"># ${tag}</span>`).join('')}
      </div>

      <a href="domains.html#${d.id}" class="domain-link">
        ${t.exploreRulesBtn}
      </a>
    </div>
  `).join('');
}

/* Render Legal Authorities Summary */
function renderLegalAuthoritiesSummary() {
  const container = document.getElementById('legal-summary-container');
  const lang = getLang();
  const t = getTranslation();
  if (!container || !t || !t.authorities) return;

  container.innerHTML = t.authorities.map(a => `
    <div class="legal-feature-item">
      <div class="legal-feature-icon">${a.icon}</div>
      <div class="legal-feature-content">
        <h4>${a.role}</h4>
        <p><strong>${lang === 'ar' ? 'النطاق' : 'Portée'}:</strong> ${a.scope}</p>
        <p style="font-size:0.85rem; margin-top:0.35rem; color:var(--text-light);">
          • ${a.duties.slice(0, 2).join('<br>• ')}
        </p>
      </div>
    </div>
  `).join('');
}

/* Hero Quick Search */
function initHeroQuickSearch() {
  const heroInput = document.getElementById('hero-search-input');
  if (heroInput) {
    heroInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = heroInput.value.trim();
        if (val) {
          openSearchModal();
          const modalInput = document.getElementById('modal-search-input');
          if (modalInput) {
            modalInput.value = val;
            handleModalSearch(val);
          }
        }
      }
    });
  }
}
