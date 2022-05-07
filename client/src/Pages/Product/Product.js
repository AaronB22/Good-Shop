import './Product.scss'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Row, Card, Container, Button } from 'react-bootstrap';
import Tags from '../../Components/Tags/Tags';
const Product = () => {
    const [product, setProduct]= useState()
    const [loaded, setLoaded]= useState(false)
    const [img, setImg]= useState()
    const params= useParams()
    useEffect(()=>{
        const url= '/api/productById/'+ params.id
        // fetch(url).then(res=>{
        //     return(res.json())}).then(data=>{
        //     })
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
                    src={img}/>
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