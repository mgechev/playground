// https://leetcode.com/problems/h-index/
const hIndex = c => {
    c.sort((a, b) => a - b);
    if (c.at(-1) === 0) {
        return 0;
    }
    let h = 0;
    for (let i = c.length - 1; i >= 0; i--) {
        const e = c[i];
        if (e <= h) {
            return h;
        }
        h++;
    }
    return h;
};
