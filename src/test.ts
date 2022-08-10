import { parse } from ".";

let test = `"a","b","c"
"a
y", "z""y""", "x, y, y",
"a Again, but with a ""double quote"" in it", "bx", "c has a comma, too, but everything here is mising?",
"a, with a comma
and a newline",              "b has a lot of space in front", "c   has space after              "`;


let result = parse(test);

console.log(result);