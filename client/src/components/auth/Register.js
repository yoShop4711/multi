import './auth.css'
import { Link } from "react-router-dom"

function Register() {
    
    return (
        <div className="login_page">
            <h2>Register</h2>
            
            <form >
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Enter your name" id="name" />
                </div>
                <div>
                    <label htmlFor="name">username</label>
                    <input type="text" placeholder="Enter your username" id="name" />
                </div>


                <div>
                    <label htmlFor="email">current location</label>
                    <input type="text" placeholder="Enter your current location" id="email" />
                </div>

                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="text" placeholder="Enter email address" id="email" />
                </div>


                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter password" id="password"/>
                </div>

                
                <div className="row">
                    <button type="submit">Register</button>
                </div>
            </form>

            <p>Already an account? <Link to="/login">Login</Link> </p>
        </div>
    )
}

export default Register
