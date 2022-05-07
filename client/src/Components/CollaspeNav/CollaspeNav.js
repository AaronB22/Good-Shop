import { useState, useContext, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './CollaspeNav.scss';
import { UserContext } from '../../utils/UserContext';
import { LogInAuthContext } from "../../utils/LogInAuth";
import { CollaspeNavContext } from '../../utils/CollaspeNavContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faX} from '@fortawesome/free-solid-svg-icons'

const CollaspeNav = () => {
    const {userInfo, setUserInfo}= useContext(UserContext);
    const {collaspeState, setCollaspeState} = useContext(CollaspeNavContext )
    const [collClass, setCollClass]= useState('collsapeNavClosed') 
    const {logInStatus, setLogInStatus}= useContext(LogInAuthContext)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleLogOut=()=>{
        setShow(false);
        setUserInfo(null);
        setLogInStatus(false);
        // setNavName('Log In')
        window.localStorage.clear()
    }
    const handleCollaspes=()=>{
        if(collClass==='collsapeNavOpen'){
            setCollClass('collsapeNavClosed')
        }
        else{
            setCollClass('collsapeNavOpen')
        }
    }
    useEffect(()=>{
       if(collaspeState==='open'){
           setCollClass('collsapeNavOpen')
       }
       else{
        setCollClass('collsapeNavClosed')
       }
    },[collaspeState])
    if(userInfo){
        return ( 
            <>
            <div className={collClass}>
                <div className='collaspeBlock'>
                    <div className='CollaspeBar'>
                        <div className='blockTitle'>
                            Hey, {userInfo.name}

                        </div>
                    </div>
                    <h4 onClick={()=>window.location.assign('/')}>
                            Home
                        </h4>
                   
                    <h4 onClick={()=>window.location.assign('/mycart')}>
                        Cart
                    </h4>
                    <div className='catGroup'>
                        <h2 className='catHeader'>
                            Categories
                        </h2>
                        <h4 onClick={()=>window.location.assign('/productList/Phone')}>
                            Phone
                        </h4>
                        <h4 onClick={()=>window.location.assign('/productList/Tablet')}>
                            Tablet
                        </h4>
                        <h4 onClick={()=>window.location.assign('/productList/Laptop')}>
                            Laptop
                        </h4>

                    </div>
                    <Modal show={show} onHide={handleClose} className='modelCollaspe'>
                            <Modal.Header closeButton>
                            <Modal.Title>Log Out?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to Log Out?</Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} className='modelBtn'>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={handleLogOut} className='modelBtn'>
                               Log Out
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    <Button onClick={()=>setShow(true)} className='accountBtn logOut'>Log Out</Button>
                </div>
                <FontAwesomeIcon icon={faX}
                            className="closeBtn fa-2xl"
                            onClick={()=>{setCollaspeState("closed")
                        }}
                        />
                <div className='backdropCollaspe' onClick={()=>{
                        setCollaspeState("closed")
                }}>
                </div>
            </div>
            
            </>
         );
        }
        if(!userInfo){
            return(
                <>
                <div className={collClass}>
                <div className='collaspeBlock'>
                    <div className='CollaspeBar'>
                        <div className='blockTitle'>
                            Hey There, Sign In?

                        </div>
                    </div>
                    <h4 onClick={()=>window.location.assign('/')}>
                            Home
                        </h4>
                   
                    <h4 onClick={()=>window.location.assign('/mycart')}>
                        Cart
                    </h4>
                    <div className='catGroup'>
                        <h2 className='catHeader'>
                            Categories
                        </h2>
                        <h4 onClick={()=>window.location.assign('/productList/Phone')}>
                            Phone
                        </h4>
                        <h4 onClick={()=>window.location.assign('/productList/Tablet')}>
                            Tablet
                        </h4>
                        <h4 onClick={()=>window.location.assign('/productList/Laptop')}>
                            Laptop
                        </h4>

                    </div>
                    <Button onClick={()=>window.location.assign('/login')} className='accountBtn'>Sign In</Button>
                </div>
                <FontAwesomeIcon icon={faX}
                            className="closeBtn fa-2xl"
                            onClick={()=>{setCollaspeState("closed")
                        }}
                        />
                <div className='backdropCollaspe' onClick={()=>{
                        setCollaspeState("closed")
                }}>
                </div>
            </div>
                    
                </>
            )
        }
}
 
export default CollaspeNav;