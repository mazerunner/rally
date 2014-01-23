
var life = {
  example: [
    [0,1,0,0,0],
    [1,0,0,1,1],
    [1,1,0,0,1],
    [0,1,0,0,0],
    [1,0,0,0,1]],
  gen1: [],
  gen2: [],
  
  build_random: function(rows,cols){
  	$('container').clean();
	this.gen2 = [];
    rows = rows ? rows : 5;
    cols = cols ? cols : 5;
	
    var newGen = [];
    for (var r=0; r<rows; r++) {
	  newGen[r] = [];
      for (var c=0; c<cols; c++) {
	    newGen[r][c] = parseInt(Math.random()*100)%2;
      }
	}
	this.gen1 = newGen;
	this.draw_board(this.gen1);
  },
  build_example: function(){
  	$('container').clean();
	this.gen2 = [];
    this.gen1 = this.example;
	this.draw_board(this.gen1);
  },
  draw_board: function(genData) {
    var board = $E('div', {'class':'gameboard'});
    for (var r=0; r<genData.length; r++) {
      var rowElem = $E('div', {'class':'row'});
      for (var c=0; c<genData[r].length; c++) {
        rowElem.insert($E('div', {'class': 'cell', html: genData[r][c]}));
      }
      board.append(rowElem);
    } 
    $('container').append(board);
  },
  next_generation: function() { 
    for (var r=0; r<this.gen1.length; r++) {
    this.gen2[r] = [];
    
    for (var c=0; c<this.gen1[r].length; c++) {
      var neighbors=0, row;
      
      if (row = this.gen1[r-1]) { //Neighbors above
        if (row[c+1]) neighbors+= row[c+1];
        if (row[c]) neighbors+= row[c];
        if (row[c-1]) neighbors+= row[c-1];
      }
      if (row = this.gen1[r+1]) { //Neighbors below
        if (row[c-1]) neighbors+= row[c-1];
        if (row[c]) neighbors+= row[c];
        if (row[c+1]) neighbors+= row[c+1];
      }
      if (this.gen1[r][c-1]) neighbors+= this.gen1[r][c-1]; //Neighbors left
      if (this.gen1[r][c+1]) neighbors+= this.gen1[r][c+1]; //Neighbors right
	  
      // Determine next generation
      this.gen2[r][c] = this.gen1[r][c]; //By default, no change
	  
      if (this.gen1[r][c] && (neighbors<2 || neighbors>3))
        this.gen2[r][c] = 0; //Over or under population

      if (!this.gen1[r][c] && neighbors==3) 
        this.gen2[r][c] = 1; //Reproduction
      }
    }

    this.draw_board(this.gen2);
  },
  advance_generation: function() {
	this.gen1 = [];
	
    for (var r=0; r<this.gen2.length; r++) {
      this.gen1[r] = [];
      for (var c=0; c<this.gen2[r].length; c++) {
        this.gen1[r][c] = this.gen2[r][c];
      }
	}
	
  	$('container').clean();
	this.gen2 = [];
    this.draw_board(this.gen1);
  }
};


