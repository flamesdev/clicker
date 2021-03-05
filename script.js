let points;
let pointsPerClick;
let consecutiveClicks;
let ascension = 0;
let didWin = false;
const GOAL = 100000;

function resetLevel() {
  points = 0;
  pointsPerClick = 1;
  consecutiveClicks = 0;
}

resetLevel();

function update() {
  if (didWin) {
    header.innerHTML = '🏆';
    subheader.hidden = true;
  } else {
    header.innerHTML = points;
    subheader.innerHTML = `+${pointsPerClick} ｜ ${Math.floor(
      (points / GOAL) * 100
    )}% ｜ ${ascension}a`;
  }
}

window.addEventListener('load', update);
window.addEventListener('click', () => {
  if (!didWin) {
    points += pointsPerClick;

    if (points >= GOAL) {
      resetLevel();
      ascension++;

      if (ascension >= 20) {
        didWin = true;
      }
    } else {
      consecutiveClicks += 2 ** ascension;

      const THRESHOLD = 10;
      if (consecutiveClicks >= THRESHOLD) {
        pointsPerClick += Math.floor(consecutiveClicks / THRESHOLD);
        consecutiveClicks %= THRESHOLD;
      }
    }

    update();
  }
});
