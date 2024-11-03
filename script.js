//Creating initial game board
const gameBoard = (function (){
    let board = [];

    let cellRequired = 9;
    for(let i =0; i<cellRequired;i++){
        board[i] = null;
    };

    let getBoard = () => board;
    return {getBoard};
})();

//Player object for instances
function player(name, mark){
    let pname = name;
    let pmark = mark;
    return {pname, pmark};
};

//Gameplay Function
function game(){

    //Cache DOM
    const status = document.querySelector("#status");
    const cells = document.querySelectorAll(".cell");
    const cellsArray = Array.from(cells);
    const startBtn = document.querySelector("#startBtn");
    const playerForm = document.querySelector(".playerForm");
    const playerOne = document.querySelector("#playerOne");
    const playerTwo = document.querySelector("#playerTwo");
    const formBtn = document.querySelector("#formBtn");
    const resetBtn = document.querySelector("#resetBtn");
    const winner = document.querySelector(".winner");
    const welcomeScr = document.querySelector(".welcomeScr");

    //event to restart game
    resetBtn.addEventListener("click", resetBoard);

    //event to open form for player infos
    startBtn.addEventListener("click", () => playerForm.showModal());

    //event to start game and open game page
    formBtn.addEventListener("click", () => {
        playerForm.close();
        welcomeScr.style.display = "none";
    })

    //variable to know whose turn it is
    let turn = 1;

    //cell marking on click
    cellsArray.forEach(cell => {
        cell.addEventListener("click", () => setMark(cell));
    });

    console.log("Game Started!");
    const player1 = player(playerOne.value, "X");
    const player2 = player(playerTwo.value, "O");

    let board = gameBoard.getBoard();

    function setMark(cell){
        console.log(cell);
        if(cell.textContent=="") {
            if(turn == 1) cell.innerHTML = "X";
            else cell.textContent = "O";
            turn = turn ==1? 2 : 1;
            checkWinner(cell.innerHTML);
        }
        else alert("Cell already filled");
    };

    function resetBoard(){
        cellsArray.forEach(cell => cell.innerHTML ="");
        turn = 1;
    }

    function checkWinner(mark){
        let winningCombo = [[1,2,3], [1,5,9],[1,4,7],[2,5,8],[3,6,9],[3,5,7], [4,5,6],[7,8,9]];

        let xCount = 0;
        let yCount = 0;

        for(let i=0; i<winningCombo.length; i++){
            for(let j= 0; j<3 ;j++){
                if(cellsArray[winningCombo[i][j]-1].innerHTML != null){

                    if(mark == "X"){
                        if(cellsArray[winningCombo[i][j]-1].innerHTML == mark){

                            xCount++;
                            if(xCount == 3) {
                                console.log("Player One won!");
                                return;
                            }
                        }
                        else {
                            xCount = 0;
                            break;
                        }
                    }
                    if(mark == "O"){
                        if(cellsArray[winningCombo[i][j]-1].innerHTML == mark){
                        yCount++;
                        if(yCount == 3) {
                            console.log("Player Two won!");
                            return;
                        }
                    }
                    else {
                        yCount = 0;
                        break;
                    }
                    }
                }
                else {
                    xCount = 0;
                    yCount = 0;
                    break;
                }
            }
        };
    };
};

let Game = game();