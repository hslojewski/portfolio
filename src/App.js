import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import './App.css';

import {
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from './Home';
import About from './About';
import Projects from './Projects';

// const React = require('react'),
const React = require('react');
//       { useState, useEffect } = require('react');

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />}>
        </Route>
      </Routes>
    </div>
  );
}

const Navbar = () => {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/projects">Projects</Link></li>
      <li><Link to="/email">Email</Link></li>
      <li><Link to="/linkedin">LinkedIn</Link></li>
      <li><Link to="/resume">Resume</Link></li>
    </ul>
  );
}

export default App;
