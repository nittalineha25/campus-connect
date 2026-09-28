// President Dashboard matching mockup sidebar & metric cards with full dark/white mode
import { appStore } from '../store.js';
import { showToast } from '../utils/helpers.js';

let activeDashTab = 'dashboard'; // 'dashboard' | 'my-club' | 'members' | 'post-access' | 'settings'

export function renderPresidentDashboard(container) {
  const user = appStore.state.user;
  const clubId = (user && user.clubId) || 'robotics-club';
  const club = appStore.state.clubs.find(c => c.id === clubId) || appStore.state.clubs[0];

  container.innerHTML = `
    <div class="bg-white dark:bg-[#111622] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-fade-in my-2 transition-colors">
      <div class="flex flex-col md:flex-row min-h-[640px]">
        
        <!-- SIDEBAR matching Mockup -->
        <aside class="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0D121B] p-6 flex flex-col justify-between transition-colors">
          <div class="space-y-6">
            <!-- Logo -->
            <div class="flex items-center gap-2 pb-2">
              <div class="w-7 h-7 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs">
                cc
              </div>
              <span class="font-extrabold text-slate-900 dark:text-white text-sm">Campus Connect</span>
            </div>

            <!-- Navigation Links -->
            <nav class="space-y-1">
              <button data-dash-nav="dashboard" class="w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                activeDashTab === 'dashboard' 
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }">
                <span>📊</span>
                <span>Dashboard</span>
              </button>
              <button data-dash-nav="my-club" class="w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                activeDashTab === 'my-club' 
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }">
                <span>⚙️</span>
                <span>My Club</span>
              </button>
              <button data-dash-nav="members" class="w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                activeDashTab === 'members' 
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }">
                <span>👥</span>
                <span>Members</span>
              </button>
              <button data-dash-nav="post-access" class="w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                activeDashTab === 'post-access' 
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }">
                <span>🔑</span>
                <span>Post Access</span>
              </button>
              <button data-dash-nav="settings" class="w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                activeDashTab === 'settings' 
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }">
                <span>🛠</span>
                <span>Settings</span>
              </button>
            </nav>
          </div>

          <!-- Log out button -->
          <div class="pt-6 border-t border-slate-200 dark:border-slate-800">
            <button id="dash-logout-btn" class="w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all flex items-center gap-2">
              <span>↪</span>
              <span>Log out</span>
            </button>
          </div>
        </aside>

        <!-- MAIN DASHBOARD CONTENT -->
        <main class="flex-1 p-6 sm:p-8 space-y-8">
          
          <!-- Header: "Hi, Rishabh 👋 Robotics Club President" -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5 transition-colors">
            <div>
              <h1 class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Hi, ${user ? user.name : 'Rishabh'} 👋
              </h1>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                ${club.name} President • Control Center
              </p>
            </div>
            
            <div class="flex items-center gap-2">
              <button id="btn-preview-club-page" class="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all">
                Preview Public Page →
              </button>
            </div>
          </div>

          ${renderActiveDashTabContent(club)}

        </main>
      </div>
    </div>
  `;

  // Attach Navigation Listeners
  container.querySelectorAll('[data-dash-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeDashTab = btn.dataset.dashNav;
      renderPresidentDashboard(container);
    });
  });

  container.querySelector('#dash-logout-btn')?.addEventListener('click', () => {
    appStore.setUser({
      email: "student.aman@college.edu",
      name: "Aman Verma",
      role: "student",
      clubId: null,
      title: "1st-Year CSE Student"
    });
    showToast('Logged out of President session', 'info');
    appStore.setView('home');
  });

  container.querySelector('#btn-preview-club-page')?.addEventListener('click', () => {
    appStore.selectClub(club.id);
  });

  // Attach tab specific listeners
  attachDashboardActionListeners(container, club);
}

