import React, {Component} from 'react';
import '../styles/App.css';

import logo from '../media/Logo-Quality_Check.svg';

class Header extends Component {
  render() {
    return (
        <div className='container'>
          <img src={logo} className='App-logo' alt='logo' />
        </div>
    );
  }
}

export default Header;
