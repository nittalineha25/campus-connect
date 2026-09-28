// Login & Sign Up Split-Screen View matching mockup with Dark/White mode
import { appStore } from '../store.js';
import { showToast } from '../utils/helpers.js';

export function renderAuthView(container) {
  container.innerHTML = `
    <div class="max-w-4xl mx-auto my-4 bg-white dark:bg-[#111622] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-fade-in transition-colors">
      <div class="grid grid-cols-1 md:grid-cols-12 min-h-[540px]">
        
        <!-- LEFT PANEL: Scenic Campus Sunset Photo with Handwritten Quote -->
        <div class="md:col-span-5 relative p-8 flex flex-col justify-between overflow-hidden bg-slate-900 text-white">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80" 
            alt="Campus sunset walkway" 
            class="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.1]"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20"></div>

          <!-- Top Brand -->
          <div class="relative z-10 flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center font-bold text-xs shadow-md">
              cc
            </div>
            <span class="font-extrabold text-white text-sm">Campus Connect</span>
          </div>

          <!-- Bottom Handwritten Quote matching Mockup -->
          <div class="relative z-10 space-y-2">
            <div class="text-2xl sm:text-3xl font-bold handwritten text-white/95 leading-snug drop-shadow-md">
              Same campus.<br/>
              New Connections. ♡
            </div>
            <p class="text-xs text-slate-300 font-medium">
              Join thousands of students finding their tribe and tracking deadlines.
            </p>
          </div>
        </div>

        <!-- RIGHT PANEL: Login / Sign Up Form matching Mockup -->
        <div class="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-white dark:bg-[#111622] transition-colors">
          
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Welcome back!</h2>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Log in to continue to your campus community.</p>
              </div>
              <button id="auth-close-btn" class="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                ✕
              </button>
            </div>

            <!-- Form -->
            <form id="auth-form" class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">College Email ID</label>
                <input 
                  type="email" 
                  id="auth-email" 
                  required 
                  placeholder="you@college.edu" 
                  value="student.aman@college.edu"
                  class="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Password</label>
                <input 
                  type="password" 
                  id="auth-password" 
                  required 
                  value="password123"
                  placeholder="••••••••" 
                  class="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all"
                />
              </div>

              <button 
                type="submit" 
                class="w-full py-3 rounded-full bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Log In</span>
                <span>→</span>
              </button>
            </form>

            <!-- Divider: Or -->
            <div class="relative flex items-center justify-center my-4">
              <div class="border-t border-slate-200 dark:border-slate-800 w-full"></div>
              <span class="bg-white dark:bg-[#111622] px-3 text-[11px] font-bold text-slate-400 uppercase absolute">Or</span>
            </div>

            <!-- Continue with Google Button -->
            <button 
              id="google-signin-btn" 
              class="w-full py-2.5 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <!-- Bottom: 1-Click Demo Personas for Quick Evaluation -->
          <div class="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-2 mt-4">
            <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Demo Persona Access:</div>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <button data-quick-user="rishabh" class="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-left font-bold text-slate-800 dark:text-slate-200 transition-colors">
                🚀 Rishabh (President)
              </button>
              <button data-quick-user="aman" class="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-left font-bold text-slate-800 dark:text-slate-200 transition-colors">
                🎓 Aman (1st-Year)
              </button>
            </div>
            <div class="text-[11px] text-center text-slate-400 pt-2">
              Don't have an account? <span class="text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer">Sign Up</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  `;

  // Attach Listeners
  container.querySelector('#auth-close-btn')?.addEventListener('click', () => {
    appStore.setView('home');
  });

  container.querySelector('#auth-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = container.querySelector('#auth-email').value.trim();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.success) {
        appStore.setUser(data.user);
        showToast('Logged in as ' + data.user.name, 'success');
        if (data.user.role === 'president') {
          appStore.setView('dashboard');
        } else {
          appStore.setView('home');
        }
      }
    } catch (err) {
      showToast('Login failed', 'error');
    }
  });

  container.querySelector('#google-signin-btn')?.addEventListener('click', () => {
    appStore.setUser({
      email: "student.aman@college.edu",
      name: "Aman Verma",
      role: "student",
      clubId: null,
      title: "1st-Year CSE Student"
    });
    showToast('Signed in with Google as Aman Verma', 'success');
    appStore.setView('home');
  });

  container.querySelectorAll('[data-quick-user]').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.quickUser;
      if (type === 'rishabh') {
        appStore.setUser({
          email: "rishabh.robotics@college.edu",
          name: "Rishabh",
          role: "president",
          clubId: "robotics-club",
          title: "Robotics Club President"
        });
        showToast('Logged in as Rishabh (Robotics President)', 'success');
        appStore.setView('dashboard');
      } else {
        appStore.setUser({
          email: "student.aman@college.edu",
          name: "Aman Verma",
          role: "student",
          clubId: null,
          title: "1st-Year CSE Student"
        });
        showToast('Logged in as Aman Verma (1st-Year Student)', 'success');
        appStore.setView('home');
      }
    });
  });
}

export function openAuthModal() {
  appStore.setView('login');
}
