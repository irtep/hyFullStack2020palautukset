import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { GetPatient } from '../types';
import ShowPatient from './ShowPatient';

const PatientDetails: React.FC = () => {
  const [ {showing}, dispatch ] = useStateValue();
  const {id} = useParams<{id: string}>();

  React.useEffect(()=> {
    axios.get<GetPatient>(`${apiBaseUrl}/patients/${id}`).then( (res) => {
      if (res.data !== undefined && res.data !== showing) {
        dispatch({ type: 'SHOW_PATIENT', payload: res.data})
      }
    });
   }, []);

  if (showing !== undefined) {
    return(
      <div>
       <ShowPatient/>
      </div>
    );
  } else {
    return(
      <>
        you try to hack or what?
      </>
    );
  }
};

export default PatientDetails;
