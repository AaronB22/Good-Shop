import { useEffect, useState } from "react";
import { 
    Card,
    Container,
    Button,
    } from "react-bootstrap";
import './Product.scss'

const Product = () => {
    const [product, setProduct]= useState();
    const [isLoaded, setLoaded]= useState()
    useEffect(()=>{
        fetch('/api/getAllProdsByCat/:test')
        .then((res)=>{return(res.json())}).then((data)=>{
            console.log(data)
            setProduct(data[0])
            setLoaded(true)
        })
    },[])

    if(isLoaded){
        return (
            <>
                <Card className="prodcard">
                    <Card.Header>
                       {product.name}
                    </Card.Header>
                    <Container>
                        {/* <img
                        className="prodImg"
                        src={require('../../assests/phone.jpg')}
                        /> */}
                         {/* <img
                        className="prodImg"
                        src={require(product.img)}
                        /> */}
                    </Container>
                    <Card.Text>
                        $$$$
                    </Card.Text>
                    <Button className="infoBtn">
                        Info
                    </Button>
                </Card>
            </>
          );

    }
    if(!isLoaded){
        return(
            <h1>
                loading...
            </h1>
        )
    }
}
 
export default Product;