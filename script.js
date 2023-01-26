const POSSIBLE_CHOICES = [];
POSSIBLE_CHOICES.push("Rock", "Paper", "Scissors");

//Retorna um valor aleatório entre min_value e max_value
let getRandomNumber = (min_Value, max_Value) => {
    min_Value = Math.ceil(min_Value);
    max_Value+=1;
    max_Value = Math.floor(max_Value);
    return Math.floor(Math.random() * (max_Value-min_Value)+min_Value);
}

let computer_choice = () => POSSIBLE_CHOICES[getRandomNumber(0,2)];

let capitalize = (string_value) => {
    let primeira_maiuscula = string_value[0].toUpperCase();
    string_value = string_value.toLowerCase();
    retorno_String = string_value.replace(string_value[0], primeira_maiuscula);
    return retorno_String;
}
let player_choice = () => {
    let isValidChoice = false;
    let choice = "";
    while(isValidChoice == false){
        choice = prompt("Qual a sua escolha?");
        choice = capitalize(choice);
        POSSIBLE_CHOICES.forEach((possible_choice) => {
            if (possible_choice === choice){
                isValidChoice = true;
            }
        })   
        if (isValidChoice == false) console.log("Entrada Inválida");    
    }
    return choice;
}

let player_Win_count = 0;
let comp_Win_count = 0;
let one_Round_Play = (round,player, computer) => {
    let player_Win = false;
    let computer_Win = false;

    if (player === computer){
        alert(`Round: ${round} | Result: `+"Empate");
    }else if (
        player === "Rock" && computer === "Scissors" ||
        player === "Paper" && computer === "Rock" ||
        player === "Scissors" && computer === "Paper"
    ){
        player_Win = true;
    } else{
        computer_Win = true;
    }

    if (player_Win){
        player_Win_count+=1;
        alert(`Round: ${round} | Result: `+"Jogador Venceu!");
    }else if (computer_Win){
        comp_Win_count+=1;
        alert(`Round: ${round} | Result: `+"Computador Venceu!");
    }
}

function game(){

    for(let i =0; i<5; i++){
        one_Round_Play(i+1,player_choice(), computer_choice());
    }   
    
    if (player_Win_count > comp_Win_count){
        alert(`Score computador: ${comp_Win_count}\n` + `Score player: ${player_Win_count}\n`
        + `Player Venceu!`);
    }else{
        alert(`Score computador: ${comp_Win_count}\n` + `Score player: ${player_Win_count}\n`
        + `Computador Venceu!`);
    }
}

game();
