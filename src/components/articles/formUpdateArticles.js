import React, { useState, useEffect } from "react";
import { useForm, Controller, NestedValue } from "react-hook-form";

const FormUpdateArticle = (props) => {
  const [article, setArticle] = useState(props.article);
  const [categories, setCategories] = useState(props.categories);

  useEffect(() => {
    setCategories(props.categories);
    setValue("title", props.article.title, { shouldValidate: true });
    setValue("id_category", props.article.category.id_category, {
      shouldValidate: true,
    });

    setValue("slug", props.article.slug, { shouldValidate: true });
    setValue("short_text", props.article.short_text, { shouldValidate: true });
    setValue("long_text", props.article.long_text, { shouldValidate: true });

    setArticle(props.article);
  }, [props.article]);
  const { register, errors, handleSubmit, setValue, control } = useForm();
  const onSubmit = (data, e) => {
    e.preventDefault();
    props.UpdateArticle(data);
    e.target.reset();
  };
  return (
    <div>
      <div className=" flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="form"
          className="w-11/12 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <input type="hidden" ref={register()} value={article.id} name="id" />
          <br />
          <h1 className=" block text-gray-700 font-bold mb-2 text-xl text-center">
            Update article
          </h1>
          <br />
          <div className="mb-4">
            <label
              className="text-left block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              ref={register({
                required: {
                  value: true,
                  message: "Title is required",
                },
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="title"
              id="title"
              type="text"
              placeholder=""
            />
            <span className="text-red-500 text-small d-block mb-2">
              {errors.title && errors.title.message}
            </span>
          </div>
          <div className="mb-4">
            <label
              className="text-left block text-gray-700 text-sm font-bold mb-2"
              htmlFor="slug"
            >
              Slug
            </label>
            <input
              ref={register({
                required: {
                  value: true,
                  message: "Slug is required",
                },
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="slug"
              id="email"
              type="text"
              placeholder=""
            />
            <span className="text-red-500 text-small d-block mb-2">
              {errors.slug && errors.slug.message}
            </span>
          </div>
          <div className="mb-4">
            <label
              className="text-left block text-gray-700 text-sm font-bold mb-2"
              htmlFor="short_text"
            >
              Short text
            </label>
            <input
              ref={register({
                required: {
                  value: true,
                  message: "Slug is required",
                },
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="short_text"
              id="short_text"
              type="text"
              placeholder=""
            />
            <span className="text-red-500 text-small d-block mb-2">
              {errors.short_text && errors.short_text.message}
            </span>
          </div>
          <div className="mb-4">
            <label
              className="text-left block text-gray-700 text-sm font-bold mb-2"
              htmlFor="long_text"
            >
              Long text
            </label>
            <textarea
              rows="10"
              ref={register({})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="long_text"
              id="long_text"
            />
            <span className="text-red-500 text-small d-block mb-2">
              {errors.long_text && errors.long_text.message}
            </span>
          </div>
          <div className="mb-4">
            <label
              className="text-left block text-gray-700 text-sm font-bold mb-2"
              htmlFor="long_text"
            >
              Category
            </label>

            <select
              defaultValue={article.category.id_category}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ref={register()}
              name="id_category"
            >
              {categories.map((option) => (
                <option value={option.id_category}>{option.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <button
              id="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              <i className="fab fa-whatsapp"></i> Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default FormUpdateArticle;
