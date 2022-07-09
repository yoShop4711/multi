import  { useEffect, useState, useContext } from "react"
import { GlobalState } from "../../GlobalState"
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"


function ShowUsers() {
    const[users, setUsers] = useState([])
    const state = useContext(GlobalState)
    const[isAdmin] = state.userApi.isAdmin

    const toke = state.token[0]


    useEffect(() => {
        const showUsers = async() => {
            if(isAdmin) {
    
                const res = await axios.get('/auth/show_users', {
                    headers: {
                        Authorization: `Bearer ${toke}`
                    }
                })
    
                setUsers(res.data.users); 
                console.log(res.data.users);         
                       }
        }
    
        showUsers()
    

    }, [toke, isAdmin])

    
    


            
        return(<div>



        
    
    </div>)
}

export default ShowUsers