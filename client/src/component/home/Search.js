import React, { Component } from 'react';
import './css/search.css'
import ApiClient from '../../helper/apiclient/apiClient';
import FlatBrief from '../flat/flatBrief';

export default class SearchSection extends Component {
        
        constructor() {
                super();
                this.state = {
                        countries: [
                        ],
                        title: 'khaled',
                        selectedCountry: '',
                        isCountrySelected: false,
                        searchOption: '',
                        isSearchOptionSelected: false,
                        selectedCountryName:'',
                        flats: []
                }
        }

        componentDidMount() {
                ApiClient.GetCountries().then((getContries) => {
                        this.setState({
                                countries: getContries.data
                        });
                });
        }
        refreshPage = () => {
                this.setState({

                        title: 'khaled',
                        selectedCountry: '',
                        selectedCountryName:'',
                        isCountrySelected: false,
                        searchOption: '',
                        isSearchOptionSelected: false,
                        flats: []
                })
        }
        countrySelected = (event) => {

                this.state.countries.map((x)=>{
                        let contryId=x._id;
                        let targeId=event.target.value;        
                        contryId.toString();
                        targeId.toString();
                         if(contryId===targeId){
                                 return(
                                  this.setState({
                                        selectedCountryName:x.countryName
                                 }));
                         } 
                })
                  this.setState({
                        selectedCountry: event.target.value,
                        isCountrySelected: true
                });
        }

        searchToRent = () => {
                ApiClient.GetFlatCountryAndRentOrSale(this.state.selectedCountry, 'rent').then((getFlats) => {
                        console.log(getFlats)
                        this.setState({
                                isSearchOptionSelected: true,
                                flats: getFlats.data


                        });
                });


        }
        searchForSale = () => {
                ApiClient.GetFlatCountryAndRentOrSale(this.state.selectedCountry, 'sale').then((getFlats) => {
                        this.setState({
                                isSearchOptionSelected: true,
                                flats: getFlats.data


                        });
                });

        }

        render() {
                if (this.state.isCountrySelected) {
                        if (this.state.isSearchOptionSelected) {

                                return (
                                        <div className="searchSection">
                                                <button className='newSearchBtn' onClick={this.refreshPage}>New Search</button>

                                                {this.state.flats.map((x, i) => (
                                                        <div key={i}>

                                                                <FlatBrief flatid={x._id} briefDescription={x.briefDescription} description={x.description.fullDescription} postCode={x.description.address.postCode} flatNumber={x.description.address.flatNumber} street={x.description.address.street} title={x.description.title}
                                                                        dataAvailable={x.description.lettingInformation.dataAvailable} price={x.description.lettingInformation.price} deposit={x.description.lettingInformation.deposit} furnishing={x.description.lettingInformation.furnishing} city={x.description.address.city}
                                                                        lettingType={x.description.lettingInformation.lettingType} reducedOnWebsite={x.description.lettingInformation.reducedOnWebsite} />
                                                        </div>
                                                ))}

                                        </div>
                                )
                        } else {
                                return (
                                        <div className="searchSectionOuter">
                                        <div className="searchSection">

                                                <h3>{this.state.selectedCountryName} is Selected, you can select another country:</h3>
                                                
                                                <select onChange={this.countrySelected}>
                                                        <option style={{ color: 'grey' }}>--{this.state.selectedCountryName}Selected--</option>
                                                        {this.state.countries.map((x, i) => (
                                                                        
                                                                <option key={i} value={x._id}>{x.countryName} </option>
                                                        ))}
                                                </select>
                                                
                                                <h3>Choose Search Option Rent/Solid:</h3>
                                                 
                                                <div>
                                                </div>
                                                <div className="searchSection-buttons">
                                                        <button onClick={this.searchToRent}>To Rent</button>
                                                        <button onClick={this.searchForSale}>For Sale</button>
                                                </div>
                                                {this.state.searchOption}
                                        </div> </div>
                                )
                        }

                } else {
                        return (
                                <div className="searchSection">

                                        <h3>Where do you want the flat? choose Country</h3>

                                        <select onChange={this.countrySelected}>
                                                <option style={{ color: 'grey' }}>--Select Country--</option>
                                                {this.state.countries.map((x, i) => (
                                                                
                                                         <option key={i} value={x._id}>{x.countryName} </option>
                                                ))}
                                        </select>
                                </div>
                        );
                }
        }
}
