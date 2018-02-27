import React, {Component} from 'react';
import apiClient from '../../helper/apiclient/apiClient';
import SingleFlatCard from  './SingleFlatCard'
import './css/singleFlat.css' 


export default class SingleFlat extends Component {

    constructor() {
        super();
    
        this.state = {
           flat: {}
        }
      }

    componentDidMount(){
        apiClient.GetSingleFlat(this.props.match.params.flatId).then((singleflat)=>{
             this.setState({
                flat:singleflat.data
            })
        }); 
    }
    render(){
       
        if(this.state.flat.description){
        
          return(
             <SingleFlatCard 
            flatid={this.state.flat._id} briefDescription={this.state.flat.briefDescription} 
            description={this.state.flat.description.fullDescription}
             postCode={this.state.flat.description.address.postCode}
              flatNumber={this.state.flat.description.address.flatNumber} 
             street={this.state.flat.description.address.street} title={this.state.flat.description.title}
            dataAvailable={this.state.flat.description.lettingInformation.dataAvailable} 
            price={this.state.flat.description.lettingInformation.price} deposit={this.state.flat.description.lettingInformation.deposit}
             furnishing={this.state.flat.description.lettingInformation.furnishing} city={this.state.flat.description.address.city}
            lettingType={this.state.flat.description.lettingInformation.lettingType}
             reducedOnWebsite={this.state.flat.description.lettingInformation.reducedOnWebsite}
            />
    
        )}else{
            return(<h1>Looding</h1>)
        }
    }
}


  