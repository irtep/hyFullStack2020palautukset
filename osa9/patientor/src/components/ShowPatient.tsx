import React from 'react';
import { useStateValue } from "../state";
import { Icon } from 'semantic-ui-react'

const ShowPatient: React.FC = () => {
  const [ {showing} ] = useStateValue();
  if (showing === undefined) {
    return null;
  }
  let iconic = <Icon name= "mars" />
  if (showing.gender === "female") {
    iconic = <Icon name= "venus" />;
  }
  if (showing.gender === "other") {
    iconic = <Icon name= "transgender"/>
  }
  return(
    <div>
      <h2>
        {showing.name}
        {iconic}
      </h2>
      <div>
        ssn: {showing.ssn}
      </div>
      <div>
        occupation: {showing.occupation}
      </div>
    </div>
  );
}

export default ShowPatient;
