import React from 'react';
import { useStateValue } from "../state";
import { Icon } from 'semantic-ui-react'
import { Diagnosis,
  HealthCheck,
  Hospital,
  OccupationalHealthcare,
  Discharged,
  Sickleaved,
  Entry } from '../types';
const hospStyle = {
  backgroundColor: 'lightGreen',
    borderRadius: '4px',
    margin: '4px',
    padding: '3px'
};
const healthStyle = {
  backgroundColor: 'lightGray',
    borderRadius: '4px',
    margin: '4px',
    padding: '3px'
};
const occuStyle = {
  backgroundColor: 'dodgerBlue',
    borderRadius: '4px',
    margin: '4px',
    padding: '3px'
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HealthCheckEntry: React.FC<{ entry: HealthCheck }> = ({ entry }) => {
  return (
    <div style= {healthStyle}>
      <p>Date: {entry.date}</p>
      <p>Description: {entry.description}</p>
      <p>Specialist: {entry.specialist}</p>
      <p>Rating: {entry.healthCheckRating}</p>
        {entry.diagnosisCodes === undefined ? null :
          <Diagnoses codes={entry.diagnosisCodes} />
        }
    </div>
  );
};
const DischargeData: React.FC<{ data: Discharged }> = ({data}) => {
  return(
    <>
      <p>Discharge: {data.date}</p>
      <p>Criteria: {data.criteria}</p>
    </>
  );
};
const SickLeaveData: React.FC<{ data: Sickleaved }> = ({data}) => {
  return(
    <>
      <p>sickleave stats:</p>
      <p>started: {data.startDate}</p>
      <p>Ended: {data.endDate}</p>
    </>
  );
};
const HospitalEntry: React.FC<{ entry: Hospital }> = ({ entry }) => {
  return (
    <div style= {hospStyle}>
      <p>Date: {entry.date}</p>
      <p>Description: {entry.description}</p>
      <p>Specialist: {entry.specialist}</p>
      {entry.discharge === undefined ? null :
        <DischargeData data= {entry.discharge}/>
      }
      {entry.diagnosisCodes === undefined ? null :
        <Diagnoses codes={entry.diagnosisCodes} />
      }
  </div>
  );
};
const OccupationalHealthC: React.FC<{ entry: OccupationalHealthcare }> = ({ entry }) => {
  return (
    <div style= {occuStyle}>
      <p>Date: {entry.date}</p>
      <p>Description: {entry.description}</p>
      <p>Specialist: {entry.specialist}</p>
      <p>Employer: {entry.employerName}</p>
      {entry.sickLeave === undefined ?
        null :
        <SickLeaveData data= {entry.sickLeave}/>
      }
      {entry.diagnosisCodes === undefined ? null :
          <Diagnoses codes={entry.diagnosisCodes} />
      }
    </div>
  );
};

const Diagnoses: React.FC<{ codes: Array<Diagnosis['code']> }> = ({ codes }) => {
  const [{ diagnoses } ] = useStateValue();
  return (
    <div>
      <h4>diagnoses:</h4>
      <ul>
        {codes.map(c => (
          <li key={c}>
           {c} {diagnoses.find(d => d.code === c)?.name}
           </li>
         ))}
      </ul>
    </div>
  );
};

const Entries: React.FC<{entriex: Entry[]}> = ({entriex}) => {
  return (
    <>
    {entriex.map( entry => {
      switch(entry.type) {
        case 'Hospital':
          return <HospitalEntry key={entry.id} entry={entry} />;
        case 'HealthCheck':
          return <HealthCheckEntry key={entry.id} entry={entry} />;
        case 'OccupationalHealthcare':
          return <OccupationalHealthC key={entry.id} entry={entry} />;
       default: return assertNever(entry);
      };
    })}
    </>
  );
}

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
      <div>
        <h3>
        entries:
        </h3>
        <ul>
          {showing.entries === undefined ? null :
            <Entries entriex= {showing.entries}/>
          }
        </ul>
      </div>
    </div>
  );
}

export default ShowPatient;
