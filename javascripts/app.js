// Rover Object
var rover = {
  direction: 'N',
  x: 0,
  y: 0,
  travelLog: []
}
// Grid
var grid = [
  [null, null, null, 'O', null, null, null, null, null, 'O'],
  [null, 'O', null, null, 'O', null, null, null, null, null],
  [null, null, null, null, null, null, 'O', null, 'O', null],
  [null, null, 'O', null, null, null, null, 'O', null, null],
  [null, null, null, 'O', null, null, null, null, null, 'O'],
  ['O', null, null, null, null, null, 'O', null, null, null],
  [null, 'O', null, null, 'O', null, null, null, null, null],
  [null, null, null, null, null, 'O', null, null, null, 'O'],
  [null, null, 'O', 'O', null, null, null, null, null, null],
  [null, null, null, 'O', null, null, 'O', null, null, null]
];

// Default data
console.log('Default direction: ' + rover.direction);
console.log('Default position: (' + rover.x + ',' + rover.y + ')');
console.log('-----');

function turnLeft(rover){
  console.log("turnLeft was called!");

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
  console.log("turnRight was called!");
  
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
  console.log("moveForward was called")
  var hasMoved = false;
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
  hasMoved = checkNextMovent(nextPositionX, nextPositionY);
  console.log(hasMoved);
  return hasMoved;
}

function moveBackward(rover){
  console.log('moveBackward was called');
  var hasMoved = false;
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
  hasMoved = checkNextMovent(nextPositionX, nextPositionY);
  console.log(hasMoved);
  return hasMoved;
}

// Check if the next movement is going inside the grid
function checkNextMovent(nextPositionX, nextPositionY){
  var hasMoved = false;
  if ((nextPositionX >= 0 && nextPositionX < 10) && (nextPositionY >= 0 && nextPositionY < 10)){
    rover.x = nextPositionX;
    rover.y = nextPositionY;
    pushCoordinatesToTravelLog(rover);
    hasMoved = true;
  } else {
    console.log ('Error! rover is going off the grid.'); 
  }
  return hasMoved;
}

// Move rover with the received list of commands.
function startMovement(commands){
  if (rover.travelLog.length === 0){
    rover.travelLog.push(rover.x, rover.y);
  }
  for (var i = 0; i < commands.length; i++){
    if (commands[i] === 'r'){
      turnRight(rover);
    } else if (commands[i] === 'l'){
      turnLeft(rover);
    } else if (commands[i] === 'f'){
      moveForward(rover);
    } else if (commands[i] === 'b'){
      moveBackward(rover);
    } else{
      console.log('Command ' + commands[i] +  ' isn’t a rover command.');
    }
  }
  printTravelLog(rover);
}

// Print all coordinates where rover has traveled over.
function printTravelLog(rover){
  var coordinates = '';
  rover.travelLog.forEach(function(item, index){
    if (index % 2 === 0){
      coordinates += '(' + item + ',';
    }
    else if (index % 2 !== 0){
      coordinates += item + ') ';
    }
  });
  console.log('Tracking: ' + coordinates);  
}

// Store the tracking
function pushCoordinatesToTravelLog(rover){
  rover.travelLog.push(rover.x, rover.y);
  console.log('(' + rover.x + ',' + rover.y + ')');
}

startMovement('rfffbbbb');