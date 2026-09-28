// Campus Connect Central State Store
const initialTheme = localStorage.getItem('cc_theme') || 
  (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

export const appStore = {
  state: {
    view: 'home', // 'home' | 'browse' | 'saved' | 'club-profile' | 'dashboard' | 'login'
    theme: initialTheme, // 'light' | 'dark'
    clubs: [],
    selectedClubId: 'robotics-club',
    selectedCategory: 'All',
    searchQuery: '',
    viewMode: 'grid', // 'grid' | 'calendar'
    savedClubIds: JSON.parse(localStorage.getItem('cc_saved_clubs') || '["robotics-club", "coding-club"]'),
    user: JSON.parse(localStorage.getItem('cc_current_user') || JSON.stringify({
      email: "rishabh.robotics@college.edu",
      name: "Rishabh",
      role: "president",
      clubId: "robotics-club",
      title: "Robotics Club President"
    })),
    listeners: []
  },

  subscribe(listener) {
    this.state.listeners.push(listener);
    return () => {
      this.state.listeners = this.state.listeners.filter(l => l !== listener);
    };
  },

  notify() {
    this.state.listeners.forEach(fn => fn(this.state));
  },

  toggleTheme() {
    const newTheme = this.state.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  },

  setTheme(theme) {
    this.state.theme = theme;
    localStorage.setItem('cc_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    this.notify();
  },

  setView(view, clubId = null, pushHistory = true) {
    this.state.view = view;
    if (clubId) this.state.selectedClubId = clubId;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushHistory && typeof window !== 'undefined' && window.history) {
      let targetPath = '/';
      if (view === 'browse') targetPath = '/explore';
      else if (view === 'saved') targetPath = '/saved';
      else if (view === 'dashboard') targetPath = '/dashboard';
      else if (view === 'login') targetPath = '/login';
      else if (view === 'club-profile') targetPath = `/club/${this.state.selectedClubId}`;

      if (window.location.pathname !== targetPath) {
        window.history.pushState({ view, clubId: this.state.selectedClubId }, '', targetPath);
      }
    }

    this.notify();
  },

  setCategory(category) {
    this.state.selectedCategory = category;
    this.notify();
  },

  setSearchQuery(q) {
    this.state.searchQuery = q;
    this.notify();
  },

  setViewMode(mode) {
    this.state.viewMode = mode;
    this.notify();
  },

  selectClub(clubId, pushHistory = true) {
    this.state.selectedClubId = clubId;
    this.state.view = 'club-profile';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushHistory && typeof window !== 'undefined' && window.history) {
      const targetPath = `/club/${clubId}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ view: 'club-profile', clubId }, '', targetPath);
      }
    }

    this.notify();
  },

  toggleSave(clubId) {
    const idx = this.state.savedClubIds.indexOf(clubId);
    if (idx === -1) {
      this.state.savedClubIds.push(clubId);
    } else {
      this.state.savedClubIds.splice(idx, 1);
    }
    localStorage.setItem('cc_saved_clubs', JSON.stringify(this.state.savedClubIds));
    this.notify();
  },

  isSaved(clubId) {
    return this.state.savedClubIds.includes(clubId);
  },

  setUser(user) {
    this.state.user = user;
    if (user) {
      localStorage.setItem('cc_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cc_current_user');
    }
    this.notify();
  },

  setClubs(clubs) {
    this.state.clubs = clubs;
    this.notify();
  },

  updateClubInStore(updatedClub) {
    const idx = this.state.clubs.findIndex(c => c.id === updatedClub.id);
    if (idx !== -1) {
      this.state.clubs[idx] = updatedClub;
    }
    this.notify();
  }
};
