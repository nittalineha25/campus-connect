// Individual Club Card matching mockup clean white & sleek dark aesthetic
import { appStore } from '../store.js';

export function createClubCard(club) {
  const isSaved = appStore.isSaved(club.id);

  const card = document.createElement('div');
  card.className = 'bg-white dark:bg-[#111622] rounded-3xl p-3.5 shadow-sm border border-slate-200 dark:border-slate-800 card-hover-shadow relative cursor-pointer flex flex-col justify-between group transition-colors';
  card.id = `club-card-${club.id}`;

  card.innerHTML = `
    <!-- Image Header with Bookmark Button -->
    <div class="relative rounded-2xl overflow-hidden aspect-[4/3] mb-3 bg-slate-100 dark:bg-slate-800">
      <img 
        src="${club.banner || club.logo}" 
        alt="${club.name}" 
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <button 
        class="save-card-btn absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all"
        title="Bookmark ${club.name}"
      >
        <svg class="w-3.5 h-3.5 ${isSaved ? 'fill-white' : 'fill-none'}" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
        </svg>
      </button>
    </div>

    <!-- Club Details -->
    <div class="space-y-1">
      <h3 class="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
        ${club.name}
      </h3>
      <div class="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
        ${club.category}
      </div>
      <div class="pt-1.5 flex items-center justify-between text-[11px]">
        <span class="font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-full border border-transparent dark:border-slate-700/50">
          ${club.badge || 'Recruiting'}
        </span>
        <span class="text-slate-400 dark:text-slate-500 font-medium">
          ${club.interestedCount || '1k'} interested
        </span>
      </div>
    </div>
  `;

  card.addEventListener('click', (e) => {
    if (e.target.closest('.save-card-btn')) {
      e.stopPropagation();
      appStore.toggleSave(club.id);
      return;
    }
    appStore.selectClub(club.id);
  });

  return card;
}
