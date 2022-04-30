import { Navbar,Form, Dropdown, Modal, Button, Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import './NvB.scss'
import { UserContext } from '../../utils/UserContext';
import { LogInAuthContext } from "../../utils/LogInAuth";
import 'bootstrap/dist/css/bootstrap.css'
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping, faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import CollaspeNav from "../CollaspeNav/CollaspeNav";
import { CollaspeNavContext } from "../../utils/CollaspeNavContext";


const NavBarComp = () => {
    const {collaspeState, setCollaspeState} = useContext(CollaspeNavContext )
    const {userInfo, setUserInfo}= useContext(UserContext);
    const [searchQuery, setSearchQuery]= useState()
    const {logInStatus, setLogInStatus}= useContext(LogInAuthContext)
    const [windowWidth, setWindowWidth]= useState(1800)
    const [navName,setNavName]=useState('Log In')
    const [show, setShow] = useState(false);
    useEffect(()=>{
        if(userInfo){
            setNavName(userInfo.name)
        }
        setWindowWidth(window.screen.width)
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
    const handleSearch=(e)=>{
        setSearchQuery(e.target.value)
        
    }

    if(windowWidth>1400){
        return ( 
            <>
            <Navbar expand='lg' className="NvBar">
               <Navbar.Brand className='header' onClick={(x)=>{
                   window.location.assign('/')
               }}>React ECOM</Navbar.Brand> 
                <Navbar.Brand>
                <Link to="/categories" className='text-black linkText customFont'>Categories</Link>
                </Navbar.Brand> 
                <div className="navCont">
                    <Form className='searchform'>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3 search" >
                                    <Form.Control placeholder="search..." onChange={handleSearch}
                                    onKeyDown={e=>{
                                        if(e.key==='Enter'){
                                            e.preventDefault()
                                            window.location.assign('/productListSearch/search/'+searchQuery)
                                        }
                                    }}
                                    />
                                </Form.Group>
                            
                            </Col>
                            <Col>
                                <FontAwesomeIcon icon={faMagnifyingGlass}
                                    className="searchBtn"
                                    onClick={()=>window.location.assign('/productListSearch/search/'+searchQuery)}
                                />

                            </Col>
                        </Row>
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
                                        
                                            color:'black',
                                            fontSize:'1.5rem'
                                        }}>
                                        {navName}   
                                        </Dropdown.Toggle>
        
                                        <Dropdown.Menu>
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
            </>
            );
            
        }
        if(windowWidth<=1400){
            return(
            <Navbar expand='lg' className="NvBar">
                <FontAwesomeIcon icon={faBars}
                            className="collaspeBar fa-2xl"
                            onClick={()=>{setCollaspeState("open")
                            console.log('open')
                        }}
                        />
                        <h3 onClick={()=>window.location.assign('/home')}>
                            React ECOM
                        </h3>
                {/* <Form className='searchformsmall'>
                        <Form.Group className="mb-3 searchsmall" >
                            <Form.Control placeholder="search..." />
                        </Form.Group>
                    </Form> */}
                    <Form className="searchformsmall">
                        <Row>
                                <Col>
                                    <Form.Group className="mb-3 searchsmall" >
                                        <Form.Control placeholder="search..." onChange={handleSearch}
                                        onKeyDown={e=>{
                                            if(e.key==='Enter'){
                                                e.preventDefault()
                                                window.location.assign('/productListSearch/search/'+searchQuery)
                                            }
                                        }}
                                        />
                                    </Form.Group>
                                
                                </Col>
                                <Col>
                                    <FontAwesomeIcon icon={faMagnifyingGlass}
                                        className="searchBtn"
                                        onClick={()=>window.location.assign('/productListSearch/search/'+searchQuery)}
                                    />

                                </Col>
                            </Row>

                    </Form>
                <CollaspeNav />

            </Navbar>
        )
    }
}
 
export default NavBarComp;