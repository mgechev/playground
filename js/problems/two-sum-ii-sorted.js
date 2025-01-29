const binarySearch = (num, arr, left, right) => {
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === num) {
            return mid;
        } else if (arr[mid] > num) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return -1;
};

const twoSum = (numbers, target) => {
    for (let i = 0; i < numbers.length; i++) {
        const c = numbers[i];
        const nextIdx = binarySearch(target - c, numbers, i, numbers.length);
        if (nextIdx !== -1) {
            return [i + 1, nextIdx + 1];
        }
    }
    return undefined;
};
