import { createContext, useEffect, useState } from "react"
import axios from "axios"
import UserApi from "./api/UserApi"
import CategoriesApi from "./api/CategoriesApi"


export const GlobalState = createContext()

export const DataProvider = ({children}) => {
const[token, setToken] = useState(false)

useEffect(() => {

    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin) {

        const refreshToken = async () => {
            const res = await axios.get('/auth/refresh_token', )

            setToken(res.data.accesstoken)
            localStorage.setItem('token', res.data.accesstoken)


            setTimeout(() => {
                refreshToken()
            }, 10 * 60 * 1000)
        }
        refreshToken()
    }



}, [])

const state = {
    token: [token, setToken],
    userApi: UserApi(token),
    CategoriesApi: CategoriesApi()
}

return (
    <GlobalState.Provider value={state}>
        {children}
    </GlobalState.Provider>
)



}