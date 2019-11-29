import React from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Search from "./components/search"
import {BrowserRouter,Switch,Redirect,Route} from "react-router-dom"
import Navbar from "./components/navbar"
import Cart from "./components/cart"

function App() {
  return (
    <React.Fragment>
      <Navbar/>
      <BrowserRouter>
      <Switch>
        <Route exact path="/cart"><Cart/></Route>
        <Route to="**"><Search/></Route>
      </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
