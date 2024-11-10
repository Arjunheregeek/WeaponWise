

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import HomePage from "./components/HomePage"; // Your homepage

import DayFormComponent from "./components/DayFormComponent"; // Import your form
import CleanFormComponent from "./components/CleanFormComponent";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes for each page */}
        <Route path="/" element={<HomePage />} /> {/* Home Page */}
       
        <Route path="/day-form" element={<DayFormComponent />} /> {/* Day Form */}
        <Route path="/clean-form" element={<CleanFormComponent/>} />
      </Routes>
    </Router>
  );
};

export default App;