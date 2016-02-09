import {Lexer} from './lex';
import {Parser} from './parser';
import {Interpreter} from './interpreter';

let program = `
  foo = 42;
  while (foo;) {
    if (foo % 2;) {
      print foo;
    }
    foo = foo - 1;
  }
`;
let lexer = new Lexer(program);
let parser = new Parser(lexer.lex());
let interpreter = new Interpreter(parser.parseProgram());
interpreter.interpret();

