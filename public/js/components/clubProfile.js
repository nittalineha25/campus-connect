// Club Profile Page matching mockup with Mint Green Pinned Registration box & Tabs
import { appStore } from '../store.js';
import { openExternalModal, showToast } from '../utils/helpers.js';

let activeProfileTab = 'about'; // 'about' | 'achievements' | 'our-work' | 'events'

export function renderClubProfile(container) {
  const clubId = appStore.state.selectedClubId || 'robotics-club';
  const club = appStore.state.clubs.find(c => c.id === clubId) || appStore.state.clubs[0];

  if (!club) {
    container.innerHTML = '<div class="text-center py-20 text-slate-500">Club not found.</div>';
    return;
  }

  const isSaved = appStore.isSaved(club.id);

  container.innerHTML = `
    <div class="max-w-4xl mx-auto space-y-6 animate-fade-in pb-16">
      
      <!-- Top Action Bar (Back arrow, More, Bookmark) -->
      <div class="flex items-center justify-between py-2">
        <button id="profile-back-btn" class="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          <span>Back</span>
        </button>

        <div class="flex items-center gap-2">
          <button id="profile-share-btn" class="p-2 bg-white rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 transition-all shadow-sm" title="Share Club">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
            </svg>
          </button>
          
          <button id="profile-save-btn" class="p-2 bg-white rounded-full border border-slate-200 hover:bg-slate-50 text-slate-800 transition-all shadow-sm" title="Bookmark">
            <svg class="w-4 h-4 ${isSaved ? 'fill-slate-900 text-slate-900' : 'fill-none'}" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Hero Header Section with Cover & Avatar -->
      <div class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
        
        <!-- Cover Banner Image -->
        <div class="h-48 sm:h-64 w-full relative bg-slate-900">
          <img 
            src="${club.banner || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&auto=format&fit=crop&q=80'}" 
            alt="${club.name} Banner" 
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
        </div>

        <!-- Profile Bar overlapping cover -->
        <div class="px-6 sm:px-8 pb-6 pt-0 relative">
          
          <!-- Club Logo Avatar overlapping banner -->
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-14 mb-4">
            <div class="flex items-end gap-4">
              <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-slate-900 p-1 border-4 border-white shadow-xl overflow-hidden shrink-0">
                <img src="${club.logo}" alt="${club.name} Logo" class="w-full h-full object-cover rounded-2xl" />
              </div>
              <div class="pt-2">
                <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">${club.name}</h1>
                <p class="text-xs sm:text-sm text-slate-500 font-semibold">${club.tagline}</p>
                <div class="flex items-center gap-1.5 text-xs text-slate-400 mt-1 font-medium">
                  <span>👥</span>
                  <span>${club.interestedCount || '2.4k'} students interested</span>
                </div>
              </div>
            </div>

            <!-- Primary CTA: Apply Now Button -->
            <div class="self-start sm:self-end pt-2 sm:pt-0">
              <button id="profile-apply-btn" class="px-7 py-3 rounded-full bg-slate-900 hover:bg-black text-white text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center gap-2">
                <span>Apply Now</span>
                <span>→</span>
              </button>
            </div>
          </div>

          <!-- Tags strip -->
          <div class="flex items-center gap-2 flex-wrap pt-2">
            ${(club.tags || [club.category, 'Community']).map(tag => `
              <span class="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full">
                ${tag}
              </span>
            `).join('')}
          </div>

        </div>
      </div>

      <!-- PINNED REGISTRATION BANNER (Mint Green Box from Mockup) -->
      <div class="pinned-deadline-box p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
          <div>
            <div class="text-xs font-extrabold text-emerald-900 tracking-wide uppercase">
              ● ${club.recruitment?.statusText || 'Registration Open'}
            </div>
            <div class="text-xs text-emerald-800/90 font-medium mt-0.5">
              Recruitment Window for Freshmen & Lateral Entrants
            </div>
          </div>
        </div>

        <div class="flex items-center gap-6 text-xs border-t sm:border-t-0 sm:border-l border-emerald-200/80 pt-2 sm:pt-0 sm:pl-6">
          <div>
            <div class="text-[10px] uppercase font-bold text-emerald-800/70 tracking-wider">Starts</div>
            <div class="font-extrabold text-emerald-950 text-sm">${club.recruitment?.displayStartDate || 'Sep 28, 2026'}</div>
          </div>
          <div>
            <div class="text-[10px] uppercase font-bold text-emerald-800/70 tracking-wider">Closes</div>
            <div class="font-extrabold text-emerald-950 text-sm">${club.recruitment?.displayEndDate || 'Oct 04, 2026'}</div>
          </div>
        </div>
      </div>

      <!-- TAB NAVIGATION -->
      <div class="border-b border-slate-200">
        <nav class="flex items-center gap-8 -mb-px text-xs sm:text-sm font-bold">
          <button data-tab="about" class="py-3 border-b-2 transition-all ${activeProfileTab === 'about' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-700'}">
            About
          </button>
          <button data-tab="achievements" class="py-3 border-b-2 transition-all ${activeProfileTab === 'achievements' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-700'}">
            Achievements
          </button>
          <button data-tab="our-work" class="py-3 border-b-2 transition-all ${activeProfileTab === 'our-work' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-700'}">
            Our Work
          </button>
          <button data-tab="events" class="py-3 border-b-2 transition-all ${activeProfileTab === 'events' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-700'}">
            Events
          </button>
        </nav>
      </div>

      <!-- TAB CONTENT AREA -->
      <div id="profile-tab-content">
        ${renderTabContent(club)}
      </div>

    </div>
  `;

  // Attach Event Handlers
  container.querySelector('#profile-back-btn')?.addEventListener('click', () => {
    appStore.setView('home');
  });

  container.querySelector('#profile-apply-btn')?.addEventListener('click', () => {
    openExternalModal(club);
  });

  container.querySelector('#profile-save-btn')?.addEventListener('click', () => {
    appStore.toggleSave(club.id);
  });

  container.querySelector('#profile-share-btn')?.addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({
        title: club.name + ' - Campus Connect',
        text: 'Check out ' + club.name + ' recruitment deadlines!',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!', 'info');
    }
  });

  // Tab switching
  container.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeProfileTab = btn.dataset.tab;
      renderClubProfile(container);
    });
  });
}

