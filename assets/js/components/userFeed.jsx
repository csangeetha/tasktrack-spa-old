import React from 'react';
import { Link } from 'react-router-dom';

function User(params) {
  let user=params.user;
  return <tr>
      <th scope="row">{user.id}</th>
      <td><Link to={"/users/" + user.id } >{user.name}</Link></td>
      <td>{user.email}</td>
    </tr>;
}
export default function UserFeed(params){
  let users = _.map(params.users , (userVar) => <User key={userVar.id} user={userVar} />);
  return <div>
    <p>&nbsp;</p>
    <h1>All Users</h1>
      <table className="table table-striped">
     <thead>
       <tr>
         <th scope="col">#</th>
         <th scope="col">Name</th>
         <th scope="col">Email</th>
       </tr>
     </thead>
     <tbody>
       { users }
     </tbody>
   </table>
  </div>;
}
