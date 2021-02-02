import React from 'react';
//import userTools from '../services/users';
import { Link } from 'react-router-dom';
//import { useDispatch } from 'react-redux';
//import { getUsers } from '../reducers/allUsersReducer';

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

const UsersList = ({ users }) => {
  console.log('usres ', users);
  //const users = useSelector( state => state.allUsers);
  //console.log('users: ', users);
  /*
  const [ users, setUsers] = useState([{
    name: 'wait',
    id: 'xxxxx',
    notes: []
  }]);
  */
  //  const dispatch = useDispatch();
  //  useEffect( async () => {
  //    dispatch(getUsers);
  //    return () => {};
  //  }, []);

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
/*

  <Route path="/notes/:id">
    <Note note={note} />
  </Route>
*/
