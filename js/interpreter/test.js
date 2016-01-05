import {Lexer} from './lex';
import {Parser} from './parser';
import {Interpreter} from './interpreter';

let program = '11 + 2 * 3';
let lexer = new Lexer(program);
let parser = new Parser(lexer.lex());
let interpreter = new Interpreter(parser.parse());
console.log(interpreter.interpret());
