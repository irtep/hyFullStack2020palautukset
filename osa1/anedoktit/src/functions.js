

export const callDice = (max, currentValue) => {
    let result =  currentValue;
    // i want always value to change
    for (;result == currentValue;) {
      result = 1 + Math.floor(Math.random() * max)
    }
    return result;
}
