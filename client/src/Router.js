import { Route, Routes} from 'react-router-dom'
import Home from './Pages/Home/Home';
import Categories from './Pages/Categories/Categories'
import Login from './Pages/Login/Login';
import CreateAccount from './Pages/CreateAccount/CreateAccount';
import ProductList from './Pages/ProductList/ProductList';
import UploadProduct from './Pages/UploadProduct/UploadProduct';
import Cart from './Pages/Cart/Cart';
import Product from './Pages/Product/Product';
import { LogInAuthContext } from './utils/LogInAuth';
import { useContext } from 'react';

const Routers = () => {
    const {logInStatus, setLogInStatus}=  useContext(LogInAuthContext)
    return ( 
    <>
        <Routes>
            <Route exact path='/home' element={<Home/>} />
            <Route exact path='/categories' element={<Categories/>} />
            <Route exact path='/login' element={<Login/>} />
            <Route exact path='/createAccount' element={<CreateAccount/>}/>
            <Route exact path='/productList/:category' element={<ProductList/>}/>
            <Route exact path='/productListSearch/search/:category' element={<ProductList/>}/>
            <Route exact path='/admin/upload' element={<UploadProduct/>}/>

        {(()=>{
            if(window.location.pathname==='/mycart'){
                if(logInStatus){
                    return(
                        <Route exact path='/mycart' element={<Cart/>} />

                    )
        
                 }
                 if(!logInStatus){
                     alert('You need to be signed in')
                    window.location.assign('/')
                 }
             }
        
        
         })(logInStatus)}
            <Route exact path='/product/:id' element={<Product/>} />
            <Route exact path='/' element={<Home/>} />
        </Routes>
    </> );
}
 
export default Routers;