const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8')

function simulateGuard(map, newObstacle = null) {
    const directions = ['^', '>', 'v', '<'];
    const moves = [{x: 0, y: -1}, {x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 0}];
    let guard = {x: 0, y: 0, dir: 0};
    let visited = new Map(); // Use Map to store step counts

    // Find starting position of the guard
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === '^') {
                guard.x = x;
                guard.y = y;
                break;
            }
        }
    }

    let steps = 0;
    while (true) {
        if (steps > map.length * map[0].length * 4) { // Guard can cycle through 4 directions per position
            return false; // If we've taken too many steps, assume no loop
        }

        // Check if guard is within map bounds
        if (guard.y < 0 || guard.y >= map.length || guard.x < 0 || guard.x >= map[0].length) {
            return false; // Guard left the map, no loop
        }

        // Check if this position has been visited before with the same direction and same or fewer steps
        let key = `${guard.x},${guard.y},${guard.dir}`;
        if (visited.has(key) && visited.get(key) <= steps) {
            return true; // Loop detected if we've been here with the same or fewer steps
        }
        visited.set(key, steps);
        steps++;

        // Check for obstacle, including the new obstacle if set
        const nextX = guard.x + moves[guard.dir].x;
        const nextY = guard.y + moves[guard.dir].y;
        
        if ((nextY >= 0 && nextY < map.length && nextX >= 0 && nextX < map[nextY].length && 
            (map[nextY][nextX] === '#' || (newObstacle && nextX === newObstacle.x && nextY === newObstacle.y))) || 
            nextY < 0 || nextY >= map.length || nextX < 0 || nextX >= map[nextY].length) {
            // Turn right if there's an obstacle or out of bounds
            guard.dir = (guard.dir + 1) % 4;
        } else {
            // Move forward
            guard.x = nextX;
            guard.y = nextY;
        }
    }
}

function countLoopObstaclePositions(map) {
    let count = 0;
    let guardStart = {x: 0, y: 0}; // Guard's starting position

    // Find guard's starting position
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === '^') {
                guardStart = {x, y};
                break;
            }
        }
    }

    // Check every position except the guard's starting position
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] !== '#' && (x !== guardStart.x || y !== guardStart.y)) {
                let tempMap = map.map(row => [...row]); // Create a copy of the map
                tempMap[y][x] = '#'; // Place new obstacle
                
                if (simulateGuard(tempMap, {x, y})) {
                    count++;
                }
            }
        }
    }

    return count;
}

// Split the input string into an array of strings
const map = input.split('\n').map(row => row.split(''));

// Count positions where placing an obstacle would cause a loop
const loopPositions = countLoopObstaclePositions(map);
console.log(`There are ${loopPositions} different positions where placing an obstruction would cause a loop.`);