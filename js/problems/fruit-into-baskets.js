// https://leetcode.com/problems/fruit-into-baskets/
const totalFruit = fruits => {
    if (fruits.length < 2) {
        return fruits.length;
    }
    let left = 0;
    let right = 1;
    let picked = new Set([fruits[left], fruits[right]]);
    let total = 1;
    let max = total;
    while (right < fruits.length) {
        if (picked.has(fruits[right])) {
            total++;
            right++;
        } else if (!picked.has(fruits[right]) && picked.size === 1) {
            while (fruits[right] === fruits[left]) right++;
            left = right - 1;
            picked.add(fruits[right]);
            total++;
            right++;
        } else {
            left++;
            if (left + 1 >= fruits.length) {
                break;
            }
            right = left + 1;
            picked = new Set([fruits[left], fruits[right]]);
            total = 1;
        }
        max = Math.max(max, total);
    }
    return max;
};
