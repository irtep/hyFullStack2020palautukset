/*
If you would call the function with parameters [3, 0, 2, 4.5, 0, 3, 1] and 2 it could return

{ periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286 }
*/

interface Values {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

const exerciseHours = (summary: Array<number>, target: number): Values => {
  console.log('summary: ', summary);
  console.log('type of: ', typeof(summary[1]));
  console.log('s-R: ', summary.reduce( (total, num) => total + num ));
  const results = {
    target: target,
    periodLength: summary.length,
    trainingDays: summary.filter( day => day > 0).length,
    rating: summary.reduce( (total, num) => total + num ) / summary.length,
    success: false,
    ratingDescription: 'yo yo ',
    average: summary.reduce( (total, num) => total + num ) / summary.length
  };
  if (results.rating > 3) {
    results.rating = 3;
  }
  if (results.rating > target) {
    results.ratingDescription = 'good job, target smashed!';
  }
  if (results.rating === target) {
    results.success = true;
    results.ratingDescription = 'target reached.';
  }
  if (results.rating < target) {
    results.ratingDescription = 'bad result!';
  }
  console.log(results);
  return results;
};

//console.log('big week: ', exerciseHours([3, 3, 3, 3, 3, 3, 3], 2));
//console.log('normal week: ', exerciseHours([3, 1, 2, 3, 1, 2, 2], 2));
//console.log('bad week: ', exerciseHours([0, 0, 2, 0, 3], 2));
const parseArguments = ( args: any ) => {
  if (args.length < 4) {throw new Error(
    'usage: npm run calculateExercises target day1. (min 1 day)');
  } else {
    return {
      val1: args[3],
      val2: [...args].slice(2)
    };
  }
};

try {
  const { val1, val2 } = parseArguments(process.argv);
  exerciseHours(val2, val1);
} catch {
  console.log('error', Error);
}
