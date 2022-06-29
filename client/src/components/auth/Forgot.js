import './auth.css'

function Forgot() {
    
    return (
        <div className="fg_pass">
            <h2>Forgot Your Password?</h2>

            <div className="row">
                
                <label htmlFor="email">Enter your email address</label>
                <input type="email" name="email" id="email"  />

                <label htmlFor="answer">Enter your unique word</label>
                <input type="text" name="" id="question"  />

                

                <button>Verify your email</button>
            </div>
        </div>
    )
}

export default Forgot
 
