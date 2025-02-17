let score = JSON.parse(localStorage.getItem('score')) || { 
  wins: 0,
  losses: 0,
  ties: 0
}; //if left side is null, use default value on the right side

let gamesPlayed = score.wins + score.losses + score.ties;
let playerMoveSaved = 'scissors';

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function displayGameResult(param) {
  document.querySelector('.js-game-result')
    .innerHTML = `
      <p class="result-message-p">${param}</p>
    `;
}

function autoPlay() {
  if (!isAutoPlaying) {
    document.querySelector('.js-auto-play-button')
      .innerHTML = 'Stop Playing';
    intervalId = setInterval(() => { //saving interval id in a variable
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId); //cancels setInterval, by identifying id
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-button')
      .innerHTML = 'Auto Play';
  } 
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => { //if we just call playGame, it will return a value. That's why we have to create an actual function where we can call it
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
    displayWarning();
  });

function displayWarning() {
  document.querySelector('.js-reset-warning')
    .innerHTML = `
  <p class="warning-p">Are you sure you want to reset the score?</p>
  <button class="js-yes-button warning-btn">Yes</button>
  <button class="js-no-button warning-btn">No</button>
  `;

  document.querySelector('.js-yes-button')
    .addEventListener('click', () => {
      resetScore();
      hideWarning();
  });

  document.querySelector('.js-no-button')
    .addEventListener('click', () => {
      hideWarning();
  });
}

function hideWarning() {
  document.querySelector('.js-reset-warning')
    .innerHTML = '';
}

function resetScore() {
  score.losses = 0;
  score.wins = 0;
  score.ties = 0;

  localStorage.removeItem('score');
  updateScoreElement();
}

document.querySelector('.js-auto-play-button')
  .addEventListener('click', () => {
    autoPlay();
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r' || event.key === 'R') {
    playGame('rock');
  } else if (event.key === 'p' || event.key === 'P') {
    playGame('paper');
  } else if (event.key === 's' || event.key === 'S') {
    playGame('scissors');
  } else if (event.key === 'a' || event.key === 'A') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    displayWarning();
  }
});

function removeClass() {
  document.getElementById("js-result-id").classList.remove("you-lose-red");
  document.getElementById("js-result-id").classList.remove("you-win-green");
}

function playGame(playerMove) {
  let computerMove = playerMoveSaved;

  if (gamesPlayed === 0) {
    computerMove = 'scissors';
  }

  if (gamesPlayed === 3 || gamesPlayed === 6 || gamesPlayed === 9 || gamesPlayed === 12 || gamesPlayed === 15 || gamesPlayed === 18 || gamesPlayed === 21) {
    computerMove = pickComputerMove();
    console.log('yo');
  }

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
    result = 'You lose.';
    } else if(computerMove === 'paper') {
      result = 'You win.';
    } else if(computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if(playerMove === 'paper') {
      if (computerMove === 'rock') {
    result = 'You win.';
    } else if(computerMove === 'paper') {
      result = 'Tie.';
    } else if(computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if(playerMove === 'rock') {
      if (computerMove === 'rock') {
    result = 'Tie.';
    } else if(computerMove === 'paper') {
      result = 'You lose.';
    } else if(computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
    removeClass();
    document.getElementById("js-result-id").classList.add("you-win-green");
  } else if (result === 'You lose.') {
    score.losses += 1;
    removeClass();
    document.getElementById("js-result-id").classList.add("you-lose-red");
  } else if (result === 'Tie.') {
    score.ties += 1;
    removeClass();
  }

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `You
  <img src="img/${playerMove}-emoji.png" class="move-icon">
  <img src="img/${computerMove}-emoji.png" class="move-icon">
  Computer`;

  playerMoveSaved = playerMove;

  if (score.wins === 5) {
    displayGameResult('Okay..You have won this time..');
    document.querySelector('.js-game-result').classList.add('you-win-green');
  }
  
  if (score.losses === 5) {
    displayGameResult('Haha! Loser!');
    document.querySelector('.js-game-result').classList.add('you-lose-red');
  }
  
  updateScoreElement();
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}`;

  gamesPlayed = score.wins + score.losses + score.ties;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;//ends the function immideately and gets a value out of the function. For example, return made this variable to represent the function to avoid the scope rule
}
