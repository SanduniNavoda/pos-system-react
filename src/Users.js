import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "./utils/AuthContext";

function Users() {
    //component

  const [users, setUsers] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { isAuthenticated, jwtToken } = useAuth();

  const [edit, setEdit] = useState(null);

  const config = {
    headers: {
        Authorization: `Bearer ${jwtToken}`
    }
  }

  useEffect(() => {
    axios.get("http://localhost:8080/users", config)
      .then(function (response) {
        setUsers(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  },[isAuthenticated])

  function getUsers() {

    axios.get("http://localhost:8080/users", config)
      .then(function (response) {
        setUsers(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // function handleUsername(event) {
  //   setUsername(event.target.value);
  // }

  const handleUsername = (event) => {
    setUsername(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function createUser(event) {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
    }

    axios.post("http://localhost:8080/users", data, config)
      .then(function (response) {
        getUsers();
        console.log(response);
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  function updateUser(event) {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
    }

    axios.put("http://localhost:8080/users/" + edit, data, config)
    .then(function (response) {
      getUsers();
      setEdit(null);
      console.log(response);
    })
    .catch(function(error) {
      console.log(error)
    })
  }

  return (
    <div className="App">

      <button type='button' onClick={getUsers}>GET USERS</button>

      {users && users.map((row) => (
        <div key={row.id}>
          {row.username} - {row.email}

          <button type='button' onClick={() => {
            setEdit(row.id);
            setUsername(row.username);
            setEmail(row.email);
          }}>Edit</button>

          <button type='button' onClick={() => {

            axios.delete("http://localhost:8080/users/" + row.id, config)
              .then(function (){
                getUsers();
              })
              .catch(function(error) {
                console.log(error);
              });

          }}>Delete</button>
        </div>
      ))
      
      }

      {!edit &&
        <div>
          <h2>Create User</h2>

          <form onSubmit= {createUser}>

            <div>
              <label>Username</label>
              <input type='text' onChange={handleUsername} required />
            </div>

            <div>
              <label>Password</label>
              <input type='password' onChange={handlePassword} required />
            </div>

            <div>
              <label>Email</label>
              <input type='email' onChange={handleEmail} required />
            </div>

            <button type='submit'>Create User</button>

          </form>
        </div>
      }

      

      {edit &&

        <div>

          <h2>Edit User</h2>

          <form onSubmit= {updateUser}>

            <div>
              <label>Username</label>
              <input type='text' onChange={handleUsername} value={username} required />
            </div>

            <div>
              <label>Password</label>
              <input type='password' onChange={handlePassword} required />
            </div>

            <div>
              <label>Email</label>
              <input type='email' onChange={handleEmail} value={email} required />
            </div>

            <button type='submit'>Update User</button>
            <button type='button' onClick={() => {
              setEdit(null);
            }}>Cancel</button>

          </form>


        </div>

      }

    </div>
  );
}

export default Users;