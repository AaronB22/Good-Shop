import { Navbar, Container, Nav, NavDropdown,Form} from "react-bootstrap";
import './NvB.scss'
import 'bootstrap/dist/css/bootstrap.css'

const NavBarComp = () => {

    return ( 
    <Navbar expand='lg' className="NvBar">
       <Navbar.Brand className='header'>React ECOM</Navbar.Brand> 
        <Navbar.Brand> Catagories</Navbar.Brand> 
        <Navbar.Brand>Upload Product</Navbar.Brand> 
        <div className="navCont">
            <Form className='searchform'>
                <Form.Group className="mb-3 search" >
                    <Form.Control placeholder="search..." />
                </Form.Group>
            </Form>
        </div>
        <div className="rightElm">
            <Navbar.Brand>Sign Up</Navbar.Brand> 
            <Navbar.Brand>Cart</Navbar.Brand> 

        </div>
    </Navbar>
    );
}
 
export default NavBarComp;