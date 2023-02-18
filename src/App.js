import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import './App.css';

import {
  Routes,
  Route,
  Link
} from "react-router-dom";

// const React = require('react'),
const React = require('react');
//       { useState, useEffect } = require('react');

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />}>
          {/* <Route path="resume" element={<Resume />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
  // Intro
  // Projects/Categories list
  // Contact/Links
}

function About() {
  return <h2>About</h2>;
}

const Navbar = () => {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
  );
}

export default App;
