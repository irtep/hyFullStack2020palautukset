const calculateBmi = (height: number, weight: number): object => {
  const bmi = weight / ((height/100)*(height/100));
  const response = {
    height: height,
    weight: weight,
    bmi: 'very overweight'
  }
  if (bmi < 30) {
    response.bmi = 'overweight';
  }
  if (bmi < 25) {
    response.bmi = 'healthy weight';
  };
  if (bmi < 18.5) {
    response.bmi = 'underweight';
  };
  return response;
};

export const calcBmi = (height: number, weight: number) => {
  try {
    calculateBmi(height, weight);
  } catch (e) {
    console.log('error', e.message);
  }
};
