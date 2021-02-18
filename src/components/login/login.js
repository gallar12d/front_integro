import React, { Fragment, useState , useEffect} from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const url = global.config.API_URL;

  const [user, setUser] = useState()

  useEffect(() => {
    
  }, []);
  
  let history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm();
  const [datos, setDatos] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const enviarDatos = (event) => {
    // event.preventDefault();
    // if (!datos.email && !datos.password) return false;

    fetch(url+"login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: datos.email, password: datos.password }),
    })
      .then((response) => {
        response.json().then(function (data) {
          if (data.token) {
            localStorage.setItem("token_user", data.token);
            localStorage.setItem("user", data.user.name);
            setUser(data.user)
            props.getUser(data.user.name)

            history.push("/blog");
          }
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Fragment>
      <h2 className=" p-6 max-w-sm mx-auto  rounded-xl   ">
          
               Login   
          
        
      </h2>
      <form
        className="w-3/6 container mx-auto"
        action=""
        onSubmit={handleSubmit(enviarDatos)}
      >
        <div className="bg-gray shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              ref={register({ required: true })}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="email"
              name="email"
              type="text"
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-red-600">Este campo es requerido</span>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              ref={register({ required: true })}
              onChange={handleInputChange}
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-red-600">Este campo es requerido</span>
            )}
          </div>
          <div className="flex flex-col">
            <button
              className="bg-blue-400 px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-600 rounded"
              type="submit"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
