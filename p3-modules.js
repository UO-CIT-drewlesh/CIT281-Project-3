/*
Drew Lesh
CIS 281 Project 3
5.4.23
*/

/*
  Returns true if the coin function parameter is a valid coin value of either 1, 5, 10, 25, 50, or 100. Must use the array indexOf() method.
  This function can be coded to be a single line of code, although not required. If you do attempt to code into a single line of code, 
  you are recommended to first find a solution that you understand completely, then comment out your solution when you reduce your 
  code to a single line of code.
*/
function validDenomination(coin) {
  // const validCoins = [ 1, 5, 10,25 ,50 ,100 ];
  // console.log(validCoins.indexOf( 2 ));    // indexOf() will auto value to -1, if the parameter is not in the array
  // if (validCoins.indexOf(coin) === -1) {
  //   return false;
  // } else {
  //   return true;
  // }
  return [1, 5, 10, 25, 50, 100].indexOf(coin) !== -1; 
}

/*
  Returns the calculated value of a single coin object from the obj function parameter
  Must use object deconstruction to create constant variables denom and count from the obj function parameter, 
  using default object values of 0 for denom and count
*/
function valueFromCoinObject(obj) {
  const { denom = 0, count = 0 } = obj;
  //  if (validDenomination(denom) === true) {
  //    return denom * count;
  //  } else {
  //    return 0;
  //  };
  return validDenomination(denom) ? denom * count : 0;
}

/*
  Iterates through an array of coin objects and returns the final calculated value of all coin objects
  Must use Array.reduce() method, and an arrow function with the Array.reduce() method
  Must call valueFromCoinObject()
  Extra credit: Handle scenario where the arr function parameter, rather than an array of coin objects, 
  contains another array of coin objects
*/
function valueFromArray(arr) {
  return arr.reduce(
    (acc, val) =>
      Array.isArray(val) ? valueFromArray(val) : acc + valueFromCoinObject(val), 0
  );
}

/*
  This function is the only exported function from the code module. Calls and returns the result of valueFromArray() function,
  which will be the value of all coin objects with the coinage array function parameter
*/
function coinCount(...coinage) {
  return valueFromArray(coinage);
}

module.exports = { coinCount };

console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
console.log("...[{}]", coinCount(...coins));
console.log("[{}]", coinCount(coins));