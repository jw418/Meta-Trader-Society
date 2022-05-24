import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Release from "./Release";

const RouterComp = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/release" element={<Release />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RouterComp;
