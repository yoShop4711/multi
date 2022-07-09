import Header from "./components/header/Header"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Forgot from "./components/auth/Forgot"
import Products from "./components/products/Products"
import Reset from "./components/auth/Reset"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { DataProvider } from "./GlobalState"
import EditUser from "./components/admin/EditUser"
import ShowUsers from "./components/admin/ShowUsers"


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

<Route path="/edit_user/:id" element={<EditUser />} />
<Route path="/show_users" element={<ShowUsers />} />

  
  </Routes>
  
  </div>
  
  </Router>
  </DataProvider>
  )
}

export default App