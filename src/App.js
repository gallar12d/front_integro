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
import { BrowserRouter, Route, Switch, HashRouter } from "react-router-dom";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));

  const getUser = (user) => {
    setUser(user);
  };

  return (
    <div className="App">
      <HashRouter>
        <Menu getUser={getUser} user={user} />
        <Route path="/login">
          <Login getUser={getUser} />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route exact path="/articles">
          <Articles />
        </Route>
        <Route path="/categories">
          <Categories />
        </Route>
        <Route exact path="/blog">
          <ListBlog />
        </Route>
        <Route exact path="/article/:id">
          <Article />
        </Route>
      </HashRouter>
    </div>
  );
}

export default App;
