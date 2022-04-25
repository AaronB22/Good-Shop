import { Navbar,Form, Dropdown, Modal, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import './NvB.scss'
import { UserContext } from '../../utils/UserContext';
import { LogInAuthContext } from "../../utils/LogInAuth";
import 'bootstrap/dist/css/bootstrap.css'
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping } from '@fortawesome/free-solid-svg-icons'

const NavBarComp = () => {
    const {userInfo, setUserInfo}= useContext(UserContext);
    const {logInStatus, setLogInStatus}= useContext(LogInAuthContext)
    const [navName,setNavName]=useState('Log In')
    const [show, setShow] = useState(false);
    useEffect(()=>{
        if(userInfo){
            setNavName(userInfo.name)
        }
    },[userInfo])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleLogOut=()=>{
        setShow(false);
        setUserInfo(null);
        setLogInStatus(false);
        setNavName('Log In')
        window.localStorage.clear()
    }

    return ( 
    <Navbar expand='lg' className="NvBar">
       <Navbar.Brand className='header' onClick={(x)=>{
           window.location.assign('/')
       }}>React ECOM</Navbar.Brand> 
        <Navbar.Brand>
        <Link to="/categories" className='text-black linkText customFont'>Categories</Link>
        </Navbar.Brand> 
        <div className="navCont">
            <Form className='searchform'>
                <Form.Group className="mb-3 search" >
                    <Form.Control placeholder="search..." />
                </Form.Group>
            </Form>
        </div>
            <Navbar.Brand
                style={{
                    cursor:"pointer"
                }}
            >
                {(()=>{
                    if(!logInStatus){
                        return(
                            <>
                            <div 
                            className="customFont"
                            onClick={()=>window.location.assign('/login')}>
                            {navName}

                            </div>
                            </>
                        )
                    }
                    if(logInStatus){
                        return(
                            <>
                                <Dropdown className="customDrop">
                                <Dropdown.Toggle className="dropBtn" style={{
                                    background: '#4E4E50',
                                    border:'#4E4E50',
                                    color:'black',
                                    fontSize:'1.5rem'
                                }}>
                                {navName}   
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {/* <Dropdown.Item href="#/action-1">Account Settings</Dropdown.Item> */}
                                    <Dropdown.Item className='text-danger' onClick={handleShow}>Log Out</Dropdown.Item>
                                </Dropdown.Menu>
                                </Dropdown>
                            </>
                        )
                    }
                })()}



                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Log Out?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to Log Out?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleLogOut}>
                       Log Out
                    </Button>
                    </Modal.Footer>
                </Modal>
                
            </Navbar.Brand> 
            <Navbar.Brand>
                <FontAwesomeIcon icon={faCartShopping}
                    className="cart"
                    onClick={()=>window.location.assign('/mycart')}
                />
            </Navbar.Brand> 
    </Navbar>
    );
}
 
export default NavBarComp;