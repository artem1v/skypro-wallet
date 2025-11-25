import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  // Просто для примера — логин как функция-заглушка
  const [user, setUser] = useState(null);

  // Эмуляция логина
  const login = async ({ login, password }) => {
    // Любая твоя логика логина
    if (login === "admin" && password === "1234") {
      setUser({ login });
      return;
    }
    // В остальных случаях бросаем ошибку
    throw new Error("Неверный логин или пароль");
  };

  // Пример выхода
  const logout = () => setUser(null);

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
