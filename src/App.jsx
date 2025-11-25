import "./App.css";
import "./assets/styles/globals.scss";
import Header from "./components/layout/Header/Header";
import Main from "./components/Main/Main";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext/AuthProvider"; // <--- Импортируй свой провайдер

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Main />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
