import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Common from "./comp/Common";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Common />} />
      </Routes>
    </>
  );
}
