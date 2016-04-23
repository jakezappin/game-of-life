
var gameOfLife = {
  width: 12,
  height: 12,
  stepInterval: null,

  createAndShowBoard: function () {
    // create <table> element
    var goltable = document.createElement("tbody");
    
    // build Table HTML
    var tablehtml = '';
    for (var h=0; h<this.height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (var w=0; w<this.width; w++) {
        tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;
    
    // add table to the #board element
    var board = document.getElementById('board');
    board.appendChild(goltable);
    
    // once html elements are added to the page, attach events to them
    this.setupBoardEvents();

    // sets an even listener for the 'step' button

    var setButton = document.getElementById('step_btn');
    setButton.addEventListener('click', gameOfLife.step.bind(gameOfLife));
  },

  forEachCell: function (iteratorFunc) {
    /* 
      Write forEachCell here. You will have to visit
      each cell on the board, call the "iteratorFunc" function,
      and pass into func, the cell and the cell's x & y
      coordinates. For example: iteratorFunc(cell, x, y)
    */
    console.log(iteratorFunc);

    for(var w=0 ; w<this.width ; w++) {
      for(var h=0 ; h<this.height ; h++) {
        var currentCell = document.getElementById(w + '-' + h);
        iteratorFunc(currentCell,w,h);
      }
    }

  },
  
  setupBoardEvents: function() {
    // each board cell has an CSS id in the format of: "x-y" 
    // where x is the x-coordinate and y the y-coordinate
    // use this fact to loop through all the ids and assign
    // them "on-click" events that allow a user to click on 
    // cells to setup the initial state of the game
    // before clicking "Step" or "Auto-Play"
    
    // clicking on a cell should toggle the cell between "alive" & "dead"
    // for ex: an "alive" cell be colored "blue", a dead cell could stay white
    
    // EXAMPLE FOR ONE CELL
    // Here is how we would catch a click event on just the 0-0 cell
    // You need to add the click event on EVERY cell on the board
    // this.forEachCell(onCellClick);
    this.forEachCell(function(cell) {
      cell.addEventListener('click',onCellClick);
    });
    
    function onCellClick(e) {
      // QUESTION TO ASK YOURSELF: What is "this" equal to here?  --> the clicked cell ?
      
      // how to set the style of the cell when it's clicked

      if (this.getAttribute('data-status') == 'dead') {
        this.className = "alive";
        this.setAttribute('data-status', 'alive');
      } else {
        this.className = "dead";
        this.setAttribute('data-status', 'dead');
      }
    };
    
    // var cell00 = document.getElementById('0-0');
    // cell00.onclick = onCellClick;
  },

  step: function () {

    // Here is where you want to loop through all the cells
    // on the board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the next
    // evolution of the game. 
    //
    // You need to:
    // 1. Count alive neighbors for all cells
    // 2. Set the next state of all cells based on their alive neighbors


    this.forEachCell(function(cell, w, h){
      var aliveNeighbors = 0;
      var neighbors = [];

      var cell1 = document.getElementById(w + "-" + (h - 1));
      neighbors.push(cell1);
      var cell2 = document.getElementById((w + 1) + "-" + h);
      neighbors.push(cell2);
      var cell3 = document.getElementById(w + "-" + (h + 1));
      neighbors.push(cell3);
      var cell4 = document.getElementById((w - 1) + "-" + h);
      neighbors.push(cell4);
      var cell5 = document.getElementById((w + 1) + "-" + (h - 1));
      neighbors.push(cell5);
      var cell6 = document.getElementById((w+1) + "-" + (h - 1));
      neighbors.push(cell6);
      var cell7 = document.getElementById((w-1) + "-" + (h+1));
      neighbors.push(cell7);
      var cell8 = document.getElementById((w-1) + "-" + (h - 1));
      neighbors.push(8);


      for(var i = 0; i < neighbors.length; i++){
        if(neighbors[i]){
          if(neighbors[i].className === 'alive'){
            aliveNeighbors++;
          }
        }
      }

      if(cell.className === 'alive' && (aliveNeighbors === 2 || aliveNeighbors ===3)){
        console.log("TEST1")
        cell.className = 'alive';
        cell.setAttribute('data-status', 'alive');
      } else if (cell.className === 'alive' && aliveNeighbors < 2){
        console.log("TEST2")
        cell.className = 'dead';
        cell.setAttribute('data-status', 'dead');
      } else if(cell.className === 'alive' && aliveNeighbors > 3){
        console.log("TEST3")
        cell.className = 'dead';
        cell.setAttribute('data-status', 'dead');
      } else if(cell.className === 'dead' && aliveNeighbors === 3){
        console.log("TEST4")
        cell.clasName = 'alive';
        cell.setAttribute('data-status', 'alive');
      }

    })
    
  },

  enableAutoPlay: function () {
    // Start Auto-Play by running the 'step' function
    // automatically repeatedly every fixed time interval
    
  }
};

  gameOfLife.createAndShowBoard();
