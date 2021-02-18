import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import WidgetArticles from "./widgetArticles";

import ListArticles from "./ListArticles";
const Article = (props) => {
    const url = global.config.API_URL;

  let history = useHistory();
  const { id } = useParams();
  useEffect(async () => {
    loadDataArticle();
    loadDataArticles();
  }, [id]);
  const [art, setArt] = useState();
  const [articles, setArticles] = useState([]);

  const loadDataArticle = async () => {
    const response = await fetch(url+"articles/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token_user"),
      },
    });
    const data = await response.json();

    setArt(data);
  };
  const loadDataArticles = async () => {
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

  const [article, setArticle] = useState();

  const presentation = () => {
    return (
      <div className="m-auto px-4 py-8 ">
        <div className="bg-white shadow-2xl">
          <a className="text-gray-500 underline " href="#">
            {art.category.name}
          </a>
          <div className="flex justify-center">
            <img
              className=""
              src="http://qnimate.com/wp-content/uploads/2014/03/images2.jpg"
            />
          </div>
          <div className="px-4 py-2 mt-2 bg-white">
            <h2 className="font-bold text-2xl text-gray-800">{art.title}</h2>
            <p className="font-mono text-blue-800 sm:text-sm text-xs text-gray-700 px-2 mr-1 my-3">
              {art.short_text}
            </p>
            <hr />
            <p className="sm:text-sm text-m text-gray-700 px-2 mr-1 my-3">
              {art.long_text}
            </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className=" items-center justify-center col-span-2">
        {art && presentation()}
      </div>

      <div>
        <div className="overflow-y-auto h-2/4 m-auto px-4 py-8 col-end-3 col-span-1">
          {articles && <WidgetArticles articles={articles} />}
        </div>
      </div>
    </div>
  );
};
export default Article;
