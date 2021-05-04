let board = []
let score = 0
const maxNumber = 2048
const animateTime = 200

function newGame(){
  prepareForMobile()
  init()
  generateOneNumber()
}
window.onload=function (){
  newGame()
}

function prepareForMobile(){

  if( documentWidth > 500 ){
    gridContainerWidth = 500;
    cellSpace = 20;
    cellSideLength = 100;
  }

  $('#gridContainer').css('width',gridContainerWidth - 2*cellSpace);
  $('#gridContainer').css('height',gridContainerWidth - 2*cellSpace);
  $('#gridContainer').css('padding', cellSpace);
  $('#gridContainer').css('border-radius',0.02*gridContainerWidth);

  $('.grid').css('width',cellSideLength);
  $('.grid').css('height',cellSideLength);
  $('.grid').css('border-radius',0.02*cellSideLength);
}

function init(){
  for(let i=0;i<4;i++)
    for(let j=0;j<4;j++){
      let gridcell = $('#grid'+i+j)
      gridcell.css('top',getPosTop(i,j))
      gridcell.css('left',getPosLeft(i,j))
    }
  for(let i=0;i<4;i++){
    board[i]=[]
    for(let j=0;j<4;j++){
      board[i][j]=-1
    }
  }
  updateBoardView();

  score = 0
  updateScore()
}

function updateBoardView(){
  // 移除旧的数字格子
  $('.numberCell').remove()
  // 重新设置新的显示
  for(let i=0;i<4;i++)
    for(let j=0;j<4;j++){
      // 通过 JQuery 中的 append 方法添加新元素
      $('#gridContainer').append('<div class = "numberCell" id="numberCell'+i+''+j+'"> </div>')
      // 获取新元素并添加相应样式
      let newCell = $('#numberCell'+i+j)
      if(board[i][j] == -1){
        newCell.css('width','0px')
        newCell.css('height','0px')
        newCell.css('top',getPosTop(i,j) )
        newCell.css('left',getPosLeft(i,j))
      }else{
        if(board[i][j] >= 1024 )
          newCell.css('fontSize',0.45*cellSideLength+'px')
        else
          newCell.css('fontSize',0.6*cellSideLength+'px')
        newCell.text( board[i][j] )
        newCell.css('width',cellSideLength)
        newCell.css('height',cellSideLength)
        newCell.css('top',getPosTop(i,j))
        newCell.css('left',getPosLeft(i,j))
        newCell.css('backgroundColor' ,getNumberBackgroundColor(board[i][j]))
        newCell.css('color',getNumberColor(board[i][j]))
      }
    }
  $('.numberCell').css('lineHeight',cellSideLength+'px');
  // $('.numberCell').css('fontSize',0.6*cellSideLength+'px');

}

function generateOneNumber(){
  if(noSpace(board))
    return false
  // emptyGrids 记录当前为空的格子
  let emptyGrids = []
  let l = 0
  for( let i = 0 ; i < 4 ; i++ ) {
    for (let j = 0; j < 4; j++)
      if(board[i][j] == -1)
        emptyGrids[l++] = [i,j]
  }
  // 从emptyGrdis中随机选取
  const loc = Math.floor(Math.random()*l)
  const x = emptyGrids[loc][0]
  const y = emptyGrids[loc][1]
  // 生成一个随机数(2 或 4)
  const num =Math.random()>0.5?2:4
  board[x][y]=num
  score += num
  updateScore()
  // 动态显示新数字
  showNumberWithAnimation(x,y,num)
}

$(document).keydown(function(event){
  if(event.keyCode >= 37 && event.keyCode<=40)
    event.preventDefault()
  switch (event.keyCode) {
    case 37:
      if(moveLeft()){
        setTimeout("generateOneNumber()",200)
        setTimeout("isGameOver()",250)
      }
      break
    case 38:
      if(moveUp()) {
        setTimeout("generateOneNumber()",200)
        setTimeout("isGameOver()",250)
      }
      break
    case 39:
      if(moveRight()){
        setTimeout("generateOneNumber()",200)
        setTimeout("isGameOver()",250)
      }
      break
    case 40:
      if(moveDown()){
        setTimeout("generateOneNumber()",200)
        setTimeout("isGameOver()",250)
      }
      break
  }
})

