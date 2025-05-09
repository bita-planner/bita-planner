const schedule = [
  { label: 'بلوک 1', start: '08:00', end: '09:30' },
  { label: 'استراحت 1', start: '09:30', end: '09:45' },
  { label: 'بلوک 2', start: '09:45', end: '11:15' },
  { label: 'استراحت 2', start: '11:15', end: '11:30' },
  { label: 'بلوک 3', start: '11:30', end: '13:00' },
  { label: 'استراحت 3', start: '13:00', end: '13:15' },
  { label: 'بلوک 4', start: '13:15', end: '14:45' },
  { label: 'ناهار', start: '14:45', end: '15:30' },
  { label: 'بلوک 5', start: '15:30', end: '17:00' },
  { label: 'استراحت 4', start: '17:00', end: '17:15' },
  { label: 'بلوک 6', start: '17:15', end: '18:45' },
  { label: 'استراحت 5', start: '18:45', end: '19:00' },
  { label: 'بلوک 7', start: '19:00', end: '20:30' },
  { label: 'شام', start: '20:30', end: '21:00' },
  { label: 'بلوک 8', start: '21:00', end: '23:00' },
];
const toMinutes = t => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};
const tbody = document.querySelector('#schedule-table tbody');
schedule.forEach((item, idx) => {
  const tr = document.createElement('tr');
  tr.id = 'row-' + idx;
  tr.innerHTML = `<td>${item.start}</td><td>${item.end}</td><td>${item.label}</td>`;
  tbody.appendChild(tr);
});
let lastIdx = -1;
let audioAllowed = false;
function update() {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
  let current = null;
  schedule.forEach((item, idx) => {
    const startMin = toMinutes(item.start);
    const endMin = toMinutes(item.end);
    if (nowMin >= startMin && nowMin < endMin) {
      current = { ...item, idx, startMin, endMin };
    }
    document.getElementById('row-' + idx).classList.remove('active');
  });
  if (current) {
    document.getElementById('row-' + current.idx).classList.add('active');
    const remainSec = Math.floor((current.endMin - nowMin) * 60);
    const hrs = String(Math.floor(remainSec / 3600)).padStart(2, '0');
    const mins = String(Math.floor((remainSec % 3600) / 60)).padStart(2, '0');
    const secs = String(remainSec % 60).padStart(2, '0');
    document.getElementById('timer').textContent = `${hrs}:${mins}:${secs}`;
    const total = (current.endMin - current.startMin) * 60;
    const done = total - remainSec;
    const percent = Math.min(100, Math.max(0, (done / total) * 100));
    document.getElementById('progress').style.width = percent + '%';
    if (audioAllowed && current.idx !== lastIdx) {
      document.getElementById('notify-sound').play().catch(e => {});
      lastIdx = current.idx;
    }
  } else {
    document.getElementById('timer').textContent = '--:--:--';
    document.getElementById('progress').style.width = '0';
    lastIdx = -1;
  }
}
document.getElementById('start-btn').addEventListener('click', () => {
  audioAllowed = true;
  document.getElementById('start-btn').style.display = 'none';
  update();
  setInterval(update, 1000);
});