import React from "react"
import Reactdom from "react-dom" 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'



class Navbar extends React.Component{
    render(){
        return(
<nav className="navbar navbar-expand-sm bg-warning navbar-light">
<a className="navbar-brand" href="/">SmartQ Buffet</a>
<form className="form-inline" >
    <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
    <button className="btn btn-info" type="submit">Search</button>
  </form>
  <ul className="navbar-nav ml-auto">
    
    <li className="nav-item">
      <a className="nav-link" href="#"> <FontAwesomeIcon icon={faUser} /></a>
    </li>
  </ul>
</nav>
        );
    }
}

export default Navbar;