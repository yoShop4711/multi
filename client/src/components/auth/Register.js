import { useState } from "react";
import "./auth.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [values, setValues] = useState({
    fullname: '',
    username: "",
    email: "",
    password: "",
    location: "",
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    setValues({...values, [name]:value})

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    
      await axios.post('/auth/register', {...values})

      localStorage.setItem('firstLogin', true)

      window.location.href = '/login'
    
      
        
    

    


  }

  return (
    <div className="login_page">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            placeholder="Enter your fullname"
            id="fullname"
            name="fullname"
            value={values.fullname}
            onChange={handleChange}
        

          />
        </div>
        <div>
          <label htmlFor="name">username</label>
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
          <label htmlFor="email">current location</label>
          <input
            type="text"
            placeholder="Enter your current location"
            id="location"
            name="location"
            value={values.location}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            placeholder="Enter email address"
            id="email"
            name="email"
            value={values.email}
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
          <button type="submit">Register</button>
        </div>
      </form>

      <p>
        Already an account? <Link to="/login">Login</Link>{" "}
      </p>
    </div>
  );
}

export default Register;
