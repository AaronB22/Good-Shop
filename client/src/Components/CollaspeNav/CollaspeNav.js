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
            console.log('open')
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
                    <h4 onClick={()=>window.location.assign('/categories')}>
                        Categories
                    </h4>
                    <h4 onClick={()=>window.location.assign('/mycart')}>
                        Cart
                    </h4>
    
                </div>
                <FontAwesomeIcon icon={faX}
                            className="closeBtn fa-2xl"
                            onClick={()=>{setCollaspeState("closed")
                            console.log('closed')
                        }}
                        />
                <div className='backdropCollaspe'>
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