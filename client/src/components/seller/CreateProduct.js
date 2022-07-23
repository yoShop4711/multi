import axios from "axios"
import { useContext, useState } from "react"
import {GlobalState} from "../../GlobalState"
import "./createproduct.css"




function CreateProduct() {
    const state = useContext(GlobalState)

    const proprietor = state.userApi.owner[0]
    

    const initialState = {
        productName: "",
        productDescription: "",
        productQuantity: "",
        productAvailability: "",
        category: "",
        createdBy: proprietor
    }

    const [products, setProduct] = useState(initialState)
    const[images, setImages] = useState(false)
    
    const [isSeller] = state.userApi.isSeller
    const toke = state.token[0]

    
    return( <>
            <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" />
                
                     {/* <div id="file_img"><Loading /></div> */}

                    <div id="file_img" >
                        <img src="..." alt="imageio"/>
                        <span>X</span>
                    </div>
                
                
            </div>

            <form>
                <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" name="product_id" id="product_id" required />
                </div>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required />
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                 rows="5"  />
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" id="content" required rows="7"  />
                </div>

                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category"  >
                        <option value="">Please select a category</option>
                        {/* {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        } */}
                    </select>
                </div>

                <button type="submit">Create</button>
            </form>
        </div>




             
</> )

}

export default CreateProduct