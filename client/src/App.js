import Header from "./components/header/Header"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Forgot from "./components/auth/Forgot"
import Products from "./components/products/Products"
import Reset from "./components/auth/Reset"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { DataProvider } from "./GlobalState"


function App() {
  return(
    <DataProvider>
    <Router>
  <div className='container'>
  <Header />
  <Routes>

<Route path="/" element={ <Products /> } />

    <Route path="/login" element={<Login />
} />
  
  <Route path="/register" element={<Register />} />
  
  <Route path="/forgot" element={<Forgot />} />
  
  <Route path="/reset" element={<Reset />
} />
  
  </Routes>
  
  </div>
  
  </Router>
  </DataProvider>
  )
}

export default App