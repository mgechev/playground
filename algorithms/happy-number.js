// https://leetcode.com/problems/happy-number/
const isHappy = n => {
    if (n === 1) {
        return true;
    }
    let bak = n;
    let seen = {};
    seen[n] = true;
    while (true) {
        const digits = [];
        while (n) {
            let last = n % 10;
            digits.push(last * last);
            n = Math.floor(n / 10);
        }

        n = digits.reduce((c, p) => c + p, 0);
        if (seen[n]) {
            return false;
        }

        seen[n] = true;

        if (n === 1) {
            return true;
        }
    }
    return false;
};

