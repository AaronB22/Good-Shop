import { Route, Routes} from 'react-router-dom'
import Home from './Pages/Home/Home';

const Routers = () => {
    return ( 
    <>
        <Routes>
            <Route exact path='/home' element={<Home/>} />
        </Routes>
    </> );
}
 
export default Routers;