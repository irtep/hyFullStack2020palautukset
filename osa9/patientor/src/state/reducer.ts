import { State } from "./state";
import { Patient, GetPatient } from "../types";

// action creators
export const setPatientList = (theList: Array<Patient>): Action => {
  return ({
      type: "SET_PATIENT_LIST",
      payload: theList
  });
};
export const addPatient = (patient: Patient): Action => {
  return ({
      type: "ADD_PATIENT",
      payload: patient
  });
};
export const showPatient = (idOfPatient: GetPatient): Action => {
  return ({
      type: "SHOW_PATIENT",
      payload: idOfPatient
  });
};

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SHOW_PATIENT";
      payload: GetPatient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SHOW_PATIENT":
      return {
        ...state,
        showing: action.payload
      };
    default:
      return state;
  }
};
