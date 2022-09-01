import React from 'react';
import '../navbar/Navbar.css';
import {GiHamburgerMenu} from 'react-icons/gi';
import{ MdOutlineRestaurantMenu } from 'react-icons/md';
import images from '../../assets/images';
import { Link} from 'react-router-dom';
import Explore from '../pages/Explore/Explore';

const Navbar = () => {
      const [toggleMenu, setToggleMenu] =React.useState(false);

  return (
    <nav className="app__navbar">
        <div className='app__navbar-logo'>
           <Link to='/'> <img src={images.logo} alt="home" /></Link>
            </div>
            <ul className="app__navbar-links">
              <li > <Link to="/">Home</Link></li>
              <li > <Link to="/About">About</Link></li>
              <li > <Link to="/Explore">Explore</Link></li>
              <li > <Link to="/Search">Search</Link></li>
              <li > <Link to="/Review">Review</Link></li>

            </ul>
        <div className="app__navbar-login">
        <Link to="/Login">Log In/Register</Link>
        </div>

        <div className="app__navbar-smallscreen">
            <GiHamburgerMenu color="#000000" fontsize={27} onClick={()=>setToggleMenu(true)} />

            {toggleMenu && (
            <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
                < MdOutlineRestaurantMenu fontsize={27} className="overlay__close" onClick={() => setToggleMenu(false)}/>
                <ul className="app__navbar-smallscreen_links">
                  <li > <Link to="/">Home</Link></li>
                  <li > <Link to="/About">About</Link></li>
                  <li > <Link to="/Explore">Explore</Link></li>
                  <li > <Link to="/Search">Search</Link></li>
                  <li > <Link to="/Review">Review</Link></li>
                  <li><Link to="/Login">Log In/Register</Link></li>

            </ul>
            </div>
            )} 
            
        </div>
    </nav>
  )
}

export default Navbar