import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom"

const ProductList = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
    }, [])
    const getProducts = async () => {
        const response = await axios.get("http://localhost:3000/all-product")
        setProducts(response.data.data)
    }

    const deleteProductById = async(productId) => {
        try {
            await axios.delete(`http://localhost:3000/delete-product-by-id/${productId}`)
            getProducts();
        } catch (e) {
            console.log(e)
        }
    }

    return(
        <div className="container mt-5">
            <Link to={`/add-product`} className="button is-success">
                Add New
            </Link>

            <div className="columns is-multiline mt-2">
                {products.map((product) => (
                    <div className="column is-one-quarter" key={product.name}>
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-4by3">
                                    {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                                    <img src={product.url} alt="Image" />
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <p className="title is-4">{product.name}</p>
                                    </div>
                                </div>
                            </div>

                            <footer className="card-footer">
                                <Link to={`/edit-product/${product.name}`} className="card-footer-item">
                                    Edit
                                </Link>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a
                                    onClick={() => deleteProductById(product.name)}
                                    className="card-footer-item"
                                >
                                    Delete
                                </a>
                            </footer>
                        </div>
                    </div>
                ))}
            </div>
            <br/>
            <br/>
            <Link to={`/`} className="button is-link">
                To NIK
            </Link>
        </div>
    )
}

export default ProductList
