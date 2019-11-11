const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const scoreboard = {
  player: 0,
  computer: 0
}

// Play game
function play(e) {
  restart.style.display = 'inline-block';
  const playerChoice = e.target.id;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);
  showWinner(winner, computerChoice);
}

// Get computer's choice
function getComputerChoice() {
  const random = Math.random();
  if (random < 0.34) {
    return 'rock';
  } else if (random <= 0.67) {
    return 'paper';
  } else {
    return 'scissors';
  }
}

// Get game winner
function getWinner(player, computer) {
  if (player === computer) {
    return 'draw';
  } else if (player === 'rock') {
    if (computer === 'paper') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (player === 'paper') {
    if (computer === 'scissors') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (player === 'scissors') {
    if (computer === 'rock') {
      return 'computer';
    }
    else {
      return 'player';
    }
  }
}

function showWinner(winner, computerChoice) {
  if (winner === 'player') {
    // Increment player score
    scoreboard.player++;
    // Show modal result
    result.innerHTML = `
      <h1 class="text-win">You win</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer chose <strong>${computerChoice}</strong>
    `;
  } else if (winner === 'computer') {
    // Increment computer score
    scoreboard.computer++;
    // Show modal result
    result.innerHTML = `
      <h1 class="text-lose">You lose</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer chose <strong>${computerChoice}</strong>
    `;
  } else {
    result.innerHTML = `
      <h1>It's a draw</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer chose <strong>${computerChoice}</strong>
    `;
  }

  // Show score
  score.innerHTML = `
    <p>Player: ${scoreboard.player}</p>
    <p>Computer: ${scoreboard.computer}</p>
  `;

  modal.style.display = 'block';
}

// Restart game
function restartGame(){
  scoreboard.player = 0;
  scoreboard.computer = 0;
  score.innerHTML = `
    <p>Player: ${scoreboard.player}</p>
    <p>Computer: ${scoreboard.computer}</p>
  `;
}

// Clear modal
function clearModal(e){
  if(e.target == modal){
    modal.style.display = 'none';
  }
}

// Event Listeners
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);