%start Expr
%%
Expr: Expr "-" Expr
    | Expr "*" Expr
    | "INT"
    ;