// https://leetcode.com/problems/find-k-closest-elements/
const binarySearch = (arr, el) => {
    let left = 0;
    let right = arr.length;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === el) {
            return mid;
        } else if (arr[mid] > el) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    if (left >= arr.length) {
        return arr.length - 1;
    }
    if (left < 0) {
        return 0;
    }
    while (closer(arr[left - 1], arr[left], el)) left--;
    while (closer(arr[left + 1], arr[left], el)) left++;
    return left;
};

const closer = (a, b, x) => {
    const ad = Math.abs(a - x);
    const bd = Math.abs(b - x);
    if (ad === bd) {
        return a < b;
    }
    if (ad < bd) {
        return true;
    }
    return false;
};

const findClosestElements = (arr, k, x) => {
    if (k === arr.length) {
        return arr;
    }

    if (k === 0) {
        return [];
    }

    const closest = binarySearch(arr, x);
    const result = [arr[closest]];
    let left = closest - 1;
    let right = closest + 1;

    while (result.length < k) {

        if (arr[left] === arr[right] && arr[left] !== undefined) {
            result.push(arr[left]);
            left--;
            if (result.length < k) {
                result.push(arr[right]);
                right++;
            }
            continue;
        }

        if (left >= 0 && closer(arr[left], arr[right], x)) {
            result.push(arr[left]);
            left--;
            continue;
        }
        if (right < arr.length && closer(arr[right], arr[left], x)) {
            result.push(arr[right]);
            right++;
            continue;
        }
        if (right >= arr.length) {
            result.push(arr[left]);
            left--;
            continue;
        }
        if (left < 0) {
            result.push(arr[right]);
            right++;
            continue;
        }
    }

    return result.sort((a, b) => a - b);
};
