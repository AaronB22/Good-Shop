import './Cart.scss';
import { useState, useEffect } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';

const Cart = () => {
    const [Loaded, setLoaded]= useState();
    const [Cart, setCart]= useState()
    const [itemCount, setItemCount]=useState()
    useEffect(()=>{
        fetch('/api/getAllProdsByCat/Phone')
        .then((res)=>{return(res.json())}).then((data)=>{
            console.log(data)
           
            setCart(data)
            setItemCount(JSON.stringify(data.length))
            setLoaded(true)
        })
    },[])

    if(Loaded){
        return (  
            <>
                <div className='spanMarginTop'></div>
                <div className='cartTitleDiv'>
                    <h1>
                        Shopping Cart ({itemCount} items)
                    </h1>
                    <div className='removeAllText'>
                            Remove All Itms
                    </div>
                    <div className='priceLabel'>
                           Price
                    </div>

                </div>
    
                {Cart.map(x=>{
    
                    return(
                        <>
              
                    <div className='ProductCard'>
                        <div className='imgCont'>
                            <img src={require('../../assests/phone.jpg')} className='cartImg'/>

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
                                <Button className='removeBtn' variant='danger'>
                                    REMOVE
                                </Button>
                        </div>


                    </div>
                        
                        </>
                    )
                })}
            </>
        );

    }
    if(!Loaded){
        return(<>
            <h1>
                Loading...
            </h1>
        </>)
    }
}
 
export default Cart;