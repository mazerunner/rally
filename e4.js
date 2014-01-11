var gen1 = [
  [0,1,0,0,0],
  [1,0,0,1,1],
  [1,1,0,0,1],
  [0,1,0,0,0],
  [1,0,0,0,1]];

var gen2 = [];

var gameboard1 = $E('div', {'class':'gameboard'});
var gameboard2 = $E('div', {'class':'gameboard'});

var initialize = function() {
  for (var r=0; r<gen1.length; r++) {
    var rowElem = $E('div', {'class':'row'});
    for (var c=0; c<gen1[r].length; c++) {
      rowElem.insert($E('div', {'class': 'cell', html: gen1[r][c]}));
    }
    gameboard1.append(rowElem);
  }
  $('container').append(gameboard1);  
};

var run = function() {
  for (var r=0; r<gen1.length; r++) {
    gen2[r] = [];
    var rowElem = $E('div', {'class':'row'});
    
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
      gen2[r][c] = gen1[r][c];
      if (gen2[r][c] && neighbors<2 || neighbors>3) 
        gen2[r][c] = 0; //Over or under population

      if (!gen2[r][c] && neighbors==3) 
        gen2[r][c] = 1; //Reproduction

      rowElem.insert($E('div', {'class': 'cell', html: gen2[r][c]}));
    }
    gameboard2.append(rowElem);
  }
  $('container').append(gameboard2);
};

