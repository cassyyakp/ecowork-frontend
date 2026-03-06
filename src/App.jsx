import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./authentification/register";
import Login1 from "./authentification/Login1";
import Login from "./authentification/login";


import "./index.css";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Register/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login1 />} /> 
        <Route path="/login1" element={<Login />} /> 
      </Routes>
  
    </BrowserRouter>
  );
} 