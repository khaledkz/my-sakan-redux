import React from 'react';
import './css/header.css'
import { Link } from "react-router-dom";

const Header = () => (
    <header>
        <div className="header-first-part">
            <img alt="sakan" width="50" src="https://hostelhunting.com/img/explore/howitworks/look.png" />
            <h3>My-Sakan</h3>
        </div>

        <div className="header-second-part">
            <nav>
                <ul>                 
                       <Link to="/"><li>Home</li></Link>
                       {/* <Link to="/about"><li>About</li></Link> */}
                       <Link to="/signup"><li>Register</li></Link>
                       <Link to="/contact"><li>Contact</li></Link>
                       <Link to="/user-mangment"><li>User</li></Link>
                </ul>
            </nav>
        </div>
    </header>
);
export default Header;