// TopCoder http://community.topcoder.com/stat?c=problem_statement&pm=13485

function getMaxSequence(sequences) {
  'use strict';
  return sequences.reduce(function (prev, seq) {
    if (prev.end - prev.start < seq.end - seq.start) {
      return seq;
    }
    return prev;
  }, sequences.pop());
}

function removeDuplicates(sequences) {
  'use strict';
  var dups = {};
  return sequences.filter(function (e) {
    var key = JSON.stringify(e);
    if (dups[key]) {
      return false;
    }
    dups[key] = true;
    return true;
  });
}

function compareFloats(a, b) {
  'use strict';
  var epsilon = 0.005;
  if (Math.abs(a - b) <= epsilon) {
    return true;
  }
  return false;
}

function compare(ratio, a, b, a1, b1, rating, date) {
  'use strict';
  var startR = rating[a],
      endR = rating[b],
      startD = date[a],
      endD = date[b],
      startR1 = rating[a1],
      endR1 = rating[b1],
      startD1 = date[a1],
      endD1 = date[b1];
  if (!compareFloats((endR1 - startR1) / (endR - startR), ratio)) {
    return false;
  }
  if (!compareFloats((endD1 - startD1) / (endD - startD), ratio)) {
    return false;
  }
  return true;
}

function isSimilar(start, end, dupStart, dupEnd, rating, date) {
  'use strict';
  if (Math.abs(start - end) !== Math.abs(dupStart - dupEnd)) {
    return false;
  }
  if (start === dupStart && end === dupEnd) {
    return false;
  }
  if (Math.abs(start - end) <= 1) {
    return true;
  }
  var ratio = (rating[dupEnd] - rating[dupStart]) / (rating[end] - rating[start]);
  for (var i = 0; i < end - start; i += 1) {
    if (!compare(ratio, start + i, start + i + 1, dupStart + i, dupStart + i + 1, rating, date)) {
      return false;
    }
  }
  return true;
}

function findLen(start, end, x, y) {
  'use strict';
  var sum = 0;
  for (var i = start; i < end; i += 1) {
    sum += Math.sqrt(Math.pow(x[i] - x[i + 1], 2) + Math.pow(y[i] - y[i + 1], 2));
  }
  return sum;
}

// Could be optimized dramatically, right now it has complexity O(n^4)
// but we don't need to check every possible combination of points
// but only the polylines with the same length.
function maxLength(rating, date) {
  'use strict';
  var sequences = [];
  for (var start = 0; start < rating.length; start += 1) {
    for (var current = start; current < rating.length; current += 1) {
      for (var dupStart = 0; dupStart < rating.length; dupStart += 1) {
        for (var dupCurrent = dupStart; dupCurrent < rating.length; dupCurrent += 1) {
          if (isSimilar(start, current, dupStart, dupCurrent, rating, date)) {
            sequences.push({
              start: start,
              end: current,
              dupStart: dupStart,
              dupEnd: dupCurrent,
            });
          }
        }
      }
    }
  }
  var res = getMaxSequence(removeDuplicates(sequences));
  return Math.max(findLen(res.dupStart, res.dupEnd, rating, date), findLen(res.start, res.end, rating, date));
}

/*
{1,2,4,8,16,32}
{1,2,4,8,16,32}
*/

//var rating = [1, 2, 4, 8, 16, 32];
//var date = [1, 2, 4, 8, 16, 32];

/*
{1,2,3,4}
{1700,1800,1750,1850}
*/
//var rating = [1, 2, 3, 4];
//var date = [1700, 1800, 1750, 1850];

//var rating = [81,104,120,124,134,137];
//var date = [1866,2332,2510,2678,2876,3002];

//var rating = [10,11,13,15,19];
//var date = [10,14,15,23,25];


//var rating = [5,11,25,58,92,162,255,350,458,566,677,792,919,1051,1189,1331,1489,1673,1882,2093,2315,2541,2771,3012,3254,3524,3797,4087,4379,4675,4973,5278,5588,5904,6225,6550,6888,7249,7612,8018,8428,8847,9267,9688,10109,10530,10964,11407,11870,12340,12811,13288,13768,14249,14734,15242,15774,16306,16847,17400,17966,18533,19108,19692,20278,20871,21471,22074,22679,23297,23916,24553,25190,25829,26472,27135,27814,28497,29181,29865,30555,31272,31994,32729,33487,34246,35005,35764,36537,37326,38119,38913,39725,40538,41360,42185,43010,43840,44671,45509,46350,47205,48063,48932,49807,50691,51577,52464,53289,54119,54950,55788,56629,57484,58342,59211,60086,60970,61856,62743,63568,64398,65388];
//var date = [1505,1462,1436,1416,1463,1421,1411,1450,1497,1465,1423,1394,1391,1367,1358,1323,1310,1279,1268,1279,1311,1342,1359,1387,1414,1376,1424,1382,1373,1335,1359,1318,1275,1266,1227,1203,1168,1163,1184,1144,1169,1207,1250,1235,1209,1162,1124,1148,1168,1202,1190,1155,1179,1194,1195,1195,1203,1240,1218,1245,1220,1190,1208,1180,1182,1148,1139,1126,1152,1159,1147,1158,1112,1091,1101,1116,1123,1086,1126,1110,1128,1085,1132,1145,1135,1140,1117,1081,1120,1131,1081,1032,1071,1102,1071,1065,1068,1027,980,947,987,968,959,980,990,974,1003,996,999,958,911,878,918,899,890,911,921,905,934,927,930,889,844];
//console.log(maxLength(rating, date));