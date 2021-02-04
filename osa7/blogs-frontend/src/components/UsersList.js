import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

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

const User = ({ user }) => {
  return(
    <>
      <Link to={`/users/${user.id}`}>
        {user.name}
      </Link>
    </>
  );
};

const UsersList = () => {
  const users = useSelector( state => state.allUsers);
  if (!users) {
    return null;
  }
  return (
    <div>
      <table style= {tableStyle}><tbody>
        <tr><th style= {cellStyle}>name:</th>
          <th style= {cellStyle}>blogs added:</th></tr>
        {users.map(user =>
          <tr key= {user.id}>
            <td style= {cellStyle}>
              <User user = {user} />
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
