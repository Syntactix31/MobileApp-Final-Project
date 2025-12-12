const game = document.getElementById("game");
const restartBtn = document.getElementById("restartBtn");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

let rows = [];
let speed = 2;
let gameRunning = false;
let score = 0;
let timeElapsed = 0;
let timerInterval = null;
let animationFrame = null;

function initializeRows() {
  game.innerHTML = '';
  rows = [];
  
  for (let i = 0; i < 6; i++) {
    createRow(-175 * i); 
  }
}


function createRow(startY = -175) {
  const row = document.createElement("div");
  row.classList.add("row");
  
  // Random chance for exactly one black tile per row
  const hasBlackTile = Math.random() > 0.3; // 70% chance for a black tile
  const blackIndex = hasBlackTile ? Math.floor(Math.random() * 4) : -1;

  for (let i = 0; i < 4; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.classList.add(i === blackIndex ? "black" : "white");
    tile.style.left = `${i * 25}%`;
    tile.style.top = `${startY}px`;
    row.appendChild(tile);

    tile.addEventListener("click", () => {
      if (!gameRunning) return;
      if (tile.classList.contains("black")) {
        tile.classList.remove("black");
        tile.classList.add("clicked");
        score++;
        scoreDisplay.textContent = score;
      } else {
        gameOver();
      }
    });
  }

  row.dataset.hasBlack = hasBlackTile;
  row.dataset.yPos = startY;
  
  game.appendChild(row);
  rows.push(row);
  
  return row;
}

// Move all rows downward continuously
function moveTiles() {
  if (!gameRunning) return;

  rows.forEach(row => {
    // Update position
    let currentY = parseFloat(row.dataset.yPos);
    currentY += speed;
    row.dataset.yPos = currentY;
    
    [...row.children].forEach(tile => {
      tile.style.top = `${currentY}px`;
    });
    
    // Check if row has moved off screen
    if (currentY > 700) {
      // Reset this row to the top with new random tiles
      resetRow(row);
    }
  });

  animationFrame = requestAnimationFrame(moveTiles);
}

function resetRow(row) {
  // Reset position to top
  const newY = -175;
  row.dataset.yPos = newY;
  
  // Generate new random black tile
  const hasBlackTile = Math.random() > 0.3;
  const blackIndex = hasBlackTile ? Math.floor(Math.random() * 4) : -1;
  
  // Update all tiles in this row
  [...row.children].forEach((tile, index) => {
    tile.style.top = `${newY}px`;
    tile.className = 'tile'; 
    tile.classList.add(index === blackIndex ? "black" : "white");
    
    
    tile.classList.remove("clicked");
  });
  
  row.dataset.hasBlack = hasBlackTile;
}

// Timer functions
function startTimer() {
  timeElapsed = 0;
  timerInterval = setInterval(() => {
    timeElapsed++;
    timerDisplay.textContent = timeElapsed;
    
    // Gradually increase speed
    if (timeElapsed % 10 === 0) {
      speed += 0.5;
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function gameOver() {
  gameRunning = false;
  stopTimer();
  cancelAnimationFrame(animationFrame);
  // alert(`🎵 Game Over 🎵\nFinal Score: ${score}\nTime: ${timeElapsed}s`);
}

function startGame() {
  // Reset everything
  score = 0;
  scoreDisplay.textContent = 0;
  timerDisplay.textContent = 0;
  speed = 2;
  gameRunning = true;
  
  stopTimer();
  startTimer();

  
  initializeRows();

  cancelAnimationFrame(animationFrame);
  moveTiles();
}

restartBtn.addEventListener("click", startGame);
startGame();