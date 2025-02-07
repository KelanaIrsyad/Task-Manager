// import './App.css'

import LoginForm from "./component/LoginForm";
import { AuthProvider } from "./contex/AuthContex";
import RegisterForm from "./component/RegisterForm";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./component/Home";
import TaskCreate from "./task/TaskCreate";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<TaskCreate />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
