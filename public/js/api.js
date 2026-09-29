// Client API module
const BACKEND_URL = 'PASTE-YOUR-BACKEND-URL-HERE'; // e.g. https://campus-connect-backend.onrender.com (no slash at the end)

export const api = {
  getUserEmail() {
    try {
      const stored = localStorage.getItem('cc_user');
      if (stored) {
        const u = JSON.parse(stored);
        return u.email || '';
      }
    } catch (e) {}
    return '';
  },

  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      'x-user-email': this.getUserEmail(),
      ...(options.headers || {})
    };

    try {
      const res = await fetch(BACKEND_URL + '/api' + endpoint, {
        ...options,
        headers
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'API request failed');
      }
      return data;
    } catch (err) {
      console.error('API Error:', endpoint, err);
      throw err;
    }
  },

  async getClubs(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request('/clubs' + (query ? '?' + query : ''));
  },

  async getClubById(id) {
    return this.request('/clubs/' + id);
  },

  async updateRecruitment(id, data) {
    return this.request('/clubs/' + id + '/recruitment', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  async createPost(id, data) {
    return this.request('/clubs/' + id + '/posts', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async grantDelegate(id, data) {
    return this.request('/clubs/' + id + '/delegate', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async revokeDelegate(id, email) {
    return this.request('/clubs/' + id + '/delegate/' + encodeURIComponent(email), {
      method: 'DELETE'
    });
  },

  async likePost(id, postId) {
    return this.request('/clubs/' + id + '/like', {
      method: 'POST',
      body: JSON.stringify({ postId })
    });
  },

  async login(email) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  },

  async getUsers() {
    return this.request('/users');
  },

  async createClub(club, adminKey) {
    return this.request('/clubs', {
      method: 'POST',
      headers: adminKey ? { 'x-admin-key': adminKey } : {},
      body: JSON.stringify(club)
    });
  },

  async applyToClub(id) {
    return this.request('/clubs/' + id + '/apply', { method: 'POST' });
  },

  async resetData() {
    return this.request('/reset-data', { method: 'POST' });
  }
};
