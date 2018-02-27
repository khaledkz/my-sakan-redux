import React, {Component} from 'react';
import './css/singleFlat.css'


export default class SingleFlatCard extends Component {
  
    render(){
         return(
            <div className="singleFlatOuter">

         <div className="sigleFlatInner">
            
            <div className="innerFirstPart">
                <h2> <span className="innerText">{this.props.title}.</span> </h2>
                <h2> Price: <span className="innerText">${this.props.price}.</span> </h2>
                <h3>  <span className="innerText">{this.props.city} {this.props.street} {this.props.flatNumber} {this.props.postCode}.</span> </h3>
            </div>

            <h2 className="text-title" >Letting Description:</h2>

            <div className="text-container">   
                <h3>Date Available: <span className="innerText">{this.props.dataAvailable}.</span></h3>
                <h3>Deposit: <span className="innerText">${this.props.deposit}.</span></h3>
                <h3>Furnishing: <span className="innerText">{this.props.furnishing}.</span></h3>
                <h3>LettingType: <span className="innerText">{this.props.lettingType}.</span></h3>
                <h3>ReducedOnWebsite: <span className="innerText">{this.props.reducedOnWebsite}.</span></h3>
            </div>
            
            <h2 className="text-title">Description:</h2>
            <p className="innerText"> 
                {this.props.description}
            </p>                   
        </div>

     </div> 
        )
    }
}

 