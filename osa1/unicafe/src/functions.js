
export const giveWeightedAverage = (weights, all) => {
    const reducedArray = weights.reduce((acc, item) => {
      return acc + item.nro * item.weight;
    }, 0);
    let result = reducedArray / all;
    if (isNaN(result)) return ' - No given feedbacks';
    return result;
  };

export const callDice = (max, currentValue) => {
    let result =  currentValue;
    // i want always value to change
    for (;result == currentValue;) {
      result = 1 + Math.floor(Math.random() * max)
    }
    return result;
}
