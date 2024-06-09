import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./utils/AuthContext";

function Product(){

    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);

    const { isAuthenticated, jwtToken } = useAuth();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [qty, setQty] = useState("");
    const [categoryId, setCategoryId] = useState(null);

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    useEffect(() => {
        if(isAuthenticated){
                axios.get("http://localhost:8080/products", config)
            .then(function(response) {
                setProducts(response.data);
            })
            .catch(function(error){
                console.log(error);
            })

            axios.get("http://localhost:8080/categories", config)
            .then(function(response) {
                setCategories(response.data);
            })
            .catch(function(error){
                console.log(error);
            });
        }
        
    },[isAuthenticated])

    function getProducts() {

        axios.get("http://localhost:8080/products", config)
          .then(function (response) {
            setProducts(response.data);
          })
          .catch(function(error) {
            console.log(error);
          });
    }

    function handleName(event) {
        setName(event.target.value);
    }

    function handlePrice(event) {
        setPrice(parseFloat(event.target.value));
    }

    function handleQty(event) {
        setQty(parseInt(event.target.value));
    }

    function handleCategory(event) {
        setCategoryId(event.target.value);
    }

    function createProduct(event) {
        event.preventDefault();

        const data = {
            name: name,
            price: price,
            quantity: qty,
            categoryId: categoryId
        };

        axios.post("http://localhost:8080/products", data, config)
        .then(function (response) {
            getProducts();
            console.log(response);
        })
        .catch(function(error){
            console.log(error);
        });
    }

    const [edit, setEdit] = useState(false);
    const [productId, setProductId] = useState(null);

    function updateProduct(event){
        event.preventDefault();

        const data = {
            name: name,
            price: price,
            quantity: qty,
            categoryId: categoryId
        };

        axios.put("http://localhost:8080/products/" + productId, data, config)
        .then(function (response) {
            getProducts();
            console.log(response);
        })
        .catch(function(error){
            console.log(error);
        });
 
    }

    return (
        <div>
            <h1>Products</h1>

            {products && products.map((product) => {
                return (
                    <div key={product.id}>
                        <h2>{product.name}</h2>
                        <p>Price: {product.price}</p>
                        <p>Category: {product.category?.name}</p>
                        <p>Qty: {product.qty}</p>
                        <button type="button" className="btn btn-primary" onClick={() => {
                            setEdit(true);
                            setProductId(product.id)
                            setName(product.name);
                            setPrice(product.price);
                            setQty(product.qty);
                            setCategoryId(product.category?.id);
                        }}>Edit</button>

                        <button type='button' onClick={() => {

                        axios.delete("http://localhost:8080/products/" + product.id, config)
                        .then(function (){
                            getProducts();
                        })
                        .catch(function(error) {
                            console.log(error);
                        });

                        }}>Delete</button>
                    </div>
                )
            })}

            {!edit &&
                <form onSubmit={createProduct}>
                    <div>
                        <label>Name</label>
                        <input type="text" onChange={handleName} required></input>
                    </div>

                    <br />

                    <div>
                        <label>Price</label>
                        <input type="text" onChange={handlePrice} required></input>
                    </div>

                    <br />

                    <div>
                        <label>Quantity</label>
                        <input type="text" onChange={handleQty} required></input>
                    </div>

                    <br />

                    <div>
                        <label>Category</label>
                        <select onChange={handleCategory} required>
                            <option value="">Select a category</option>

                            {categories && categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <br />
                    <button type="submit">Create Product</button>
                </form>
            }

            

            {edit &&
                <form onSubmit={updateProduct}>
                    <div>
                        <label>Name</label>
                        <input type="text" onChange={handleName} value={name} required></input>
                    </div>

                    <br />

                    <div>
                        <label>Price</label>
                        <input type="text" onChange={handlePrice} value={price} required></input>
                    </div>

                    <br />

                    <div>
                        <label>Quantity</label>
                        <input type="text" onChange={handleQty} value={qty} required></input>
                    </div>

                    <br />

                    <div>
                        <label>Category</label>
                        <select onChange={handleCategory} required>
                            <option value="">Select a category</option>

                            {categories && categories.map((category) => (
                                <option key={category.id} value={category.id} selected={category.id === categoryId}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <br />
                    <button type="submit">Update Product</button>
                </form>
            }
        </div>
    )

}

export default Product;