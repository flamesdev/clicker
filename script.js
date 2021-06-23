let points;
let pointsPerClick;
let consecutiveClicksCount;
let ascensionLevel = 0;
let didWin = false;
const GOAL = 100_000;

function resetLevel() {
  points = 0;
  pointsPerClick = 1;
  consecutiveClicksCount = 0;
}

resetLevel();

function update() {
  if (didWin) {
    header.innerHTML = '🏆';
    subheader.hidden = true;
    return;
  }

  header.innerHTML = points;
  subheader.innerHTML = `+${pointsPerClick} ｜ ${Math.floor(
    (points / GOAL) * 100
  )}% ｜ ${ascensionLevel}a`;
}

window.addEventListener('load', update);

function onClick() {
  if (didWin) {
    return;
  }

  points += pointsPerClick;

  if (points >= GOAL) {
    resetLevel();
    ascensionLevel++;

    if (ascensionLevel >= 20) {
      didWin = true;
      window.removeEventListener('click', onClick);
    }
  } else {
    consecutiveClicksCount += 2 ** ascensionLevel;

    const THRESHOLD = 10;
    if (consecutiveClicksCount >= THRESHOLD) {
      pointsPerClick += Math.floor(consecutiveClicksCount / THRESHOLD);
      consecutiveClicksCount %= THRESHOLD;
    }
  }

  update();
}

window.addEventListener('click', onClick);
