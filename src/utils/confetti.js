import confetti from "canvas-confetti";

import { calcDaysUntil, isChristmas } from "./days_until";

const DAYS_BEFORE = 30;

const BIRTHDAY_CHARS = ["🇩🇰", "🎂", "🎉"];
const CHRISTMAS_CHARS = ["🎄", "🎅🏻", "❄️", "⛄️"];

export const celebrate = (people) => {
  const upcoming = people.filter(
    (person) => person.birthday && calcDaysUntil(person.birthday) < DAYS_BEFORE
  );

  const chars = new Set();
  upcoming.forEach((person) => {
    const personChars = isChristmas(person.birthday)
      ? CHRISTMAS_CHARS
      : BIRTHDAY_CHARS;
    personChars.forEach((char) => chars.add(char));
  });

  if (chars.size === 0) {
    return;
  }

  const shapes = [...chars].map((text) =>
    confetti.shapeFromText({ text, scalar: 3 })
  );

  const fire = confetti.create(document.querySelector("#confetti"), {
    resize: true,
    useWorker: false,
    disableForReducedMotion: true,
  });

  fire({
    particleCount: 200,
    angle: -90,
    spread: 135,
    ticks: 400,
    origin: { x: 0.5, y: -0.3 },
    shapes,
    scalar: 3,
  });
};
