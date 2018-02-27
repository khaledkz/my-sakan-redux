import React from 'react';
import { Link } from "react-router-dom";

const Menu = () => (
    <div>
        <Link to="/">Home</Link>
        <Link to="/about">about</Link>
        <Link to="/signup">register</Link>
        <Link to="/contact">contact</Link>
    </div>
);

export default Menu;