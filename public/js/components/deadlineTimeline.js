// Visual Calendar & Timeline Mode for Campus Deadlines
import { appStore } from '../store.js';
import { calculateTimeRemaining, formatUrgencyBadge } from '../utils/countdown.js';
import { formatDate } from '../utils/helpers.js';

export function renderDeadlinesTimeline(container) {
  const clubs = [...appStore.state.clubs].sort((a, b) => {
    return new Date(a.recruitment.endDate) - new Date(b.recruitment.endDate);
  });

  if (!clubs.length) {
    container.innerHTML = `<div class="p-12 text-center text-slate-400">No recruitment deadlines matching current filters.</div>`;
    return;
  }

  container.innerHTML = `
    <div class="glass-card rounded-2xl p-6 md:p-8">
      <div class="flex items-center justify-between pb-6 border-b border-slate-800">
        <div>
          <h3 class="text-xl font-bold text-white flex items-center gap-2">
            <span>📅</span>
            <span>Recruitment Deadlines Calendar & Chronological Timeline</span>
          </h3>
          <p class="text-xs text-slate-400 mt-1">
            Optimized for 1st-year students to plan submissions around academic assignments and prevent last-minute clashes.
          </p>
        </div>
        <span class="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950 text-indigo-300 border border-indigo-500/40">
          ${clubs.length} Active Deadlines
        </span>
      </div>

      <!-- Timeline Stream -->
      <div class="relative pl-6 md:pl-8 border-l-2 border-indigo-600/30 space-y-8 mt-6">
        ${clubs.map((c, index) => {
          const remaining = calculateTimeRemaining(c.recruitment.endDate);
          const isCritical = remaining.urgency === 'critical';

          return `
            <div class="relative group">
              <!-- Timeline Marker Dot -->
              <span class="absolute -left-[31px] md:-left-[39px] top-1.5 flex h-4 w-4">
                ${isCritical ? '<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>' : ''}
                <span class="relative inline-flex rounded-full h-4 w-4 ${isCritical ? 'bg-red-500' : 'bg-indigo-500'} border-2 border-[#0b0f19]"></span>
              </span>

              <!-- Timeline Item Card -->
              <div class="bg-slate-900/70 hover:bg-slate-900 border ${isCritical ? 'border-red-900/60 shadow-lg shadow-red-950/30' : 'border-slate-800'} rounded-2xl p-5 transition-all">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  <div class="flex items-center gap-4">
                    <img src="${c.logo}" alt="${c.name}" class="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-white text-base md:text-lg group-hover:text-indigo-300 transition-colors">${c.name}</span>
                        <span class="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">${c.category}</span>
                      </div>
                      <p class="text-xs text-slate-400 line-clamp-1 mt-0.5">${c.tagline}</p>
                    </div>
                  </div>

                  <!-- Date & Countdown -->
                  <div class="flex flex-wrap items-center gap-3">
                    <div class="text-right hidden sm:block">
                      <div class="text-xs font-bold text-slate-200">Deadline: ${formatDate(c.recruitment.endDate)}</div>
                      <div class="text-[11px] text-slate-400">Weekly Effort: ${c.weeklyCommitment}</div>
                    </div>
                    <div>
                      ${formatUrgencyBadge(c.recruitment.endDate)}
                    </div>
                  </div>

                </div>

                <!-- Open Roles & Actions footer -->
                <div class="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div class="flex items-center gap-1.5 text-slate-400">
                    <span class="font-semibold text-slate-300">Rounds:</span>
                    ${(c.recruitment.rounds || []).map(r => `<span class="px-2 py-0.5 rounded bg-slate-800 text-slate-300">${r.name}</span>`).join(' ➔ ')}
                  </div>

                  <div class="flex items-center gap-2">
                    <button 
                      class="timeline-profile-btn px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
                      data-id="${c.id}"
                    >
                      View Club Credibility & Tasks
                    </button>
                    <button 
                      class="timeline-apply-btn px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md transition-colors"
                      data-url="${c.recruitment.externalUrl}"
                      data-name="${c.name}"
                    >
                      Apply Now ↗
                    </button>
                  </div>
                </div>

              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Attach handlers
  container.querySelectorAll('.timeline-profile-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      appStore.setView('club-profile', id);
    });
  });

  container.querySelectorAll('.timeline-apply-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.getAttribute('data-url');
      const name = btn.getAttribute('data-name');
      window.openExternalForm(url, name);
    });
  });
}
