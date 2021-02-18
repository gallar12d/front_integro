import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


import ListCategory from "./ListCategory";
import FormCategory from "./formCategory";
import FormUpdateCategory from "./formUpdateCategory";

const Categories = () => {
  const url = global.config.API_URL;

  let history = useHistory();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [typeForm, setTypeForm] = useState("create");
  const [n, forceUpdate] = useState(0);
  const loadData = async () => {
    const response = await fetch(url+"categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token_user"),
      },
    });
    const data = await response.json();
    setCategories(data);
  };

  useEffect(async () => {
    loadData();
  }, []);

  const createCategory = async (category) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token_user"),
      },
      body: JSON.stringify(category),
    };
    const response = await fetch(
      url+"categories",
      requestOptions
    );
    const data = await response.json();
    if (data.errors) {
      //manejo de los errores aquí
      return false;
    }
    loadData();
  };

  const selectCategory = (category) => {
    setCategory(category);
    setTypeForm("edit");
  };

  const UpdateCategory = async (cat) => {
    let category = cat.id_category;
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token_user"),
      },
      body: JSON.stringify(cat),
    };
    const response = await fetch(
      url+"categories/" + cat.id_category,
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

  const deleteCategory = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token_user"),
      }
    };
    const response = await fetch(
        url+"categories/" + id,
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
          <FormCategory createCategory={createCategory} />
        ) : (
          <FormUpdateCategory UpdateCategory={UpdateCategory} category={category} />
        )}
      </div>
      <div>
        {categories && <ListCategory deleteCategory = {deleteCategory} selectCategory={selectCategory} categories={categories} />}{" "}
      </div>
    </div>
  );
};
export default Categories;
