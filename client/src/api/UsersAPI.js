import { useEffect, useState } from "react"
import axios from "axios"

function UsersAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsadmin] = useState(false)
    const[users, setUsers] = useState({})

    useEffect(() => {

        if(token) {
            const getUsers = async() => {
            try{
                const res = await axios.post('/auth/show_users', {
                    headers: {Authorization: `Bearer ${token}`}
                })
                setIsLogged(true)
            
            res.data.admin === 1 ? setIsadmin(true) : setIsadmin(false)
    
            setUsers(res)
            console.log(users);
        }

            catch(err) {
                console.log(err);
            }
            }


            getUsers()

            

        }


    }, [token, users])


    return{

isLogged: [isLogged, setIsLogged],
isAdmin: [isAdmin, setIsadmin],
users: [users, setUsers]


    
    
    
    }
}

export default UsersAPI