export const TOKEN_TYPES = {
  PAR: 0,
  NUM: 1,
  OPERATOR: 2
};

export class Token {
  constructor(token, lex, pos) {
    this.token = token;
    this.lexeme = lex;
    this.position = pos;
  }
}


export class Lexer {
  constructor(str) {
    this.pos = 0;
    this.str = str;
  }
  advance() {
    this.pos += 1;
  }
  back() {
    this.pos -= 1;
  }
  done() {
    return this.pos >= this.str.length;
  }
  currentChar() {
    return this.str[this.pos];
  }
  isDigit() {
    return /^\d$/.test(this.currentChar());
  }
  isOperator() {
    return /^[*/+-]$/.test(this.currentChar());
  }
  isPar() {
    return /^\(|\)$/.test(this.currentChar());
  }
  readNumber() {
    let num = '';
    while (this.isDigit()) {
      num += this.currentChar();
      this.advance();
    }
    this.back();
    return parseInt(num, 10);
  }
  skipWhitespace() {
    while (this.isWhitespace()) {
      this.advance();
    }
    this.back();
  }
  isWhitespace() {
    return /^\s$/.test(this.currentChar());
  }
  lex() {
    let tokens = [];
    while (!this.done()) {
      let pos = this.pos;
      let lexeme;
      let token;
      if (this.isDigit()) {
        lexeme = this.readNumber();
        token = new Token(TOKEN_TYPES.NUM, lexeme, pos);
      } else if (this.isOperator()) {
        lexeme = this.currentChar();
        token = new Token(TOKEN_TYPES.OPERATOR, lexeme, pos);
      } else if (this.isPar()) {
        lexeme = this.currentChar();
        token = new Token(TOKEN_TYPES.PAR, lexeme, pos);
      } else if (this.isWhitespace()) {
        this.skipWhitespace();
      } else {
        throw new Error(`Unknown token type at ${this.pos} row`);
      }
      token && tokens.push(token);
      this.advance();
    }
    return tokens;
  }
}
