import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import "../Styles/Navbar.css";

function Navbar() {
    return ( 
        <div className='Navbar'>
            <div className='Navbar__logo'>
                YourDrip
            </div>
            <div className='Navbar__links'>
                <Link to="/">Home</Link>
                <Link to="/signup">Logout</Link>
            </div>
        </div>
     );
}

export default Navbar;