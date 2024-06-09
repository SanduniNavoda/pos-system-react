import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./utils/AuthContext";

function Categories(){

    const [categories, setCategories] = useState(null);
   

    const { isAuthenticated, jwtToken } = useAuth();

    const [name, setName] = useState("");

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    useEffect(() => {
        if(isAuthenticated){
                axios.get("http://localhost:8080/categories", config)
            .then(function(response) {
                setCategories(response.data);
            })
            .catch(function(error){
                console.log(error);
            })

        }
        
    },[isAuthenticated])

    function getCategories() {

        axios.get("http://localhost:8080/categories", config)
          .then(function (response) {
            setCategories(response.data);
          })
          .catch(function(error) {
            console.log(error);
          });
    }

    function handleName(event) {
        setName(event.target.value);
    }


    function createCategory(event) {
        event.preventDefault();

        const data = {
            name: name,
        };

        axios.post("http://localhost:8080/categories", data, config)
        .then(function (response) {
            getCategories();
            console.log(response);
        })
        .catch(function(error){
            console.log(error);
        });
    }

    const [edit, setEdit] = useState(false);
    const [categoryId, setCategoryId] = useState(null);

    function updateCategory(event){
        event.preventDefault();

        const data = {
            name: name,
        };

        axios.put("http://localhost:8080/categories/" + categoryId, data, config)
        .then(function (response) {
            getCategories();
            console.log(response);
        })
        .catch(function(error){
            console.log(error);
        });
 
    }

    return (
        <div>
            <h1>Categories</h1>

            {categories && categories.map((category) => {
                return (
                    <div key={category.id}>
                        <h2>{category.name}</h2>
                        <button type="button" className="btn btn-primary" onClick={() => {
                            setEdit(true);
                            setCategoryId(category.id)
                            setName(category.name);
                        }}>Edit</button>
                    </div>
                )
            })}

            {!edit &&
                <form onSubmit={createCategory}>
                    <div>
                        <label>Name</label>
                        <input type="text" onChange={handleName} required></input>
                    </div>

                    <br />

                    <button type="submit">Create Product</button>
                </form>
            }

            

            {edit &&
                <form onSubmit={updateCategory}>
                    <div>
                        <label>Name</label>
                        <input type="text" onChange={handleName} value={name} required></input>
                    </div>

                    <br />

                    <button type="submit">Update category</button>
                </form>
            }
        </div>
    )

}

export default Categories;