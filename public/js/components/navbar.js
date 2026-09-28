// Top Navigation Bar and Mobile Bottom Navigation Bar matching mockup
import { appStore } from '../store.js';

export function renderNavbar(container) {
  const user = appStore.state.user;
  const activeView = appStore.state.view;
  const savedCount = appStore.state.savedClubIds.length;

  container.innerHTML = `
    <header class="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        <!-- Left: Logo & Brand -->
        <div class="flex items-center gap-6">
          <div id="nav-brand" class="flex items-center gap-2 cursor-pointer select-none">
            <div class="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs tracking-tight shadow-sm">
              cc
            </div>
            <span class="font-extrabold text-slate-900 text-base tracking-tight">Campus Connect</span>
          </div>

          <!-- Desktop Navigation Links -->
          <nav class="hidden md:flex items-center gap-1 text-sm font-semibold">
            <button id="nav-link-home" class="px-3.5 py-1.5 rounded-full transition-all ${activeView === 'home' ? 'text-slate-900 font-bold bg-slate-100' : 'text-slate-500 hover:text-slate-900'}">
              Home
            </button>
            <button id="nav-link-explore" class="px-3.5 py-1.5 rounded-full transition-all ${activeView === 'browse' ? 'text-slate-900 font-bold bg-slate-100' : 'text-slate-500 hover:text-slate-900'}">
              Explore
            </button>
            <button id="nav-link-saved" class="px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${activeView === 'saved' ? 'text-slate-900 font-bold bg-slate-100' : 'text-slate-500 hover:text-slate-900'}">
              <span>Saved</span>
              ${savedCount > 0 ? `<span class="w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">${savedCount}</span>` : ''}
            </button>
          </nav>
        </div>

        <!-- Center: Search Input Bar -->
        <div class="hidden sm:flex flex-1 max-w-md mx-4">
          <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input 
              type="text" 
              id="global-search-input"
              value="${appStore.state.searchQuery}"
              placeholder="Search clubs, categories..." 
              class="w-full pl-10 pr-4 py-2 bg-slate-100 hover:bg-slate-200/80 focus:bg-white border border-transparent focus:border-slate-300 rounded-full text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all"
            />
          </div>
        </div>

        <!-- Right: Persona Selector / Auth Dropdown -->
        <div class="flex items-center gap-3">
          
          ${user && user.role === 'president' ? `
            <button id="btn-open-dashboard" class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-black text-white rounded-full text-xs font-semibold shadow-sm transition-all">
              <span>President Portal</span>
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            </button>
          ` : ''}

          <!-- User Avatar Dropdown Button -->
          <div class="relative">
            <button id="user-menu-btn" class="flex items-center gap-2 p-1 pl-2 pr-3 bg-slate-100 hover:bg-slate-200/80 rounded-full transition-all border border-slate-200">
              <div class="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                ${user ? user.name.charAt(0) : 'G'}
              </div>
              <span class="text-xs font-bold text-slate-800 max-w-[90px] truncate">${user ? user.name : 'Sign In'}</span>
              <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div id="user-dropdown-menu" class="hidden absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-fade-in text-xs">
              <div class="px-3 py-2 border-b border-slate-100">
                <div class="font-bold text-slate-900">${user ? user.name : 'Guest User'}</div>
                <div class="text-[11px] text-slate-500 truncate">${user ? user.email : 'Not logged in'}</div>
                <div class="mt-1 inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${user && user.role === 'president' ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-700'}">
                  ${user ? (user.title || user.role) : 'Guest'}
                </div>
              </div>

              <!-- Persona Quick Switcher -->
              <div class="py-2">
                <div class="px-3 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quick Switch Persona:</div>
                <button data-persona="rishabh" class="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700">
                  <div class="font-medium">🚀 Rishabh (Robotics President)</div>
                  ${user && user.email.includes('rishabh') ? '<span class="text-emerald-600 font-bold">✓</span>' : ''}
                </button>
                <button data-persona="aman" class="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700">
                  <div class="font-medium">🎓 Aman Verma (1st-Year Student)</div>
                  ${user && user.email.includes('aman') ? '<span class="text-emerald-600 font-bold">✓</span>' : ''}
                </button>
                <button data-persona="ananya" class="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-700">
                  <div class="font-medium">⚡ Ananya Sharma (Delegated Lead)</div>
                  ${user && user.email.includes('ananya') ? '<span class="text-emerald-600 font-bold">✓</span>' : ''}
                </button>
              </div>

              <div class="pt-1 border-t border-slate-100">
                ${user && user.role === 'president' ? `
                  <button id="dd-dashboard-btn" class="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 font-bold text-slate-900 flex items-center gap-2">
                    <span>👑 Open President Dashboard</span>
                  </button>
                ` : ''}
                <button id="dd-login-btn" class="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 font-semibold text-slate-600 flex items-center gap-2">
                  <span>🔑 Switch / Log in via Email</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </header>
  `;

  // Render Mobile Bottom Navigation Bar
  renderMobileNav();

  // Attach Header Event Listeners
  container.querySelector('#nav-brand')?.addEventListener('click', () => appStore.setView('home'));
  container.querySelector('#nav-link-home')?.addEventListener('click', () => appStore.setView('home'));
  container.querySelector('#nav-link-explore')?.addEventListener('click', () => appStore.setView('browse'));
  container.querySelector('#nav-link-saved')?.addEventListener('click', () => appStore.setView('saved'));
  container.querySelector('#btn-open-dashboard')?.addEventListener('click', () => appStore.setView('dashboard'));

  // Search input handler
  const searchInput = container.querySelector('#global-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      appStore.setSearchQuery(e.target.value);
      if (appStore.state.view !== 'browse' && appStore.state.view !== 'home') {
        appStore.setView('browse');
      }
    });
  }

  // User menu toggle
  const userMenuBtn = container.querySelector('#user-menu-btn');
  const userDropdown = container.querySelector('#user-dropdown-menu');
  if (userMenuBtn && userDropdown) {
    userMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
      userDropdown.classList.add('hidden');
    });

    userDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Persona switch actions
    userDropdown.querySelectorAll('[data-persona]').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.persona;
        if (type === 'rishabh') {
          appStore.setUser({
            email: "rishabh.robotics@college.edu",
            name: "Rishabh",
            role: "president",
            clubId: "robotics-club",
            title: "Robotics Club President"
          });
        } else if (type === 'aman') {
          appStore.setUser({
            email: "student.aman@college.edu",
            name: "Aman Verma",
            role: "student",
            clubId: null,
            title: "1st-Year CSE Student"
          });
        } else if (type === 'ananya') {
          appStore.setUser({
            email: "ananya.sharma@college.edu",
            name: "Ananya Sharma",
            role: "delegate",
            clubId: "robotics-club",
            title: "Autonomous Systems Lead (Delegated)"
          });
        }
        userDropdown.classList.add('hidden');
      });
    });

    userDropdown.querySelector('#dd-dashboard-btn')?.addEventListener('click', () => {
      userDropdown.classList.add('hidden');
      appStore.setView('dashboard');
    });

    userDropdown.querySelector('#dd-login-btn')?.addEventListener('click', () => {
      userDropdown.classList.add('hidden');
      appStore.setView('login');
    });
  }
}

