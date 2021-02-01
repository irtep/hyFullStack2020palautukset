import React, { useState, useEffect } from 'react';
import userTools from '../services/users';

const tableStyle = {
  border: '6px solid navy',
  borderRadius: '5px'
};
const cellStyle = {
  textAlign: 'left',
  backgroundColor: 'white',
  color: 'black',
  padding: '3px'
};

const UsersList = () => {
  const [ users, setUsers] = useState([{
    name: 'wait',
    id: 'xxxxx',
    notes: []
  }]);

  useEffect( () => {
    userTools.getAll().then(allUsers => {
      setUsers(allUsers);
    }).catch( err => console.log(err));
    return () => {};
  }, []);

  return (
    <div>
      <table style= {tableStyle}><tbody>
        <tr><th style= {cellStyle}>name:</th>
          <th style= {cellStyle}>blogs added:</th></tr>
        {users.map(user =>
          <tr key= {user.id}>
            <td style= {cellStyle}>
              {user.name}
            </td>
            <td style= {cellStyle}>
              {user.notes.length}
            </td>
          </tr>
        )}
      </tbody></table>
    </div>
  );
};

export default UsersList;
