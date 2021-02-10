const calculateBmi = (height: number, weight: number): string => {
  console.log(height, weight);
  const bmi = weight / ((height/100)*(height/100));

  if (bmi < 18.5) {
    return 'underweight';
  };

  if (bmi < 25) {
    return 'Normal (healty weight)';
  };

  if (bmi < 30) {
    return 'overweight'
  };

  return 'very overweight';
};

console.log(calculateBmi(163, 66));
