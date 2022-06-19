import React from "react";
import { Link } from "react-router-dom";

const Register = (props) => {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister(email, password);
  };

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input className="auth__textinput" placeholder="Email" name="email" minLength="2" required="" type="email" onChange={handleChangeEmail} value={email || ""}></input>
        <input className="auth__textinput" placeholder="Пароль" name="password" minLength="2" required="" type="password" onChange={handleChangePassword} value={password || ""}></input>
        <button className="auth__button" type="submit">Зарегистрироваться</button>
        <div className="auth__signup">
          <p className="auth__signup-title">Уже зарегистрированы?</p>
          <Link to="sign-in" className="auth__signup-link">Войти</Link>
        </div>
      </form>
    </section>
  );
};

export default Register;