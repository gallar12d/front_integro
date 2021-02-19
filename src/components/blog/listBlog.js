import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
const ListBlog = (props) => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [user_id, setUserId] = useState(localStorage.getItem("user_id"));

  const history = useHistory();
  const [articles, setArticles] = useState([]);
  const url = global.config.API_URL;
  const url_resources = global.config.RESOURCES_URL;

  useEffect(async () => {
    let user_session = localStorage.getItem("user");
    setUser(user_session);
    setUserId(localStorage.getItem("user_id"));
    if (!user) {
      history.push("/login");
      return false;
    }
    loadData();
  }, []);
  const like = async (id_article) => {
    const response = await fetch(url + "like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token_user"),
      },
      body: JSON.stringify({ id_article, user_id }),
    });
    const data = await response.json();

    const new_articles = articles.map((art) => {
      if (art.id == id_article) {
        return { ...art, likes_count: data };
      }
      return art;
    });
    setArticles(new_articles);
  };
  const loadData = async () => {
    const response = await fetch(url + "articles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token_user"),
      },
    });
    const data = await response.json();

    setArticles(data);
  };

  const list = articles.map((article) => {
    return (
      <div key={article.id} className="m-auto px-4 py-8 w-11/12">
        <div className="bg-white shadow-2xl">
          <div className="flex justify-center">
            <img className="" src={(article.picture) ? "" + url_resources + "" + article.picture : 'https://dgpos.co/test/images2.jpg'} />
          </div>
          <div className="px-4 py-2 mt-2 bg-white">
            <a className="text-gray-500 underline " href="#">
              {article.category.name}
            </a>
            <h2 className="font-bold text-2xl text-gray-800">
              {article.title}
            </h2>
            <p className="sm:text-sm text-xs text-gray-700 px-2 mr-1 my-3">
              {article.short_text}
            </p>

            <div className="pl-7 user flex justify-between -ml-3 mt-8 mb-4">
              <Link
                to={"article/" + article.id}
                className="text-gray-500 underline "
              >
                Continue reading...
              </Link>
              <div className="w-10">
                <a onClick={() => like(article.id)} href="javascript:void(0)">
                  <svg
                    className=""
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="#991b1b"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <span id={"article" + article.id}>{article.likes_count}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return <div className=" items-center justify-center">{list}</div>;
};
export default ListBlog;
