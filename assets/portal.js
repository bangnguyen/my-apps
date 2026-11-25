(() => {
  const FALLBACK_REGISTRY = {
    portalTitle: 'My Apps',
    portalSubtitle: 'Không gian ứng dụng gia đình • Chạy mượt Offline trên iOS, iPadOS & Android',
    categories: [
      { id: 'all', label: 'Tất cả' },
      { id: 'personal', label: 'Cá nhân' },
      { id: 'son', label: 'Con trai' },
      { id: 'daughter', label: 'Con gái' }
    ],
    apps: [
      {
        id: 'gym-cardio-coach',
        name: 'Gym Cardio Coach',
        tagline: 'Giáo án PHA 40 phút • 8 vòng liên hoàn',
        description: 'Huấn luyện viên tập tạ kết hợp Cardio tại nhà: nhịp gõ gỗ trầm ấm, giọng đọc HLV Tiếng Việt tự động nhắc mức tạ và giữ sáng màn hình.',
        path: './gym/',
        icon: './gym/icons/icon.svg',
        category: 'personal',
        categoryLabel: 'Sức khỏe • Cá nhân',
        accent: '#FF5526',
        badge: '40 PHÚT • 8 VÒNG',
        status: 'active',
        highlights: [
          'Đẩy ngực • Kéo xô • Đá đùi • Gập bụng',
          'Giọng HLV vi-VN & Nhịp gỗ Web Audio',
          'PWA Offline • Wake Lock chống tắt màn hình'
        ]
      },
      {
        id: 'core-dumbbell-10kg-coach',
        name: 'Core & Dumbbell 10kg Coach',
        tagline: 'Bụng & Tạ tay 10kg • 3–5 vòng Cardio Core',
        description: 'Huấn luyện viên giọng nói Tiếng Việt & nhịp gõ gỗ tích-tắc cho bài tập cơ bụng kết hợp tạ tay 10kg tại nhà, tự nhắc đổi tay ở nhịp 8 và giữ sáng màn hình.',
        path: './abs-dumbbell/',
        icon: './abs-dumbbell/icons/icon.svg',
        category: 'personal',
        categoryLabel: 'Sức khỏe • Cá nhân',
        accent: '#06B6D4',
        badge: '3–5 VÒNG • 10KG CORE',
        status: 'active',
        highlights: [
          '6 trạm liên hoàn Tạ 10kg & Dụng cụ tập bụng',
          'Nhịp gỗ Web Audio + Giọng HLV vi-VN nhắc đổi tay',
          'PWA Độc lập Offline • Screen Wake Lock'
        ]
      }
    ]
  };

  let registry = FALLBACK_REGISTRY;
  let selectedCategory = 'all';
  let deferredInstallPrompt = null;

  const activeGrid = document.getElementById('activeAppsGrid');
  const plannedSection = document.getElementById('plannedSection');
  const plannedGrid = document.getElementById('plannedAppsGrid');
  const categoryBar = document.getElementById('categoryBar');
  const activeCountPill = document.getElementById('activeCountPill');
  const networkDot = document.getElementById('networkDot');
  const networkLabel = document.getElementById('networkLabel');

  function escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderCategories() {
    const cats = registry.categories || [{ id: 'all', label: 'Tất cả' }];
    categoryBar.innerHTML = cats
      .map(
        (cat) => `
        <button type="button" class="cat-chip ${cat.id === selectedCategory ? 'active' : ''}" data-cat="${escapeHtml(cat.id)}">
          ${escapeHtml(cat.label)}
        </button>`
      )
      .join('');

    categoryBar.querySelectorAll('.cat-chip').forEach((btn) => {
      btn.addEventListener('click', () => {
        selectedCategory = btn.dataset.cat;
        renderCategories();
        renderApps();
      });
    });
  }

  function renderApps() {
    const allApps = Array.isArray(registry.apps) ? registry.apps : [];
    const filtered =
      selectedCategory === 'all'
        ? allApps
        : allApps.filter((a) => a.category === selectedCategory);

    const activeApps = filtered.filter((a) => a.status !== 'planned');
    const plannedApps = filtered.filter((a) => a.status === 'planned');

    activeCountPill.textContent = `${activeApps.length} ứng dụng`;

    if (activeApps.length === 0) {
      activeGrid.innerHTML = `
        <div class="empty-filter">
          Chưa có ứng dụng đang hoạt động trong mục này. Bạn có thể kích hoạt hoặc thêm thư mục mới trong <code>apps.json</code>.
        </div>`;
    } else {
      activeGrid.innerHTML = activeApps
        .map((app) => {
          const accent = escapeHtml(app.accent || '#FF5526');
          const highlights = Array.isArray(app.highlights)
            ? `<ul class="feature-list">${app.highlights
                .map((h) => `<li>${escapeHtml(h)}</li>`)
                .join('')}</ul>`
            : '';

          return `
            <a class="app-card" href="${escapeHtml(app.path)}" style="--card-accent: ${accent}">
              <div class="app-card-top">
                <div class="app-icon-wrap">
                  <img src="${escapeHtml(app.icon || './assets/icons/icon.svg')}" alt="${escapeHtml(app.name)}" loading="eager">
                </div>
                <div class="app-meta">
                  <div class="app-badge-row">
                    ${app.badge ? `<span class="app-badge">${escapeHtml(app.badge)}</span>` : ''}
                    ${app.categoryLabel ? `<span class="app-cat-tag">${escapeHtml(app.categoryLabel)}</span>` : ''}
                  </div>
                  <h3 class="app-title">${escapeHtml(app.name)}</h3>
                  <p class="app-tagline">${escapeHtml(app.tagline || '')}</p>
                </div>
              </div>
              <p class="app-desc">${escapeHtml(app.description || '')}</p>
              ${highlights}
              <div class="app-cta-bar">
                <span>Sẵn sàng Offline</span>
                <span class="launch-pill">Mở ứng dụng →</span>
              </div>
            </a>`;
        })
        .join('');
    }

    if (plannedApps.length > 0) {
      plannedSection.hidden = false;
      plannedGrid.innerHTML = plannedApps
        .map(
          (app) => `
          <div class="planned-card">
            <div class="planned-emoji" aria-hidden="true">${escapeHtml(app.emoji || '✨')}</div>
            <div class="planned-info">
              <span class="planned-meta">${escapeHtml(app.categoryLabel || '')} • ${escapeHtml(app.path)}</span>
              <h3>${escapeHtml(app.name)}</h3>
              <p>${escapeHtml(app.tagline || app.description || '')}</p>
            </div>
          </div>`
        )
        .join('');
    } else {
      plannedSection.hidden = true;
    }
  }

  async function loadRegistry() {
    try {
      const res = await fetch('./apps.json', { cache: 'no-cache' });
      if (res.ok) {
        registry = await res.json();
      }
    } catch (_) {
      // Offline first-load fallback uses embedded FALLBACK_REGISTRY
    }
    if (registry.portalTitle) {
      document.getElementById('portalTitle').textContent = registry.portalTitle;
    }
    if (registry.portalSubtitle) {
      document.getElementById('portalSubtitle').textContent = registry.portalSubtitle;
    }
    renderCategories();
    renderApps();
  }

  function updateConnectivityBadge() {
    const online = navigator.onLine;
    networkDot.classList.toggle('offline', !online);
    networkLabel.textContent = online
      ? 'PWA FAMILY HUB • OFFLINE READY'
      : 'ĐANG CHẠY CHẾ ĐỘ OFFLINE';
  }

  function setupInstallGuide() {
    const modal = document.getElementById('installModal');
    const openBtn = document.getElementById('openInstallGuideBtn');
    const closeBtn = document.getElementById('closeInstallModalBtn');
    const nativeBtn = document.getElementById('nativeInstallBtn');

    openBtn.addEventListener('click', () => {
      modal.hidden = false;
    });

    closeBtn.addEventListener('click', () => {
      modal.hidden = true;
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.hidden = true;
    });

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
      nativeBtn.hidden = false;
    });

    nativeBtn.addEventListener('click', async () => {
      if (!deferredInstallPrompt) return;
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      nativeBtn.hidden = true;
      modal.hidden = true;
    });
  }

  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(() => {});
      });
    }
  }

  window.addEventListener('online', updateConnectivityBadge);
  window.addEventListener('offline', updateConnectivityBadge);

  updateConnectivityBadge();
  setupInstallGuide();
  loadRegistry();
  registerServiceWorker();
})();
