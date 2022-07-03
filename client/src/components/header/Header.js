import  { useContext, useState } from "react"
import { GlobalState } from '../../GlobalState'
import axios from 'axios'
import Menu from './menu.svg'
import Close from './close.svg'
import Cart from './cart.svg'
import './header.css'
import { Link } from "react-router-dom"



function Header() {
    
    const state = useContext(GlobalState)
    const[isLogged] = state.userApi.isLogged
    const[isSeller] = state.userApi.isSeller

    const tok = state.token[0];

    const[menu, setMenu] = useState(false)

    const logoutUser = async() => {
        await axios.get('/auth/logout', {
            headers: {
                Authorization: `Bearer ${tok}`
            }
        })

        localStorage.removeItem('firstLogin')

        window.location.href = '/'
    }

    const loggedRouter = () =>{
        return(
            <>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }

    
    
    

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
                { isLogged ? loggedRouter() : <li> <Link to="/login">Login</Link> </li> }
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
