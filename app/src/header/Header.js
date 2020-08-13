import React from 'react';
import logo from '../logo.svg';
import './header.css';
class Header extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        
        }
      }
    render() {
        return ( 
            <div className = 'header' >
            <img src = { logo} className = "header-logo" alt = "logo" />
            <h3 className = 'app-title'>Restaurants App</h3>
            </div>
        )
    }
}
export default Header;