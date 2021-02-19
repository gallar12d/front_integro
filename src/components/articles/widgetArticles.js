import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

const WidgetArticles = (props) => {
  const url_resources = global.config.RESOURCES_URL;

  useEffect(async () => {}, []);
  const history = useHistory();
  const [art, setArt] = useState();
  const [articles, setArticles] = useState([]);

  const list = props.articles.map((article) => {
    return (
      <div
        key={article.id}
        className="mb-2 bg-gray-200 flex justify-center items-center"
      >
        <div className=" w-full bg-white border-2 border-gray-300 p-6 rounded-md tracking-wide shadow-lg">
          <div id="header" className="flex justify-center items-center mb-">
            <img
              alt="avatar"
              className="w-20 rounded-full h-20 flex items-center justify-center border-2 border-gray-300"
              src={
                article.picture
                  ? "" + url_resources + "" + article.picture
                  : "https://dgpos.co/test/images2.jpg"
              }
            />
          </div>
          <div id="header-text" className="leading-5  sm">
            <h4 id="name" className="text-lg font-semibold">
              {article.title}
            </h4>
            <h5 id="job" className="font-semibold text-blue-600">
              {article.category.name}
            </h5>
          </div>
          <div id="">
            <q className="italic text-gray-600">{article.short_text}</q>
          </div>
          <div className="pl-7 user flex items-center -ml-3 mt-8 mb-4">
            <Link
              to={"/article/" + article.id}
              className="text-gray-500 underline "
            >
              Continue reading...
            </Link>
          </div>
        </div>
      </div>
    );
  });
  return <div>{props.articles && list}</div>;
};
export default WidgetArticles;
