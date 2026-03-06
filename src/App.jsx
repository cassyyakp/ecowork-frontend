import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./authentification/Register";
import Login from "./authentification/Login";
import Dashboard from "./admin/dashboard";


import "./index.css";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Register/>} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
  
    </BrowserRouter>
  );
} 