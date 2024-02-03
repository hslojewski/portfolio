import React from 'react';
import { Routes, Route, Link, } from "react-router-dom";

class Nav extends React.Component {
  render() {
    const { toggleColorMode, colorMode = "light" } = this.props;

    return(
      <nav className="nav">
          <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="mailto:heidi.slojewski@gmail.com">Email</Link></li>
          <li><Link to="https://www.linkedin.com/in/heidislojewski" target="_blank">LinkedIn</Link></li>
          <li><Link to="/resume" target="_blank">Resume</Link></li>
          <li><Link className={"mode " + colorMode+"-mode"}
                    alt={[colorMode, "mode"].join(" ")}
                    onClick={toggleColorMode}>
          </Link></li>
        </ul>
      </nav>
    );
  }
}

export default Nav;