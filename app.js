//

const prompt = require("prompt-sync")({ sigint: true });

const count_pillars = (n) => {
  let combinations = 0; // or const combinations = []; if we want to store full list!

  // we generate list of numbers for given parameter 'n' from 1 to 'n' - 1
  const numbers = ((maxNum) => {
    let list = [];

    for (let i = 1; i < maxNum; i++) {
      list.push(i);
    }

    return list;
  })(n);

  // subsetSum fn is case of dynamic programming because it stores data in itself while looping over and over speeding the process up.
  const subsetSum = (nums, target, partial) => {
    //bcs this function will loop itself third parametar is optional, so we need to give it some value when we first time initialize function
    partial = partial || [];

    let sum, n, remaining;

    // we use reduce to loop over current list and store current value
    sum = partial.reduce((a, b) => {
      return a + b;
    }, 0);

    // now we check if current sum is same as target number, and if it is we store it outside this function in variable combinations
    if (sum === target) {
      // if we want just number of combinations
      combinations++;
      // If we want list of the combinations
      // combinations.push(partial);
    }

    // if we reached a goal or we have got number higher than target we return
    if (sum >= target) {
      return;
    }

    // and this is the case where function is calling itself over and over until we get a result
    for (var i = 0; i < nums.length; i++) {
      n = nums[i];
      remaining = nums.slice(i + 1);
      subsetSum(remaining, target, partial.concat([n]));
    }
  };

  subsetSum(numbers, n);

  console.log(`There is ${combinations} possible combinations...`);
};

// asking user to enter amount of the blocks
const user_input = Number(
  prompt(
    `Enter number of blocks you want to generate possible combinations >>> `
  )
);

// check for user_input validation
if (user_input > 300000 || user_input < 3 || isNaN(user_input)) {
  console.log(
    "You can only generate combinations for numbers from 3 to 300000!"
  );
} else {
  count_pillars(user_input);
}
