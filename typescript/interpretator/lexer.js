var Lexer = (function () {
    function Lexer(input) {
        this.input = input;
        this.index = -1;
    }
    Lexer.prototype.peek = function () {
        return this.current = this.input[++this.index];
    };
    Lexer.prototype.lex = function () {
        while (this.peek()) {
        }
    };
    return Lexer;
})();
exports.Lexer = Lexer;
var Token = (function () {
    function Token(value, type) {
        this.value = value;
        this.type = type;
    }
    return Token;
})();
exports.Token = Token;
var TokenType;
(function (TokenType) {
    TokenType[TokenType["OPERATOR"] = 0] = "OPERATOR";
    TokenType[TokenType["KEYWORD"] = 1] = "KEYWORD";
    TokenType[TokenType["NUMBER"] = 2] = "NUMBER";
    TokenType[TokenType["STRING"] = 3] = "STRING";
    TokenType[TokenType["IDENTIFIER"] = 4] = "IDENTIFIER";
    TokenType[TokenType["CHARACTER"] = 5] = "CHARACTER";
})(TokenType || (TokenType = {}));
exports.TokenType = TokenType;
var KEYWORDS = [
    'if', 'else', 'let', 'print'
];
function isDigit(input) {
    return /^\d$/.test(input);
}
function isIdentifier(input) {
    return /^[a-zA-Z_-$]$/.test(input);
}
function isOperator(input) {
    return /^[+*\/-%]$/.test(input);
}
