// https://leetcode.com/problems/insert-delete-getrandom-o1/
var RandomizedSet = function() {
   this.items = new Set(); 
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    if (this.items.has(val)) {
        return false;
    }
    this.items.add(val);
    return true;
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if (!this.items.has(val)) {
        return false;
    }
    this.items.delete(val);
    return true;
};

/**
 * That's more of a O(n)
 */
RandomizedSet.prototype.getRandom = function() {
    const items = Array.from(this.items);
    return items[Math.floor(Math.random() * items.length)]
};
