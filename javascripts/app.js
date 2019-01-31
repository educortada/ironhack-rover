// Rover Objects
var rover = {
  direction: 'N',
  x: 0,
  y: 0,
  travelLog: [],
  name: 'Rover 1',
  myTurn: true
}
var rover2 = {
  direction: 'N',
  x: 0,
  y: 1,
  travelLog: [],
  name: 'Rover 2',
  myTurn: false
}

var rovers = [rover, rover2];

// Grid
var grid = [
  [null, null, null, null, null, null, null, 'stone', null, null],
  [null, null, null, null, 'stone', null, null, null, null, null],
  [null, null, null, null, null, null, null, null, 'stone', null],
  [null, null, null, null, null, null, null, 'stone', null, null],
  [null, null, null, 'stone', null, null, null, null, null, null],
  ['stone', null, null, null, null, null, null, null, null, null],
  [null, null, null, null, 'stone', null, null, null, null, null],
  [null, null, null, null, null, 'stone', null, null, null, null],
  [null, null, 'stone', null, null, null, null, null, null, null],
  [null, null, null, null, null, null, 'stone', null, null, null]
];
// Add Rovers to the map
grid[rover.y][rover.x] = rover.name;
grid[rover2.y][rover2.x] = rover2.name;

// Default data.
console.log('Name: ' + rover.name + ' default direction: ' + rover.direction + ' default position: (' + rover.x + ',' + rover.y + ')');
console.log('Name: ' + rover2.name + ' default direction: ' + rover2.direction + ' default position: (' + rover2.x + ',' + rover2.y + ')');
console.log('-----');

function turnLeft(rover){
  console.log(rover.name + ' turnLeft was called!');
  switch (rover.direction){
    case 'N':
      rover.direction = 'W';
      console.log('Rover is now facing West');
      break;
    case 'S':
      rover.direction = 'E';
      console.log('Rover is now facing East');
      break;
    case 'E':
      rover.direction = 'N';
      console.log('Rover is now facing North');
      break;
    case 'W':
      rover.direction = 'S';
      console.log('Rover is now facing South');
      break;
  }
}

function turnRight(rover){
  console.log(rover.name + ' turnRight was called!');
  switch (rover.direction){
    case 'N':
      rover.direction = 'E';
      console.log('Rover is now facing East');
      break;
    case 'S':
      rover.direction = 'W';
      console.log('Rover is now facing West');
      break;
    case 'E':
      rover.direction = 'S';
      console.log('Rover is now facing South');
      break;
    case 'W':
      rover.direction = 'N';
      console.log('Rover is now facing North');
      break;
  }
}

function moveForward(rover){
  console.log(rover.name + ' moveForward was called!');
  switch (rover.direction){
    case 'N':
      var nextPositionX = rover.x;
      var nextPositionY = rover.y - 1;
      break;
    case 'S':
      var nextPositionX = rover.x;
      var nextPositionY = rover.y + 1;
      break;
    case 'E':
      var nextPositionX = rover.x + 1;
      var nextPositionY = rover.y;
      break;
    case 'W':
      var nextPositionX = rover.x - 1;
      var nextPositionY = rover.y;
      break;
  }
  checkNextMovement(nextPositionX, nextPositionY, rover);
}

function moveBackward(rover){
  console.log(rover.name + ' moveBackward was called!');
  switch (rover.direction){
    case 'N':
      var nextPositionX = rover.x;
      var nextPositionY = rover.y + 1;
      break;
    case 'S':
      var nextPositionX = rover.x;
      var nextPositionY = rover.y - 1;
      break;
    case 'E':
      var nextPositionX = rover.x - 1;
      var nextPositionY = rover.y;
      break;
    case 'W':
      var nextPositionX = rover.x + 1;
      var nextPositionY = rover.y;
      break;
  }
  checkNextMovement(nextPositionX, nextPositionY, rover);
}

// Check if the next movement is going inside the grid and there isn't an obstacle
function checkNextMovement(nextPositionX, nextPositionY, rover){
  if ((nextPositionX >= 0 && nextPositionX < 10) && (nextPositionY >= 0 && nextPositionY < 10)){
    if (grid[nextPositionY][nextPositionX] === null){
      // Set null to rover's previous position
      grid[rover.y][rover.x] = null;
      // Set rover to the next position
      grid[nextPositionY][nextPositionX] = rover.name;
      rover.x = nextPositionX;
      rover.y = nextPositionY;    
      pushCoordinatesToTravelLog(rover);
    } else if (grid[nextPositionY][nextPositionX] === 'stone') {
      console.log('Found a ' + grid[nextPositionY][nextPositionX] + '!');
    } else if (grid[nextPositionY][nextPositionX] === 'Rover 1' || grid[nextPositionY][nextPositionX] === 'Rover 2'){
      console.log('Found ' + grid[nextPositionY][nextPositionX] + '!');
    }
  } else {
    console.log ('Error! ' + rover.name + ' is going off the grid.'); 
  }
}

// Print all coordinates where rover has traveled over
function printTravelLog(rover){
  var coordinates = '';
  rover.travelLog.forEach(function(item, index){
    if (index % 2 === 0){
      coordinates += '(' + item + ',';
    } else if (index % 2 !== 0){
      coordinates += item + ') ';
    }
  });
  console.log(rover.name + ' tracking: ' + coordinates);  
}

// Store tracking
function pushCoordinatesToTravelLog(rover){
  rover.travelLog.push(rover.x, rover.y);
  console.log('(' + rover.x + ',' + rover.y + ')');
}

// Check which rover have the next turn
function checkRoverNextTurn(){
  var roverNextTurn;
  for (var rover in rovers){
    if (rovers[rover].myTurn){
      roverNextTurn = rovers[rover];
    }
  }
  return roverNextTurn;
}

 // It take turns between two rovers
function takeTurns(rover){
  rover.myTurn = false;
  if (rover.name === 'Rover 1'){
    rovers[1].myTurn = true;
  } else if (rover.name === 'Rover 2'){
    rovers[0].myTurn = true;
  } else {
    console.log('Error!');
  }
}

// Move rover with the received list of commands
function startMovement(commands){
  var currentRover;
  for (var i = 0; i < commands.length; i++){
    currentRover = checkRoverNextTurn();
    if (currentRover.travelLog.length === 0){
      currentRover.travelLog.push(currentRover.x, currentRover.y);
    }
    switch(commands[i]){
      case 'r':
        turnRight(currentRover);
        break;
      case 'l':
        turnLeft(currentRover);
        break;
      case 'f':
        moveForward(currentRover);
        break;
      case 'b':
        moveBackward(currentRover);
        break;
      default:
        console.log('Command \"' + commands[i] +  '\" isn’t a rover command.');
    }
    takeTurns(currentRover);
    printTravelLog(currentRover);
  }
}

//startMovement('rrfffrff');