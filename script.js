

const buttons = document.querySelectorAll("button");
const resultInfo = document.querySelector("#result-info");
const winnerInfo = document.querySelector("#winner");
const drawInfo = document.querySelector("#draw");

let escolhaPessoa = "";
let playerWinCount = 0;
let computerWinCount = 0;

const POSSIBLE_CHOICES = ['rock', 'papper', 'scissor'];

let finishGame = false;

let updateInfo = () =>{
    resultInfo.textContent = `Jogador: ${playerWinCount} | Computador: ${computerWinCount}`;
}

updateInfo();

let getRandomNumber = (min_Value, max_Value) => {
    min_Value = Math.ceil(min_Value);
    max_Value+=1;
    max_Value = Math.floor(max_Value);
    return Math.floor(Math.random() * (max_Value-min_Value)+min_Value);
}

let computerChoice = () => {return POSSIBLE_CHOICES[getRandomNumber(0,2)]}

buttons.forEach((botao) =>{
    botao.addEventListener('click', (e) =>{
        let pcChoice = computerChoice();
        let userChoice = botao.id;
        if (!finishGame) runGame(userChoice, pcChoice);
    })
})



let runGame = (escolhaUsuario, escolhaPC) =>{
    if (escolhaUsuario ==="rock" && escolhaPC==="scissor" || 
        escolhaUsuario ==="papper" && escolhaPC==="rock" || 
        escolhaUsuario==="scissor" && escolhaPC ==="papper"){
            playerWin();
        }else if (escolhaPC === escolhaUsuario){
            draw()
        }else{
            pcWin();
        }
}

let endGame = (winner = "default") =>{
    winnerInfo.textContent=`The winner is: ${winner}`;
    finishGame = true;
}

let draw = () => { drawInfo.textContent="Empate!"}

let playerWin = ()=> {
    playerWinCount+=1;
    drawInfo.textContent="";
    updateInfo();
    if (playerWinCount == 5){
        endGame("Player");
    }
}

let pcWin = () => {
    computerWinCount+=1;
    updateInfo();
    drawInfo.textContent="";
    if (computerWinCount == 5){
        endGame("Computer");
    }
}