import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Owner from "./Owner";

const RouterComp = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/owner" element={<Owner />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RouterComp;
