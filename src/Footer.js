import React from 'react';
import { Routes, Route, Link, } from "react-router-dom";

class Footer extends React.Component {
  render() {
    const { toggleColorMode, colorMode = "light" } = this.props;

    return(
      <footer>
        <p>© {new Date().getFullYear()} Heidi Slojewski</p>
      </footer>
    );
  }
}

export default Footer;