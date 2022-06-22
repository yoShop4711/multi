function Register() {
    return(<div className="form-page">

<p>sign up for an account with yoShop</p>

        <form className="form">
<input type="text" placeholder="your fullname" />
<input type="text" placeholder="your username" />
<input type="email" placeholder="your email" />
<input type="text" placeholder="your current home area" />
<input type="password" placeholder="your password" />
<input type="submit" name="register" />

        </form>
<div className ="links">
    <p> forgot password?</p>

    </div>
    
    </div>)
}

export default Register