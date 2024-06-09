import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";

function Orders() {

    const [orders, setOrders] = useState(null);

    const navigate = useNavigate();

    const { isAuthenticated, jwtToken } = useAuth();
    
    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }
    
    useEffect(() => {
        axios.get("http://localhost:8080/orders", config)
            .then(function(response) {
                console.log(response)
                setOrders(response.data);
            })
            .catch(function(error) {
                console.log(error);
            })
    },[isAuthenticated])

    function createOrder() {
        axios.post("http://localhost:8080/orders", {}, config)
            .then(function(response) {
                navigate(`/orders/${response.data.id}/editOrder`);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    return (
        <div className="container">
            <h1>Orders</h1>

            <div className="text-end">
                <button type="button" className="btn btn-primary" onClick={createOrder}>Create order</button>
            </div>
            

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Date and Time</th>
                        <th>Total Items</th>
                        <th>Total Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {orders && orders.map((order) => (
                        <tr>
                            <td>{order.id}</td>
                            <td>{order.orderDate}</td>
                            <td>{order.orderedProducts.length}</td>
                            <td>{order.totalPrice}</td>
                            <td><button className="btn btn-primary btn-sm" onClick={() => {
                                navigate(`/orders/${order.id}/editOrder`);
                            }}>Edit</button></td>
                        </tr>
                    ))

                    }
                </tbody>
            </table>

        </div>
    )
}

export default Orders;