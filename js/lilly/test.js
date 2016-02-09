import {Lexer} from './lex';
import {Parser} from './parser';
import {Interpreter} from './interpreter';

let program = `
  a = 1 + 1 + 2 * 5;
  if (a;) {
    if (1;) {
      print a;
    }
  }
  print a;
`;
let lexer = new Lexer(program);
let parser = new Parser(lexer.lex());
// console.log(parser.parseProgram());
let interpreter = new Interpreter(parser.parseProgram());
interpreter.interpret();