function moveLeft() {
  if (!canMove('left')) return false
  // 逐行遍历元素
  for (let i = 0; i < 4; i++) {
    //从第二个元素开始，从左往右遍历元素
    //  index记录当前没有变化过的最远的元素位置
    let index = 0
    for (let j = 1; j < 4; j++) {
      if ( board[i][j] != -1 )
        //  从左往右查找元素可以要移动到的位置
        for(let k = index; k < j; k++){
          // 找到最远的且为空的位置
          if(board[i][k] == -1 && noBlockH(i , k , j , board)){
            showMoveAnimation(i , j , i ,k )
            board[i][k] = board[i][j]
            board[i][j] = -1
            break
          }
          //  找到最远的且和当前元素相等的位置
          else if(board[i][k] == board[i][j] && noBlockH(i , k , j,board) && board[i][k] != maxNumber ){
            showMoveAnimation(i , j , i , k)
            index = k+1
            board[i][k] += board[i][j]
            board[i][j] = -1
            score += board[i][k]
            updateScore()
            break
          }
        }
      }
  }
  setTimeout("updateBoardView()",animateTime)
  return true
}
function moveRight(){
  if(!canMove('right')) return false
  for(let i = 0 ; i < 4 ; i++) {
    let index = 3
    for (let j = 2; j >= 0; j--) {
      if (board[i][j] != -1)
        for (let k = index; k > j; k--) {
          if (board[i][k] == -1 && noBlockH(i, j, k, board)) {
            showMoveAnimation(i, j, i, k)
            board[i][k] = board[i][j]
            board[i][j] = -1
            break
          } else if (board[i][k] == board[i][j] && noBlockH(i, j, k, board) && board[i][k] != maxNumber) {
            showMoveAnimation(i, j, i, k)
            board[i][k] += board[i][j]
            board[i][j] = -1
            score += board[i][k]
            updateScore()
            index =k-1
            break
          }
        }
    }
  }


  setTimeout("updateBoardView()",animateTime)
  return true
}
function moveUp() {
  if(!canMove('up')) return false
  for(let j=0 ; j<4 ; j++) {
    let index = 0
    for (let i = 1; i < 4; i++) {
      if (board[i][j] != -1) {
        for (let k = index; k < i; k++) {
          if (board[k][j] == -1 && noBlockV(j, k, i, board)) {
            showMoveAnimation( i, j , k , j )
            board[k][j] = board[i][j]
            board[i][j] = -1
            break
          } else if (board[k][j] == board[i][j] && noBlockV(j, k, i, board) && board[k][j] != maxNumber)  {
            showMoveAnimation( i, j , k , j )
            index = k + 1
            board[k][j] += board[i][j]
            board[i][j] = -1
            score += board[k][j]
            break
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()",animateTime)
  return true
}
function moveDown(){
  if(!canMove('down'))  return false
  for(let j=0 ; j < 4 ; j++){
    let index = 3
    for(let i = 2 ; i >= 0 ; i--){
      if(board[i][j] != -1)
        for(let k = index ; k > i ; k--){
          if(board[k][j] == -1 && noBlockV( j , i , k , board)){
            showMoveAnimation(i , j , k , j)
            board[k][j] = board[i][j]
            board[i][j] = -1
            break
          }
          else if(board[i][j] == board[k][j] && noBlockV( j , i , k , board) && board[i][j] != maxNumber){
            showMoveAnimation(i , j , k , j)
            index = k-1
            board[k][j] += board[i][j]
            board[i][j] = -1
            score += board[k][j]
            updateScore()
            break
          }
        }
    }  }
  setTimeout("updateBoardView()",animateTime)
  return true
}
function canMove( dir ){
  switch ( dir ){
    case 'left':
      for(let i = 0 ; i < 4 ; i++)
        for ( let j = 1 ; j<4 ; j++ )
          if( board[i][j-1] == -1 || board[i][j-1] == board[i][j] )
            return true
      return false
    case 'right':
      for(let i = 0 ; i < 4 ; i++)
        for( let j = 2 ; j >= 0 ; j-- )
          if( board[i][j+1] == -1 || board[i][j] == board[i][j+1] )
            return true
      return false
    case 'up':
      for(let j = 0 ; j < 4 ; j++)
        for (let i = 1 ; i < 4 ; i++)
          if( board[i][j] != -1 )
            if( board[i-1][j] == board[i][j] || board[i-1][j]==-1 )
              return true
      return false
    case 'down':
      for(let j = 0 ; j < 4 ; j ++ )
        for(let i = 2 ; i >= 0 ; i -- )
          if( board[i][j] != -1 )
            if( board[i+1][j] == -1 || board[i+1][j] == board[i][j] )
              return true;
      return false;
    default:
      return false
  }
}

function isGameOver(){
  if(!noSpace() || canMove('left') || canMove('right')|| canMove('up') || canMove('down'))
    return false
  else{
    alert('gameover! your score is'+score)
    return true
  }
}

function gameOver(){
  if(isGameOver())
    console.alert('gameover')
  if(!noSpace() || canMove('left') || canMove('right')|| canMove('up') || canMove('down'))
    return false
  else return true
}