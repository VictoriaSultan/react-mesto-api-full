import React from "react";
import imageLogoTransparent from "../images/logo-transparent.png";
import { Switch, Route, Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header className="header">
        <img className="header__logo" src={imageLogoTransparent} alt="Место" />
        <Switch>
        <Route exact path="/sign-in">
          <Link className="header__link" to="/sign-up">Регистрация</Link>
        </Route>
        <Route exact path="/sign-up">
          <Link className="header__link" to="/sign-in">Войти</Link>
        </Route>
        <Route exact path="/">
          <div className="header__container">
           <p className="header__email">{props.email}</p>
          <Link className="header__link" to="/sign-in" onClick={props.onSignOut}>Выйти</Link>
          </div>          
        </Route>
      </Switch>
    </header>
  );
};

export default Header;
