import './Product.scss'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Row, Card, Container, Button } from 'react-bootstrap';
import Tags from '../../Components/Tags/Tags';
const Product = () => {
    const [product, setProduct]= useState()
    const [loaded, setLoaded]= useState(false)
    const params= useParams()
    useEffect(()=>{
        const url= '/api/productById/'+ params.id
        fetch(url).then(res=>{
            return(res.json())}).then(data=>{
            setProduct(data[0])
            setLoaded(true)
        })
    }, [])
    if(loaded){
        return ( 
            <>
                <Card className='singleProdCard'>
                    <div className='singleProdTitle'>
                        {product.name}
                    </div>
                    <img 
                    className='singleProdImg'
                    src={require('../../assests/phone.jpg')}/>
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
                                console.log(index)
                                return(
                                    <Tags
                                        tag={x}
                                        key={index}
                                    />
                                )
                            })}

                    </Container>
                    <Button >
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