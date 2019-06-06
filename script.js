// create stuff
const bowl = document.getElementById('bowl');
const underground = document.getElementById('underground');
let width = document.body.clientWidth;
let height = document.body.clientHeight;

function resize() {
  width = document.body.clientWidth;
  height = document.body.clientHeight;
}

function setup() {
  document.getElementById('underground').innerHTML = '';
  var placeRandomPlantCounter = random(1, 3);
  for (var index = 0; index < placeRandomPlantCounter; index++) {
    placePlant('🐚', random(150, 300));
    placePlant('🌸', random(150, 300));
    placePlant('☘️', random(100, 200));
    placePlant('🍄', random(80, 120));
  }

  for (var index = 0; index < 20; index++) {
    placePlant('🌱', random(450, 550));
    placePlant('🌿', random(350, 400));
  }
}

function addFishs() {
  // normal fishies
  for (var index = 0; index < 10; index++) {
    setTimeout(() => {
      createEmoji('🐟', random(200, 300));
      createEmoji('🐠', random(200, 450));
    }, random(0, 3000));
  }

  // special ones
  for (var index = 0; index < 3; index++) {
    setTimeout(() => {
      createEmoji('🐙', 500);
      createEmoji('🐡', 250);
      // bottom stuff
      createEmoji('🦀', 250, 'ground', 0, height - 250);
      createEmoji('🐌', 200, 'ground', 0, height - 200);
    }, random(1000, 5000));
  }

  // save props
  var allFish = document.querySelectorAll('.fish');
  allFish.forEach(fish => {
    fish.data = {};
    fish.data.moving = false;
  });
}
setup();
addFishs();
update();

// game timer
function update() {
  // move fishes
  var allFish = document.querySelectorAll('.fish');
  allFish.forEach(fish => {
    if (fish.data.moving === false && random(0, 2) == 0) {
      // new position
      var left = random(0, width);
      var top = random(0, height - 200);
      automaticFlip(fish, left);
      fish.style.left = left +'px';
      fish.style.top = top +'px';
      fish.data.moving = true;
      setTimeout(() => {
        fish.data.moving = false;
      }, random(30000, 60000));
    }
  });

  // move bottom things
  var allOnGround = document.querySelectorAll('.ground');
  allOnGround.forEach(troup => {
    if (troup.data.moving === false) {
      // new position
      var left = parseInt(troup.style.left) + random(-200, 200);
      var top = parseInt(troup.style.top) + random(-10, 10);
      automaticFlip(troup, left, true);
      troup.style.left = left +'px';
      troup.style.top = top +'px';
      troup.data.moving = true;
      setTimeout(() => {
        troup.data.moving = false;
      }, random(60000, 120000));
    }
  });

  // move droplets down
  var droplets = document.querySelectorAll('.droplet');
  droplets.forEach(drop => {
    if (drop.data.moving === false) {
      drop.style.top = (height + 10) +'px';
      drop.data.moving = true;
    }
    if (drop.offsetTop >= height) {
      drop.remove();
    }
  });

  // new droplets
  if (random(0, 30) == 0) {
    createEmoji('💧', random(20, 500), 'droplet', random(0, width), -50);
  }

  setTimeout(update, 1000);
}

function placePlant(emoji, size) {
  var id = random(0, 99999999);
  underground.insertAdjacentHTML('beforeend', `<div
    class="plant"
    id="${id}"
    style="left: ${random(-50, width)}px;
      bottom: ${random(1, 90)}%;
      font-size: ${size || 500}%;">
    ${emoji}
  </div>`);

  // add speed
  var plant = document.getElementById(id);
  if (random(0, 1) == 0) {
    plant.classList.add('flip');
  }
}

function automaticFlip(fish, left, reverse) {
  if (parseInt(fish.style.left) < left && !reverse) {
    fish.classList.add('flip');
  } else {
    fish.classList.remove('flip');
  }
}

function createEmoji(emoji, size, css, positionX, positionY) {
  // create emoji
  var id = random(0, 99999999);
  bowl.insertAdjacentHTML('beforeend', `<div
    class="${css || 'fish'}"
    id="${id}"
    style="left: ${positionX || random(10, width)}px;
      top: ${positionY || random(10, 150)}px;
      font-size: ${size || 200}%;">
    ${emoji}
  </div>`);

  // add speed
  var fish = document.getElementById(id);
  if (random(0, 2) == 0) {
    fish.classList.add('fast');
  } else {
    fish.classList.add('slow');
  }

  // save props
  fish.data = {};
  fish.data.moving = false;
}

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}

function isCollide(a, b) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}
