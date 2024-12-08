function parseInput(inputData) {
    const sections = inputData.trim().split("\n\n");
    const rules = sections[0].split("\n").map(line => {
        const [x, y] = line.split('|').map(Number);
        return [x, y];
    });
    const updates = sections[1].split("\n").map(update => update.split(',').map(Number));
    return { rules, updates };
}

function isUpdateValid(update, rules) {
    const indices = new Map();
    update.forEach((page, i) => indices.set(page, i));
    for (const [x, y] of rules) {
        if (indices.has(x) && indices.has(y)) {
            if (indices.get(x) >= indices.get(y)) {
                return false;
            }
        }
    }
    return true;
}

function reorderUpdate(update, rules) {
    // Create a directed graph of dependencies
    const graph = new Map();
    const inDegree = new Map();
    update.forEach(page => {
        graph.set(page, []);
        inDegree.set(page, 0);
    });

    for (const [x, y] of rules) {
        if (update.includes(x) && update.includes(y)) {
            graph.get(x).push(y);
            inDegree.set(y, inDegree.get(y) + 1);
        }
    }

    // Perform topological sort to reorder pages
    const sorted = [];
    const queue = [];
    for (const [page, degree] of inDegree.entries()) {
        if (degree === 0) {
            queue.push(page);
        }
    }

    while (queue.length > 0) {
        const current = queue.shift();
        sorted.push(current);

        for (const neighbor of graph.get(current)) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }

    return sorted;
}

function findMiddlePage(update) {
    const mid = Math.floor(update.length / 2);
    return update[mid];
}

function calculateSumOfMiddlePages(inputData) {
    const { rules, updates } = parseInput(inputData);
    let totalSum = 0;

    for (const update of updates) {
        // Filter relevant rules for the current update
        const relevantRules = rules.filter(([x, y]) => update.includes(x) && update.includes(y));
        if (isUpdateValid(update, relevantRules)) {
            totalSum += findMiddlePage(update);
        }
    }

    return totalSum;
}

function calculateSumOfMiddlePagesForReorderedUpdates(inputData) {
    const { rules, updates } = parseInput(inputData);
    let totalSum = 0;

    for (const update of updates) {
        // Filter relevant rules for the current update
        const relevantRules = rules.filter(([x, y]) => update.includes(x) && update.includes(y));
        if (!isUpdateValid(update, relevantRules)) {
            const reorderedUpdate = reorderUpdate(update, relevantRules);
            totalSum += findMiddlePage(reorderedUpdate);
        }
    }

    return totalSum;
}

// Read input
const fs = require("fs");
const input = fs.readFileSync("data.txt", "utf-8").replace(/\r/g, '');

// Part 1: Correctly ordered updates
const sumOfMiddlePages = calculateSumOfMiddlePages(input);
console.log("Sum of middle pages for correctly ordered updates:", sumOfMiddlePages);

// Part 2: Reordered updates
const sumOfMiddlePagesForReordered = calculateSumOfMiddlePagesForReorderedUpdates(input);
console.log("Sum of middle pages for reordered updates:", sumOfMiddlePagesForReordered);
