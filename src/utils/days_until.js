export const calcDaysUntil = (dateAsString) => {
  const date = new Date(dateAsString);
  date.setFullYear(new Date().getFullYear());

  let diff = date.getTime() - new Date().getTime();
  if (diff < 0) {
    date.setFullYear(new Date().getFullYear() + 1);
    diff = date.getTime() - new Date().getTime();
  }

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const calcAge = (dateAsString) => {
  const date = new Date(dateAsString);
  const today = new Date();
  const birthdayThisYear = new Date(dateAsString).setFullYear(
    today.getFullYear()
  );

  if (birthdayThisYear > today) {
    return today.getFullYear() - date.getFullYear();
  } else {
    return today.getFullYear() - date.getFullYear() + 1;
  }
};
