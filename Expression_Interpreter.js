// Edward Lee
// CISC3160
// Professor Zhou


var calculate = { 
  "+": function (a, b) 
  { 
    return "Result: " + a + b;
  }, 
  "-": function (a, b) 
  { 
    return "Result: " + a - b;
  }, 
  "*": function (a, b) 
  { 
    return "Result: " + a * b ;
  }, 
  "/": function (a, b) 
  { 
    return "Result: " + a / b;
  }
}; 
 
// Split text
var tokenizer = function (text) { 
  var tokens = text.replace(/\(/g, " ( ").replace(/\)/g, " ) ").split(" "); 
  return tokens.filter(function (n) { return $.trim(n) != "" }); 
}; 
  
// Put syntax in tree. 
var evaluate = function (tree) { 
  if (!isNaN(tree)) 
  {  	 
    return tree; 
  } 
  else 
  { 
    var t = tree.shift(); 
    return t.apply(null, tree.map(evaluate)); 
  } 
}; 
 

// Recursive parse function
var parse = function (tokens) {
  var curr = tokens.shift();
  if (curr == "(") 
  {
    var expression = [];
    while (tokens[0] != ")") {
      expression.push(parse(tokens));
    } 
    tokens.shift();
    return expression;
  }
  else if (calculate.hasOwnProperty(curr)) 
  {
    return calculate[curr];
  }
  else if (!isNaN(curr)) 
  {
    return parseFloat(curr);
  }
  else 
  {
    return "Expression contain error(s)";
  }
}; 

function exceute() {
  var exprString = val();
  var tokens = tokenizer(exprString);
  var tree = parse(tokens);
  var result = evaluate(tree);
  append("Result: " + result + "\n");
}; 

console.log(exceute('x = 1; b = 2;'));