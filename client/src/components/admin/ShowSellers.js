import  { useEffect, useState, useContext } from "react"
import { GlobalState } from "../../GlobalState"
import axios from 'axios'
import { DataGrid } from "@material-ui/data-grid"



function ShowSellers() {
    const[sellers, setSellers] = useState([])
    const state = useContext(GlobalState)
    const[isAdmin] = state.userApi.isAdmin

    const toke = state.token[0]


    useEffect(() => {
        const ShowSeller = async() => {
            if(isAdmin) {
    
                const res = await axios.get('/auth/show_sellers', {
                    headers: {
                        Authorization: `Bearer ${toke}`
                    }
                })
    
                setSellers(res.data.users); 
                console.log(res.data.users);         
                       }
        }
    
        ShowSeller()
    

    }, [toke, isAdmin])


    const cols = [
        { field: 'id', headerName: 'ID', width: 300 },
        {
            field: "fullname",
            headerName: 'Fullname',
            width: 150
        }
    ]

    const rowData = sellers?.map(seller => {
        return{
            fullname: seller?._id,
            id: seller?._id
        }
        
            })
        

    
    


    
    return(<div style={{width: "100%", height: 400}} >
    <DataGrid 
    
    rows={rowData}
    columns={cols}
    pageSize={5}
    rowsPerPageOptions={[5]}
    
    
    />

    </div>
    )
}

export default ShowSellers