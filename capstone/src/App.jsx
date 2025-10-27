import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Carts from "./pages/Carts";
import About from "./pages/About";
import Inventory from "./pages/Inventory";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carts" element={<Carts />} />
        <Route path="/about" element={<About />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </div>
  );
}
