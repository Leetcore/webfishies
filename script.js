// build random decoration stuff
// id bowl

const bowl = document.getElementById('bowl');
const width = document.body.clientWidth;
const height = document.body.clientHeight;

for (var index = 0; index < 30; index++) {
  placePlant();
}


// game timer
function update() {
  // move fishes
  
  
  // check stuff, move fishs based on mood
 
  
  // check fish collision
  
  
  setTimeout(update, 50);
}

function placePlant() {
  bowl.insertAdjacentHTML('beforeend', '<div class="plant" style="left: '+ random(-50, width) +'px"><img src="https://cdn.glitch.com/28094231-6f5f-4454-8cf5-27a652c30413%2Fplant1.svg"/></div>');
}

// add random fishs
function fish() {
  this.size = random(10, 300);
  this.color = '#' + random(0,9) + random(0,9) + random(0,9);
  this.mood = moods[random(0, moods.length)];
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