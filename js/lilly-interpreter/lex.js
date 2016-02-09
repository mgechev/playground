export const TOKEN_TYPES = {
  PAR: 0,
  BLOCK: 1,
  NUM: 2,
  OPERATOR: 3,
  IDENTIFIER: 4,
  KEYWORD: 5,
  SEMICOLON: 6
};

export class Token {
  constructor(token, lex, col, row) {
    this.token = token;
    this.lexeme = lex;
    this.col = col;
    this.row = row;
  }
}

export class Lexer {
  constructor(str) {
    this.col = 0;
    this.row = 0;
    this.current = 0;
    this.str = str;
    this.strMap = [];
    let col = 0;
    let row = 0;
    for (let i = 0; i < str.length; i += 1) {
      if (str[i] === '\n') {
        this.strMap[row] = col - 1;
        col = 0;
        row += 1;
      } else {
        col += 1;
      }
    }
  }
  advance() {
    this.col += 1;
    this.current += 1;
  }
  back() {
    this.col -= 1;
    if (this.col < 0) {
      this.row -= 1;
      this.col = this.strMap[this.row];
    }
    this.current -= 1;
  }
  done() {
    return this.current >= this.str.length;
  }
  currentChar() {
    return this.str[this.current];
  }
  isDigit() {
    return /^\d$/.test(this.currentChar());
  }
  isOperator() {
    return /^[*/+-=%]$/.test(this.currentChar());
  }
  isPar() {
    return /^\(|\)$/.test(this.currentChar());
  }
  isBlockPar() {
    return /^\{|\}$/.test(this.currentChar());
  }
  isKeyword(str) {
    return /^if|while|print$/.test(str);
  }
  isChar() {
    return /^[a-zA-Z_\-]$/.test(this.currentChar());
  }
  readCharSequence() {
    let str = '';
    while (this.isChar()) {
      str += this.currentChar();
      this.advance();
    }
    this.back();
    return str;
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
  isNewline() {
    return /^\n$/.test(this.currentChar());
  }
  isSemicolon() {
    return this.currentChar() === ';';
  }
  lex() {
    let tokens = [];
    while (!this.done()) {
      let current = this.current;
      let col = this.col;
      let lexeme;
      let token;
      if (this.isDigit()) {
        lexeme = this.readNumber();
        token = new Token(TOKEN_TYPES.NUM, lexeme, col, this.row);
      } else if (this.isOperator()) {
        lexeme = this.currentChar();
        token = new Token(TOKEN_TYPES.OPERATOR, lexeme, col, this.row);
      } else if (this.isPar()) {
        lexeme = this.currentChar();
        token = new Token(TOKEN_TYPES.PAR, lexeme, col, this.row);
      } else if (this.isChar()) {
        lexeme = this.readCharSequence();
        let type = TOKEN_TYPES.IDENTIFIER;
        if (this.isKeyword(lexeme)) {
          type = TOKEN_TYPES.KEYWORD;
        }
        token = new Token(type, lexeme, col, this.row);
      } else if (this.isNewline()) {
        this.row += 1;
        this.col = 0;
        this.advance();
      } else if (this.isSemicolon()) {
        token = new Token(TOKEN_TYPES.SEMICOLON, ';', col, this.row);
      } else if (this.isBlockPar()) {
        token = new Token(TOKEN_TYPES.BLOCK, this.currentChar(), col, this.row);
      } else if (this.isWhitespace()) {
         this.skipWhitespace();
      } else {
        throw new Error(`Unknown token type at (${this.row}, ${this.col}) row ${this.currentChar()}`);
      }
      token && tokens.push(token);
      this.advance();
    }
    return tokens;
  }
}
