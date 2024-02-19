import React from 'react';
import { Link } from "react-router-dom";
import { FaFolder, FaCircleInfo, FaLinkedinIn, FaFile, FaEnvelope, FaRegSun, FaRegMoon } from "react-icons/fa6";

class Nav extends React.Component {
  render() {
    const {
      toggleColorMode, toggleNav,
      colorMode = "light", isNavVisible
    } = this.props;

    return(
      <nav className="nav">
          <ul className={isNavVisible ? "show" : "hide"}>
          <li className="home"><Link to="/">Heidi Slojewski</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/resume" target="_blank">
            <span className="mobile-only-nav-text">Resume</span><FaFile />
          </Link></li>
          <li><Link to="mailto:heidi.slojewski@gmail.com">
            <span className="mobile-only-nav-text">Email</span><FaEnvelope />
          </Link></li>
          <li><Link to="https://www.linkedin.com/in/heidislojewski" target="_blank">
            <span className="mobile-only-nav-text">LinkedIn</span><FaLinkedinIn />
          </Link></li>
          <li className="colorMode"><Link className={"mode " + colorMode+"-mode"}
                    alt={[colorMode, "mode"].join(" ")}
                    onClick={toggleColorMode}>
            <span className="mobile-only-nav-text">{colorMode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}</span>
            {colorMode === "light" ? <FaRegMoon title="Switch to Dark Mode" /> : <FaRegSun title="Switch to Light Mode" />}
          </Link></li>
        </ul>
        <span className="menu" onClick={toggleNav}>Menu</span>
      </nav>
    );
  }
}

export default Nav;