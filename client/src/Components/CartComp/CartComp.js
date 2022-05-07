import { Button } from "react-bootstrap";
import { UserContext } from '../../utils/UserContext';
import { useState, useEffect, useContext } from 'react';


const CartComp = (props) => {
    const {userInfo}= useContext(UserContext)
    const x=props.product
    const [loaded, setLoaded]= useState(false)
    const [img, setImg]= useState()

    useEffect(()=>{
            const getProd=async()=>{
                const res= await fetch('/api/img/'+x.img)
                const blob= await res.blob()
                const file= new File([blob], "img")
                const imageUrl=window.URL.createObjectURL(file);

                setImg(imageUrl)
                setLoaded(true)

            }
            getProd()


    }, [])
    




    const removeFromCart=async(e)=>{
        const deleteObj={
            "cartId":x._id,
            "userId":userInfo.id,
            "email":userInfo.email
        }
        await fetch('/api/removeFromCart',{
            method: "POST",
            body:JSON.stringify(deleteObj),
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            }
            } )
        window.location.reload()
    }
    if(loaded){
        return ( 
            <div className='ProductCard' 
                key={x._id}
            >
                <div className='imgCont'>
                    <img src={img} className='cartImg'/>
    
                </div>
                <div className='mainCartProdBlock'>
                    <h2 className='titleCart'>
                        {x.name}
                    </h2>
                    <div className='desCont'>
                        {x.description}
                    </div>
                </div>
                <div className='priceCartCont'>
                    <div className='priceDiv'>${x.price}</div>
                        <Button className='removeBtn' variant='danger'
                        onClick={removeFromCart}
                        >
                            REMOVE
                        </Button>
                </div>
    
    
            </div>
         );
        
    }
    if(!loaded){
        return(
            <>
            Loading...
            </>
        )
    }
}
 
export default CartComp;