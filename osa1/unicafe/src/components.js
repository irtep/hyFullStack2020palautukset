import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { giveWeightedAverage } from './functions.js'

export const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const TheMostPopular = ({text, votes}) => {
  if (votes === 0) {
    return(
      <>
        No votes given yet.
      </>
    );
  } else {
    return(
      <>
        <strong>{text}</strong> <br/>
        with <strong>{votes}</strong> votes.
      </>
    );
  }
}

const StatisticsLine = ({text, value}) => {
  return(
    <>
    <td>
      {text}
    </td>
    <td>
      {value}
    </td>
    </>
  );
}

export const Anecdote = ({chosen}) => {
  const [votes, addVotes] = useState([0, 0, 0, 0, 0, 0]);
  const [mostPopular, setPopular] = useState(['all have 0 votes.', 0]);

  const addVote = () => {
    const copy = [...votes ];
    copy[chosen] += 1;
    addVotes(copy);
    // check which is the most popular now
    const populars = [ ...mostPopular ];
    copy.forEach((item, i) => {
      if (item > populars[1]) {
        populars[0] = anecdotes[i];
        populars[1] = item;
      }
    });
    setPopular(populars);
  }

  if (chosen === '') {
    return(
      <>
        if you want to see anecdote, click that button above.
      </>
    );
  } else {
    return(
      <div>
        <p>
          <strong>
            {anecdotes[chosen]}
          </strong>
        </p>
        <p>
          this has votes: {votes[chosen]}
        </p>
        <p>
          <Button name= 'Vote this' ifClicked= {addVote}/>
        </p>
        <div>
          The most voted anecrote: <br/>
          <p>
            <TheMostPopular text= {mostPopular[0]} votes= {mostPopular[1]}/>
          </p>
        </div>
      </div>
    );
  }
}

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
              <StatisticsLine text= "Neutral feedbacks: " value= {neutrals} />
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

export const Button = ({name, ifClicked}) => {
  const goodStyle= {backgroundColor: "green"};
  const neutralStyle= {backgroundColor: "white"};
  const badStyle= {backgroundColor: "red"};
  let chooseStyle = null;

  switch (name) {
    case 'good':
      chooseStyle = goodStyle;
    break;
    case 'neutral':
      chooseStyle = neutralStyle;
    break;
    case 'bad':
      chooseStyle = badStyle;
    break;
    default: chooseStyle = goodStyle;
  }

  return(
    <>
      <button onClick= {ifClicked} style= {chooseStyle}>
        {name}
      </button>
    </>
  );
}
