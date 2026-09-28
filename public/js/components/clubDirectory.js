// "Find your people" & "Explore Campus" Directory with Categories, Search & Calendar Timeline
import { appStore } from '../store.js';
import { createClubCard } from './clubCard.js';

export function renderClubDirectory(container, isExplorePage = false) {
  const categories = ['All', 'Tech', 'Cultural', 'Sports', 'Business', 'Arts', 'Media'];
  const activeCategory = appStore.state.selectedCategory;
  const searchQuery = appStore.state.searchQuery.toLowerCase().trim();
  const viewMode = appStore.state.viewMode; // 'grid' | 'calendar'

  // Filter clubs
  let clubs = [...appStore.state.clubs];

  if (activeCategory !== 'All') {
    clubs = clubs.filter(c => 
      c.category.toLowerCase() === activeCategory.toLowerCase() ||
      (c.subCategory && c.subCategory.toLowerCase().includes(activeCategory.toLowerCase()))
    );
  }

  if (searchQuery) {
    clubs = clubs.filter(c =>
      c.name.toLowerCase().includes(searchQuery) ||
      c.tagline.toLowerCase().includes(searchQuery) ||
      c.category.toLowerCase().includes(searchQuery) ||
      (c.tags && c.tags.some(t => t.toLowerCase().includes(searchQuery)))
    );
  }

  container.innerHTML = `
    <div class="space-y-6 animate-fade-in pt-4">
      
      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors">
            ${isExplorePage ? 'Explore Campus' : 'Find your people'}
          </h2>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            ${isExplorePage ? 'Discover clubs, find your people.' : 'Explore student communities, verify work, and register.'}
          </p>
        </div>

        <div class="flex items-center gap-4 self-start sm:self-auto">
          <!-- Handwritten accent from Mockup -->
          <div class="hidden md:block text-slate-400 dark:text-slate-500 font-bold handwritten text-xl rotate-1 select-none">
            Different clubs. Same vibe. ♡
          </div>

          <!-- View Mode Switcher (Grid vs Deadline Calendar Timeline) -->
          <div class="p-1 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 flex items-center transition-colors">
            <button id="view-mode-grid" class="px-3 py-1 rounded-full text-xs font-bold transition-all ${
              viewMode === 'grid' 
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }">
              ⊞ Grid
            </button>
            <button id="view-mode-calendar" class="px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
              viewMode === 'calendar' 
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }">
              <span>📅 Deadlines</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Category Filter Pills matching Mockup -->
      <div class="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
        ${categories.map(cat => `
          <button 
            data-category="${cat}"
            class="px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeCategory === cat 
                ? 'pill-active shadow-sm' 
                : 'pill-inactive'
            }"
          >
            ${cat}
          </button>
        `).join('')}
      </div>

      <!-- Active Search indicator if any -->
      ${searchQuery ? `
        <div class="flex items-center justify-between px-4 py-2.5 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/60 rounded-2xl text-xs text-indigo-900 dark:text-indigo-200 font-medium">
          <span>Filtering by: "<strong>${searchQuery}</strong>" (${clubs.length} found)</span>
          <button id="clear-search-btn" class="text-indigo-600 dark:text-indigo-400 hover:underline font-bold">Clear</button>
        </div>
      ` : ''}

      <!-- Dynamic Content: Grid or Calendar Timeline -->
      <div id="directory-content-mount"></div>

    </div>
  `;

  const mountPoint = container.querySelector('#directory-content-mount');

  if (viewMode === 'grid') {
    if (clubs.length === 0) {
      mountPoint.innerHTML = `
        <div class="text-center py-16 bg-white dark:bg-[#111622] rounded-3xl border border-slate-200 dark:border-slate-800 p-8 transition-colors">
          <div class="text-3xl mb-2">🔍</div>
          <h3 class="text-base font-bold text-slate-800 dark:text-slate-200">No clubs found</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Try another category or clear your search term.</p>
        </div>
      `;
    } else {
      const grid = document.createElement('div');
      grid.className = 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4';
      clubs.forEach(club => {
        grid.appendChild(createClubCard(club));
      });
      mountPoint.appendChild(grid);
    }
  } else {
    // Calendar Timeline View (Chronological Urgency)
    renderDeadlineTimeline(mountPoint, clubs);
  }

  // Category buttons
  container.querySelectorAll('[data-category]').forEach(btn => {
    btn.addEventListener('click', () => {
      appStore.setCategory(btn.dataset.category);
    });
  });

  // View mode switcher
  container.querySelector('#view-mode-grid')?.addEventListener('click', () => {
    appStore.setViewMode('grid');
  });
  container.querySelector('#view-mode-calendar')?.addEventListener('click', () => {
    appStore.setViewMode('calendar');
  });

  container.querySelector('#clear-search-btn')?.addEventListener('click', () => {
    appStore.setSearchQuery('');
  });
}

// Deadline Timeline Component
function renderDeadlineTimeline(container, clubs) {
  // Sort clubs by deadline
  const sortedClubs = [...clubs].sort((a, b) => new Date(a.recruitment.endDate) - new Date(b.recruitment.endDate));

  container.innerHTML = `
    <div class="bg-white dark:bg-[#111622] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
      <div class="border-b border-slate-100 dark:border-slate-800 pb-4">
        <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>📅 Recruitment Deadline Timeline</span>
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Chronological countdown so 1st-year students never miss an application window.</p>
      </div>

      <div class="space-y-4">
        ${sortedClubs.map(club => `
          <div class="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer" data-timeline-club="${club.id}">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-700 shrink-0">
                <img src="${club.logo}" alt="${club.name}" class="w-full h-full object-cover"/>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h4 class="text-sm font-bold text-slate-900 dark:text-white">${club.name}</h4>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    club.urgencyLevel === 'critical' 
                      ? 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300' 
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }">
                    ${club.badge}
                  </span>
                </div>
                <p class="text-xs text-slate-500 dark:text-slate-400">${club.tagline}</p>
              </div>
            </div>

            <div class="flex items-center gap-4 sm:text-right shrink-0">
              <div class="text-xs">
                <div class="text-[11px] text-slate-400 dark:text-slate-500">Deadline:</div>
                <div class="font-bold text-slate-800 dark:text-slate-200">${club.recruitment.displayEndDate || 'Oct 04, 2026'}</div>
              </div>
              <button class="px-4 py-2 rounded-full bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs font-bold shadow-sm transition-colors">
                View Club →
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('[data-timeline-club]').forEach(row => {
    row.addEventListener('click', () => {
      appStore.selectClub(row.dataset.timelineClub);
    });
  });
}
