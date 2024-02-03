import React from 'react';

class Footer extends React.Component {
  render() {

    return(
      <footer>
        <p>© {new Date().getFullYear()} Heidi Slojewski</p>
      </footer>
    );
  }
}

export default Footer;