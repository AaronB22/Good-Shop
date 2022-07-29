import { Navbar,Form, Dropdown, Modal, Button, Row, Col} from "react-bootstrap";
import './NvB.scss'
import { UserContext } from '../../utils/UserContext';
import { LogInAuthContext } from "../../utils/LogInAuth";
import 'bootstrap/dist/css/bootstrap.css'
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping, faBars, faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons'
import CollaspeNav from "../CollaspeNav/CollaspeNav";
import { CollaspeNavContext } from "../../utils/CollaspeNavContext";


const NavBarComp = () => {
    const {collaspeState, setCollaspeState} = useContext(CollaspeNavContext )
    const {userInfo, setUserInfo}= useContext(UserContext);
    const [searchQuery, setSearchQuery]= useState()
    const {logInStatus, setLogInStatus}= useContext(LogInAuthContext)
    const [windowWidth, setWindowWidth]= useState(1800)
    const [navName,setNavName]=useState('Log In')
    const [blackOut, setBlackOut]= useState('blackoutClosed')
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
            <Navbar expand='lg' className="NvBar" onClick={()=>{
                 if(blackOut==='blackout'){
                    setBlackOut('closed')
                }
            }}>
               <Navbar.Brand className='header' onClick={(x)=>{
                   window.location.assign('/')
               }}>Good Shop</Navbar.Brand> 
                
                <div className="navCont">
                    <Form className='searchform'>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3 search" >
                                    <Form.Control placeholder="search..." onChange={handleSearch}
                                    className='searchBox'
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
                                    className="searchBtn fa-xl "
                                    onClick={()=>window.location.assign('/productListSearch/search/'+searchQuery)}
                                />

                            </Col>
                        </Row>
                    </Form>
                </div>
                    <Navbar.Brand
                        className="accountInfo"
                        
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
                                            <Dropdown.Item className='' onClick={()=>window.location.assign('/admin/upload')}>Upload Product</Dropdown.Item>
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
                    <div 
                        className="navBottomDiv"
                    >
                         <Row className="navBottomRow" style={{
                             marginLeft:'auto',
                             marginRight:'auto'
                         }}>
                             <Col>
                                <Dropdown className="">
                                        <Dropdown.Toggle className="dropDownBottom" >
                                         <FontAwesomeIcon icon={faBars}
                                            className="HamBtn fa-2xl"
                                            onClick={()=>{
                                                setBlackOut('blackout')
                                            }}
                                        /> 
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="catDropDown">
                                            <h2>All Categories</h2>
                                            <Dropdown.Item className='dropItemCat' onClick={()=>window.location.assign('/productList/Phone')}>Phone</Dropdown.Item>
                                            <Dropdown.Item className='dropItemCat' onClick={()=>window.location.assign('/productList/Laptop')}>Laptop</Dropdown.Item>
                                            <Dropdown.Item className='dropItemCat' onClick={()=>window.location.assign('/productList/Tablet')}>Tablet</Dropdown.Item>
                                            
                                        </Dropdown.Menu>
                                    </Dropdown>

                             </Col>

                       
                            <Col className="bottomBarItem"onClick={()=>window.location.assign('/productList/Phone')}
                            >
                                <div className="bottomBarItemText">
                                    Phone

                                </div>
                            </Col>
                            <Col className="bottomBarItem" onClick={()=>window.location.assign('/productList/Laptop')}>
                                <div className="bottomBarItemText">
                                    Laptop

                                </div>
                            </Col>
                            <Col className="bottomBarItem" onClick={()=>window.location.assign('/productList/Tablet')}>
                                <div className="bottomBarItemText">
                                    Tablet

                                </div>
                            </Col>
                        </Row>
                    </div>
            </Navbar>
            <div className={blackOut}
                onClick={()=>{
                    if(blackOut==='blackout'){
                        setBlackOut('closed')
                    }
                }}
            ></div>
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
                        <h3 onClick={()=>window.location.assign('/home')} className='homeClick'>
                            Good Shop
                        </h3>
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