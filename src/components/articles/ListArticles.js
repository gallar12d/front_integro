import userEvent from "@testing-library/user-event";
import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
const ListArticles = (props) => {
  const [articles, setArticles] = useState(props.articles);

  useEffect(() => {
    setArticles(props.articles);
  }, [props.articles]);
  const editArticle = (article) => {
    props.selectArticle(article);
  };
  const list = articles.map((article) => {
    return (
      <tr className="bg-white border-2 border-gray-200" key={article.id}>
        <td>{article.title}</td>
        <td>{article.slug}</td>
        <td>{article.category ? article.category.name : "NA"}</td>

        <td>
          <div data-tip data-for={'id'+article.id}>
            {article.short_text}
          </div>
          <ReactTooltip id={'id'+article.id}>
            <span>{article.long_text}</span>
          </ReactTooltip>
        </td>
        <td>
          <button
            onClick={() => props.selectArticle(article)}
            className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <span>Edit</span>
          </button>
          <button
            onClick={() => props.deleteArticle(article.id)}
            className="bg-grey-500 hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <span>Delete</span>
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className=" flex items-center justify-center">
      <div className="w-11/12 mt-8  mr-3 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <br />
        <h1 className="block text-gray-700 font-bold mb-2 text-xl text-center">
          List of articles
        </h1>
        <table className="min-w-full table-auto">
          <thead className="justify-between ">
            <tr className="bg-gray-800 text-white h-10">
              <th className="w-screen ...">Title</th>
              <th className="w-screen ...">Slug</th>
              <th className="w-screen ...">Category</th>
              <th className="w-screen ...">Short text</th>
              <th className="w-screen ...">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-200">{list}</tbody>
        </table>
      </div>
    </div>
  );
};
export default ListArticles;
