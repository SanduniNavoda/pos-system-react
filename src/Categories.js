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
                    <div  className="product p-3 bg-light shadow-sm mb-3 rounded" key={category.id}>
                        <h2>{category.name}</h2>
                        <button type="button" className="btn btn-primary btn-sm" onClick={() => {
                            setEdit(true);
                            setCategoryId(category.id)
                            setName(category.name);
                        }}>Edit</button>

                        <button type='button' className="btn btn-danger btn-sm m-1" onClick={() => {

                        axios.delete("http://localhost:8080/categories/" + category.id, config)
                        .then(function (){
                            getCategories();
                        })
                        .catch(function(error) {
                            console.log(error);
                        });

                        }}>Delete</button>
                    </div>

                )
            })}

            <br />

            {!edit &&
                <form onSubmit={createCategory}>
                    <div>
                        <label>Name: </label>
                        <input type="text" onChange={handleName} required></input>
                    </div>

                    <br />

                    <button className="btn btn-success" type="submit">Create Category</button>
                </form>
            }

            

            {edit &&
                <form onSubmit={updateCategory}>
                    <div>
                        <label>Name</label>
                        <input type="text" onChange={handleName} value={name} required></input>
                    </div>

                    <br />

                    <button className="btn btn-warning" type="submit">Update Category</button>
                </form>
            }
        </div>
    )

}

export default Categories;