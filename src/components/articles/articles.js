import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import FormArticle from './formArticle';
import FormUpdateArticle from './formUpdateArticles';
import ListArticles from './ListArticles';
const Articles = () => {
  const url = global.config.API_URL;

  let history = useHistory();
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState();
  const [categories, setCategories] = useState([]);

  const [typeForm, setTypeForm] = useState("create");
  const loadData = async () => {
    const response = await fetch(url+"articles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token_user"),
      },
    });
    const data = await response.json();
    
    setArticles(data);
  };
  const loadDataCategories = async () => {
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
    loadDataCategories();
    setTypeForm("create");

  }, []);

  const createArticle = async (article) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token_user"),
      },
      body: JSON.stringify(article),
    };
    const response = await fetch(
      url+"articles",
      requestOptions
    );
    const data = await response.json();
    if (data.errors) {
      //manejo de los errores aquí
      return false;
    }
    loadData();
  };

  const selectArticle = (article) => {
    setArticle(article);
    setTypeForm("edit");
  };

  const UpdateArticle= async (article) => {
    let id = article.id;
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token_user"),
      },
      body: JSON.stringify(article),
    };
    const response = await fetch(
      url+"articles/" + article.id,
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

  const deleteArticle = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token_user"),
      }
    };
    const response = await fetch(
        url+"articles/" + id,
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
    <div className="grid grid-cols-2 gap-2">
      <div className="mt-10 ml-3">
        {typeForm == "create" ? (
          <FormArticle categories={categories} createArticle={createArticle} />
        ) : (
          <FormUpdateArticle categories={categories} UpdateArticle={UpdateArticle} article={article} />
        )}
      </div>
      <div>
        {articles && <ListArticles deleteArticle = {deleteArticle} selectArticle={selectArticle} articles={articles} />}{" "}
      </div>
    </div>
  );
};
export default Articles;
