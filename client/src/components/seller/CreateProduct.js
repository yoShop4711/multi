import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {GlobalState} from "../../GlobalState"
import "./createproduct.css"

function CreateProduct() {
    const state = useContext(GlobalState)

    const proprietor = state.userApi.owner[0]
    


    const [product, setProduct] = useState({
        productName: "",
        productDescription: "",
        productQuantity: "",
        productAvailability: "",
        category: "",
        productImage: " ",
        createdBy: proprietor
    })
    const[images, setImages] = useState(false)
    const[categories] = state.CategoriesApi.categories   
    const [isSeller] = state.userApi.isSeller
    const toke = state.token[0]

    const {id} = useParams()

    // const imake = product.createdBy

    // console.log(imake);

    const[products] = state.ProductsApi.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.ProductsApi.callback

    // useEffect(()=> {

    //     if(id) {
    //         setOnEdit(true)
    //         products.forEach(product => {
    //             if(product._id === id) {
    //                 setProduct(product)
    //                 setImages(product.images)
    //             }
    //         })
    //     } else {
    //         setOnEdit(false)
    //         setProduct(initialState)
    //         setImages(false)
    //     }

    // }, [id, products])


    const handleUpload = async(event) => {

        if(!isSeller) return alert("you are not a seller")

        const file = event.target.files[0]

        if(file.type !== 'image/jpg') // 1mb
                return alert("File format is incorrect. must be jpg.")

        
        
        let formData = new formData()
        formData.append('file', product.productImage)

        





    }


    
    return( <>
            <div className="create_product">
            
            <form>

            <div className="row">
            <div className="upload">
                <input type="file"  id="file_up" />
                
            </div>

                    

                </div>



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
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit">Create</button>
            </form>
        </div>




             
</> )

}

export default CreateProduct