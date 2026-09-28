// President Dashboard matching mockup sidebar & metric cards
import { appStore } from '../store.js';
import { showToast } from '../utils/helpers.js';

let activeDashTab = 'dashboard'; // 'dashboard' | 'my-club' | 'members' | 'post-access' | 'settings'

export function renderPresidentDashboard(container) {
  const user = appStore.state.user;
  const clubId = (user && user.clubId) || 'robotics-club';
  const club = appStore.state.clubs.find(c => c.id === clubId) || appStore.state.clubs[0];

  container.innerHTML = `
    <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in my-2">
      <div class="flex flex-col md:flex-row min-h-[640px]">
        
        <!-- SIDEBAR matching Mockup -->
        <aside class="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50/50 p-6 flex flex-col justify-between">
          <div class="space-y-6">
            <!-- Logo -->
            <div class="flex items-center gap-2 pb-2">
              <div class="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                cc
              </div>
              <span class="font-extrabold text-slate-900 text-sm">Campus Connect</span>
            </div>

            <!-- Navigation Links -->
            <nav class="space-y-1">
              <button data-dash-nav="dashboard" class="w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2.5 ${activeDashTab === 'dashboard' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}">
                <span>📊</span>
                <span>Dashboard</span>
              </button>
              <button data-dash-nav="my-club" class="w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2.5 ${activeDashTab === 'my-club' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}">
                <span>⚙️</span>
                <span>My Club</span>
              </button>
              <button data-dash-nav="members" class="w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2.5 ${activeDashTab === 'members' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}">
                <span>👥</span>
                <span>Members</span>
              </button>
              <button data-dash-nav="post-access" class="w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2.5 ${activeDashTab === 'post-access' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}">
                <span>🔑</span>
                <span>Post Access</span>
              </button>
              <button data-dash-nav="settings" class="w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2.5 ${activeDashTab === 'settings' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}">
                <span>🛠</span>
                <span>Settings</span>
              </button>
            </nav>
          </div>

          <!-- Log out button -->
          <div class="pt-6 border-t border-slate-200">
            <button id="dash-logout-btn" class="w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-all flex items-center gap-2">
              <span>↪</span>
              <span>Log out</span>
            </button>
          </div>
        </aside>

        <!-- MAIN DASHBOARD CONTENT -->
        <main class="flex-1 p-6 sm:p-8 space-y-8">
          
          <!-- Header: "Hi, Rishabh 👋 Robotics Club President" -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <h1 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Hi, ${user ? user.name : 'Rishabh'} 👋
              </h1>
              <p class="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                ${club.name} President • Control Center
              </p>
            </div>
            
            <div class="flex items-center gap-2">
              <button id="btn-preview-club-page" class="px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all">
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
        <div class="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-1">
          <div class="text-xs font-bold text-slate-500">Total Views</div>
          <div class="text-2xl sm:text-3xl font-extrabold text-slate-900">1,248</div>
          <div class="text-[11px] font-bold text-emerald-600">+12% from last week</div>
        </div>

        <!-- Active Members -->
        <div class="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-1">
          <div class="text-xs font-bold text-slate-500">Active Members</div>
          <div class="text-2xl sm:text-3xl font-extrabold text-slate-900">${club.stats?.members || 342}</div>
          <div class="text-[11px] font-bold text-emerald-600">+4% from last week</div>
        </div>

        <!-- Pending Posts -->
        <div class="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-1">
          <div class="text-xs font-bold text-slate-500">Pending Posts</div>
          <div class="text-2xl sm:text-3xl font-extrabold text-slate-900">${club.stats?.pendingPosts || 2}</div>
          <div class="text-[11px] font-bold text-amber-600">Requires approval</div>
        </div>

      </div>

      <!-- RECENT ACTIVITY TABLE matching Mockup -->
      <div class="space-y-4 pt-2">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-extrabold text-slate-900">Recent Activity</h3>
          <span class="text-xs font-bold text-slate-400">View all →</span>
        </div>

        <div class="space-y-3">
          ${(club.recentActivities || []).map(act => `
            <div class="p-4 rounded-2xl border border-slate-100 hover:border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs">
                  ${act.type === 'member_request' ? '👤' : (act.type === 'post_approval' ? '📝' : '📅')}
                </div>
                <div>
                  <div class="text-xs font-bold text-slate-900">${act.title}</div>
                  <div class="text-[11px] text-slate-400">
                    ${act.user || act.detail || ''} • ${act.time}
                  </div>
                </div>
              </div>

              <!-- Action buttons -->
              <div class="flex items-center gap-2 self-end sm:self-auto">
                ${act.type === 'member_request' ? `
                  ${act.status === 'approved' ? '<span class="text-xs font-bold text-emerald-600">Approved</span>' : (act.status === 'declined' ? '<span class="text-xs font-bold text-red-600">Declined</span>' : `
                    <button data-act-id="${act.id}" data-action="approve" class="act-btn px-3 py-1 bg-slate-900 hover:bg-black text-white rounded-full text-xs font-bold shadow-xs">Approve</button>
                    <button data-act-id="${act.id}" data-action="decline" class="act-btn px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs font-bold">Decline</button>
                  `)}
                ` : (act.type === 'post_approval' ? `
                  ${act.status === 'approved' ? '<span class="text-xs font-bold text-emerald-600">Reviewed</span>' : `
                    <button data-act-id="${act.id}" data-action="approve" class="act-btn px-3 py-1 bg-slate-900 hover:bg-black text-white rounded-full text-xs font-bold shadow-xs">Review</button>
                  `}
                ` : `
                  <button class="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs font-bold">View</button>
                `)}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- QUICK ACTIONS matching Mockup -->
      <div class="space-y-3 pt-2">
        <h3 class="text-base font-extrabold text-slate-900">Quick Actions</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          <button id="qa-edit-club" class="p-4 rounded-2xl border border-slate-200 hover:border-slate-900 bg-white text-left transition-all group">
            <div class="text-base mb-1">✏️</div>
            <div class="text-xs font-bold text-slate-900 group-hover:text-indigo-600">Edit Club Page</div>
            <div class="text-[10px] text-slate-400 mt-0.5">Dates & Form URL</div>
          </button>

          <button id="qa-add-post" class="p-4 rounded-2xl border border-slate-200 hover:border-slate-900 bg-white text-left transition-all group">
            <div class="text-base mb-1">➕</div>
            <div class="text-xs font-bold text-slate-900 group-hover:text-indigo-600">Add New Post</div>
            <div class="text-[10px] text-slate-400 mt-0.5">Showcase work</div>
          </button>

          <button id="qa-manage-members" class="p-4 rounded-2xl border border-slate-200 hover:border-slate-900 bg-white text-left transition-all group">
            <div class="text-base mb-1">👥</div>
            <div class="text-xs font-bold text-slate-900 group-hover:text-indigo-600">Manage Members</div>
            <div class="text-[10px] text-slate-400 mt-0.5">Delegate rights</div>
          </button>

          <button id="qa-view-analytics" class="p-4 rounded-2xl border border-slate-200 hover:border-slate-900 bg-white text-left transition-all group">
            <div class="text-base mb-1">📈</div>
            <div class="text-xs font-bold text-slate-900 group-hover:text-indigo-600">View Analytics</div>
            <div class="text-[10px] text-slate-400 mt-0.5">Applicant insights</div>
          </button>

        </div>
      </div>
    `;
  }

  if (activeDashTab === 'my-club') {
    return `
      <div class="space-y-6">
        <div>
          <h3 class="text-base font-extrabold text-slate-900">Edit Recruitment & Club Details</h3>
          <p class="text-xs text-slate-500">Update pinned registration dates and official external application link.</p>
        </div>

        <form id="edit-club-form" class="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-4 max-w-xl">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Club Tagline</label>
            <input type="text" id="edit-tagline" value="${club.tagline}" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"/>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Registration Start Date</label>
              <input type="text" id="edit-start-date" value="${club.recruitment?.displayStartDate || 'Sep 28, 2026'}" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"/>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Registration Closing Date</label>
              <input type="text" id="edit-end-date" value="${club.recruitment?.displayEndDate || 'Oct 04, 2026'}" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"/>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">External Application Form URL</label>
            <input type="url" id="edit-ext-url" value="${club.recruitment?.externalUrl || 'https://forms.gle/demo'}" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-slate-900 focus:outline-none"/>
            <p class="text-[11px] text-slate-400 mt-1">Google Form, Unstop, or Typeform link as specified in PRD.</p>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Weekly Commitment (Freshmen)</label>
            <input type="text" id="edit-commitment" value="${club.weeklyCommitment || '5-7 hrs/week'}" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"/>
          </div>

          <button type="submit" class="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-sm">
            Save Changes
          </button>
        </form>
      </div>
    `;
  }

  if (activeDashTab === 'post-access' || activeDashTab === 'members') {
    return `
      <div class="space-y-6">
        <div>
          <h3 class="text-base font-extrabold text-slate-900">Delegated Posting Access</h3>
          <p class="text-xs text-slate-500">As specified in the PRD, presidents can grant posting rights to other verified member emails so content upkeep isn't a single point of failure.</p>
        </div>

        <!-- Add Delegated Member Form -->
        <form id="delegate-form" class="bg-slate-50 p-5 rounded-3xl border border-slate-200 flex flex-col sm:flex-row gap-3">
          <input type="email" id="delegate-email" placeholder="student.name@college.edu" required class="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"/>
          <input type="text" id="delegate-role" placeholder="Role (e.g. Media Lead)" required class="w-full sm:w-48 px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"/>
          <button type="submit" class="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shrink-0">
            Grant Access
          </button>
        </form>

        <!-- Current Delegated Members List -->
        <div class="space-y-3">
          <div class="text-xs font-bold text-slate-400 uppercase">Authorized Team Members (${(club.delegatedMembers || []).length})</div>
          ${(club.delegatedMembers || []).map(m => `
            <div class="p-4 rounded-2xl border border-slate-100 bg-white flex items-center justify-between shadow-xs">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center text-xs">
                  ${m.name.charAt(0)}
                </div>
                <div>
                  <div class="text-xs font-bold text-slate-900">${m.name}</div>
                  <div class="text-[11px] text-slate-400">${m.email} • <span class="text-indigo-600 font-medium">${m.role}</span></div>
                </div>
              </div>
              <button data-revoke-email="${m.email}" class="text-xs text-red-600 hover:text-red-800 font-semibold px-2 py-1 rounded-lg hover:bg-red-50">
                Revoke
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (activeDashTab === 'settings') {
    return `
      <div class="space-y-4">
        <h3 class="text-base font-extrabold text-slate-900">President Account Settings</h3>
        <p class="text-xs text-slate-500">Manage authenticated college domain and notification preferences.</p>
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
          <div>Verified College Domain: <strong>college.edu</strong></div>
          <div>President Email: <strong>${club.president?.email}</strong></div>
          <div>Challenge Build: <strong>MIB Software Cluster</strong></div>
        </div>
      </div>
    `;
  }

  return '';
}

function attachDashboardActionListeners(container, club) {
  // Activity buttons
  container.querySelectorAll('.act-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const actId = btn.dataset.actId;
      const action = btn.dataset.action;
      try {
        const res = await fetch(`/api/clubs/${club.id}/activity/${actId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action })
        });
        const data = await res.json();
        if (data.success) {
          showToast(`Activity ${action}d!`, 'success');
          appStore.updateClubInStore(data.club);
          renderPresidentDashboard(container);
        }
      } catch (err) {
        showToast('Action failed', 'error');
      }
    });
  });

  // Quick Action Buttons
  container.querySelector('#qa-edit-club')?.addEventListener('click', () => {
    activeDashTab = 'my-club';
    renderPresidentDashboard(container);
  });

  container.querySelector('#qa-manage-members')?.addEventListener('click', () => {
    activeDashTab = 'post-access';
    renderPresidentDashboard(container);
  });

  container.querySelector('#qa-add-post')?.addEventListener('click', () => {
    openAddPostModal(club);
  });

  container.querySelector('#qa-view-analytics')?.addEventListener('click', () => {
    showToast('Analytics: 1,248 pageviews, 42 clicks to application form', 'info');
  });

  // Edit Club Form submission
  const editForm = container.querySelector('#edit-club-form');
  if (editForm) {
    editForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const tagline = container.querySelector('#edit-tagline').value;
      const displayStartDate = container.querySelector('#edit-start-date').value;
      const displayEndDate = container.querySelector('#edit-end-date').value;
      const externalUrl = container.querySelector('#edit-ext-url').value;
      const weeklyCommitment = container.querySelector('#edit-commitment').value;

      try {
        const res = await fetch(`/api/clubs/${club.id}/recruitment`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tagline, displayStartDate, displayEndDate, externalUrl, weeklyCommitment })
        });
        const data = await res.json();
        if (data.success) {
          showToast('Club details updated!', 'success');
          appStore.updateClubInStore(data.club);
          activeDashTab = 'dashboard';
          renderPresidentDashboard(container);
        }
      } catch (err) {
        showToast('Failed to save club details', 'error');
      }
    });
  }

  // Delegated Access submission
  const delegateForm = container.querySelector('#delegate-form');
  if (delegateForm) {
    delegateForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = container.querySelector('#delegate-email').value;
      const role = container.querySelector('#delegate-role').value;

      try {
        const res = await fetch(`/api/clubs/${club.id}/delegate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-user-email': club.president.email
          },
          body: JSON.stringify({ email, role })
        });
        const data = await res.json();
        if (data.success) {
          showToast('Delegated access granted!', 'success');
          club.delegatedMembers = data.delegatedMembers;
          appStore.updateClubInStore(club);
          renderPresidentDashboard(container);
        }
      } catch (err) {
        showToast('Failed to delegate access', 'error');
      }
    });
  }

  // Revoke delegation
  container.querySelectorAll('[data-revoke-email]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const email = btn.dataset.revokeEmail;
      try {
        const res = await fetch(`/api/clubs/${club.id}/delegate/${encodeURIComponent(email)}`, {
          method: 'DELETE',
          headers: { 'x-user-email': club.president.email }
        });
        const data = await res.json();
        if (data.success) {
          showToast('Revoked access for ' + email, 'info');
          club.delegatedMembers = data.delegatedMembers;
          appStore.updateClubInStore(club);
          renderPresidentDashboard(container);
        }
      } catch (err) {
        showToast('Failed to revoke', 'error');
      }
    });
  });
}

// Add Post Modal
function openAddPostModal(club) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in';
  modal.innerHTML = `
    <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 text-left relative">
      <button id="close-post-modal" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2">✕</button>
      <h3 class="text-base font-extrabold text-slate-900">Publish New Post / Achievement</h3>
      <p class="text-xs text-slate-500 mt-0.5">Showcase verified student work to freshmen</p>

      <form id="new-post-form" class="mt-4 space-y-3">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Post Title / Achievement</label>
          <input type="text" id="post-title" required placeholder="e.g. 1st Place Autonomous Drone Jam" class="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"/>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Description</label>
          <textarea id="post-desc" required rows="2" placeholder="Explain the project or win..." class="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"></textarea>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
          <input type="url" id="post-img" value="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80" class="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none font-mono"/>
        </div>
        <div class="pt-2 flex justify-end gap-2">
          <button type="button" id="cancel-post-btn" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold">Cancel</button>
          <button type="submit" class="px-5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold">Publish Post</button>
        </div>
      </form>
    </div>
  `;

  modalContainer.innerHTML = '';
  modalContainer.appendChild(modal);

  modal.querySelector('#close-post-modal').addEventListener('click', () => modalContainer.innerHTML = '');
  modal.querySelector('#cancel-post-btn').addEventListener('click', () => modalContainer.innerHTML = '');
  
  modal.querySelector('#new-post-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = modal.querySelector('#post-title').value;
    const caption = modal.querySelector('#post-desc').value;
    const imageUrl = modal.querySelector('#post-img').value;

    try {
      const res = await fetch(`/api/clubs/${club.id}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-email': club.president.email },
        body: JSON.stringify({ title, caption, imageUrl })
      });
      const data = await res.json();
      if (data.success) {
        showToast('Post published successfully!', 'success');
        appStore.updateClubInStore(data.club);
        modalContainer.innerHTML = '';
      }
    } catch (err) {
      showToast('Failed to publish post', 'error');
    }
  });
}
