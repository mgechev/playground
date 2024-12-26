/**
 * @param {string[]} tokens
 * @return {number}
 */
const evalRPN = tokens => {
  const numeric = [];
  for (let el of tokens) {
    const num = parseInt(el);
    if (isNaN(num)) {
       numeric.push(el);
    } else {
       numeric.push(num);
    }
  }

  const transient = [];
  while (transient.length + numeric.length > 1) {
    const el = numeric.shift();
    if (isOperator(el)) {
      const result = calculate[el](transient.pop(), transient.pop());
      numeric.unshift(result);
    } else {
      transient.push(el);
    }
  }
  return numeric[0];
};

const operators = new Set(['+', '-', '*', '/']);
const calculate = {
  '+': (a, b) => b + a,
  '-': (a, b) => b - a,
  '*': (a, b) => b * a,
  '/': (a, b) => {
    const number = b / a;
    return Math[number < 0 ? 'ceil' : 'floor'](number);
  }
};

const isOperator = el => operators.has(el);


//console.log(evalRPN(["2","1","+","3","*"]));
console.log(evalRPN(["4","13","5","/","+"]));
//console.log(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]));


