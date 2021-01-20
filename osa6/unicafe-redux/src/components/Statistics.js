import React from 'react'
import StatisticsLine from './StatisticsLine'

const giveWeightedAverage = (weights, all) => {
    const reducedArray = weights.reduce((acc, item) => {
      return acc + item.nro * item.weight;
    }, 0);
    let result = reducedArray / all;
    if (isNaN(result)) return ' - No given feedbacks';
    return result;
};

export const Statistics = ({goods, neutrals, bads}) => {
  const all = goods + neutrals + bads;
  let goodPercentage = goods / all * 100;
  const weights = [
    {nro: goods, weight: 1},
    {nro: neutrals, weight: 0},
    {nro: bads, weight: -1}
  ];
  const average = giveWeightedAverage(weights,all);

  if (all === 0) {
    return (
    <p>
      No feedback received.
    </p>
    );
  } else {
    return(
      <>
        <table>
          <tbody>
            <tr>
              <th>
                <span className= "headers">Statistics</span>
              </th>
            </tr>
            <tr>
              <StatisticsLine text= "Good feedbacks: " value= {goods} />
            </tr>
            <tr>
              <StatisticsLine text= "Ok feedbacks: " value= {neutrals} />
            </tr>
            <tr>
              <StatisticsLine text= "Bad feedbacks: " value= {bads} />
            </tr>
          <tr>
            <td>
              all
            </td>
            <td>
              {all}
            </td>
          </tr>
          <tr>
            <td>
              average
            </td>
            <td>
              {average}
            </td>
          </tr>
          <tr>
            <td>
              % of good feedbacks
            </td>
            <td>
             {goodPercentage}
            </td>
          </tr>
        </tbody>
      </table>
      </>
    );
  }
}

export default Statistics
