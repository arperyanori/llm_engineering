function* lcg(seed, a = 1664525, c = 1013904223, m = 2 ** 32) {
    let value = seed;
    while (true) {
        value = (a * value + c) % m;
        yield value;
    }
}

function maxSubarraySum(n, seed, minVal, maxVal) {
    const lcgGen = lcg(seed);
    const randomNumbers = Array.from({ length: n }, () => (lcgGen.next().value % (maxVal - minVal + 1)) + minVal);
    let maxSum = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < n; i++) {
        let currentSum = 0;
        for (let j = i; j < n; j++) {
            currentSum += randomNumbers[j];
            if (currentSum > maxSum) {
                maxSum = currentSum;
            }
        }
    }
    return maxSum;
}

function totalMaxSubarraySum(n, initialSeed, minVal, maxVal) {
    let totalSum = 0;
    const lcgGen = lcg(initialSeed);
    for (let i = 0; i < 20; i++) {
        const seed = lcgGen.next().value;
        totalSum += maxSubarraySum(n, seed, minVal, maxVal);
    }
    return totalSum;
}

// Parameters
const n = 10000;         // Number of random numbers
const initialSeed = 42;  // Initial seed for the LCG
const minVal = -10;      // Minimum value of random numbers
const maxVal = 10;       // Maximum value of random numbers

// Timing the function
const startTime = performance.now();
const result = totalMaxSubarraySum(n, initialSeed, minVal, maxVal);
const endTime = performance.now();

console.log("Total Maximum Subarray Sum (20 runs):", result);
console.log("Execution Time: " + ((endTime - startTime) / 1000).toFixed