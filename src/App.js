import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import './App.css';
import Categories from './Categories';
import EditOrder from './EditOrder';
import Home from './Home';
import LoginPage from './Login';
import Orders from './Orders';
import Products from './Products';
import Users from './Users';
import { AuthProvider } from './utils/AuthContext';
import ProtectedRoute from './utils/ProtectedRoutes';

function App() {
  return(
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element = {<ProtectedRoute />}>
            <Route path='/users' element = {<Users />}></Route>
            <Route path= '/products' element = {<Products />}></Route>
            <Route path= '/categories' element = {<Categories />}></Route>

            <Route path='/orders/:id/editOrder' element = {<EditOrder />}></Route>
            <Route path= '/orders' element = {<Orders />}></Route>
            <Route path='/' element = {<Home />}></Route>
          </Route>
          

          <Route path='/login' element = {<LoginPage />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
