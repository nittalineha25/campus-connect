// Main Application Orchestrator & View Controller with Dark/White Mode & Device Sync
import { appStore } from './store.js';
import { renderNavbar } from './components/navbar.js';
import { renderHeroCarousel } from './components/heroCarousel.js';
import { renderClubDirectory } from './components/clubDirectory.js';
import { renderClubProfile } from './components/clubProfile.js';
import { renderPresidentDashboard } from './components/presidentDashboard.js';
import { renderAuthView } from './components/authModal.js';
import { createClubCard } from './components/clubCard.js';
import { showToast } from './utils/helpers.js';

// Expose toast and routing helpers globally
window.showToast = showToast;
window.appStore = appStore;

function syncRouteFromUrl() {
  const pathname = (window.location.pathname || '/').toLowerCase().replace(/\/$/, '') || '/';
  const hash = (window.location.hash || '').toLowerCase().replace(/^#\/?/, '');
  const target = hash ? `/${hash}` : pathname;

  if (target === '/explore' || target === '/browse') {
    appStore.setView('browse', null, false);
  } else if (target === '/saved') {
    appStore.setView('saved', null, false);
  } else if (target === '/dashboard') {
    appStore.setView('dashboard', null, false);
  } else if (target === '/login') {
    appStore.setView('login', null, false);
  } else if (target.startsWith('/club/')) {
    const clubId = target.replace('/club/', '');
    appStore.setView('club-profile', clubId, false);
  } else {
    appStore.setView('home', null, false);
  }
}

async function initApp() {
  const navbarContainer = document.getElementById('navbar-container');
  const mainView = document.getElementById('main-view');

  // Ensure document theme class matches store
  if (appStore.state.theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // 1. Fetch initial clubs from API (with static fallback)
  try {
    const res = await fetch('/api/clubs');
    if (!res.ok) throw new Error('API request status ' + res.status);
    const data = await res.json();
    if (data.success && data.clubs) {
      appStore.setClubs(data.clubs);
    }
  } catch (err) {
    console.warn('Backend API /api/clubs unavailable, loading static fallback:', err);
    try {
      const fallbackRes = await fetch('/data/clubs.json');
      if (fallbackRes.ok) {
        const clubs = await fallbackRes.json();
        appStore.setClubs(clubs);
      }
    } catch (e2) {
      console.error('Failed to load static clubs data fallback:', e2);
    }
  }

  // 2. Parse initial URL route
  syncRouteFromUrl();

  // 4. Render initial view
  renderCurrentView(navbarContainer, mainView);

  // 5. Handle browser back / forward buttons
  window.addEventListener('popstate', () => {
    syncRouteFromUrl();
  });

  // 6. Subscribe to store changes
  appStore.subscribe(() => {
    renderCurrentView(navbarContainer, mainView);
  });
}

function renderCurrentView(navbarContainer, mainView) {
  // Always update navbar
  renderNavbar(navbarContainer);

  const view = appStore.state.view;

  if (view === 'home') {
    renderHomeView(mainView);
  } else if (view === 'browse') {
    mainView.innerHTML = '<div id="explore-mount"></div>';
    renderClubDirectory(mainView.querySelector('#explore-mount'), true);
  } else if (view === 'saved') {
    renderSavedView(mainView);
  } else if (view === 'club-profile') {
    renderClubProfile(mainView);
  } else if (view === 'dashboard') {
    renderPresidentDashboard(mainView);
  } else if (view === 'login') {
    renderAuthView(mainView);
  }
}

// Render Home View matching Mockup
function renderHomeView(container) {
  container.innerHTML = `
    <div class="space-y-12">
      <!-- 1. Hero Banner + Closing Soon Carousel -->
      <div id="hero-carousel-mount"></div>

      <!-- 2. "Find your people" Category Filters & Grid -->
      <div id="directory-mount"></div>
    </div>
  `;

  renderHeroCarousel(container.querySelector('#hero-carousel-mount'));
  renderClubDirectory(container.querySelector('#directory-mount'), false);
}

// Render Saved / Bookmarked Clubs View with Dark/White Mode
function renderSavedView(container) {
  const savedIds = appStore.state.savedClubIds;
  const savedClubs = appStore.state.clubs.filter(c => savedIds.includes(c.id));

  container.innerHTML = `
    <div class="space-y-6 animate-fade-in pt-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors">Saved Clubs</h2>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">Your bookmarked clubs and upcoming application deadlines.</p>
        </div>
        <div class="text-xs font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-[#111622] px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 transition-colors">
          ${savedClubs.length} saved
        </div>
      </div>

      ${savedClubs.length === 0 ? `
        <div class="text-center py-20 bg-white dark:bg-[#111622] rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3 transition-colors">
          <div class="text-4xl">🔖</div>
          <h3 class="text-base font-bold text-slate-800 dark:text-slate-200">No saved clubs yet</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Click the bookmark icon on any club card or profile to save it here for fast deadline tracking.
          </p>
          <button id="browse-clubs-btn" class="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs font-bold shadow-sm transition-colors">
            Explore Clubs
          </button>
        </div>
      ` : `
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" id="saved-grid-mount"></div>
      `}
    </div>
  `;

  if (savedClubs.length > 0) {
    const gridMount = container.querySelector('#saved-grid-mount');
    savedClubs.forEach(club => {
      gridMount.appendChild(createClubCard(club));
    });
  } else {
    container.querySelector('#browse-clubs-btn')?.addEventListener('click', () => {
      appStore.setView('browse');
    });
  }
}

// Start application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
