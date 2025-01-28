// https://leetcode.com/problems/find-the-length-of-the-longest-common-prefix/

class Trie {
    constructor() {
        this.data = {};
    }

    add(str) {
        let data = this.data;
        for (let i = 0; i < str.length; i++) {
            const c = str[i];
            data[c] = data[c] ?? {};
            data = data[c];
        }
    }

    getExistingPrefix(str) {
        let data = this.data;
        let prefix = '';
        for (let i = 0; i < str.length; i++) {
            const c = str[i];
            if (data[c] === undefined) {
                return prefix;
            }
            data = data[c];
            prefix += c;
        }
        return prefix;
    }
}

const longestCommonPrefix = (arr1, arr2) => {
    const trie = new Trie();
    arr1.forEach(e => trie.add(e.toString()));
    let result = 0;
    for (const num of arr2) {
        const str = num.toString();
        const prefix = trie.getExistingPrefix(str);
        if (prefix.length > result) {
            result = prefix.length;
        }
    }
    return result;
};
