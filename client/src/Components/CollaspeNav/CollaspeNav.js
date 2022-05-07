import { useState, useContext, useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import './CollaspeNav.scss';
import { UserContext } from '../../utils/UserContext';
import { CollaspeNavContext } from '../../utils/CollaspeNavContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faX} from '@fortawesome/free-solid-svg-icons'

const CollaspeNav = () => {
    const {userInfo, setUserInfo}= useContext(UserContext);
    const {collaspeState, setCollaspeState} = useContext(CollaspeNavContext )
    const [collClass, setCollClass]= useState('collsapeNavClosed') 
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
                    <h1>
                        ...Loading
                    </h1>
                </>
            )
        }
}
 
export default CollaspeNav;