function renderActiveDashTabContent(club) {
  if (activeDashTab === 'dashboard') {
    return `
      <!-- STAT CARDS matching Mockup -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <!-- Total Views -->
        <div class="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-1 transition-colors">
          <div class="text-xs font-bold text-slate-500 dark:text-slate-400">Total Views</div>
          <div class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">1,248</div>
          <div class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">+12% from last week</div>
        </div>

        <!-- Active Members -->
        <div class="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-1 transition-colors">
          <div class="text-xs font-bold text-slate-500 dark:text-slate-400">Active Members</div>
          <div class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">${club.stats?.members || 342}</div>
          <div class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">+4% from last week</div>
        </div>

        <!-- Pending Posts -->
        <div class="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-1 transition-colors">
          <div class="text-xs font-bold text-slate-500 dark:text-slate-400">Pending Posts</div>
          <div class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">${club.stats?.pendingPosts || 2}</div>
          <div class="text-[11px] font-bold text-amber-600 dark:text-amber-400">Requires approval</div>
        </div>

      </div>

      <!-- RECENT ACTIVITY TABLE matching Mockup -->
      <div class="space-y-4 pt-2">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-extrabold text-slate-900 dark:text-white">Recent Activity</h3>
          <span class="text-xs font-bold text-slate-400 dark:text-slate-500">View all →</span>
        </div>

        <div class="space-y-3">
          ${(club.recentActivities || [
            { id: 'act-1', type: 'member_request', title: 'New member request', user: 'Ananya Sharma', time: '2h ago', status: 'pending' },
            { id: 'act-2', type: 'post_approval', title: 'Post submitted for approval', detail: 'Workshop Recap', time: '4h ago', status: 'pending' },
            { id: 'act-3', type: 'dates_updated', title: 'Registration dates updated', detail: 'Sep 28 - Oct 04', time: '1d ago', status: 'completed' }
          ]).map(act => `
            <div class="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-white dark:bg-[#161F2E] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs transition-colors">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs">
                  ${act.type === 'member_request' ? '👤' : (act.type === 'post_approval' ? '📝' : '📅')}
                </div>
                <div>
                  <div class="text-xs font-bold text-slate-900 dark:text-white">${act.title}</div>
                  <div class="text-[11px] text-slate-400 dark:text-slate-500">
                    ${act.user || act.detail || ''} • ${act.time}
                  </div>
                </div>
              </div>

              <!-- Action buttons -->
              <div class="flex items-center gap-2 self-end sm:self-auto">
                ${act.type === 'member_request' ? `
                  ${act.status === 'approved' ? '<span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">Approved</span>' : (act.status === 'declined' ? '<span class="text-xs font-bold text-red-600 dark:text-red-400">Declined</span>' : `
                    <button data-act-id="${act.id}" data-action="approve" class="act-btn px-3 py-1 bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-full text-xs font-bold shadow-xs">Approve</button>
                    <button data-act-id="${act.id}" data-action="decline" class="act-btn px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-bold">Decline</button>
                  `)}
                ` : (act.type === 'post_approval' ? `
                  ${act.status === 'approved' ? '<span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">Reviewed</span>' : `
                    <button data-act-id="${act.id}" data-action="approve" class="act-btn px-3 py-1 bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-full text-xs font-bold shadow-xs">Review</button>
                  `}
                ` : `
                  <button class="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-bold">View</button>
                `)}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- QUICK ACTIONS matching Mockup -->
      <div class="space-y-3 pt-2">
        <h3 class="text-base font-extrabold text-slate-900 dark:text-white">Quick Actions</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          <button id="qa-edit-club" class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-900 dark:hover:border-slate-600 bg-white dark:bg-[#161F2E] text-left transition-all group">
            <div class="text-base mb-1">✏️</div>
            <div class="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Edit Club Page</div>
            <div class="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Dates & Form URL</div>
          </button>

          <button id="qa-add-post" class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-900 dark:hover:border-slate-600 bg-white dark:bg-[#161F2E] text-left transition-all group">
            <div class="text-base mb-1">➕</div>
            <div class="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Add New Post</div>
            <div class="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Showcase work</div>
          </button>

          <button id="qa-manage-members" class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-900 dark:hover:border-slate-600 bg-white dark:bg-[#161F2E] text-left transition-all group">
            <div class="text-base mb-1">👥</div>
            <div class="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Manage Members</div>
            <div class="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Delegate rights</div>
          </button>

          <button id="qa-view-analytics" class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-900 dark:hover:border-slate-600 bg-white dark:bg-[#161F2E] text-left transition-all group">
            <div class="text-base mb-1">📈</div>
            <div class="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">View Analytics</div>
            <div class="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Applicant insights</div>
          </button>

        </div>
      </div>
    `;
  }

  if (activeDashTab === 'my-club') {
    return `
      <div class="space-y-6">
        <div>
          <h3 class="text-base font-extrabold text-slate-900 dark:text-white">Edit Recruitment & Club Details</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">Update pinned registration dates and official external application link.</p>
        </div>

        <form id="edit-club-form" class="bg-slate-50 dark:bg-slate-800/40 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 max-w-xl transition-colors">
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Club Tagline</label>
            <input type="text" id="edit-tagline" value="${club.tagline || 'Build • Compete • Create'}" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"/>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Registration Start Date</label>
              <input type="text" id="edit-start-date" value="${club.recruitment?.displayStartDate || 'Sep 28, 2026'}" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"/>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Registration Closing Date</label>
              <input type="text" id="edit-end-date" value="${club.recruitment?.displayEndDate || 'Oct 04, 2026'}" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"/>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">External Application Form URL</label>
            <input type="url" id="edit-ext-url" value="${club.recruitment?.externalUrl || 'https://forms.gle/roboticsRecruitment2026Demo'}" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"/>
            <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Google Form, Unstop, or Typeform link as specified in PRD.</p>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Weekly Commitment (Freshmen)</label>
            <input type="text" id="edit-commitment" value="${club.weeklyCommitment || '5-7 hrs/week'}" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"/>
          </div>

          <button type="submit" class="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs font-bold shadow-sm transition-colors">
            Save Changes
          </button>
        </form>
      </div>
    `;
  }

  if (activeDashTab === 'members' || activeDashTab === 'post-access') {
    return `
      <div class="space-y-6">
        <div>
          <h3 class="text-base font-extrabold text-slate-900 dark:text-white">Delegated Posting Access</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">PRD Feature: Grant editing/posting rights to trusted members to prevent single-point bottlenecks.</p>
        </div>

        <!-- Add Delegated Member Form -->
        <form id="delegate-form" class="bg-slate-50 dark:bg-slate-800/40 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 max-w-xl transition-colors">
          <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Grant Posting Permissions</h4>
          
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Student College Email</label>
            <input type="email" id="delegate-email" required placeholder="member@college.edu" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"/>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Member Name</label>
              <input type="text" id="delegate-name" placeholder="Ananya Sharma" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"/>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Role / Responsibility</label>
              <input type="text" id="delegate-role" placeholder="Autonomous Systems Lead" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"/>
            </div>
          </div>

          <button type="submit" class="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs font-bold shadow-sm transition-colors">
            Grant Access
          </button>
        </form>

        <!-- Current Delegated Members List -->
        <div class="space-y-3 pt-2">
          <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Authorized Members with Posting Rights</h4>
          
          <div class="space-y-2 max-w-xl">
            ${(club.delegatedMembers || []).map(m => `
              <div class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161F2E] flex items-center justify-between shadow-xs transition-colors">
                <div>
                  <div class="text-xs font-bold text-slate-900 dark:text-white">${m.name}</div>
                  <div class="text-[11px] text-slate-500 dark:text-slate-400 font-mono">${m.email}</div>
                  <div class="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold mt-0.5">${m.role}</div>
                </div>
                <span class="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                  Active Access
                </span>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  }

  if (activeDashTab === 'settings') {
    return `
      <div class="space-y-6">
        <div>
          <h3 class="text-base font-extrabold text-slate-900 dark:text-white">Club Configuration</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">Settings and authentication credentials.</p>
        </div>

        <div class="bg-slate-50 dark:bg-slate-800/40 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 max-w-xl space-y-4 transition-colors">
          <div class="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700">
            <div>
              <div class="text-xs font-bold text-slate-900 dark:text-white">College Domain Authentication</div>
              <div class="text-[11px] text-slate-500 dark:text-slate-400">Restricted to verified @college.edu emails</div>
            </div>
            <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">Enforced</span>
          </div>

          <div class="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700">
            <div>
              <div class="text-xs font-bold text-slate-900 dark:text-white">Active Theme</div>
              <div class="text-[11px] text-slate-500 dark:text-slate-400">Current visual preference</div>
            </div>
            <button id="toggle-theme-dash" class="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-full">
              Toggle Dark/White
            </button>
          </div>

          <div class="flex items-center justify-between py-2">
            <div>
              <div class="text-xs font-bold text-slate-900 dark:text-white">External Registration Redirection</div>
              <div class="text-[11px] text-slate-500 dark:text-slate-400">Click-through notice on external forms</div>
            </div>
            <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">Enabled</span>
          </div>
        </div>
      </div>
    `;
  }

  return '';
}

function attachDashboardActionListeners(container, club) {
  // Activity Action Buttons (Approve / Decline)
  container.querySelectorAll('.act-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const actId = btn.dataset.actId;
      const action = btn.dataset.action;
      
      const act = (club.recentActivities || []).find(a => a.id === actId);
      if (act) {
        act.status = action === 'approve' ? 'approved' : 'declined';
        showToast(action === 'approve' ? 'Request approved successfully!' : 'Request declined.', action === 'approve' ? 'success' : 'info');
        renderPresidentDashboard(container);
      }
    });
  });

  // Quick Action Buttons
  container.querySelector('#qa-edit-club')?.addEventListener('click', () => {
    activeDashTab = 'my-club';
    renderPresidentDashboard(container);
  });

  container.querySelector('#qa-manage-members')?.addEventListener('click', () => {
    activeDashTab = 'members';
    renderPresidentDashboard(container);
  });

  container.querySelector('#qa-add-post')?.addEventListener('click', () => {
    activeDashTab = 'my-club';
    renderPresidentDashboard(container);
    showToast('Scroll to update recruitment & showcase work', 'info');
  });

  container.querySelector('#qa-view-analytics')?.addEventListener('click', () => {
    showToast('Analytics: 1,248 profile impressions in the past 7 days', 'info');
  });

  container.querySelector('#toggle-theme-dash')?.addEventListener('click', () => {
    appStore.toggleTheme();
  });

  // Edit Club Details Form Submit
  const editForm = container.querySelector('#edit-club-form');
  if (editForm) {
    editForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const tagline = container.querySelector('#edit-tagline').value.trim();
      const displayStartDate = container.querySelector('#edit-start-date').value.trim();
      const displayEndDate = container.querySelector('#edit-end-date').value.trim();
      const externalUrl = container.querySelector('#edit-ext-url').value.trim();
      const weeklyCommitment = container.querySelector('#edit-commitment').value.trim();

      club.tagline = tagline;
      if (!club.recruitment) club.recruitment = {};
      club.recruitment.displayStartDate = displayStartDate;
      club.recruitment.displayEndDate = displayEndDate;
      club.recruitment.externalUrl = externalUrl;
      club.weeklyCommitment = weeklyCommitment;

      try {
        await fetch(`/api/clubs/${club.id}/recruitment`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tagline,
            displayStartDate,
            displayEndDate,
            externalUrl,
            weeklyCommitment
          })
        });
      } catch (err) {
        console.warn('Backend update failed, using local store update:', err);
      }

      appStore.updateClubInStore(club);
      showToast('Club details & dates updated successfully!', 'success');
      activeDashTab = 'dashboard';
      renderPresidentDashboard(container);
    });
  }

  // Delegate Form Submit
  const delegateForm = container.querySelector('#delegate-form');
  if (delegateForm) {
    delegateForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = container.querySelector('#delegate-email').value.trim();
      const name = container.querySelector('#delegate-name').value.trim() || email.split('@')[0];
      const role = container.querySelector('#delegate-role').value.trim() || 'Content Contributor';

      if (!club.delegatedMembers) club.delegatedMembers = [];
      club.delegatedMembers.push({
        email,
        name,
        role,
        grantedAt: new Date().toISOString()
      });

      try {
        await fetch(`/api/clubs/${club.id}/delegate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name, role })
        });
      } catch (err) {
        console.warn('Backend delegate failed, using local store update:', err);
      }

      appStore.updateClubInStore(club);
      showToast(`Posting access granted to ${name}!`, 'success');
      container.querySelector('#delegate-email').value = '';
      container.querySelector('#delegate-name').value = '';
      container.querySelector('#delegate-role').value = '';
      renderPresidentDashboard(container);
    });
  }
}
