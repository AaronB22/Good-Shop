import { Navbar, Container, Nav, NavDropdown,Form} from "react-bootstrap";
import { Link } from "react-router-dom";
import './NvB.scss'
import 'bootstrap/dist/css/bootstrap.css'

const NavBarComp = () => {

    return ( 
    <Navbar expand='lg' className="NvBar">
       <Navbar.Brand className='header' onClick={(x)=>{
           window.location.assign('/')
       }}>React ECOM</Navbar.Brand> 
        <Navbar.Brand>
        <Link to="/categories" className='text-black linkText'>Categories</Link>
        </Navbar.Brand> 
        <div className="navCont">
            <Form className='searchform'>
                <Form.Group className="mb-3 search" >
                    <Form.Control placeholder="search..." />
                </Form.Group>
            </Form>
        </div>
        <div className="rightElm">
            <Navbar.Brand>
                <Link
                to='/login'
                className="login"
                >
                Log In
                </Link>    
            </Navbar.Brand> 
            <Navbar.Brand>Cart</Navbar.Brand> 

        </div>
    </Navbar>
    );
}
 
export default NavBarComp;