function Login() {
    return(<div className="form-page">
        <p>login to your account to start shopping</p>
        <form className="form">

<input type="text" placeholder="your username" />
<input type="password" placeholder="your password" />
<input type="submit" name="login" />
        </form>

        <div className ="links">
    <p> forgot password?</p>
    <h1>or</h1>
    <p>register</p>

    </div>

    
    </div>)
}

export default Login