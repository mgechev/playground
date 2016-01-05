import {TOKEN_TYPES} from './lex';
/*

# Grammer

expr := additive
additive := multiplicative ((+|-) multiplicative)*
multiplicative := term ((*|/) term)*
term := (expr) | num | -num

*/

class AST {
  constructor(token) {
    this.token = token;
  }
}

export class BinOp extends AST {
  constructor(token, left, right) {
    super(token);
    this.left = left;
    this.operator = token.lexeme;
    this.right = right;
  }
}

export class Num extends AST {
  constructor(token) {
    super(token);
    this.num = token.lexeme;
  }
}

export class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.pos = 0;
  }
  current() {
    return this.tokens[this.pos];
  }
  end() {
    return this.pos >= this.tokens.length;
  }
  advance() {
    this.pos += 1;
  }
  back() {
    this.pos -= 1;
  }
  parse() {
    return this.parseExpr();
  }
  parseExpr() {
    return this.parseAdditive();
  }
  // 1 + 2
  parseAdditive() {
    while (!this.end()) {
      let left = this.parseMultiplicative();
      let op = this.current();
      this.advance();
      if (op && (op.lexeme === '+' || op.lexeme === '-')) {
        let right = this.parseMultiplicative();
        return new BinOp(op, left, right);
      } else {
        this.back();
        return left;
      }
    }
  }
  parseMultiplicative() {
    while (!this.end()) {
      let left = this.parseTerm();
      let op = this.current();
      this.advance();
      if (op && (op.lexeme === '*' || op.lexeme === '/')) {
        let right = this.parseTerm();
        return new BinOp(op, left, right);
      } else {
        this.back();
        return left;
      }
    }
  }
  parseTerm() {
    let current = this.current();
    let result;
    if (current.lexeme === '(') {
      this.advance();
      result = this.parseExpr();
      this.advance();
    } else if (typeof current.lexeme === 'number') {
      this.advance();
      result = new Num(current);
    } else if (current.lexeme === '-') {
      this.advance();
      result = new Num(-this.current().lexeme);
    }
    return result;
  }
}

