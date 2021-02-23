import React from 'react';
import axios from 'axios';
import { useStateValue } from "../state";
import { Icon } from 'semantic-ui-react';
import { apiBaseUrl } from "../constants";
import { useParams } from 'react-router-dom';
import AddEntryModal from '../AddEntryModal';
import { addPatient, showPatient } from '../state/reducer';
import { HospitalFormValues} from '../AddEntryModal/AddEntryForm';
import { Diagnosis,
  Patient,
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
  const [ {showing}, dispatch ] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const {id} = useParams<{id: string}>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  const submitNewEntry = async (values: HospitalFormValues) => {
      try {
          const { data: updatedPatient } = await axios.post<Patient>(
              `${apiBaseUrl}/patients/${id}/entries`,
              values
          );
          dispatch(addPatient(updatedPatient));
          dispatch(showPatient(updatedPatient));
          closeModal();
      } catch (e) {
          console.log(e);
          console.error(e.response.data);
          setError(e.response.data.error);
      }
  };
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
      <div>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      </div>
      <div>
      <input type= "button" onClick={() => openModal()} value= "Add New Entry"/>
      </div>
    </div>
  );
}

export default ShowPatient;
