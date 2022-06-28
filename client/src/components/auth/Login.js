import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import axios from "axios";
import { showErrMsg, showSuccessMsg } from "../notifications/Notification"



function Login() {
  const navigate = useNavigate()
  const [values, setValues] = useState({ username: "", password: "" });

    const {username, password, err, success} = values


  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({...values, [name]:value, err: '', success: ''})

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post('/auth/login', {username, password})
        setValues({...values, err: '', success: res.data.msg})


        localStorage.setItem('firstLogin', true)

        navigate("../shop", { replace: true });

        
        // window.location.href = "/";
    } catch (err) {
      err.response.data.msg && 
      setValues({...values, err: err.response.data.msg, success: ''})

    }

    
  }
    


  

  return (
    <div className="login_page">
      <h2>Login</h2>
      {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}


      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <button type="submit">Login</button>
          <Link to="/forgot">Forgot your password? </Link>
        </div>
      </form>

      <p>
        New Customer? <Link to="/register"> Register</Link>
      </p>
    </div>
  );
}

export default Login;
