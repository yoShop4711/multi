import { useState, useEffect, useContext } from "react"
import {GlobalState} from "../../GlobalState"
import axios from "axios"
import { useParams } from "react-router-dom"

function User() {
    const[users, setUsers] = useState([])
    const[single, setSingle] = useState([])
    const state = useContext(GlobalState)
    const[isAdmin] = state.userApi.isAdmin

    const toke = state.token[0]


    const {id} = useParams()
    console.log(id);

    useEffect(() => {

        const showUsers = async() => {
        
    
                const res = await axios.get('/auth/show_users', {
                    headers: {
                        Authorization: `Bearer ${toke}`
                    }
                })
    
                setUsers(res.data.users); 
                       
                       
        }
    
        showUsers()

        

        
    }, [isAdmin, toke])


    useEffect(() => {

        if(id) {
            users.forEach(user => {
                if(user._id === id) setSingle(user)
                
                
                
                
            })
        }
    


    }, [id, users])

    if(single.length === 0) return null;
    

  
return(
    <>
    
    
    </>

)

}


export default User