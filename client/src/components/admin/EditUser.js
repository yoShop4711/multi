import { useContext, useEffect, useState } from "react"
import { GlobalState } from "../../GlobalState"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import "./profile.css"

function EditUser() {


    
return(
    <div className="profile_page edit_user">
    <div className="row">
        <button  className="go_back">
            <i className="fas fa-long-arrow-alt-left"></i> Go Back
        </button>
    </div>

    <div className="col-left">
        <h2>Edit User</h2>
        <div className="form-group">
            <label htmlFor="email">role (input 1 to upgrade user to seller and zero to demote to buyer)</label>
            <input type="number" name="role"  disabled />
        </div>


        <div className="form-group">
            <input type="checkbox" id="isAdmin" 
             />
            <label htmlFor="isAdmin">isAdmin</label>
        </div>

        <button>Update</button>

        
    </div>
</div>

)

}


export default EditUser