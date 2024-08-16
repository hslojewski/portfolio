import React from 'react';
import { Link } from "react-router-dom";
import { FaBars, FaLinkedinIn, FaEnvelope, FaRegSun, FaRegMoon } from "react-icons/fa6";

class Nav extends React.Component {
  render() {
    const {
      toggleColorMode, toggleNav, closeNav,
      colorMode = "light", isNavVisible
    } = this.props;
    
    var switchToLightMessage = "Switch to Light Mode",
        switchToDarkMessage = "Switch to Dark Mode",
        dynamicColorModeMessage = colorMode === "light" ? switchToDarkMessage : switchToLightMessage;

    return(
      <nav className="nav">
        <ul className={!isNavVisible ? "hide-on-mobile" : null}>
          <li className="home">
            <Link to="/">Heidi Slojewski</Link>
          </li>
          <li>
            <Link to="/about" onClick={closeNav}>About</Link>
          </li>
          <li>
            <Link to="/projects" onClick={closeNav}>Projects</Link>
          </li>
          {/* <li>
            <Link to="/resume" target="_blank">
              <span className="mobile-only-nav-text">Resume</span>
              <FaFile />
            </Link>
          </li> */}
          <li>
            <Link to="mailto:heidi.slojewski@gmail.com" aria-label="Email">
              <span className="mobile-only-nav-text">Email</span>
              <FaEnvelope />
            </Link>
          </li>
          <li>
            <Link to="https://www.linkedin.com/in/heidislojewski" target="_blank" aria-label="LinkedIn">
              <span className="mobile-only-nav-text">LinkedIn</span>
              <FaLinkedinIn />
            </Link>
          </li>
          <li className="colorMode">
            <Link className={"mode " + colorMode+"-mode"}
                  alt={[colorMode, "mode"].join(" ")}
                  onClick={toggleColorMode}>
              <span className="mobile-only-nav-text" aria-label={dynamicColorModeMessage}>{dynamicColorModeMessage}</span>
              {colorMode === "light" ? <FaRegMoon title={switchToDarkMessage} /> : <FaRegSun title={switchToLightMessage} />}
            </Link>
          </li>
          <li className="menu" aria-label="Menu" onClick={toggleNav}  onKeyUp={(e)=> e.key === 'Enter' ? toggleNav() : null} tabIndex="0">
            <FaBars />
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;