import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const goldie = {
  color: 'gold',
  margin: '5px'
};
const bigNavy = {
  fontSize: '110%',
  color: 'navy'
};

const UserDetails = () => {
  const allUsers = useSelector( state => state.allUsers);
  const id = useParams().id;
  const detailsOf = allUsers.find( user => user.id === id);

  if (!detailsOf) {
    return null;
  }

  return(
    <div>
      <h3 style= {bigNavy}>
        {detailsOf.name}
      </h3>
      <div style= {goldie}>
        added blogs:
      </div>
      {detailsOf.notes.map( note => {
        return(
          <div key = {note.id}>
            {note.title} <span style= {goldie}>likes:</span> {note.likes}
          </div>);})
      }
    </div>
  );
};

export default UserDetails;
