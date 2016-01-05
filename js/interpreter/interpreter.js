import {BinOp, Num} from './parser';

export class Interpreter {
  constructor(ast) {
    this.ast = ast;
  }
  interpret() {
    return this.visit(this.ast);
  }
  visit(ast) {
    if (ast instanceof BinOp) {
      return this.visitBinOp(ast);
    } else if (ast instanceof Num) {
      return this.visitNum(ast);
    } else {
      throw new Error('Unsupported AST node');
    }
  }
  visitNum(ast) {
    return ast.num;
  }
  visitBinOp(ast) {
    switch (ast.operator) {
      case '+':
        return this.visit(ast.left) + this.visit(ast.right);
        break;
      case '-':
        return this.visit(ast.left) - this.visit(ast.right);
        break;
      case '/':
        return this.visit(ast.left) / this.visit(ast.right);
        break;
      case '*':
        return this.visit(ast.left) * this.visit(ast.right);
        break;
    }
  }
}


