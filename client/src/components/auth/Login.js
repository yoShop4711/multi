import { Link } from "react-router-dom"
import './auth.css'

function Login() {
    
    return (
        <div className="login_page">
            <h2>Login</h2>
            
            <form >
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="text" placeholder="Enter email address" id="email" />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter password" id="password"
                     />
                </div>

                <div className="row">
                    <button type="submit">Login</button>
                <Link to="/forgot">Forgot your password? </Link>
                </div>
            </form>

            
            <p>New Customer? <Link to="/register"> Register</Link></p>
        </div>
    )
}

export default Login
