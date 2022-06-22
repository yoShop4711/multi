import Cart from './cart.svg'

function Header() {
    return(<div>
        <header className="header">
            <div className="nav">
                <nav>
                    <p>yo<span>S</span>hop</p>
                    <ul>
                        <li>
                            shop
                        </li>
                        <li>
                            login
                        </li>
                        <li>register</li>
                    </ul>
                    <div className="user">
                        <h3>user</h3>


                    </div>

                    <div className="cart">
                        <img src={Cart} alt="cart" />


                    </div>


                </nav>


            </div>

        </header>
    
    
    
    </div>)
}

export default Header