// https://leetcode.com/problems/maximum-swap/
/**
 * @param {number} num
 * @return {number}
 */
const maximumSwap = num => {
    const strArr = num.toString().split('');
    const nums = strArr.map(e => parseInt(e)).sort((a, b) => b - a);
    const str = num.toString();
    for (let i = 0; i < str.length; i++) {
        if (parseInt(str[i]) === nums[i]) {
            continue;
        }
        const strNum = nums[i].toString();
        for (let j = str.length - 1; j > i; j--) {
            if (strNum === str[j]) {
                const temp = strArr[i];
                strArr[i] = strArr[j];
                strArr[j] = temp;
                return parseInt(strArr.join(''));
            }
        }
    }
    return num;
};
