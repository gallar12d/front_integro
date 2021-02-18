import userEvent from "@testing-library/user-event";
import React, { useState, useEffect } from "react";
const ListCategory = (props) => {
  const [categories, setCategories] = useState(props.categories);

  useEffect(() => {
    setCategories(props.categories);
  }, [props.categories]);
  const editCategory = (category) => {
    props.selectCategory(category);
  };
  const list = categories.map((category) => {
    return (
      <tr
        className="border-solid border-2 border-dark-500"
        key={category.id_category}
      >
        <td>{category.name}</td>

        <td>
          <button
            onClick={() => props.selectCategory(category)}
            className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <span>Edit</span>
          </button>
          <button
            onClick={() => props.deleteCategory(category.id_category)}
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
      <div className="w-11/12  mt-10  mr-3 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <table className="table-fixed">
          <thead>
            <tr>
              <th className="w-1/2 ...">Category</th>
              
              <th className="w-1/4 ...">Actions</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
      </div>
    </div>
  );
};
export default ListCategory;
