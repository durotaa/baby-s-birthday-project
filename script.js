const photos = ["photo-1.jpg", "photo-2.jpg", "photo-3.jpg", "photo-4.jpg", "photo-5.jpg"];
const photoLayer = document.querySelector("#photos");
const confettiLayer = document.querySelector("#confetti");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let readyPhotos = [];

function randomBetween(min, max) { return Math.random() * (max - min) + min; }

function addPhoto() {
  const photo = document.createElement("img");
  photo.className = "photo";
  if (!readyPhotos.length) return;
  photo.src = readyPhotos[Math.floor(Math.random() * readyPhotos.length)];
  photo.alt = "";
  // Keep the centre clear so the birthday note is always readable.
  let left = randomBetween(1, 83);
  let top = randomBetween(4, 76);
  if (left > 22 && left < 65 && top > 22 && top < 63) left = Math.random() > .5 ? randomBetween(68, 84) : randomBetween(1, 17);
  photo.style.left = `${left}%`;
  photo.style.top = `${top}%`;
  photo.style.setProperty("--tilt", `${randomBetween(-12, 12)}deg`);
  photo.style.setProperty("--life", `${randomBetween(4.8, 7.2)}s`);
  // A missing or slow image should never leave an empty photo frame onscreen.
  photo.addEventListener("error", () => photo.remove(), { once: true });
  photoLayer.append(photo);
  window.setTimeout(() => photo.remove(), 7400);
}

function addConfetti(count = 55) {
  const colors = ["#ff5a9f", "#ffcf3d", "#ae6cff", "#ff9fc9", "#5bceef"];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("i");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.top = `${randomBetween(-100, 98)}vh`;
    piece.style.background = colors[i % colors.length];
    piece.style.setProperty("--duration", `${randomBetween(6, 14)}s`);
    piece.style.animationDelay = `${randomBetween(-13, 0)}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    confettiLayer.append(piece);
  }
}

function preloadPhotos() {
  return Promise.all(photos.map((name) => new Promise((resolve) => {
    const image = new Image();
    const source = `assets/${name}?v=2`;
    image.onload = () => { readyPhotos.push(source); resolve(); };
    image.onerror = resolve;
    image.src = source;
  })));
}

addConfetti();
preloadPhotos().then(() => {
  if (reduceMotion) return;
  addPhoto();
  window.setTimeout(addPhoto, 900);
  window.setInterval(addPhoto, 1450);
});

document.querySelector("#surprise").addEventListener("click", () => {
  addConfetti(28);
  for (let i = 0; i < 4; i++) window.setTimeout(addPhoto, i * 180);
});
