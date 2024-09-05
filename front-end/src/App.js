import "./App.css";
import Post from "./components/post";
import Header from "./components/header";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/layout";
import MainPage from "./pages/main";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="login" element={<div>Login</div>} />
      </Route>
    </Routes>
  );
}

export default App;
