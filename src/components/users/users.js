import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import ListUsers from "./ListUsers";
import FormUser from "./formUser";
import FormUpdateUser from "./formUpdateUser";

const Users = () => {
  const url = global.config.API_URL;

  let history = useHistory();
  const [usuarios, setUsers] = useState([]);
  const [usuario, setUser] = useState();
  const [typeForm, setTypeForm] = useState("create");
  const [n, forceUpdate] = useState(0);
  const loadData = async () => {
    const response = await fetch(url+"users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token_user"),
      },
    });
    const data = await response.json();
    console.log(data);
    setUsers(data);
  };

  useEffect(async () => {
    loadData();
  }, []);

  const createUser = async (user) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token_user"),
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(
      url+"users",
      requestOptions
    );
    const data = await response.json();
    if (data.errors) {
      //manejo de los errores aquí
      return false;
    }
    loadData();
  };

  const selectUser = (user) => {
    console.log(user);
    setUser(user);
    setTypeForm("edit");
  };

  const UpdateUser = async (user) => {
    let id = user.id;
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token_user"),
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(
      url+"users/" + user.id,
      requestOptions
    );
    const data = await response.json();
    if (data.errors) {
      //manejo de los errores aquí
      return false;
    }
    setTypeForm("create");

    loadData();
  };

  const deleteUser = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token_user"),
      }
    };
    const response = await fetch(
        url+"users/" + id,
        requestOptions
      );
      const data = await response.json();
      if (data.errors) {
        //manejo de los errores aquí
        return false;
      }
      loadData();
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="mt-10 ml-3">
        {typeForm == "create" ? (
          <FormUser createUser={createUser} />
        ) : (
          <FormUpdateUser UpdateUser={UpdateUser} user={usuario} />
        )}
      </div>
      <div>
        {usuarios && <ListUsers deleteUser = {deleteUser} selectUser={selectUser} users={usuarios} />}{" "}
      </div>
    </div>
  );
};
export default Users;
