// https://leetcode.com/problems/permutation-in-string/
const eq = (a, b) => {
    const ak = Object.keys(a);
    const bk = Object.keys(b);
    const allkeys = ak.concat(bk);
    for (const k of allkeys) {
        if ((a[k] || b[k]) && a[k] !== b[k]) {
            return false;
        }
    }
    return true;
}

const checkInclusion = (s1, s2) => {
    if (s1.length > s2.length) {
        return false;
    }
    const f1 = {};
    for (let i = 0; i < s1.length; i++) {
        f1[s1[i]] = f1[s1[i]] || 0;
        f1[s1[i]]++;
    }
    const f2 = {};
    for (let i = 0; i < s2.length; i++) {
        if (i - s1.length >= 0) {
            f2[s2[i - s1.length]]--;
        }
        f2[s2[i]] = f2[s2[i]] || 0;
        f2[s2[i]]++;
        if (eq(f1, f2)) {
            return true;
        }
    }
    return false;
};const eq = (a, b) => {
    const ak = Object.keys(a);
    const bk = Object.keys(b);
    const allkeys = ak.concat(bk);
    for (const k of allkeys) {
        if ((a[k] || b[k]) && a[k] !== b[k]) {
            return false;
        }
    }
    return true;
}

const checkInclusion = (s1, s2) => {
    if (s1.length > s2.length) {
        return false;
    }
    const f1 = {};
    for (let i = 0; i < s1.length; i++) {
        f1[s1[i]] = f1[s1[i]] || 0;
        f1[s1[i]]++;
    }
    const f2 = {};
    for (let i = 0; i < s2.length; i++) {
        if (i - s1.length >= 0) {
            f2[s2[i - s1.length]]--;
        }
        f2[s2[i]] = f2[s2[i]] || 0;
        f2[s2[i]]++;
        if (eq(f1, f2)) {
            return true;
        }
    }
    return false;
};
