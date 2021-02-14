const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height/100)*(height/100));
  let response = 'very overweight';
  if (bmi < 30) {
    response = 'overweight';
  }
  if (bmi < 25) {
    response = 'healthy weight';
  };
  if (bmi < 18.5) {
    response = 'underweight';
  };
  return response;
};

export const calcBmi = (weight: number, height: number) => {
  let newVal = 'error';
  try {
    newVal = calculateBmi(height, weight);
  } catch (e) {
    console.log('error', e.message);
  }
  return newVal;
};
