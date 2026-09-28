// Club Profile Page matching mockup with Mint Green Pinned Registration box & Tabs
import { appStore } from '../store.js';
import { openExternalModal, showToast } from '../utils/helpers.js';

let activeProfileTab = 'about'; // 'about' | 'achievements' | 'our-work' | 'events'

export function renderClubProfile(container) {
  const clubId = appStore.state.selectedClubId || 'robotics-club';
  const club = appStore.state.clubs.find(c => c.id === clubId) || appStore.state.clubs[0];

  if (!club) {
    container.innerHTML = '<div class="text-center py-20 text-slate-500 dark:text-slate-400">Club not found.</div>';
    return;
  }

  const isSaved = appStore.isSaved(club.id);

  container.innerHTML = `
    <div class="max-w-4xl mx-auto space-y-6 animate-fade-in pb-16">
      
      <!-- Top Action Bar (Back arrow, Share, Bookmark) -->
      <div class="flex items-center justify-between py-2">
        <button id="profile-back-btn" class="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-[#111622] px-3.5 py-2 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          <span>Back</span>
        </button>

        <div class="flex items-center gap-2">
          <button id="profile-share-btn" class="p-2 bg-white dark:bg-[#111622] rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all shadow-sm" title="Share Club">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
            </svg>
          </button>
          
          <button id="profile-save-btn" class="p-2 bg-white dark:bg-[#111622] rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-all shadow-sm" title="Bookmark">
            <svg class="w-4 h-4 ${isSaved ? 'fill-slate-900 dark:fill-white text-slate-900 dark:text-white' : 'fill-none'}" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Hero Header Section with Cover & Avatar -->
      <div class="bg-white dark:bg-[#111622] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        
        <!-- Cover Banner Image -->
        <div class="h-48 sm:h-64 w-full relative bg-slate-900">
          <img 
            src="${club.banner || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&auto=format&fit=crop&q=80'}" 
            alt="${club.name} Banner" 
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        </div>

        <!-- Profile Bar overlapping cover -->
        <div class="px-6 sm:px-8 pb-6 pt-0 relative">
          
          <!-- Club Logo Avatar overlapping banner -->
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-14 mb-4">
            <div class="flex items-end gap-4">
              <!-- Distinctive Circular/Rounded Badge matching mockup gear icon -->
              <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-slate-950 text-white p-1 border-4 border-white dark:border-[#111622] shadow-xl overflow-hidden shrink-0 flex items-center justify-center transition-colors">
                ${club.id === 'robotics-club' ? `
                  <svg class="w-12 h-12 text-white fill-none stroke-current" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <circle cx="12" cy="12" r="3" stroke-width="1.8" />
                  </svg>
                ` : `
                  <img src="${club.logo}" alt="${club.name} Logo" class="w-full h-full object-cover rounded-2xl" />
                `}
              </div>
              <div class="pt-2">
                <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors">${club.name}</h1>
                <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold">${club.tagline || 'Build • Compete • Create'}</p>
                <div class="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mt-1 font-medium">
                  <span>👥</span>
                  <span>${club.interestedCount || '2.4k'} students interested</span>
                </div>
              </div>
            </div>

            <!-- Primary CTA: Apply Now Button -->
            <div class="self-start sm:self-end pt-2 sm:pt-0">
              <button id="profile-apply-btn" class="px-7 py-3 rounded-full bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center gap-2">
                <span>Apply Now</span>
                <span>→</span>
              </button>
            </div>
          </div>

          <!-- Tags strip -->
          <div class="flex items-center gap-2 flex-wrap pt-2">
            ${(club.tags || [club.category, 'Community']).map(tag => `
              <span class="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-full transition-colors">
                ${tag}
              </span>
            `).join('')}
          </div>

        </div>
      </div>

      <!-- PINNED REGISTRATION BANNER (Mint Green Box from Mockup) -->
      <div class="pinned-deadline-box p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm transition-colors">
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
          <div>
            <div class="text-xs font-extrabold text-emerald-900 dark:text-emerald-300 tracking-wide uppercase">
              ● ${club.recruitment?.statusText || 'Registration Open'}
            </div>
            <div class="text-xs text-emerald-800/90 dark:text-emerald-400 font-medium mt-0.5">
              Recruitment Window for Freshmen & Lateral Entrants
            </div>
          </div>
        </div>

        <div class="flex items-center gap-6 text-xs border-t sm:border-t-0 sm:border-l border-emerald-200/80 dark:border-emerald-800/60 pt-2 sm:pt-0 sm:pl-6">
          <div>
            <div class="text-[10px] uppercase font-bold text-emerald-800/70 dark:text-emerald-400/80 tracking-wider">Starts</div>
            <div class="font-extrabold text-emerald-950 dark:text-emerald-200 text-sm">${club.recruitment?.displayStartDate || 'Sep 28, 2026'}</div>
          </div>
          <div>
            <div class="text-[10px] uppercase font-bold text-emerald-800/70 dark:text-emerald-400/80 tracking-wider">Closes</div>
            <div class="font-extrabold text-emerald-950 dark:text-emerald-200 text-sm">${club.recruitment?.displayEndDate || 'Oct 04, 2026'}</div>
          </div>
        </div>
      </div>

      <!-- TAB NAVIGATION -->
      <div class="border-b border-slate-200 dark:border-slate-800 transition-colors">
        <nav class="flex items-center gap-8 -mb-px text-xs sm:text-sm font-bold">
          <button data-tab="about" class="py-3 border-b-2 transition-all ${
            activeProfileTab === 'about' 
              ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white' 
              : 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }">
            About
          </button>
          <button data-tab="achievements" class="py-3 border-b-2 transition-all ${
            activeProfileTab === 'achievements' 
              ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white' 
              : 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }">
            Achievements
          </button>
          <button data-tab="our-work" class="py-3 border-b-2 transition-all ${
            activeProfileTab === 'our-work' 
              ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white' 
              : 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }">
            Our Work
          </button>
          <button data-tab="events" class="py-3 border-b-2 transition-all ${
            activeProfileTab === 'events' 
              ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white' 
              : 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }">
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
        <div class="bg-white dark:bg-[#111622] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 transition-colors">
          <h3 class="text-base font-extrabold text-slate-900 dark:text-white">About Us</h3>
          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            ${club.description}
          </p>

          <!-- Feature Pills matching Mockup (Teamwork, Innovation, Hands-on) -->
          <div class="flex items-center gap-3 flex-wrap pt-2">
            ${(club.features || [
              { icon: '🤝', label: 'Teamwork' },
              { icon: '💡', label: 'Innovation' },
              { icon: '🛠️', label: 'Hands-on' }
            ]).map(f => `
              <div class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors">
                <span>${f.icon}</span>
                <span>${f.label}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 1st-Year Recruitment Expectations & Commitment -->
        <div class="bg-white dark:bg-[#111622] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
          <h3 class="text-base font-extrabold text-slate-900 dark:text-white">1st-Year Commitment & Selection Rounds</h3>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <div class="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase">Weekly Time Commitment</div>
              <div class="text-sm font-extrabold text-slate-900 dark:text-white">${club.weeklyCommitment || '5-7 hrs/week'}</div>
              <div class="text-xs text-slate-500 dark:text-slate-400">${club.meetingSchedule || 'Flexible lab sessions'}</div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <div class="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase">Freshmen Mentorship</div>
              <div class="text-sm font-extrabold text-slate-900 dark:text-white">No Prior Experience Required</div>
              <div class="text-xs text-slate-500 dark:text-slate-400">${club.recruitment?.tips || '1-on-1 senior mentor assigned for first 4 weeks.'}</div>
            </div>
          </div>

          <!-- Selection Stages -->
          <div class="pt-3 space-y-3">
            <div class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Recruitment Steps</div>
            ${(club.recruitment?.rounds || [
              { round: 'Round 1', name: 'Hands-on Logic Prompt', details: 'Choose 1 track: Arduino logic, CAD gripper, or line follower algorithm.', estimatedTime: '2-3 hours prep' },
              { round: 'Round 2', name: 'Maker Lab Walkthrough', details: 'Work with seniors in the lab to test sensor arrays.', estimatedTime: '45 mins session' }
            ]).map(r => `
              <div class="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">${r.round}:</span>
                    <span class="text-xs font-bold text-slate-900 dark:text-white">${r.name}</span>
                  </div>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${r.details}</p>
                </div>
                <div class="text-[11px] font-semibold text-slate-400 dark:text-slate-400 shrink-0 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
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
    const achs = club.achievements || [
      {
        title: "1st Place - RoboRumble 2025",
        event: "National Robotics Championship",
        year: 2025,
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
        description: "Built an autonomous heavy-combat bot that swept 6 consecutive rounds."
      },
      {
        title: "Runner Up - TechFest 2024",
        event: "TechFest Innovation Cup",
        year: 2024,
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
        description: "Autonomous grid-traversing drone with onboard edge computer vision."
      },
      {
        title: "Best Design - IIT Madras 2023",
        event: "Shaastra Tech Enclave",
        year: 2023,
        image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
        description: "Awarded top engineering aesthetics and manufacturing durability."
      }
    ];

    return `
      <div class="space-y-6 pt-2">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white">Achievements</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">Verified competition wins and awards</p>
          </div>
          <span class="text-xs font-bold text-slate-500 dark:text-slate-400">${achs.length} items</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          ${achs.map(a => `
            <div class="bg-white dark:bg-[#111622] rounded-3xl p-3.5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 group hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <div class="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 dark:bg-slate-800">
                <img src="${a.image}" alt="${a.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
              </div>
              <div>
                <div class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">${a.year} • ${a.event || 'Award'}</div>
                <h4 class="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5 leading-snug">${a.title}</h4>
                <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">${a.description || ''}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (activeProfileTab === 'our-work') {
    const works = club.ourWork || [
      {
        title: "Autonomous Line Follower",
        description: "Designed and built a smart robot that can detect and follow lines. View Project →",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
        tags: ["PID Control", "Infrared Arrays", "Microcontroller"]
      }
    ];

    return `
      <div class="space-y-6 pt-2">
        <div>
          <h3 class="text-base font-extrabold text-slate-900 dark:text-white">Our Work</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">Projects built and maintained by club members</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${works.map(w => `
            <div class="bg-white dark:bg-[#111622] rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between">
              <div class="rounded-2xl overflow-hidden aspect-video bg-slate-100 dark:bg-slate-800">
                <img src="${w.image}" alt="${w.title}" class="w-full h-full object-cover"/>
              </div>
              <div class="space-y-1">
                <h4 class="text-sm font-extrabold text-slate-900 dark:text-white">${w.title}</h4>
                <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">${w.description}</p>
                
                <div class="flex items-center gap-1.5 flex-wrap pt-2">
                  ${(w.tags || []).map(t => `<span class="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full font-bold text-slate-600 dark:text-slate-300">${t}</span>`).join('')}
                </div>
              </div>
              <div class="pt-2">
                <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">${w.linkText || 'View Project →'}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (activeProfileTab === 'events') {
    const events = club.events || [
      {
        date: "Oct 02, 2026",
        title: "Hands-on Microcontrollers & Sensor Jam",
        location: "Maker Lab 2, South Wing",
        description: "Open workshop for all 1st-year students interested in tinkering with embedded circuits."
      }
    ];

    return `
      <div class="space-y-6 pt-2">
        <div>
          <h3 class="text-base font-extrabold text-slate-900 dark:text-white">Upcoming Events</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">Workshops, info sessions, and orientations</p>
        </div>

        <div class="space-y-4">
          ${events.map(ev => `
            <div class="bg-white dark:bg-[#111622] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
              <div class="space-y-1">
                <div class="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">${ev.date}</div>
                <h4 class="text-sm font-extrabold text-slate-900 dark:text-white">${ev.title}</h4>
                <div class="text-xs text-slate-400 dark:text-slate-500">📍 ${ev.location}</div>
                <p class="text-xs text-slate-600 dark:text-slate-300 pt-1">${ev.description}</p>
              </div>
              <div class="shrink-0">
                <button class="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs font-bold shadow-sm inline-block text-center transition-colors">
                  RSVP / Details →
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  return '';
}
