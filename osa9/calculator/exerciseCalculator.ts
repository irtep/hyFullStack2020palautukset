
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

const parseArguments = ( args: any ) => {
  const newArr = [...args].slice(3).map( n => parseInt(n));
  const newInt = parseInt(args[2]);
  if (args.length < 4) {throw new Error(
    'usage: npm run calculateExercises target day1. (min 1 day)');
  } else {
    return {
      val1: newInt,
      val2: newArr
    };
  }
};

try {
  let { val1, val2 } = parseArguments(process.argv);
  exerciseHours(val2, val1);
} catch (e) {
  console.log('error', e.message);
}