// Render Mobile Bottom Navigation Bar (as seen in bottom right phone frames of mockup)
function renderMobileNav() {
  const container = document.getElementById('mobile-bottom-nav');
  if (!container) return;

  const activeView = appStore.state.view;
  const savedCount = appStore.state.savedClubIds.length;
  const user = appStore.state.user;

  container.innerHTML = `
    <button id="m-nav-home" class="flex flex-col items-center gap-1 ${activeView === 'home' ? 'text-slate-900 font-bold' : 'text-slate-400'}">
      <svg class="w-5 h-5" fill="${activeView === 'home' ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
      <span class="text-[10px]">Home</span>
    </button>

    <button id="m-nav-explore" class="flex flex-col items-center gap-1 ${activeView === 'browse' ? 'text-slate-900 font-bold' : 'text-slate-400'}">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
      <span class="text-[10px]">Explore</span>
    </button>

    <button id="m-nav-saved" class="flex flex-col items-center gap-1 relative ${activeView === 'saved' ? 'text-slate-900 font-bold' : 'text-slate-400'}">
      <svg class="w-5 h-5" fill="${activeView === 'saved' ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
      </svg>
      ${savedCount > 0 ? `<span class="absolute -top-1 right-1 w-3.5 h-3.5 bg-slate-900 text-white text-[9px] rounded-full flex items-center justify-center font-bold">${savedCount}</span>` : ''}
      <span class="text-[10px]">Saved</span>
    </button>

    <button id="m-nav-profile" class="flex flex-col items-center gap-1 ${activeView === 'dashboard' || activeView === 'login' ? 'text-slate-900 font-bold' : 'text-slate-400'}">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
      </svg>
      <span class="text-[10px]">${user && user.role === 'president' ? 'Portal' : 'Profile'}</span>
    </button>
  `;

  container.querySelector('#m-nav-home')?.addEventListener('click', () => appStore.setView('home'));
  container.querySelector('#m-nav-explore')?.addEventListener('click', () => appStore.setView('browse'));
  container.querySelector('#m-nav-saved')?.addEventListener('click', () => appStore.setView('saved'));
  container.querySelector('#m-nav-profile')?.addEventListener('click', () => {
    if (user && user.role === 'president') {
      appStore.setView('dashboard');
    } else {
      appStore.setView('login');
    }
  });
}
