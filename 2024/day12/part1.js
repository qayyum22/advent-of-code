// Function to calculate total fencing cost for a garden map
function calculateFencingCost(map) {
    const rows = map.length;
    const cols = map[0].length;
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

    // Directions for moving: [up, down, left, right]
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1]
    ];

    let totalPrice = 0;

    // Helper function to calculate area and perimeter for a region
    function dfs(r, c, plantType) {
        const stack = [[r, c]];
        visited[r][c] = true;
        let area = 0;
        let perimeter = 0;

        while (stack.length > 0) {
            const [x, y] = stack.pop();
            area++;

            // Check neighbors
            for (const [dx, dy] of directions) {
                const nx = x + dx;
                const ny = y + dy;

                if (nx >= 0 && nx < rows && ny >= 0 && ny < cols) {
                    if (map[nx][ny] === plantType && !visited[nx][ny]) {
                        visited[nx][ny] = true;
                        stack.push([nx, ny]);
                    } else if (map[nx][ny] !== plantType) {
                        perimeter++;
                    }
                } else {
                    perimeter++; // Out of bounds contributes to perimeter
                }
            }
        }

        return { area, perimeter };
    }

    // Traverse the map to find regions
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (!visited[r][c]) {
                const plantType = map[r][c];
                const { area, perimeter } = dfs(r, c, plantType);
                totalPrice += area * perimeter;
            }
        }
    }

    return totalPrice;
}

const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');
const gardenMap = input.split('\n');
// Example usage
// const gardenMap = [
//     'RRRRIICCFF',
//     'RRRRIICCCF',
//     'VVRRRCCFFF',
//     'VVRCCCJFFF',
//     'VVVVCJJCFE',
//     'VVIVCCJJEE',
//     'VVIIICJJEE',
//     'MIIIIIJJEE',
//     'MIIISIJEEE',
//     'MMMISSJEEE'
// ];

console.log(calculateFencingCost(gardenMap.map(row => row.split(''))));
