import React from 'react'
import Reactdom from 'react-dom'
import {Redirect} from 'react-router-dom';

class Cart extends React.Component{

    constructor(props){
        super(props);
        this.price=0;
    }

    getYourOrder=()=>{
        let orderList = Object.keys(localStorage);
        if(orderList.length>1){
            return(
                <div className="row">
                    <div className="col-md-2 offset-md-5">
                    <div class="card" style={{marginTop:"20px"}}>
                          <div class="card-header bg-warning text-center"><h2>ORDER DETAILS</h2></div>
                          <div class="card-body">
                              {orderList.map(item=>{
                                  if(item!="count" && item.substring(item.length-5)!="price"){
                                      this.price+=parseInt(localStorage.getItem(item+"price"))
                                  return (<p> <b>{item.toUpperCase()+"(Rs."+localStorage.getItem(item+"price")+")"}</b> : {localStorage.getItem(item)}</p>);
                                  }
                                  else {
                                      return (<p></p>);
                                  }
                              })}
        <p><b>Total Price</b>: Rs.{this.price}</p>
                          </div>
                          <button className="btn btn-info form-control">Place Order</button> 
                    </div>

                    </div>
                </div>
            )
        }
        else{
            return(
                <Redirect to="/"></Redirect>
            )
        }
    }

    render(){
        return (
            this.getYourOrder()
        );
    }
}

export default Cart;