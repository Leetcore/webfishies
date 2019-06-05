// build random decoration stuff
// id bowl

const bowl = document.getElementById('bowl');
const underground = document.getElementById('underground');
const width = document.body.clientWidth;
const height = document.body.clientHeight;

for (var index = 0; index < 20; index++) {
  placePlant('🌱');
  placePlant('🌿');
}

for (var index = 0; index < 10; index++) {
  createFish('🐟');
}


// game timer
function update() {
  // move fishes
  var allFish = document.querySelectorAll('fish');
  
  allFish.forEach(fish => {
    // new position
    var left = random(0, width);
    if (parseInt(fish.style.left) > left) {
      fish.classList.addClass('flip');
    } else {
      fish.classList.removeClass('flip');
    }
  });
  
  // check stuff, move fishs based on mood
 
  
  // check fish collision
  
  
  setTimeout(update, 50);
}

function placePlant(emoji) {
  underground.insertAdjacentHTML('beforeend', `<div
    class="plant"
    style="left: ${random(-50, width)}px;
      bottom: ${random(-20, 150)}px;">
    ${emoji}
  </div>`);
}
  
function createFish(emoji) {
  bowl.insertAdjacentHTML('beforeend', `<div
    class="fish"
    style="left: ${random(10, width)}px;
      top: ${random(10, 150)}px;">
    ${emoji}
  </div>`);
}

const moods = [
  'angry',
  'friendly',
  'calm'
]

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min; 
}

update();