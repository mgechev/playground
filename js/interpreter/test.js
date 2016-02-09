import {Lexer} from './lex';
import {Parser} from './parser';
import {Interpreter} from './interpreter';

let program = `
  a = -42;
  while (a;) {
    print a;
    a = a + 1;
  }
`;
let lexer = new Lexer(program);
let parser = new Parser(lexer.lex());
// console.log(parser.parseProgram());
let interpreter = new Interpreter(parser.parseProgram());
interpreter.interpret();
