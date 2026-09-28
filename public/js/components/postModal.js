// Instagram-Style Post Lightbox Modal
import { api } from '../api.js';
import { appStore } from '../store.js';
import { showToast } from '../utils/helpers.js';

export function renderPostModal(post, club) {
  let modal = document.getElementById('post-lightbox-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'post-lightbox-modal';
    document.body.appendChild(modal);
  }

  modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md';
  modal.innerHTML = `
    <div class="glass-modal max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] border border-slate-700 animate-fadeIn">
      
      <!-- Left: Media Display -->
      <div class="md:w-3/5 bg-black flex items-center justify-center relative overflow-hidden">
        <img 
          src="${post.imageUrl}" 
          alt="Post media" 
          class="w-full h-full max-h-[480px] md:max-h-full object-contain" 
        />
      </div>

      <!-- Right: Instagram Post Details & Caption -->
      <div class="md:w-2/5 p-6 flex flex-col justify-between bg-slate-950 overflow-y-auto">
        
        <div>
          <!-- Header -->
          <div class="flex items-center justify-between pb-4 border-b border-slate-800">
            <div class="flex items-center gap-3">
              <img src="${club.logo}" alt="${club.name}" class="w-10 h-10 rounded-full object-cover border border-slate-700" />
              <div>
                <h4 class="text-sm font-bold text-white">${club.name}</h4>
                <p class="text-[11px] text-slate-400">Posted by ${post.author || 'Club Executive'}</p>
              </div>
            </div>

            <button id="close-post-modal-btn" class="p-1 text-slate-400 hover:text-white text-lg">✕</button>
          </div>

          <!-- Caption & Content -->
          <div class="py-4 space-y-3">
            <p class="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
              ${post.caption}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 pt-2">
              ${(post.tags || []).map(t => `
                <span class="text-xs text-indigo-400 font-medium">#${t}</span>
              `).join(' ')}
            </div>

            <div class="text-[11px] text-slate-500 pt-2 font-mono">
              Published on ${post.date}
            </div>
          </div>
        </div>

        <!-- Footer: Engagement & Actions -->
        <div class="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button id="like-post-btn" class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors">
            <span>❤️</span>
            <span id="post-like-count">${post.likes || 0} Likes</span>
          </button>

          <button id="modal-apply-btn" class="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md">
            Apply to Club ↗
          </button>
        </div>

      </div>

    </div>
  `;

  // Attach modal events
  modal.querySelector('#close-post-modal-btn').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  const likeBtn = modal.querySelector('#like-post-btn');
  likeBtn.addEventListener('click', async () => {
    try {
      const res = await api.likePost(club.id, post.id);
      post.likes = res.likes;
      modal.querySelector('#post-like-count').textContent = `${res.likes} Likes`;
      showToast('Liked post!', 'success');
    } catch (e) {
      showToast('Could not like post', 'error');
    }
  });

  modal.querySelector('#modal-apply-btn').addEventListener('click', () => {
    modal.remove();
    window.openExternalForm(club.recruitment.externalUrl, club.name);
  });
}
