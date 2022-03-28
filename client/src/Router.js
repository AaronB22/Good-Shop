import { Route, Routes} from 'react-router-dom'
import Home from './Pages/Home/Home';
import Categories from './Pages/Categories/Categories'
import Login from './Pages/Login/Login';

const Routers = () => {
    return ( 
    <>
        <Routes>
            <Route exact path='/home' element={<Home/>} />
            <Route exact path='/categories' element={<Categories/>} />
            <Route exact path='/login' element={<Login/>} />
            <Route exact path='/' element={<Home/>} />
        </Routes>
    </> );
}
 
export default Routers;