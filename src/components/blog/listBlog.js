import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
const ListBlog = (props) => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const history = useHistory();
  const [articles, setArticles] = useState([]);
  const url = global.config.API_URL;


  useEffect(async () => {

    let user_session = await localStorage.getItem("user")
    setUser(user_session);
    if (!user) {
      history.push("/login")
      return false;
    }
    loadData();
  }, []);
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

  const list = articles.map((article) => {
    return (
      <div key={article.id} className="m-auto px-4 py-8 w-11/12">
        <div className="bg-white shadow-2xl">
          <div className="flex justify-center">
            <img
              className=""
              src="https://lh3.googleusercontent.com/proxy/iR4Lq1fEKUTSecnz2NzPZ8RMV6Tsf3JCgzrcX7-FQAETag5C1vXrrI5gfALCwWtGOQIbqsYuSRAC5utxCFCEBPVCuB1jPvmDcWiWtMS1hUwb"
            />
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

            <div className="pl-7 user flex items-center -ml-3 mt-8 mb-4">
              <Link
                to={"article/" + article.id}
                className="text-gray-500 underline "
              >
                Continue reading...
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return <div className=" items-center justify-center">{list}</div>;
};
export default ListBlog;
