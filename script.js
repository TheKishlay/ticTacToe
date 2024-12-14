//Player object for instances
function player(name, mark){
    let pname = name;
    let pmark = mark;
    return {pname, pmark};
};

//Gameplay Function
function game(){

    //Cache DOM
    const status = document.querySelector(".statusDiv");
    const cells = document.querySelectorAll(".cell");
    const cellsArray = Array.from(cells);
    const startBtn = document.querySelector("#startBtn");
    const playerForm = document.querySelector(".playerForm");
    const playerOne = document.querySelector("#playerOne");
    const playerTwo = document.querySelector("#playerTwo");
    const formBtn = document.querySelector("#formBtn");
    const restartBtn = document.querySelector("#restartBtn");
    const resetBtn = document.querySelector("#resetBtn");
    const winner = document.querySelector(".winner");
    const winnermsg = document.querySelector("#winnermsg");
    const welcomeScr = document.querySelector(".welcomeScr");
    let closebtn = document.getElementById("closebtn");
    let popup = document.querySelector(".popup");
    const winpop = document.querySelector(".outer");
    const boardscr = document.querySelector(".main");
    const changeName = document.querySelector("#changeName");

    console.log("Game started!");

    winpop.style.display = "none";

    //event to open form for player infos
    startBtn.addEventListener("click", () => {
        playerForm.showModal();
        playerForm.focus();
        }
    );
    startBtn.addEventListener("keypress", ()=> {
        playerForm.showModal();
        playerForm.focus();
        }
    );

    //to change name
    changeName.addEventListener("click", reload);

    function reload(){
        window.location.reload();
    }

    //event to start game and open game page
    formBtn.addEventListener("click", showForm);
    
    playerForm.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            showForm();
        }
    });

    function showForm(){
            if(playerOne.value == "" || playerTwo.value == ""){
                alert("Please fill both names!");
                e.preventDefault();
            }
            else{
                playerForm.close();
                welcomeScr.style.display = "none";
                gameplay();
                }
    };


    function gameplay(){
        //initial win value on players
        let p1winvalue = 0;
        let p2winvalue = 0;

        //creating player instances
        const player1 = player(playerOne.value, "X");
        const player2 = player(playerTwo.value, "O");

        //assigning player to status section
        const p1status = document.createElement("div");
        p1status.innerHTML = player1.pname+ "'s score:";
        const p1value = document.createElement("p");
        p1value.id = "p1value";
        p1value.innerHTML = p1winvalue;
        p1status.appendChild(p1value);
        status.appendChild(p1status);

        const p2status = document.createElement("div");
        p2status.innerHTML = player2.pname+ "'s score:";
        const p2value = document.createElement("p");
        p2value.id = "p2val";
        p2value.innerHTML = p2winvalue;

        p2status.appendChild(p2value);
        status.appendChild(p2status);

        //variable to know whose turn it is
        let turn = 1;

        //cell marking on click
        cellsArray.forEach(cell => {
            cell.addEventListener("click", () => setMark(cell));
        });


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

        function resetGame(){
            cellsArray.forEach(cell => cell.innerHTML ="");
            turn = 1;
            p1winvalue,p2winvalue = 0;
            p1value.innerHTML = 0;

            p2value.innerHTML = 0;
        }
    
        resetBtn.addEventListener("click", resetGame);


        function checkWinner(mark){
            let winningCombo = [[1,2,3], [1,5,9],[1,4,7],[2,5,8],[3,6,9],[3,5,7], [4,5,6],[7,8,9]];
    
            let xCount = 0;
            let yCount = 0;

        //to close the winner popup 
        closebtn.addEventListener("click", () => {
            winpop.style.display = "none";
        });
    
            for(let i=0; i<winningCombo.length; i++){
                for(let j= 0; j<3 ;j++){
                    if(cellsArray[winningCombo[i][j]-1].innerHTML != null){
    
                        if(mark == "X"){
                            if(cellsArray[winningCombo[i][j]-1].innerHTML == mark){
    
                                xCount++;
                                if(xCount == 3) {
                                    p1winvalue++;
                                    p1value.innerHTML = p1winvalue;
                                    winpop.style.display = "flex";
                                    winpop.style.zIndex = "1";
                                    winnermsg.innerHTML = "Yay! " + player1.pname + " won!";
                                    resetBoard();
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
                                p2winvalue++;
                                p2value.innerHTML = p2winvalue;
                                winpop.style.display = "flex";
                                winpop.style.zIndex = "1";
                                winnermsg.innerHTML = "Yay! " + player2.pname + " won!";
                                resetBoard();
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
        //event to restart game
        restartBtn.addEventListener("click", resetBoard);
    }

};

let Game = game();