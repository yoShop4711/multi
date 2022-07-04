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

    const sellerRouter = () => {

        return(<>
        
        <li><Link to="/create_product">Create Product</Link></li>
                <li><Link to="/category">Categories</Link></li>

        </>)
    }

    
    
    

    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu) } >
                <img src={Menu} alt="menu" width="30" />
            </div>

            <div className="logo">
                <h1>
                 <Link to="/">{ isSeller ? state.username : 'yoShop' }</Link>
                </h1>
            </div>

            <ul style={styleMenu}>
                <li> <Link to="/">{ isSeller ? 'Products' : 'Shop'}</Link> </li>
                {isSeller && sellerRouter()}


                { isLogged ? loggedRouter() : <li> <Link to="/login">Login ✥ Register </Link> </li> }
              <li onClick={() => setMenu(!menu)} >
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
