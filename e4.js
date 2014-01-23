var gen1 = [
  [0,1,0,0,0],
  [1,0,0,1,1],
  [1,1,0,0,1],
  [0,1,0,0,0],
  [1,0,0,0,1]];

var gen2 = [];

var initialize = function() {
  draw_board(gen1);
};

var draw_board = function(genData) {
  var board = $E('div', {'class':'gameboard'});
  for (var r=0; r<genData.length; r++) {
    var rowElem = $E('div', {'class':'row'});
    for (var c=0; c<genData[r].length; c++) {
      rowElem.insert($E('div', {'class': 'cell', html: genData[r][c]}));
    }
    board.append(rowElem);
  }
  $('container').append(board);
};

var run = function() {
  for (var r=0; r<gen1.length; r++) {
    gen2[r] = [];
    
    for (var c=0; c<gen1[r].length; c++) {
      var neighbors=0, row;
      
      if (row = gen1[r-1]) { //Neighbors above
        if (row[c+1]) neighbors+= row[c+1];
        if (row[c]) neighbors+= row[c];
        if (row[c-1]) neighbors+= row[c-1];
      }
      if (row = gen1[r+1]) { //Neighbors below
        if (row[c-1]) neighbors+= row[c-1];
        if (row[c]) neighbors+= row[c];
        if (row[c+1]) neighbors+= row[c+1];
      }
      if (gen1[r][c-1]) neighbors+= gen1[r][c-1]; //Neighbors left
      if (gen1[r][c+1]) neighbors+= gen1[r][c+1]; //Neighbors right
	  
      // Determine next generation
      gen2[r][c] = gen1[r][c]; //By default, no change
	  
      if (gen1[r][c] && (neighbors<2 || neighbors>3))
        gen2[r][c] = 0; //Over or under population

      if (!gen1[r][c] && neighbors==3) 
        gen2[r][c] = 1; //Reproduction
    }
  }

  draw_board(gen2);
};

