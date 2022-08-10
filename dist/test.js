"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
let test = `"a","b","c"
"a
y", "z""y""", "x, y, y",
"a Again, but with a ""double quote"" in it", "bx", "c has a comma, too, but everything here is mising?",
"a, with a comma
and a newline",              "b has a lot of space in front", "c   has space after              "`;
let result = (0, _1.parse)(test);
console.log(result);
