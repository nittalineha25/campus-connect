import { appStore } from '../store.js';
import { api } from '../api.js';

export function openCreateClubModal() {
  // Remove any existing modal first
  document.getElementById('create-club-modal')?.remove();

  const wrapper = document.createElement('div');
  wrapper.id = 'create-club-modal';
  wrapper.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4';
  wrapper.innerHTML = `
    <div class="w-full max-w-md bg-white dark:bg-[#111622] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-extrabold text-slate-900 dark:text-white">Create a New Club</h2>
        <button id="cc-close-btn" class="text-slate-400 hover:text-slate-700 dark:hover:text-white text-xl leading-none">&times;</button>
      </div>
      <form id="cc-form" class="space-y-3 text-sm">
        <input name="name" required placeholder="Club name *" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20 dark:focus:ring-white/20" />
        <input name="tagline" placeholder="Short tagline" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm" />
        <textarea name="description" placeholder="Description" rows="3" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"></textarea>
        <input name="category" placeholder="Category (e.g. Tech, Cultural, Sports)" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm" />
        <input name="logo" placeholder="Logo/banner image URL (optional)" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm" />
        <input name="weeklyCommitment" placeholder="Weekly commitment (e.g. 2-3 hrs/week)" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm" />
        <div>
          <label class="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">Application deadline</label>
          <input name="endDate" type="date" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm" />
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">Google Form link (paste your application form URL)</label>
          <input name="formUrl" type="url" placeholder="https://forms.gle/..." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm" />
        </div>
        <div id="cc-status" class="text-xs font-semibold min-h-[16px]"></div>
        <div class="flex gap-2 pt-1">
          <button type="submit" class="flex-1 py-2.5 rounded-full bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 text-sm font-bold transition-colors">Create Club</button>
          <button type="button" id="cc-cancel-btn" class="flex-1 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-bold transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(wrapper);

  const close = () => wrapper.remove();
  wrapper.querySelector('#cc-close-btn').addEventListener('click', close);
  wrapper.querySelector('#cc-cancel-btn').addEventListener('click', close);
  wrapper.addEventListener('click', (e) => { if (e.target === wrapper) close(); });

  wrapper.querySelector('#cc-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const statusEl = wrapper.querySelector('#cc-status');
    statusEl.className = 'text-xs font-semibold min-h-[16px] text-slate-500 dark:text-slate-400';
    statusEl.textContent = 'Creating club...';

    const fd = new FormData(e.target);
    const club = Object.fromEntries(fd.entries());

    try {
      const result = await api.createClub(club, 'not-required');
      statusEl.className = 'text-xs font-semibold min-h-[16px] text-emerald-500';
      statusEl.textContent = `"${result.club.name}" created!`;

      // Refresh the clubs list in the app
      const refreshed = await api.getClubs();
      if (refreshed.success && refreshed.clubs) {
        appStore.setClubs(refreshed.clubs);
      }

      setTimeout(() => {
        close();
        window.showToast?.(`${result.club.name} created successfully!`, 'success');
      }, 700);
    } catch (err) {
      statusEl.className = 'text-xs font-semibold min-h-[16px] text-red-500';
      statusEl.textContent = err.message || 'Failed to create club';
    }
  });
}
