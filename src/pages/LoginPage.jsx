import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../pages/LoginPage.scss";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

function SignInPage({ isDarkTheme }) {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [userLogin, setUserLogin] = useState("");
  const [password, setPassword] = useState("");
  const [globalError, setGlobalError] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoginError(false);
    setPasswordError(false);
    setGlobalError("");

    try {
      await login({ login: userLogin, password });
      navigate("/");
    } catch (err) {
      const errMsg = err.message || "Ошибка при входе.";
      const isLoginError =
        errMsg.toLowerCase().includes("логин") ||
        errMsg.toLowerCase().includes("user");
      const isPasswordError =
        errMsg.toLowerCase().includes("пароль") ||
        errMsg.toLowerCase().includes("password");

      if (isLoginError && !isPasswordError) {
        setLoginError(true);
      } else if (!isLoginError && isPasswordError) {
        setPasswordError(true);
      } else {
        setLoginError(true);
        setPasswordError(true);
      }
      setGlobalError(errMsg);
    }
  };

  const handleLoginChange = (e) => {
    setUserLogin(e.target.value);
    setLoginError(false);
    setGlobalError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
    setGlobalError("");
  };

  return (
    <div className={`login-wrapper${isDarkTheme ? " dark" : ""}`}>
      <div className={`login-container${isDarkTheme ? " dark" : ""}`}>
        <h2 className={`login-title${isDarkTheme ? " dark" : ""}`}>Вход</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Эл. почта"
            autoComplete="username"
            value={userLogin}
            onChange={handleLoginChange}
            required
            className={
              "login-input" +
              (loginError ? " error" : "") +
              (isDarkTheme ? " dark" : "")
            }
          />
          <input
            type="password"
            placeholder="Пароль"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            required
            className={
              "login-input" +
              (passwordError ? " error" : "") +
              (isDarkTheme ? " dark" : "")
            }
          />
          {globalError && <div className="error-text">{globalError}</div>}
          <button type="submit" className="login-button">
            Войти
          </button>
        </form>
        <div className="register-text">
          Нужно зарегистрироваться?{" "}
          <Link to="/register" className="register-link">
            Регистрируйтесь здесь
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
