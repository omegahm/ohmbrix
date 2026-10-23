const MS_PER_DAY = 1000 * 60 * 60 * 24;

const parseDate = (dateAsString) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateAsString.trim());
  if (match) {
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }

  const date = new Date(dateAsString);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const today = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

const nextOccurrence = (date) => {
  const start = today();
  const next = new Date(start.getFullYear(), date.getMonth(), date.getDate());
  if (next < start) {
    next.setFullYear(start.getFullYear() + 1);
  }
  return next;
};

export const calcDaysUntil = (dateAsString) => {
  const next = nextOccurrence(parseDate(dateAsString));
  return Math.round((next - today()) / MS_PER_DAY);
};

export const calcAge = (dateAsString) => {
  const date = parseDate(dateAsString);
  return nextOccurrence(date).getFullYear() - date.getFullYear();
};

export const isChristmas = (dateAsString) =>
  Boolean(dateAsString) && dateAsString.includes("12-24");
