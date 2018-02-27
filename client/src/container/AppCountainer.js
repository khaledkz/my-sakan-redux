import React, { Component } from 'react';
import Header from '../component/home/Header';
import Footer from '../component/home/Footer';
import SearchSection from '../component/home/Search'
import './css/AppCountainer.css'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import SingleArticle from '../component/flat/SingleFlat'
import About from '../component/cards/About';
import Contact from '../component/cards/Contact';
import More from '../component/cards/More';
import CreateAccount from '../component/authentication/CreateAccount';
import PrivateContainer from './PrivateContainer';

export default class AppContainer extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Header />
                        <Route exact path="/" component={SearchSection} />
                        <Route exact path="/signup" component={CreateAccount} />
                        <Route exact path="/contact" component={Contact} />
                        <Route exact path="/user-mangment" component={PrivateContainer} />
                        <Route exact path="/flat/:flatId" component={SingleArticle} />
                     <Footer />


                </div>
            </Router>
        )
    }
}