// Render Tab Content
function renderTabContent(club) {
  if (activeProfileTab === 'about') {
    return `
      <div class="space-y-6 pt-2">
        
        <!-- About Us Card -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <h3 class="text-base font-extrabold text-slate-900">About Us</h3>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            ${club.description}
          </p>

          <!-- Feature Pills matching Mockup (Teamwork, Innovation, Hands-on) -->
          <div class="flex items-center gap-3 flex-wrap pt-2">
            ${(club.features || [
              { icon: '🤝', label: 'Teamwork' },
              { icon: '💡', label: 'Innovation' },
              { icon: '🛠️', label: 'Hands-on' }
            ]).map(f => `
              <div class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800">
                <span>${f.icon}</span>
                <span>${f.label}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 1st-Year Recruitment Expectations & Commitment -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h3 class="text-base font-extrabold text-slate-900">1st-Year Commitment & Selection Rounds</h3>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div class="text-[11px] font-bold text-slate-400 uppercase">Weekly Time Commitment</div>
              <div class="text-sm font-extrabold text-slate-900">${club.weeklyCommitment || '5-7 hrs/week'}</div>
              <div class="text-xs text-slate-500">${club.meetingSchedule || 'Flexible lab sessions'}</div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div class="text-[11px] font-bold text-slate-400 uppercase">Freshmen Mentorship</div>
              <div class="text-sm font-extrabold text-slate-900">No Prior Experience Required</div>
              <div class="text-xs text-slate-500">${club.recruitment?.tips || '1-on-1 senior mentor assigned for first 4 weeks.'}</div>
            </div>
          </div>

          <!-- Selection Stages -->
          <div class="pt-3 space-y-3">
            <div class="text-xs font-bold text-slate-400 uppercase">Recruitment Steps</div>
            ${(club.recruitment?.rounds || [
              { round: 'Round 1', name: 'Hands-on Logic Prompt', details: 'Choose 1 track: Arduino logic, CAD gripper, or line follower algorithm.', estimatedTime: '2-3 hours prep' },
              { round: 'Round 2', name: 'Maker Lab Walkthrough', details: 'Work with seniors in the lab to test sensor arrays.', estimatedTime: '45 mins session' }
            ]).map(r => `
              <div class="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-extrabold text-indigo-600">${r.round}:</span>
                    <span class="text-xs font-bold text-slate-900">${r.name}</span>
                  </div>
                  <p class="text-xs text-slate-500 mt-0.5">${r.details}</p>
                </div>
                <div class="text-[11px] font-semibold text-slate-400 shrink-0 bg-white px-2.5 py-1 rounded-full border border-slate-200">
                  ⏱ ${r.estimatedTime}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  }

  if (activeProfileTab === 'achievements') {
    const achs = club.achievements || [];
    return `
      <div class="space-y-6 pt-2">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-extrabold text-slate-900">Achievements</h3>
            <p class="text-xs text-slate-500">Verified competition wins and awards</p>
          </div>
          <span class="text-xs font-bold text-slate-500">${achs.length} items</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          ${achs.map(a => `
            <div class="bg-white rounded-3xl p-3.5 border border-slate-200 shadow-sm space-y-3 group hover:border-slate-300 transition-all">
              <div class="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100">
                <img src="${a.image}" alt="${a.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
              </div>
              <div>
                <div class="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">${a.year} • ${a.event || 'Award'}</div>
                <h4 class="text-xs font-extrabold text-slate-900 mt-0.5 leading-snug">${a.title}</h4>
                <p class="text-[11px] text-slate-500 mt-1 leading-relaxed line-clamp-2">${a.description || ''}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (activeProfileTab === 'our-work') {
    const works = club.ourWork || [];
    return `
      <div class="space-y-6 pt-2">
        <div>
          <h3 class="text-base font-extrabold text-slate-900">Our Work</h3>
          <p class="text-xs text-slate-500">Projects built and maintained by club members</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${works.map(w => `
            <div class="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between">
              <div class="rounded-2xl overflow-hidden aspect-video bg-slate-100">
                <img src="${w.image}" alt="${w.title}" class="w-full h-full object-cover"/>
              </div>
              <div class="space-y-1">
                <h4 class="text-sm font-extrabold text-slate-900">${w.title}</h4>
                <p class="text-xs text-slate-600 leading-relaxed">${w.description}</p>
                
                <div class="flex items-center gap-1.5 flex-wrap pt-2">
                  ${(w.tags || []).map(t => `<span class="text-[10px] px-2 py-0.5 bg-slate-100 rounded-full font-bold text-slate-600">${t}</span>`).join('')}
                </div>
              </div>
              <div class="pt-2">
                <span class="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer">${w.linkText || 'View Project →'}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (activeProfileTab === 'events') {
    const events = club.events || [];
    return `
      <div class="space-y-6 pt-2">
        <div>
          <h3 class="text-base font-extrabold text-slate-900">Upcoming Events</h3>
          <p class="text-xs text-slate-500">Workshops, info sessions, and orientations</p>
        </div>

        <div class="space-y-4">
          ${events.map(ev => `
            <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="space-y-1">
                <div class="text-[11px] font-bold text-indigo-600 uppercase">${ev.date}</div>
                <h4 class="text-sm font-extrabold text-slate-900">${ev.title}</h4>
                <div class="text-xs text-slate-400">📍 ${ev.location}</div>
                <p class="text-xs text-slate-600 pt-1">${ev.description}</p>
              </div>
              <div class="shrink-0">
                <a href="${ev.rsvpLink || '#'}" target="_blank" class="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-sm inline-block text-center">
                  RSVP / Details →
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  return '';
}
