// 1. Basic Timer - Countdown Timer Example
function countdownTimer(minutes) {
    let seconds = minutes * 60;
    const timer = setInterval(() => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        console.log(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
        if (seconds === 0) {
            console.log('Time is up!');
            clearInterval(timer);
        }
        seconds--;
    }, 1000);
}
countdownTimer(1); // 1-minute countdown

// 2. Performance Timing - Website Load Time
const startTime = performance.now();
performance.mark('pageStart');

// Simulate page load
setTimeout(() => {
    const endTime = performance.now();
    performance.mark('pageEnd');
    console.log(`Page loaded in ${endTime - startTime}ms`);
}, 2000);

// 3. Animation Frame - Moving Box
let position = 0;
function animateBox() {
    position += 5;
    console.log(`Box position: ${position}px`);
    if (position < 300) {
        requestAnimationFrame(animateBox);
    }
}
requestAnimationFrame(animateBox);

// 4. Node.js Specific - Server Cleanup Example
let serverCleanup = setTimeout(() => {
    console.log('Cleaning up server resources...');
}, 5000);
serverCleanup.unref(); // Allow process to exit

// Task Queue Priority Example
setImmediate(() => {
    console.log('Immediate task: Processing uploaded file');
});

process.nextTick(() => {
    console.log('NextTick: Validating user input');
});

queueMicrotask(() => {
    console.log('Microtask: Updating UI components');
});

// 5. Promise-based Delay - API Rate Limiting
async function fetchWithDelay(urls) {
    for (const url of urls) {
        await delay(1000); // Wait 1 second between requests
        console.log(`Fetching: ${url}`);
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Usage
const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3'
];

fetchWithDelay(urls);

// Cleanup Example
const immediateId = setImmediate(() => {
    console.log('This might be cancelled');
});
clearImmediate(immediateId);

// Performance Marks Example
performance.mark('startProcess');
setTimeout(() => {
    performance.mark('endProcess');
    console.log(`Process timing: ${performance.timeOrigin}`);
}, 1000);

// Animation Cancel Example
const animId = requestAnimationFrame(() => {
    console.log('Animation frame requested');
});
cancelAnimationFrame(animId);

// Complex Timer Example - Game Loop
class GameLoop {
    constructor() {
        this.fps = 60;
        this.running = false;
    }

    start() {
        this.running = true;
        this.loop();
    }

    stop() {
        this.running = false;
    }

    loop() {
        if (!this.running) return;

        // Game update logic here
        console.log('Game frame updated');

        setTimeout(() => {
            requestAnimationFrame(() => this.loop());
        }, 1000 / this.fps);
    }
}

const game = new GameLoop();
game.start();
setTimeout(() => game.stop(), 5000); // Stop after 5 seconds