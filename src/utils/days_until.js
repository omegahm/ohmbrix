export function calcDaysUntil(date) {
  date = new Date(date);
  date.setFullYear(new Date().getFullYear());

  let diff = date.getTime() - new Date().getTime();
  if (diff < 0) {
    date.setFullYear(new Date().getFullYear() + 1);
    diff = date.getTime() - new Date().getTime();
  }

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
