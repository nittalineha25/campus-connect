// Hero Banner & Netflix-style Urgency "Closing Soon" Carousel matching mockup
import { appStore } from '../store.js';

export function renderHeroCarousel(container) {
  const clubs = appStore.state.clubs;
  const roboticsClub = clubs.find(c => c.id === 'robotics-club') || clubs[0] || {};
  const musicClub = clubs.find(c => c.id === 'music-club') || clubs[1] || {};
  const danceClub = clubs.find(c => c.id === 'dance-club') || clubs[2] || {};

  const isRoboticsSaved = appStore.isSaved('robotics-club');
  const isMusicSaved = appStore.isSaved('music-club');
  const isDanceSaved = appStore.isSaved('dance-club');

  container.innerHTML = `
    <div class="space-y-8 animate-fade-in">
      
      <!-- HERO BANNER -->
      <div class="hero-card relative p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl rounded-3xl min-h-[320px] md:min-h-[380px] flex flex-col justify-between border border-slate-800/60 dark:border-slate-800">
        
        <!-- Background Dusk Campus Building Image -->
        <img 
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&auto=format&fit=crop&q=80" 
          alt="Campus at Dusk" 
          class="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.08]"
        />
        
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 hero-bg-overlay"></div>

        <!-- Top Row: Centralized Badge + Handwritten Quote from Mockup -->
        <div class="relative z-10 flex justify-between items-start">
          <div class="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
            <span>✨ Centralized Club Discovery & Deadlines</span>
          </div>
          <div class="text-white/95 text-xl sm:text-2xl md:text-3xl font-bold handwritten tracking-wide select-none rotate-1 drop-shadow-md">
            Good Clubs, Great Stories :)
          </div>
        </div>

        <!-- Center: Hero Typography matching Mockup -->
        <div class="relative z-10 max-w-2xl my-4">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
            Your campus.<br/>
            Your people.<br/>
            Your <span class="text-indigo-400 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">next thing.</span>
          </h1>
          <p class="mt-4 text-xs sm:text-sm md:text-base text-slate-300 max-w-lg leading-relaxed font-normal">
            Discover clubs, track deadlines, and be part of what makes campus, campus.
          </p>

          <!-- Embedded Search Bar inside Hero -->
          <div class="mt-6 max-w-md">
            <div class="relative flex items-center">
              <span class="absolute left-4 text-slate-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </span>
              <input 
                type="text" 
                id="hero-search-input" 
                placeholder="Search clubs, categories..."
                class="w-full pl-11 pr-4 py-3 bg-white/15 backdrop-blur-md border border-white/20 hover:border-white/30 focus:border-white/50 text-white placeholder-slate-300 text-xs sm:text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white/20 shadow-lg transition-all"
              />
            </div>
          </div>
        </div>

        <!-- Bottom Feature Indicators -->
        <div class="relative z-10 hidden sm:flex items-center gap-6 text-[11px] text-slate-300 font-medium">
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span> Live Deadlines
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-indigo-400"></span> Verified Portfolios
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-amber-400"></span> 1st-Year Friendly Tasks
          </span>
        </div>
      </div>

      <!-- CLOSING SOON SECTION -->
      <div class="space-y-4 pt-2">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-red-500 text-lg">🔥</span>
            <h2 class="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors">Closing Soon</h2>
          </div>
          <button id="view-all-closing-btn" class="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1">
            <span>View all</span>
            <span>→</span>
          </button>
        </div>

        <!-- Urgency Carousel Grid matching Mockup -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          <!-- BIG FEATURED URGENCY CARD (Robotics Club) -->
          <div class="md:col-span-6 lg:col-span-7 bg-[#111317] dark:bg-[#0E121B] text-white rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden group cursor-pointer border border-slate-800 dark:border-slate-700/80 transition-all hover:border-slate-600" id="card-hero-robotics">
            <!-- Background Rover Image -->
            <img 
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80" 
              alt="Robotics Rover" 
              class="absolute right-0 top-0 bottom-0 w-1/2 sm:w-5/12 h-full object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-500"
              style="-webkit-mask-image: linear-gradient(to right, transparent 0%, black 50%); mask-image: linear-gradient(to right, transparent 0%, black 50%);"
            />
            
            <div class="relative z-10 flex flex-col justify-between h-full space-y-6 max-w-sm">
              <div class="flex items-center justify-between">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold urgency-pulse">
                  Ends in 2 days
                </span>
                <button 
                  class="save-btn-urgent p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all" 
                  data-club-id="robotics-club"
                  title="Bookmark Club"
                >
                  <svg class="w-4 h-4 ${isRoboticsSaved ? 'fill-white' : 'fill-none'}" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                  </svg>
                </button>
              </div>

              <div>
                <h3 class="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Robotics Club</h3>
                <p class="text-xs text-slate-300 font-medium mt-1">Tech • Build • Compete</p>
                <div class="flex items-center gap-2 mt-3 text-xs text-slate-400">
                  <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                  <span>2.4k students interested</span>
                </div>
              </div>

              <div>
                <button class="px-5 py-2.5 rounded-full bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-all flex items-center gap-2 shadow-md">
                  <span>View Club</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>

          <!-- SECONDARY CARD 1: Music Club -->
          <div class="md:col-span-3 lg:col-span-2.5 bg-white dark:bg-[#111622] rounded-3xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 card-hover-shadow relative cursor-pointer flex flex-col justify-between transition-colors" id="card-hero-music">
            <div class="relative rounded-2xl overflow-hidden aspect-[4/3] mb-3">
              <img 
                src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop&q=80" 
                alt="Music Club Concert" 
                class="w-full h-full object-cover"
              />
              <span class="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold">
                Ends in 3 days
              </span>
              <button 
                class="save-btn-urgent absolute top-2 right-2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all" 
                data-club-id="music-club"
              >
                <svg class="w-3.5 h-3.5 ${isMusicSaved ? 'fill-white' : 'fill-none'}" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                </svg>
              </button>
            </div>
            <div>
              <h4 class="text-sm font-bold text-slate-900 dark:text-white transition-colors">Music Club</h4>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">Cultural • Music</p>
              <div class="text-[10px] text-slate-400 dark:text-slate-500 mt-1 flex items-center gap-1">
                <span>👥</span>
                <span>856 interested</span>
              </div>
            </div>
          </div>

          <!-- SECONDARY CARD 2: Dance Club -->
          <div class="md:col-span-3 lg:col-span-2.5 bg-white dark:bg-[#111622] rounded-3xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 card-hover-shadow relative cursor-pointer flex flex-col justify-between transition-colors" id="card-hero-dance">
            <div class="relative rounded-2xl overflow-hidden aspect-[4/3] mb-3">
              <img 
                src="https://images.unsplash.com/photo-1547153760-18fc86324498?w=600&auto=format&fit=crop&q=80" 
                alt="Dance Club Stage" 
                class="w-full h-full object-cover"
              />
              <span class="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold">
                Ends in 5 days
              </span>
              <button 
                class="save-btn-urgent absolute top-2 right-2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all" 
                data-club-id="dance-club"
              >
                <svg class="w-3.5 h-3.5 ${isDanceSaved ? 'fill-white' : 'fill-none'}" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                </svg>
              </button>
            </div>
            <div>
              <h4 class="text-sm font-bold text-slate-900 dark:text-white transition-colors">Dance Club</h4>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">Cultural • Dance</p>
              <div class="text-[10px] text-slate-400 dark:text-slate-500 mt-1 flex items-center gap-1">
                <span>👥</span>
                <span>1.2k interested</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  `;

  // Attach Event Handlers
  container.querySelector('#card-hero-robotics')?.addEventListener('click', (e) => {
    if (e.target.closest('.save-btn-urgent')) return;
    appStore.selectClub('robotics-club');
  });

  container.querySelector('#card-hero-music')?.addEventListener('click', (e) => {
    if (e.target.closest('.save-btn-urgent')) return;
    appStore.selectClub('music-club');
  });

  container.querySelector('#card-hero-dance')?.addEventListener('click', (e) => {
    if (e.target.closest('.save-btn-urgent')) return;
    appStore.selectClub('dance-club');
  });

  container.querySelector('#view-all-closing-btn')?.addEventListener('click', () => {
    appStore.setView('browse');
  });

  // Hero search input
  const heroSearch = container.querySelector('#hero-search-input');
  if (heroSearch) {
    heroSearch.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        appStore.setSearchQuery(e.target.value);
        appStore.setView('browse');
      }
    });
  }

  // Bookmark buttons
  container.querySelectorAll('.save-btn-urgent').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const clubId = btn.dataset.clubId;
      appStore.toggleSave(clubId);
    });
  });
}
