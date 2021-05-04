function showNumberWithAnimation( x , y , num ){
  const numberCell = $('#numberCell' + x + y);
  numberCell.text( board[x][y] );
  numberCell.css('backgroundColor' , getNumberBackgroundColor( num ) );
  numberCell.css('color' , getNumberColor( num ) );
  numberCell.css('left' , getPosLeft( x , y ))
  numberCell.css('top' , getPosTop( x , y ))

  numberCell.animate({
    width:cellSideLength,
    height:cellSideLength,
    // left:getPosLeft( x , y ),
    // top:getPosTop( x , y ),
  },50)
}

function showMoveAnimation( fromX , fromY , toX , toY ){
  $('#numberCell' + fromX + fromY).animate({
    top : getPosTop( toX , toY ),
    left : getPosLeft( toX , toY )
  },200)
}

function updateScore(){
  $('#score').text( score );
}