import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import "./scss/app.scss";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={< NotFound/>} />
      </Route>
    </Routes>
  );
}

export default App;
