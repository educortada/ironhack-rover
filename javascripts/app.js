// Rover Object Goes Here
var rover = {
  direction: 'N',
  x: 0,
  y: 0,
  travelLog: [0, 0]
}
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
  
  switch (rover.direction){
    case 'N':
      var nextPositionY = rover.y - 1;
      if (nextPositionY >= 0 && nextPositionY < 10){
        rover.y -= 1;
        pushCoordinatesToTravelLog(rover);
      } else {
        console.log ('Error! rover is going off the grid.');
      }
      break;
    case 'S':
      var nextPositionY = rover.y + 1;
      if (nextPositionY >= 0 && nextPositionY < 10){
        rover.y += 1;   
        pushCoordinatesToTravelLog(rover);
      } else {
        console.log ('Error! rover is going off the grid.');
      }
      break;
    case 'E':
      var nextPositionX = rover.x + 1;
      if (nextPositionX >= 0 && nextPositionX < 10){
        rover.x += 1;
        pushCoordinatesToTravelLog(rover);
      } else {
        console.log ('Error! rover is going off the grid.');
      }
      break;
    case 'W':
      var nextPositionX = rover.x - 1;
      if (nextPositionX >= 0 && nextPositionX < 10){
        rover.x -= 1;   
        pushCoordinatesToTravelLog(rover);
      } else {
        console.log ('Error! rover is going off the grid.'); 
      }
      break;
  }
}

function moveBackward(rover){
  console.log('moveBackward was called');
  switch (rover.direction){
    case 'N':
      var nextPositionY = rover.y + 1;
      if (nextPositionY >= 0 && nextPositionY < 10){
        rover.y += 1;
        pushCoordinatesToTravelLog(rover);
      } else {
        console.log ('Error! rover is going off the grid.'); 
      }
      break;
    case 'S':
      var nextPositionY = rover.y - 1;
      if (nextPositionY >= 0 && nextPositionY < 10){
        rover.y -= 1;   
        pushCoordinatesToTravelLog(rover);
      } else {
        console.log ('Error! rover is going off the grid.'); 
      }
      break;
    case 'E':
      var nextPositionX = rover.x - 1;
      if (nextPositionX >= 0 && nextPositionX < 10){
        rover.x -= 1;
        pushCoordinatesToTravelLog(rover);
      } else {
        console.log ('Error! rover is going off the grid.'); 
      }
      break;
    case 'W':
      var nextPositionX = rover.x + 1;
      if (nextPositionX >= 0 && nextPositionX < 10){
        rover.x += 1;   
        pushCoordinatesToTravelLog(rover);
      } else {
        console.log ('Error! rover is going off the grid.'); 
      }
      break;
  }
}

// Move rover with the received list of commands.
function moveRover(commands){
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
      break;
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

function pushCoordinatesToTravelLog(rover){
  rover.travelLog.push(rover.x, rover.y);
  console.log('(' + rover.x + ',' + rover.y + ')');
}

moveRover('rffrfflfrffbb');