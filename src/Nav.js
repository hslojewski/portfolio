import React from 'react';
import { Routes, Route, Link, } from "react-router-dom";

class Nav extends React.Component {
  render() {
    const { toggleColorMode, colorMode = "light" } = this.props;

    return(
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/email">Email</Link></li>
        <li><Link to="/linkedin">LinkedIn</Link></li>
        <li><Link to="/resume">Resume</Link></li>
        <li><button onClick={toggleColorMode}>{colorMode === "light" ? "Dark Mode" : "Light Mode"}</button></li>
      </ul>
    );
  }
}

export default Nav;