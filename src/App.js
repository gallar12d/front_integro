import logo from "./logo.svg";
import Login from "./components/login/login";
import Menu from "./components/menu/menu";
import Users from "./components/users/users";
import Articles from "./components/articles/articles";
import Categories from "./components/categories/categories";
import ListBlog from "./components/blog/listBlog";
import Article from "./components/articles/article";
import React, { Fragment, useState, useEffect } from "react";


import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
 

  const getUser = (user) =>{
    setUser(user);
  }
  

  return (
    <div className="App">
      <BrowserRouter>
        <Menu getUser={getUser} user = {user} />
        <Switch>
          <Route path="/login">
            <Login getUser={getUser} />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/articles">
            <Articles />
          </Route>
          <Route path="/categories">
            <Categories />
          </Route>
          <Route path="/blog">
            <ListBlog />
          </Route>
          <Route path="/article/:id">
            <Article />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
