import { useState } from "react";

const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setpassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onLogin(email, password);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input className="auth__textinput" placeholder="Email" name="email" minLength="2" required="" type="email" onChange={handleChangeEmail} value={email || ""}></input>
        <input className="auth__textinput" placeholder="Пароль" name="password" minLength="2" required="" type="password" onChange={handleChangePassword} value={password || ""}></input>
        <button className="auth__button" type="submit">Войти</button>
      </form>
    </div>
  )
};

export default Login;
