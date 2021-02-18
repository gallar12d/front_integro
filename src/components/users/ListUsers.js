import userEvent from "@testing-library/user-event";
import React, { useState, useEffect } from "react";
const ListUsers = (props) => {
  const [usuarios, setUsers] = useState(props.users);

  useEffect(() => {
    setUsers(props.users);
  }, [props.users]);
  const editUser = (user) => {
    props.selectUser(user);
  };
  const list = usuarios.map((user) => {
    return (
      
        <tr className="border-solid border-2 border-dark-500"  key={user.id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            <button
              onClick={() => props.selectUser(user)}
              className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <span>Edit</span>
            </button>
            <button  onClick={() => props.deleteUser(user.id)} className="bg-grey-500 hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
              <span>Delete</span>
            </button>
          </td>
          
        </tr>
        
        
      
    );
  });

  return (
    <div className=" flex items-center justify-center">
      <div className=" w-11/12 mt-10  mr-3 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <table className="table-fixed">
          <thead>
            <tr>
              <th className="w-1/2 ...">User</th>
              <th className="w-1/4 ...">Email</th>
              <th className="w-1/4 ...">Actions</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
      </div>
    </div>
  );
};
export default ListUsers;
