// Countdown utility for live deadline tracking
export function calculateTimeRemaining(targetDateStr) {
  const target = new Date(targetDateStr).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalHours: 0,
      isExpired: true,
      text: 'Registration Closed',
      urgency: 'closed'
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  const totalHours = diff / (1000 * 60 * 60);

  let urgency = 'normal';
  let text = '';

  if (totalHours <= 24) {
    urgency = 'critical';
    text = `Closes in ${hours}h ${minutes}m ${seconds}s`;
  } else if (totalHours <= 48) {
    urgency = 'urgent';
    text = `Closes in ${days}d ${hours}h ${minutes}m`;
  } else {
    urgency = 'normal';
    text = `${days} days remaining`;
  }

  return {
    days,
    hours,
    minutes,
    seconds,
    totalHours,
    isExpired: false,
    text,
    urgency
  };
}

export function formatUrgencyBadge(targetDateStr) {
  const remaining = calculateTimeRemaining(targetDateStr);
  if (remaining.isExpired) {
    return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-800 text-gray-400 border border-gray-700">
      <span class="w-2 h-2 rounded-full bg-gray-500"></span>
      Closed
    </span>`;
  }

  if (remaining.urgency === 'critical') {
    return `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-950/80 text-red-300 border border-red-500/80 urgency-pulse shadow-lg shadow-red-900/30">
      <span class="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
      🚨 Final Hours: ${remaining.hours}h ${remaining.minutes}m ${remaining.seconds}s
    </span>`;
  }

  if (remaining.urgency === 'urgent') {
    return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-950/70 text-amber-300 border border-amber-500/50">
      <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
      ⏳ ${remaining.text}
    </span>`;
  }

  return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-950/70 text-indigo-300 border border-indigo-500/40">
    <span class="w-2 h-2 rounded-full bg-indigo-400"></span>
    🗓️ ${remaining.text}
  </span>`;
}
