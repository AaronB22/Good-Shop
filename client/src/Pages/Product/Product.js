import './Product.scss'
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import Tags from '../../Components/Tags/Tags';
import { LogInAuthContext } from "../../utils/LogInAuth";
import { UserContext } from "../../utils/UserContext";

const Product = () => {
    const [product, setProduct]= useState()
    const [loaded, setLoaded]= useState(false)
    const [img, setImg]= useState()
    const {logInStatus}=useContext(LogInAuthContext)
    const {userInfo}= useContext(UserContext)
    const params= useParams()
    useEffect(()=>{
        const url= '/api/productById/'+ params.id
            const getProd=async()=>{
                const prodRes= await fetch(url);
                const prodData= await prodRes.json()
                const prod=prodData[0]
                const res= await fetch('/api/img/'+prod.img)
                const blob= await res.blob()
                const file= new File([blob], "img")
                const imageUrl=window.URL.createObjectURL(file);
                setProduct(prod)
                setImg(imageUrl)
                setLoaded(true)

            }
            getProd()


    }, [params.id])
    const handleAddToCart=async(e)=>{
        if(logInStatus){
            alert('Added to Cart')
            const newCart={
                "_id":userInfo.id,
                "email":userInfo.email,
                "cart":product._id
                
            }
            await fetch('/api/addToCart',{
             method: "POST",
             body: JSON.stringify(newCart),
             headers: {
                 Accept: 'application/json, text/plain, */*',
                 'Content-Type': 'application/json',
               }
             } )

        }
        if(!logInStatus){
            alert("Need to be Logged In")
        }
    }


    if(loaded){
        return ( 
            <>
                <Card className='singleProdCard'>
                    <div className='singleProdTitle'>
                        {product.name}
                    </div>
                    <img 
                    className='singleProdImg'
                    src={img}
                    alt='Product Image'
                    />
                    <div className='singlePrice'>
                        ${product.price}
                    </div>
                    <div className='singleDes'>
                        {product.description}
                    </div>
                        <div className='singleTags'>
                            Product Tags:
                        </div>
                    <Container className='TagCont'>
                        {product.tags.map((x, index)=>{
                                return(
                                    <div
                                    key={index}
                                    className='tagProdPage'
                                    >
                                        <Tags
                                            tag={x}
                                        />

                                    </div>
                                )
                            })}

                    </Container>
                    <Button onClick={handleAddToCart}>
                        ADD TO CART
                    </Button>
                </Card>

            </>
    
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
 
export default Product;