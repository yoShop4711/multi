import Header from "./components/header/Header"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Forgot from "./components/auth/Forgot"
import Products from "./components/products/Products"
import Reset from "./components/auth/Reset"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { DataProvider } from "./GlobalState"
import User from "./components/admin/User"
import ShowUsers from "./components/admin/ShowUsers"
import ShowSellers from "./components/admin/ShowSellers"
import DeleteUser from "./components/admin/DeleteUser"
import FilterUsers from "./components/admin/FilterUsers"
import UserStatus from "./components/admin/UserStatus"


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

<Route path="/user/:id" element={<User />} />
<Route path="/show_users" element={<ShowUsers />} />
<Route path="/show_sellers" element={<ShowSellers />} />
<Route path="/delete_user/:id" element={<DeleteUser />} />
<Route path="/user_status/:id" element={<UserStatus />} />
<Route path="/filter_users" element={<FilterUsers />} />




  
  </Routes>
  
  </div>
  
  </Router>
  </DataProvider>
  )
}

export default App