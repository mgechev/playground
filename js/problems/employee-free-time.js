// https://leetcode.com/problems/employee-free-time/submissions/1486655211/

const employeeFreeTime = schedule => {
  const freeTimes = getAllFreeTimes(schedule);
  const sorted = freeTimes.sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0] - b[0];
    }
    return a[1] === 'start' ? -1 : 1;
  });
  let balance = 0;
  let prev = undefined;
  const result = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    if (balance === 0 && prev !== undefined) {
      result.push({
        start: prev,
        end: sorted[i][0]
      });
    }
    balance += sorted[i][1] === 'start' ? 1 : -1;
    prev = sorted[i][0];
  }
  return result.filter(e => Number.isFinite(e.start) && Number.isFinite(e.end));
};

const getAllFreeTimes = schedule => {
    const result = [];
    for (let i = 0; i < schedule.length; i++) {
      for (let e of schedule[i]) {
        result.push([
          e.start,
          'start'
        ]);
        result.push([
          e.end,
          'end'
        ]);
      }
    }
    return result;
};


const schedule = [
  [
    {start: 1, end: 3},
    {start: 6, end: 7}
  ],
  [
    {start: 2, end: 4}
  ],
  [
    {start: 2, end: 5},
    {start: 9, end: 12}
  ]
];

const schedule1 = [
  [
    {start: 1,end: 2},
    {start: 5,end: 6}
  ],
  [
    {start: 1,end: 3}
  ],
  [
    {start: 4,end: 10}
  ]
];

const schedule2 = [
  [
    {
      "start": 7,
      "end": 24
    },
    {
      "start": 29,
      "end": 33
    },
    {
      "start": 45,
      "end": 57
    },
    {
      "start": 66,
      "end": 69
    },
    {
      "start": 94,
      "end": 99
    }
  ],
  [
    {
      "start": 6,
      "end": 24
    },
    {
      "start": 43,
      "end": 49
    },
    {
      "start": 56,
      "end": 59
    },
    {
      "start": 61,
      "end": 75
    },
    {
      "start": 80,
      "end": 81
    }
  ],
  [
    {
      "start": 5,
      "end": 16
    },
    {
      "start": 18,
      "end": 26
    },
    {
      "start": 33,
      "end": 36
    },
    {
      "start": 39,
      "end": 57
    },
    {
      "start": 65,
      "end": 74
    }
  ],
  [
    {
      "start": 9,
      "end": 16
    },
    {
      "start": 27,
      "end": 35
    },
    {
      "start": 40,
      "end": 55
    },
    {
      "start": 68,
      "end": 71
    },
    {
      "start": 78,
      "end": 81
    }
  ],
  [
    {
      "start": 0,
      "end": 25
    },
    {
      "start": 29,
      "end": 31
    },
    {
      "start": 40,
      "end": 47
    },
    {
      "start": 57,
      "end": 87
    },
    {
      "start": 91,
      "end": 94
    }
  ]
];

console.log(employeeFreeTime(schedule2));