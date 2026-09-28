// UI and formatting helpers
export function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const bgClass = type === 'success' ? 'bg-emerald-800 text-white' : (type === 'info' ? 'bg-slate-900 text-white' : 'bg-red-800 text-white');
  
  toast.className = `px-4 py-3 rounded-2xl shadow-xl border border-slate-700 ${bgClass} text-xs font-semibold flex items-center gap-2 transform transition-all duration-300 animate-fade-in pointer-events-auto`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : (type === 'info' ? 'ℹ' : '⚠')}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

export function openExternalModal(club) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const url = club.recruitment?.externalUrl || 'https://forms.gle/demo';

  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in';
  modal.innerHTML = `
    <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 text-center relative">
      <button id="close-ext-modal" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2">✕</button>
      
      <div class="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto text-xl font-bold mb-4 shadow-md">
        cc
      </div>
      
      <h3 class="text-lg font-bold text-slate-900">Apply to ${club.name}</h3>
      <p class="text-xs text-slate-500 mt-1">Official External Recruitment Form</p>

      <div class="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
        <p class="font-semibold text-slate-800 flex items-center gap-1.5">
          <span class="text-emerald-600">●</span> Discovery Layer Notice:
        </p>
        <p class="text-slate-600 text-[11px] leading-relaxed">
          As designed in the Campus Connect PRD, our platform centralizes discovery and deadlines. Applications are processed directly through the club's own official form.
        </p>
        <div class="pt-1 text-[11px] text-slate-400 font-mono break-all">
          Destination: <span class="text-indigo-600">${url}</span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button id="cancel-ext-btn" class="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold">
          Back
        </button>
        <a 
          href="${url}" 
          target="_blank" 
          rel="noopener noreferrer" 
          id="confirm-ext-btn" 
          class="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-md flex items-center justify-center gap-1.5"
        >
          <span>Open Form</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  `;

  modalContainer.innerHTML = '';
  modalContainer.appendChild(modal);

  modal.querySelector('#close-ext-modal').addEventListener('click', () => modalContainer.innerHTML = '');
  modal.querySelector('#cancel-ext-btn').addEventListener('click', () => modalContainer.innerHTML = '');
  modal.querySelector('#confirm-ext-btn').addEventListener('click', () => {
    modalContainer.innerHTML = '';
    showToast('Redirected to official club registration form', 'info');
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modalContainer.innerHTML = '';
  });
}
