import Menu from './menu.svg'
import Close from './close.svg'
import Cart from './cart.svg'
import './header.css'

import { Link } from "react-router-dom"


function Header() {
    
    
    
    

    // const styleMenu = {
    //     left: menu ? 0 : "-100%"
    // }

    return (
        <header>
            <div className="menu" >
                <img src={Menu} alt="menu" width="30" />
            </div>

            <div className="logo">
                <h3>
                 <Link to="/"> yoShop </Link>
                </h3>
            </div>

            <ul>
                <li> <Link to="/">Shop</Link> </li>
                <li> <Link to="/login">Login</Link> </li>
                <li> <Link to="/register">Register</Link> </li>



              

            

                <li >
                    <img src={Close} alt="close" width="30" className="menu" />
                </li>

            </ul>

            <div className="cart-icon">
            
                      <Link to="/cart">  <img src={Cart} alt="cart" width="30" /> </Link>
                    
                </div>
            
            
        </header>
    )
}

export default Header
