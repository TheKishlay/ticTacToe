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

function game(){
    console.log("Game Started!");
    const player1 = player("One", "X");
    const player2 = player("Two", "O");

    let board = gameBoard.getBoard();

    function setMark(name,value){
        if (value<0 || value>8) return "Invalid mark";
        if(board[value] ==null){
            if(name == "One") board[value] = "X";
            else board[value] = "O";
            console.log(board);

            checkWinner(board[value]);
        }
        else console.log(board);
    };

    function resetBoard(){
        for(let i =0 ; i<9 ; i++){
            board[i] = null;
        };
        console.log(board);
    }

    function checkWinner(mark){
        let winningCombo = [[1,2,3], [1,5,9],[1,4,7],[2,5,8],[3,6,9],[3,5,7], [4,5,6],[7,8,9]];

        let xCount = 0;
        let yCount = 0;

        for(let i=0; i<winningCombo.length; i++){
            for(let j= 0; j<3 ;j++){
                console.log(i,j,xCount);
                if(board[winningCombo[i][j]-1] != null){

                    if(mark == "X"){
                        if(board[winningCombo[i][j]-1] == mark){

                            xCount++;
                            if(xCount == 3) {
                                console.log("Player One won!");
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
                        if(board[winningCombo[i][j]-1] == mark){
                        yCount++;
                        if(yCount == 3) {
                            console.log("Player Two won!");
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
                // if(mark == "X"){
                //     if(xCount==3) return console.log("Player one won");
                //     if(board[j] != mark) {
                //         xCount = 0;
                //         continue;}
                //     if(board[winningCombo[i][j]-1] == mark)
                // }

                // if(mark == "O"){
                //     if(yCount ==3) return console.log("Player two won");
                //     if(board[j] != mark) {
                //         yCount = 0;
                //         continue;
                //     };
                //     yCount++;
                // }

            }
        };
    };
    return {setMark};
};

let Game = game();
console.log("start!");