// https://leetcode.com/problems/find-all-anagrams-in-a-string/
class Freq {
    constructor() {
        this.freq = [];
        this.total = 0;
    }

    build(p) {
        for (let i = 0; i < p.length; i++) {
            this.add(p[i]);
        }
    }

    remove(p) {
        const idx = p.charCodeAt(0) - 'a'.charCodeAt(0)
        if (this.freq[idx]) {
            this.total--;
            this.freq[idx]--;
            return true;
        }
        return false;
    }

    done() {
        return this.total === 0;
    }

    add(p) {
        const idx = p.charCodeAt(0) - 'a'.charCodeAt(0)
        this.freq[idx] = this.freq[idx] || 0;
        this.freq[idx]++;
        this.total++;
    }

    clone() {
        const f = new Freq();
        f.total = this.total;
        f.freq = this.freq.slice();
        return f;
    }
}

const findAnagrams = (s, p) => {
    const f = new Freq();
    f.build(p);
    const result = [];
    for (let i = 0; i < s.length - p.length + 1; i++) {
        const current = f.clone();
        let skip = false;
        for (let j = 0; j < p.length && !skip; j++) {
            if (!current.remove(s[i + j])) {
                skip = true;
            } else if (current.done()) {
                skip = true;
                result.push(i);
            }
        }
    }
    return result;
};
