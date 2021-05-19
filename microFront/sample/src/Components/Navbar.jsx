import React from 'react'
import logo from '../Assets/ellucian-logo.png'

const Navbar = ({children}) => {
    return (
        <div>
       <nav className="navbar">
        
<span className="logo"><img height="50px" src={logo}/>Ellucian</span>
       </nav>
       {{...children}}
       </div>
    )
}

export default Navbar
