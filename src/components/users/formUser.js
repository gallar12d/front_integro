import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const FormUser = (props) => {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
    props.createUser(data);
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
          <br />
          <h1 className=" block text-gray-700 font-bold mb-2 text-xl text-center">
            Create user
          </h1>
          <br />
          <div className="mb-4">
            <label
              className=" text-left block text-gray-700 text-sm font-bold mb-2"
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
          <div className="mb-4">
            <label
              className="text-left block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              ref={register({
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              id="email"
              type="email"
              placeholder=""
            />
            <span className="text-red-500 text-small d-block mb-2">
              {errors.email && errors.email.message}
            </span>
          </div>
          <div className="mb-4">
            <label
              className=" text-left block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              ref={register({
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              id="password"
              type="password"
              placeholder=""
            />
            <span className="text-red-500 text-small d-block mb-2">
              {errors.password && errors.password.message}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <button
              id="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              <i className="fab fa-whatsapp"></i> Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default FormUser;
