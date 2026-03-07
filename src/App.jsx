import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./authentification/register";
import Login from "./authentification/login";
import Dashboard from "./admin/Dashboard";


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