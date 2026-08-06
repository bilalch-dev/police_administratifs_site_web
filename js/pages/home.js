/* ==========================================================================
   HOMEPAGE SCRIPT - Interactive Stats, Featured Domains, Legal Spotlight
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderHomeStats();
  renderFeaturedDomains();
  renderLegalAuthoritiesSummary();
  initHeroQuickSearch();
});

/* Render Stats Counters */
function renderHomeStats() {
  const container = document.getElementById('stats-grid-container');
  if (!container || !policePortalData || !policePortalData.stats) return;

  container.innerHTML = policePortalData.stats.map(s => `
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
  if (!container || !policePortalData || !policePortalData.domains) return;

  container.innerHTML = policePortalData.domains.map(d => `
    <div class="domain-card fade-in">
      <div class="domain-icon-box">${d.icon}</div>
      <span class="section-tag" style="align-self: flex-start; margin-bottom: 0.75rem; font-size: 0.75rem;">${d.subtitle}</span>
      <h3 class="domain-title">${d.title}</h3>
      <p class="domain-desc">${d.desc}</p>
      
      <div class="domain-tags">
        ${d.tags.map(t => `<span class="domain-tag"># ${t}</span>`).join('')}
      </div>

      <a href="domains.html#${d.id}" class="domain-link">
        استكشف المساطر والضوابط الكاملة <span>←</span>
      </a>
    </div>
  `).join('');
}

/* Render Legal Authorities Summary */
function renderLegalAuthoritiesSummary() {
  const container = document.getElementById('legal-summary-container');
  if (!container || !policePortalData || !policePortalData.authorities) return;

  container.innerHTML = policePortalData.authorities.map(a => `
    <div class="legal-feature-item">
      <div class="legal-feature-icon">${a.icon}</div>
      <div class="legal-feature-content">
        <h4>${a.role}</h4>
        <p><strong>النطاق:</strong> ${a.scope}</p>
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
