import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const FormUpdateCategory = (props) => {
  const [category, setCategory] = useState(props.category);

  useEffect(() => {
    setValue("name", props.category.name, { shouldValidate: true });
    

    setCategory(props.category);
  }, [props.category]);
  
  const { register, errors, handleSubmit, setValue } = useForm();
  const onSubmit = (data, e) => {
    e.preventDefault();
    props.UpdateCategory(data);
    console.log(data)
    e.target.reset();
  };
  return (
    <div>
      <div className=" flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="form"
          className="w-11/12  bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <input type="hidden" ref={register()} value={category.id_category} name="id_category" />
          <br />
          <h1 className="block text-gray-700 font-bold mb-2 text-xl text-center">
            Update category
          </h1>
          <br />
          <div className="mb-4">
            <label
              className="text-left block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              ref={register({
                required: {
                  value: true,
                  message: "Name is required",
                },
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="name"
              id="name"
              type="text"
              placeholder=""
            />
            <span className="text-red-500 text-small d-block mb-2">
              {errors.name && errors.name.message}
            </span>
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
export default FormUpdateCategory;
