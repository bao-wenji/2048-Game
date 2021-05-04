documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04*documentWidth;

function getPosTop( i , j ){
  return cellSpace + i * ( cellSpace + cellSideLength );
}

function getPosLeft( i , j ){
  return cellSpace + j * ( cellSpace + cellSideLength );
}
function getNumberBackgroundColor( number ){
  switch( number ){
    case 0:return "#eee4da";break;
    case 1:return "#ede0c8";break;
    case 2:return "#f2b179";break;
    case 4:return "#f59563";break;
    case 8:return "#f67c5f";break;
    case 16:return "#f65e3b";break;
    case 32:return "#edcf72";break;
    case 64:return "#edcc61";break;
    case 128:return "#9c0";break;
    case 256:return "#33b5e5";break;
    case 512:return "#09c";break;
    case 1024:return "#a6c";break;
    case 2048:return "#93c";break;
  }

  return "black";
}

function getNumberColor( number ){
  if( number <= 1 )
    return "#776e65";

  return "white";
}

function noSpace(){
  for(let i=0;i<4;i++)
    for(let j=0;j<4;j++){
      if(board[i][j]==-1)
        return false
    }
  return true
}

function noBlockH(row,pre,after,board){
  pre++
  for(; pre < after; pre++)
    if(board[row][pre] != -1) return false
  return true
}

function noBlockV(col,pre,after,board){
  pre++
  for( ; pre < after ; pre++)
    if( board[pre][col] != -1 ) return false
  return true
}