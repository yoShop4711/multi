import './auth.css'

function Reset() {
    

    
    return (
        <div className="fg_pass">
            <h2>Reset Your Password</h2>

            <div className="row">
                
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password"  />

                <label htmlFor="cf_password">Confirm Password</label>
                <input type="password" name="cf_password" id="cf_password"  />         

                <button>Reset Password</button>
            </div>
        </div>
    )
}

export default Reset
