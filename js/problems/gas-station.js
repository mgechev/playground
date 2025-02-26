// https://leetcode.com/problems/gas-station/
const loopPossible = (current, gas, cost) => {
    let total = gas.length;
    let inTank = 0;
    while (total) {
        total--;

        inTank += gas[current];
        inTank -= cost[current];

        if (inTank < 0) {
            return false;
        }

        current++;
        current = current % gas.length;
    }
    return true;
};

const canCompleteCircuit = (gas, cost) => {
    for (let i = 0; i < gas.length; i++) {
        if (loopPossible(i, gas, cost)) {
            return i;
        }
    }
    return -1;
};
