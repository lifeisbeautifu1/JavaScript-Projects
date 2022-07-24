const choices = document.querySelectorAll('.choice');
const score = document.querySelector('#score');
const result = document.querySelector('#result');
const restart = document.querySelector('#restart');
const modal = document.querySelector('.modal');

const scoreboard = {
    player: 0,
    computer: 0,
}

function play(e) {
    restart.style.display = "inline-block";
    const playerChoice = e.target.id;
    const computerChoice = getComputerChoice();
    console.log(playerChoice, computerChoice);
    const winner = getWinner(playerChoice, computerChoice);
    console.log(winner);
    showWinner(winner, computerChoice);
}


function getComputerChoice() {
    const rand = Math.random();
    if (rand < 0.34) {
        return 'rock';
    } else if (rand <= 0.67) {
        return 'paper';
    } else {
        return 'scissors';
    }
}

function getWinner(p,c) {
    if (p == c) {
        return 'draw';
    } else if(p == 'rock') {
        if (c == 'paper') {
            return 'lose';
        } else {
            return 'win';
        }
    } else if (p == 'paper') {
        if (c == 'scissors') {
            return 'lose';
        } else {
            return 'win';
        }
    } else {
        if (c == 'rock') {
            return 'lose';
        } else {
            return 'win';
        }
    }
}

function showWinner(winner, computerChoice) {
    if (winner == 'win') {
        scoreboard.player++;
        result.innerHTML = `
            <h1 class="text-win">You win!</h1>
            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
            <p>Computer Chose <strong>${computerChoice[0].toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;
    } else if (winner == 'lose'){
        scoreboard.computer++;
        result.innerHTML = `
            <h1 class="text-lose">You lose!</h1>
            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
            <p>Computer Chose <strong>${computerChoice[0].toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;
    } else {
    
        result.innerHTML = `
            <h1>It's a draw!</h1>
            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
            <p>Computer Chose <strong>${computerChoice[0].toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;
    }

    score.innerHTML = `
    <p>Player: ${scoreboard.player}</p>
    <p>Computer: ${scoreboard.computer}</p>`;

    modal.style.display = 'block';
}

choices.forEach((choice) => {
    choice.addEventListener('click', play);
});

window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
})

restart.addEventListener('click', () => {

    scoreboard.player = 0;
    scoreboard.computer = 0;
    score.innerHTML = `
    <p>Player: ${scoreboard.player}</p>
    <p>Computer: ${scoreboard.computer}</p>`;
});