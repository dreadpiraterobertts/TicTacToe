const GameBoard = (function (){
    let gameBoard = ["","","","","","","","",""]

    const getBoard = ()=>gameBoard
    const markBoard = (index,marker) => {
        if(gameBoard[index]== ""){
            gameBoard[index] = marker
            return 1
        }else{
            return 0
        }
    }
    const clearBoard = () => {
        for(i = 0;i<gameBoard.length;i++){
            gameBoard[i]=""
        }
    }

    return {getBoard,markBoard,clearBoard}
    

})()

const player = (marker) => {
const playerMarker = marker
return playerMarker
}

const gameController = (function(){

let currentPlayer
let gameOver = false
const playerOne = player("X")
const playerTwo = player("O")

//to start the game
const startGame = () =>{
    GameBoard.clearBoard()
    currentPlayer = playerOne
    gameOver = false
}
//changes the current player
const switchPlayer= ()=>{
    if(currentPlayer===playerOne){
        currentPlayer=playerTwo
    }else{
        currentPlayer=playerOne
    } 
}
const playTurn = (index)=>{
    let {gameOver} = checkWinner()
    if(gameOver == false){
        if(GameBoard.markBoard(index,currentPlayer)){
            switchPlayer()
        }
        
    }
    const x = checkWinner()
    return{x}
    
        
}
//checks the winner and returns the winner and gameOver variable
const checkWinner = ()=>{
    let winner = null
    const winningCombos = [
        [0,1,2],[0,4,8],[2,5,8],
        [3,4,5],[0,3,6],[2,4,6],
        [6,7,8],[1,4,7],
    ]

    //gets the current state of the game 
    const gameState = GameBoard.getBoard()
    let comboX = []
    let comboO = []
    for(i=0;i<gameState.length;i++){
        if(gameState[i]=="X"){
            comboX.push(i)
        }else if(gameState[i]=="O"){
            comboO.push(i)
        }
    }

   //checking winner 
    const isWinningCombo = (combo, playerCombos) => 
    combo.every(index => playerCombos.includes(index));

    for (const combo of winningCombos) {
        if (isWinningCombo(combo, comboX)) {
            gameOver = true
            winner = playerOne
            return {winner , gameOver}
        }
        if (isWinningCombo(combo, comboO)) {
            gameOver = true
            winner = playerTwo
            return {winner, gameOver}
            
        }
    }

    // If no winner and board is full, it's a draw
    if (!gameState.includes("")) {
        winner = null
        gameOver = true
        return {winner,gameOver}
    }

    // Otherwise, the game is still ongoing
    return {winner,gameOver}
    
}

    return{startGame,playTurn,checkWinner,}
})()

const displayController= (function (){
gameController.startGame()
const cells = document.querySelectorAll('.cell')
const current = document.querySelector("#currentPlayer")
const restart = document.querySelector("button")
const msg = document.querySelector("p")
current.innerHTML = "X"
let gameState = GameBoard.getBoard()
for(let i=0;i<gameState.length;i++){
    cells[i].addEventListener('click',()=>{
        gameController.playTurn(i)
        current.innerHTML = current.innerHTML == "X" ? "O" : current.innerHTML == "O" ? "X":current.innerHTML
        gameState = GameBoard.getBoard()
        cells[i].innerHTML = gameState[i]
        let {winner,gameOver} = gameController.checkWinner()
        if(winner == "X" && gameOver == true){
            msg.innerHTML = "player X won"
        }else if(winner == "O" && gameOver == true){
            msg.innerHTML = "player O won"
        }else if(winner == null && gameOver == true ){
            msg.innerHTML = "its a TIE"
        }
    })
}

restart.addEventListener('click',()=>{
    gameController.startGame()
    for(let i=0;i<gameState.length;i++){
            gameState = GameBoard.getBoard()
            cells[i].innerHTML = gameState[i]
    }
    msg.innerHTML = ""
    current.innerHTML = "X"
})

})()
