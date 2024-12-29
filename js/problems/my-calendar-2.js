// https://leetcode.com/problems/my-calendar-ii/

class MyCalendarTwo {
    constructor() {
        this.events = [];
        this.line = {};
        this.idx = [];
    }

    book(startTime, endTime) {
        const line = this.line;
        line[startTime] = (line[startTime] ?? 0) + 1;
        line[endTime] = (line[endTime] ?? 0) - 1;

        sortedInsert(this.idx, startTime);
        sortedInsert(this.idx, endTime);

        let maxTotal = 0;
        let current = 0;
        for (const el of this.idx) {
            if (line[el] === undefined) {
                continue;
            }
            current += line[el];
            maxTotal = Math.max(current, maxTotal);
        }

        if (maxTotal >= 3) {
            line[startTime] -= 1;
            line[endTime] += 1;
            return false;
        }
        this.events.push([startTime, endTime]);
        return true;
    }
}

const sortedInsert = (nums, idx) => {
    if (!nums.length) {
        nums.push(idx);
        return;
    }
    if (nums[0] > idx) {
        nums.unshift(idx);
    }
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] === idx || nums[i + 1] === idx) return;
        if (nums[i] < idx && nums[i + 1] > idx) {
            nums.splice(i + 1, 0, idx);
            return;
        }
    }
    nums.push(idx);
};

