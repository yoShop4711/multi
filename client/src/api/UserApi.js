import { useEffect, useState } from "react"
import axios from "axios"

function UserApi(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isSeller, setIsSeller] = useState(false)

    useEffect(() => {

        if(token) {
            const getUser = async() => {
            try{
                const res = await axios.get('/auth/user', {
                    headers: {Authorization: `Bearer ${token}`}
                })
                setIsLogged(true)
            res.data.role === 1 ? setIsSeller(true) : setIsSeller(false) 
            console.log(res.data);
        }

            catch(err) {
                console.log(err);
            }




            }

            

            getUser()

            

        }


    }, [token])



    return{

isLogged: [isLogged, setIsLogged],
isSeller: [isSeller, setIsSeller]

    
    
    
    }
}

export default UserApi