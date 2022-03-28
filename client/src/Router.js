import { Route, Routes} from 'react-router-dom'
import Home from './Pages/Home/Home';
import Categories from './Pages/Categories/Categories'

const Routers = () => {
    return ( 
    <>
        <Routes>
            <Route exact path='/home' element={<Home/>} />
            <Route exact path='/categories' element={<Categories/>} />
        </Routes>
    </> );
}
 
export default Routers;