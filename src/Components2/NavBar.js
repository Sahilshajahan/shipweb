import React from 'react'
import "./Navbar.css";
function NavBar() {
  return (
    <div className='navbar'>
      <img className="logo" src={require("../../src/assets/geocoast_logo.png")} alt="" />
      {/* <h1 className='heading'><center>Geocoast</center></h1> */}
      <img className="logo2" src={require("../../src/assets/GCRS_Logo.png")} alt="" />
    </div>
  )
}

export default NavBar
