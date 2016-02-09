import {TOKEN_TYPES} from './lex';
/*

# Grammer

program := expression*
expression := conditional | loop | assignment | print
conditional := if (assignment) { assignment }
loop := while (assignment) { assignment }
assignment := (identifier '=')? additive ';'
additive := multiplicative ((+|-) multiplicative)*
multiplicative := term ((*|/) term)*
term := (additive) | num | identifier | -(additive)

*/

class AST {
  constructor(token) {
    this.token = token;
  }
}

export class Print extends AST {
  constructor(token, expr) {
    super(token);
    this.expression = expr;
  }
}

export class If extends AST {
  constructor(token, cond, expr) {
    super(token);
    this.condition = cond;
    this.expressions = expr;
  }
}

export class While extends AST {
  constructor(token, cond, expr) {
    super(token);
    this.condition = cond;
    this.expressions = expr;
  }
}

export class Identifier extends AST {
  constructor(token) {
    super(token);
    this.id = token.lexeme;
  }
}

export class Assignment extends AST {
  constructor(token, identifier, binOp) {
    super(token);
    this.id = identifier;
    this.expression = binOp;
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

export class UnaryOp extends AST {
  constructor(token, right) {
    super(token);
    this.operator = token.lexeme;
    this.right = right;
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
  eat(lexeme) {
    let c = this.current();
    if (this.end()) {
      throw new Error(`Expecting "${lexeme}" but reached the end.`);
    }
    if (c.lexeme !== lexeme) {
      throw new Error(`Unexpected token "${c.lexeme}". Expected "${lexeme}" on (${c.row}, ${c.col}).`);
    }
    this.advance();
  }
  lookAhead(lexeme, type) {
    this.advance();
    let c = this.current();
    if (c.lexeme === lexeme && c.token === type) {
      this.back();
      return true;
    }
    this.back();
    return false;
  }
  parseProgram() {
    let expressions = [];
    while (!this.end()) {
      expressions.push(this.parseExpression());
    }
    return expressions;
  }
  parseExpression() {
    let c = this.current();
    if (c.lexeme === 'if') {
      return this.parseIf();
    } else if (c.lexeme === 'while') {
      return this.parseWhile();
    } else if (c.lexeme === 'print') {
      return this.parsePrint();
    } else {
      return this.parseAssignment();
    }
  }
  parseIf() {
    return this.parseBlockStatement(If, 'if');
  }
  parseWhile() {
    return this.parseBlockStatement(While, 'while');
  }
  parseBlockStatement(ctr, op) {
    let token = this.current();
    this.eat(op);
    this.eat('(');
    let condition = this.parseAssignment();
    this.eat(')');
    this.eat('{');
    let c = this.current();
    let body = [];
    while (c.lexeme !== '}' && !this.end()) {
      body.push(this.parseExpression());
      c = this.current();
    }
    this.eat('}');
    return new ctr(token, condition, body);
  }
  parsePrint() {
    let token = this.current();
    this.eat('print');
    let expr = this.parseAssignment();
    return new Print(token, expr);
  }
  parseAssignment() {
    let c = this.current();
    if (c.token === TOKEN_TYPES.IDENTIFIER && this.lookAhead('=', TOKEN_TYPES.OPERATOR)) {
      let id = c;
      this.advance();
      let token = this.current();
      this.eat('=');
      let result = this.parseAdditive();
      this.eat(';');
      return new Assignment(token, new Identifier(id), result);
    } else {
      let res = this.parseAdditive();
      this.eat(';');
      return res;
    }
  }
  parseAdditive() {
    let c = this.current();
    let left = this.parseMultiplicative();
    let result = left;
    let op = this.current();
    while (!this.end() && op.lexeme !== ';') {
      op = this.current();
      if (op && op.lexeme !== ';' && (op.lexeme === '+' || op.lexeme === '-')) {
        this.advance();
        result = new BinOp(op, left, this.parseAdditive());
      } else {
        break;
      }
    }
    return result;
  }
  parseMultiplicative() {
    let c = this.current();
    let left = this.parseTerm();
    let result = left;
    let op = this.current();
    while (!this.end() && op.lexeme !== ';') {
      op = this.current();
      if (op && op.lexeme !== ';' && (op.lexeme === '*' || op.lexeme === '-')) {
        this.advance();
        result = new BinOp(op, left, this.parseMultiplicative());
      } else {
        break;
      }
    }
    return result;
  }
  parseTerm() {
    let c = this.current();
    this.advance();
    let result;
    if (c.lexeme === '(') {
      result = this.parseAdditive();
      this.eat(')');
    } else if (c.lexeme === '-') {
      result = new UnaryOp(c, this.parseAdditive());
    } else {
      if (c.token === TOKEN_TYPES.IDENTIFIER) {
        result = new Identifier(c);
      } else if (c.token === TOKEN_TYPES.NUM) {
        result = new Num(c);
      } else {
        throw new Error(`Unexpected token on (${c.row}, ${c.col}). Expecting term but got "${c.lexeme}".`);
      }
    }
    return result;
  }
}

