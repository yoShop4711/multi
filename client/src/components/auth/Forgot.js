function Forgot() {
    return(<div className="form-page">
        <p>write your email address to reset your password</p>
        <form className="form">
            <input type="email" placeholder="your email" />
            <input type="submit" name="submit" />

        </form>
    
    </div>)
}

export default Forgot