var td = document.querySelectorAll("td"); // all column in the table
var resetButton=document.getElementById("reset");//reset button
var vsButton=document.getElementById("vs");//vs button
var gameMode='1VS1';
var turn=true;
var playerTurn;
var counterClick=0;
var board = Array.from(Array(9).keys());

reset();
resetButton.addEventListener('click',function(){
	reset();
});

vsButton.addEventListener('click',function(){
    reset();
    if(vsButton.innerHTML==='VS Computer'){
        gameMode='VScomputer';
        vsButton.innerHTML='1VS1';
        document.querySelector('p').innerHTML='You Play VS the computer';
    }
    else {
        vsButton.innerHTML='VS Computer';
        gameMode='1VS1';
        document.querySelector('p').innerHTML=playerTurn+' turn';
    }
});
function play_X_ro_O(){
    
    if(turn) playerTurn='X';
    else playerTurn='O';
    if(turn){ 
        this.innerHTML='X';
        board[this.id-1]='X';
        this.classList.add('X');
        counterClick++;
    }
    else {
        this.innerHTML='O';
        board[this.id-1]='O';
        this.classList.add('O');
        counterClick++;
    }
    turn=!turn;
    if(checkIfWinner(board,playerTurn)===false&&counterClick===9)setTimeout(()=> alert('Draw'),800);

    setTimeout(()=> alertWinner(board,this.innerHTML),250);

    if(gameMode=== "VScomputer" && turn === false){
        var index;
        setTimeout(()=>index=minMax(board,'O').index,250);
        setTimeout(()=>td[index].innerHTML='O',250);
        setTimeout(()=>td[index].classList.add('O'),250);
        setTimeout(()=>td[index].removeEventListener('click',play_X_ro_O),250);
        setTimeout(()=>board[index]='O',250);
        counterClick++;
        turn=true;

        setTimeout(()=> alertWinner(board,'O'),250);
        
    }

    if(gameMode==='1VS1') document.querySelector('p').innerHTML=playerTurn+' turn';
    this.removeEventListener('click',play_X_ro_O);
}

function removeListener_removexORo(){
    for(var i=0;i<td.length;i++){
        td[i].removeEventListener('click',play_X_ro_O);
    }
}
function addListener_addxORo(){
    for(var i=0;i<td.length;i++){
        td[i].addEventListener('click',play_X_ro_O);
    }
}

function alertWinner(temp_board,index){

    if(checkIfWinner(temp_board,index)) {
        setTimeout(()=>alert("Player " + (!turn? 'X' : 'O') + " Winner"), 250);
        removeListener_removexORo();
        resetButton.innerHTML='Play again';
    }

}
function checkIfWinner(temp_board,index ){

	if( temp_board[0]===index&&temp_board[1]===index&&temp_board[2]===index||
	    temp_board[0]===index&&temp_board[3]===index&&temp_board[6]===index||
		temp_board[0]===index&&temp_board[4]===index&&temp_board[8]===index||
		temp_board[1]===index&&temp_board[4]===index&&temp_board[7]===index||
		temp_board[2]===index&&temp_board[5]===index&&temp_board[8]===index||
		temp_board[3]===index&&temp_board[4]===index&&temp_board[5]===index||
		temp_board[6]===index&&temp_board[7]===index&&temp_board[8]===index||
		temp_board[2]===index&&temp_board[4]===index&&temp_board[6]===index)
			return true;
	return false;
}

function reset(){
    turn=true;
    counterClick=0;
    resetButton.innerHTML='Reset';
    for(var i=0;i<td.length;i++){
        td[i].innerHTML='';
        td[i].classList.remove('X');
        td[i].classList.remove('O');
    }
    addListener_addxORo();
    board = Array.from(Array(9).keys());

}

function checkEmptyIndex(temp_board){
    var emptycube=[];
    for(var i=0;i<temp_board.length;i++){
        if(temp_board[i]!=='X'&&temp_board[i]!=='O')
            emptycube.push(temp_board[i]);
    }
    return emptycube;
}

function minMax(temp_board,p){
    var emptycube=checkEmptyIndex(temp_board);
    if(checkIfWinner(temp_board,'X')) return {score: -10};
    if(checkIfWinner(temp_board,'O')) return {score: 10};
    if(emptycube.length===0) return {score: 0};

    var moves=[];
    for(var i=0;i<emptycube.length;i++){
        var move={};
        move.index=temp_board[emptycube[i]];
        temp_board[emptycube[i]]=p;

        if(p==='O'){
            var result=minMax(temp_board,'X');
            move.score=result.score;
        }
        else{
            var result=minMax(temp_board,'O');
            move.score=result.score;
        }

        temp_board[emptycube[i]]=move.index;
        moves.push(move);
    }

    var bestMove;
    if(p==='O'){
        var bestScore=-10000;
        for(var i=0;i<moves.length;i++){
            if (moves[i].score>bestScore){
                bestScore=moves[i].score;
                bestMove=i;
            }
        }
    }
    else{
        var bestScore=10000;
        for(var i=0;i<moves.length;i++){
            if(moves[i].score<bestScore){
                bestScore=moves[i].score;
                bestMove=i;
            }
        }
    }
    return moves[bestMove];
}


