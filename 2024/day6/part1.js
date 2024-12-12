const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

function simulateGuard(map) {
    const directions = ['^', '>', 'v', '<'];
    const moves = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];
    let guard = { x: 0, y: 0, dir: 0 };
    let visited = new Set();

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] === '^') {
                guard.x = x;
                guard.y = y;
                break;
            }
        }
    }


    while (true) {
        if (guard.y < 0 || guard.y >= map.length || guard.x < 0 || guard.x >= map[0].length) {
            break;
        }

        visited.add(`${guard.x}, ${guard.y}`);

        const nextX = guard.x + moves[guard.dir].x;
        const nextY = guard.y + moves[guard.dir].y;

        if (nextY >= 0 && nextY < map.length && nextX >= 0 && nextX < map[nextY].length && map[nextY][nextX] === '#') {
            guard.dir = (guard.dir + 1) % 4;

        } else {
            if (nextY >= 0 && nextY < map.length && nextX >= 0 && nextX < map[nextY].length) {
                guard.x = nextX;
                guard.y = nextY;
            }else{
                break;
            }
        }
    }
    return visited.size;
}

const map = input.split('\n').map(row => row.split(''));
const distinctPos = simulateGuard(map);
console.log(distinctPos);