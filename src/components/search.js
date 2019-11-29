import React, { Fragment } from 'react';
import 'react-bootstrap';
import Reactdom from 'react-dom'; 
import axios from "axios";
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NONAME } from 'dns';

class Search extends React.Component{
    
    constructor(props){
        super(props)
        this.month=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
        this.state={
            data:[],
            order:"",
            cart:{},
            count:0
        }
    }

    componentDidMount(){
        axios.get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/smartQFood8bef5a2.json").then(res=>{
            if(!localStorage.getItem('count'))
            localStorage.setItem('count',0)

            this.setState({data:res.data,count:localStorage.getItem('count')});
        }).catch((err=>{
            console.log(err);
        }))
    }

    addToCart=(event)=>{
        localStorage.setItem(event.target.id,1);
        localStorage.setItem(event.target.id+"price",event.target.value)
        if(localStorage.getItem('count'))
        localStorage.setItem('count',parseInt(localStorage.getItem('count'))+1);
        else
        localStorage.setItem('count',1);
        
        this.setState({cart:{},count:localStorage.getItem('count')})
    }
    removeFromCart=(event)=>{
        localStorage.removeItem(event.target.id);
        localStorage.removeItem(event.target.id+"price")
        localStorage.setItem('count',parseInt(localStorage.getItem('count'))-1)
        this.setState({cart:{},count:localStorage.getItem('count')})
    }

    sort=(event)=>{
        this.setState({order:event.target.value});
        let data=this.state.data;
        if(event.target.value=="DES")
        data.sort(
            (a,b) => {

                    if (a.price>b.price)
                    return -1;
                    else if((a.price<b.price))
                    return 1;
                    else
                    return 0;
            }
        );
        else if(event.target.value=="ASC")
        data.sort(
            (a,b) => {

                    if (a.price>b.price)
                    return 1;
                    else if((a.price<b.price))
                    return -1;
                    else
                    return 0;
            }
        );
        this.setState({data:data});
    }

    setNavbar(){
        return(
            <nav className="navbar navbar-expand-sm bg-light navbar-light">
<a className="navbar-brand" href="#">Lunch</a>
  <ul className="navbar-nav ml-auto">
    <li className="nav-item">
        <a className="nav-link" href="#"><FontAwesomeIcon icon={faCalendarDay} />{ (new Date()).getDate()+"-"+this.month[(new Date()).getMonth()]+"-"+(new Date()).getFullYear()}</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="#"><FontAwesomeIcon icon={faFilter} />
      <select onChange={this.sort} style={{border:"none"}}>
          <option value="" selected disabled>Sort:Price</option>
          <option value="ASC">Ascending</option>
          <option value="DES">Descending</option>
      </select>
      </a>
    </li>
    <li className="nav-item">
        <a className="nav-link" href="/cart"><FontAwesomeIcon icon={faCartPlus} /><span class="badge badge-secondary">{this.state.count}</span></a>
    </li>
  </ul>
</nav>
        )
    }
    setBuffetMenu(){
        console.log(this.state.data)
        console.log(this.state.cart)
        if(this.state.data.length!=0){
            return(
                <div className="row">
                    {
                        this.state.data.map((item)=>{
                            return(
                                <div style={{marginTop:"10px",marginBottom:"10px",padding:"0px"}} className="card col-md-3 offset-md-1">
                                    <div className="text-center card-header bg-warning"><h3>{item.itemname.toUpperCase()}</h3></div>
                                    <div className="card-body">
                                        <p><b>Timings:</b>{item.availabletime}</p>
                                        <p><b>Price:</b> Rs.{item.price}</p>
                                        {!localStorage.getItem(item.itemname)
                                        ?<button value={item.price} onClick={this.addToCart} id={item.itemname}  className="btn btn-info form-control">ADD</button>
                                        :<button value={item.price} onClick={this.removeFromCart} id={item.itemname}  className="btn btn-danger form-control">REMOVE</button>
                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        } 
        else{
            return(<React.Fragment></React.Fragment>)
        }   
    }
    
    render(){

       return (<React.Fragment>
           {this.setNavbar()}
           <div className="container">
           {this.setBuffetMenu()}
           </div>
           </React.Fragment>)
    }
}

export default Search;