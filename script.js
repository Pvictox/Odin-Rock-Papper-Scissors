

const buttons = document.querySelectorAll("button");
const resultInfo = document.querySelector("#result-info");
const winnerInfo = document.querySelector("#winner");
const drawInfo = document.querySelector("#draw");
const resultRoundInfo = document.querySelector("#result-round-info");
const choosePaper = document.querySelector("#choose-paper");
const chooseRock = document.querySelector("#choose-rock");

const chooseScissor = document.querySelector("#choose-scissor");

let escolhaPessoa = "";
let playerWinCount = 0;
let computerWinCount = 0;

const POSSIBLE_CHOICES = ['rock', 'paper', 'scissor'];

let finishGame = false;
let choosedInfoToggle = false;

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
        if (choosedInfoToggle){
            clearChoose();
            resultRoundInfo.textContent="";
        }
        let pcChoice = computerChoice();
        let userChoice = botao.id;
        if (!finishGame){
            updateChooseItem(userChoice, "Player");
            updateChooseItem(pcChoice, "PC")
            runGame(userChoice, pcChoice);

        }
    })
})

let capitalize = (string_value) => {
    let primeira_maiuscula = string_value[0].toUpperCase();
    string_value = string_value.toLowerCase();
    retorno_String = string_value.replace(string_value[0], primeira_maiuscula);
    return retorno_String;
}

let updateChooseItem = (choice, username) =>{
    if (choice ==="rock"){
        chooseRock.textContent+="|"+username+"|";
    }else if (choice==="paper"){
        choosePaper.textContent+="|"+username+"|";
    }else{
        chooseScissor.textContent+="|"+username+"|";
    }
    choosedInfoToggle=true;
}

let runGame = (escolhaUsuario, escolhaPC) =>{
    if (escolhaUsuario ==="rock" && escolhaPC==="scissor" || 
        escolhaUsuario ==="paper" && escolhaPC==="rock" || 
        escolhaUsuario==="scissor" && escolhaPC ==="paper"){
            updateResultInfo("Player", escolhaUsuario, escolhaPC);
            playerWin();
        }else if (escolhaPC === escolhaUsuario){
            draw()
        }else{
            updateResultInfo("PC", escolhaPC, escolhaUsuario);
            pcWin();
        }
}

let clearChoose = () => {
    choosePaper.textContent="";
    chooseRock.textContent="";
    chooseScissor.textContent="";
}

let endGame = (winner = "default") =>{
    resultRoundInfo.textContent="";
    winnerInfo.textContent=`The winner is: ${winner}`;
    finishGame = true;
}

let draw = () => { drawInfo.textContent="Empate!"}

let updateResultInfo = (winnerName, winnerChoose, loserChoose) =>{
    resultRoundInfo.textContent="";
    winnerCap = capitalize(winnerChoose);
    loserCap = capitalize(loserChoose);
    resultRoundInfo.textContent=`${winnerCap} beats ${loserCap}. ${winnerName} wins the round!`;
    let htmlWinner = resultRoundInfo.innerHTML.replace(`${winnerCap}`, `<span id = "winner-span">${winnerCap} </span>`);
    htmlWinner = htmlWinner.replace(`${loserCap}`, `<span id = "loser-span">${loserCap}</span>`);
    htmlWinner = htmlWinner.replace(`${winnerName}`, `<span id=winner-name-span>${winnerName}</span>`);
    console.log(htmlWinner);
    resultRoundInfo.innerHTML = htmlWinner;
    /*resultRoundInfo.innerHTML=htmlLoser;*/
}

let playerWin = ()=> {
    playerWinCount+=1;
    drawInfo.textContent="";
    updateInfo();
    /*clearChoose();*/
    if (playerWinCount == 5){
        endGame("Player");
    }
}

let pcWin = () => {
    computerWinCount+=1;
    updateInfo();
    /*clearChoose();*/
    drawInfo.textContent="";
    if (computerWinCount == 5){
        endGame("Computer");
    }
}