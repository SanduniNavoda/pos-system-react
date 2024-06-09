import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";

function EditOrder() {

    const {id} = useParams();

    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState(null);

    const navigate = useNavigate();

    const { isAuthenticated, jwtToken } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/orders/${id}`, config)
            .then(function(response) {
                setOrder(response.data);
            })
            .catch(function(error) {
                console.log(error);
            });

        axios.get('http://localhost:8080/products', config)
            .then(function(response) {
                setProducts(response.data)
            })
            .catch(function(error) {
                console.log(error)
            })
    },[isAuthenticated]);

    return(
        <div className="container">
            <h1>Add Products to Order #{id}</h1>

            {order &&

                <div>
                    <div className="order-details">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="datetime">
                                Date and Time: {order.orderDate}
                            </div>
                            <div className="total-price">
                                <h3>Total Price: Rs. {order.totalPrice}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-9">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {order.orderedProducts.map((product) => (
                                        <tr>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>
                                                <button type="button" className="btn btn-danger btn-sm" onClick={() => {
                                                    const data = {
                                                        productId: product.id,
                                                        quantity: 1
                                                    }
                                                    // axios.delete(`http://localhost:8080/orders/${id}/product/${product.id}`,config)
                                                    axios.post(`http://localhost:8080/orders/${id}/removeProduct`,data, config)
                                                        .then(function(response) {
                                                            setOrder(response.data);
                                                        })
                                                        .catch(function(error) {
                                                            console.log(error)
                                                        })
                                                }}>Remove</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <button type="button" className="btn btn-success" onClick={() => {
                                navigate("/orders");
                            }}>Complete Order</button>
                        </div>

                        <div className="col-lg-3">
                            <div className="products">
                                {products && (products.filter(product => product.qty > 0)).map((product) => (
                                    <div className="product p-3 bg-light shadow-sm mb-3 rounded">
                                        <h5>{product.name}</h5>
                                        <div>Rs. {product.price}</div>
                                        <button type="button" onClick={() => {
                                            const data = {
                                                productId: product.id,
                                                quantity: 1
                                            }

                                            axios.post(`http://localhost:8080/orders/${id}/addProduct`, data, config)
                                                .then(function(response){
                                                    setOrder(response.data);
                                                })
                                                .catch(function(error){
                                                    console.log(error);
                                                });

                                        }} className="btn btn-outline-secondary btn-sm">Add</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            }
        </div>

    )
}

export default EditOrder;