class Lexer {
  private current:string;
  private index = -1;
  constructor(private input:string) {}
  private peek() {
    return this.current = this.input[++this.index];
  }
  public lex() {
    while (this.peek()) {
    }
  }
}

class Token {
  constructor(public value:any, public type:TokenType){}
}

enum TokenType {
  OPERATOR,
  KEYWORD,
  NUMBER,
  STRING,
  IDENTIFIER,
  CHARACTER
}

const KEYWORDS = [
  'if', 'else', 'let', 'print'
];

function isDigit(input:string):boolean {
  return /^\d$/.test(input);
}

function isIdentifier(input:string):boolean {
  return /^[a-zA-Z_-$]$/.test(input);
}

function isOperator(input:string):boolean {
  return /^[+*\/-%]$/.test(input);
}

export {
  Lexer,
  Token,
  TokenType
};
