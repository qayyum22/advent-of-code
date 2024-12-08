const fs = require("fs");

function parseInput(inputData) {
    
    const sections = inputData.trim().split("\n\n");
    console.log(sections.length)
    if (sections.length < 2) {
        throw new Error("Input data is not formatted correctly. Missing sections.");
    }
    
    // Parse rules
    const rules = sections[0].split("\n").map(line => {
        const [x, y] = line.split('|').map(Number);
        return [x, y];
    });
    
    // Parse updates
    const updates = sections[1].split("\n").map(update => update.split(',').map(Number));
    
    return { rules, updates };
}


try {
    const input = fs.readFileSync("data.txt", '').replace(/\r/g, "");
    if (!input) {
        throw new Error("File is empty or could not be read.");
    }

    const { rules, updates } = parseInput(input);
    console.log("Rules:", rules);
    console.log("Updates:", updates);
} catch (error) {
    console.error("Error:", error.message);
}
