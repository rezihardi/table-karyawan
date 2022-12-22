import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () =>{
    const [title, setTitle] = useState("")
    const [file, setFile] = useState("")
    const [preview, setPreview] = useState("")
    const { name } = useParams()
    const navigate = useNavigate();

    useEffect(()=> {
        getProductById()
    }, [])

    const getProductById = async () => {
        const resp = await axios.get(`http://localhost:3000/get-product-by-id/${name}`)
        setTitle(resp.data.data.name)
        setFile(resp.data.data.image)
        setPreview(resp.data.data.url)
    }

    const loadImage = (e) => {
        const image = e.target.files[0]
        setFile(image)
        setPreview(URL.createObjectURL(image))
    }

    const updateProduct = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("file", file)
        try {
            await axios.put(`http://localhost:3000/updateProduct/${name}?title=${title}`, formData,{
                headers: {
                    "content-type": "multipart/form-data"
                }
            })
            navigate("/product")
        } catch (e){
            console.log(e)
        }
    }
    return(
        <div className="columns is-centered mt-5">
            <div className="column is-half">
                <form onSubmit={updateProduct}>
                    <div className="field">
                        <label className="label">Product Name</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Product Name"
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Image</label>
                        <div className="control">
                            <div className="file">
                                <label className="file-label">
                                    <input
                                        type="file"
                                        className="file-input"
                                        onChange={loadImage}
                                    />
                                    <span className="file-cta">
                    <span className="file-label">Choose a file...</span>
                  </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {preview ? (
                        <figure className="image is-128x128">
                            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                            <img src={preview} alt="Preview Image" />
                        </figure>
                    ) : (
                        ""
                    )}

                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-success">
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

}
export default EditProduct