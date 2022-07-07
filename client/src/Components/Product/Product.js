import { useEffect, useState, useContext } from "react";
import Tags from '../Tags/Tags'
import { 
    Card,
    Container,
    Button,
    Spinner,
    Row,
    Col
    } from "react-bootstrap";
import './Product.scss'
import { LogInAuthContext } from "../../utils/LogInAuth";
import { UserContext } from "../../utils/UserContext";

const Product = (props) => {
    let tagKey = props.product._id
    const {userInfo}= useContext(UserContext)
    const [img, setImg]= useState()
    const {logInStatus}=useContext(LogInAuthContext)
    const [loaded, setLoaded]= useState(false)
    const handleWindowChange=(e)=>{
        window.location.assign('/product/'+props.product._id)
    }
    const handleAddToCart=async(e)=>{
        if(logInStatus){
            alert('Added to Cart')
            const newCart={
                "_id":userInfo.id,
                "email":userInfo.email,
                "cart":props.product._id
                
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

    useEffect(()=>{
        const getImg=async()=>{
            const res= await fetch('/api/img/'+props.product.img)
            const blob= await res.blob()
            const file= new File([blob], "img")
            const url=window.URL.createObjectURL(file);
            setImg(url)
            setLoaded(true)

        }
        getImg()
    },[props.product.img])
    const tags=props.product.tags

    if(loaded){
        return (
            <Card className="prodcard"
                key={props.product._id}
            >
                <div className="largeCard">
                    <Row className="largeCard">
                        <Card.Text className='prodHeader' onClick={handleWindowChange}>
                            {props.product.name}
                        </Card.Text>
                        <div className='imgCol'>
                        
                            <img
                                        className="prodImg"
                                        src={img}
                                        alt='Product Image'
                                        />
                        
                        
                        </div>
                        <Col className='productBlock'>
                            <Card.Text className="priceCard" onClick={handleWindowChange}>
                                        ${props.product.price}
                                    </Card.Text>
                                <Container className="ratingCont" onClick={handleWindowChange}>
                                <img
                                        className="prodRate"
                                        src={require('../../assests/star.png')}
                                        alt="Star Rating. 5 stars"
                                    />
                                </Container>
                                <Container className="TagCont" onClick={handleWindowChange}>
                                <Row>
                                        {tags.map((x, index)=>{

                                            tagKey += JSON.stringify(index)

                                            return(
                                                <Col>
                                                    <Tags
                                                        tag={x}
                                                        id={tagKey}
                                                        key={tagKey}
                                                    />
                                                
                                                </Col>
                                            )
                                        })}

                                </Row>
                                </Container>
                    
                        
                        </Col>
                            <button className="cartBtn" onClick={handleAddToCart}>
                                Add to Cart
                            </button>

                    </Row>

                </div>
                <div className="smallCard" onClick={handleWindowChange}>
                    <Card.Text className='prodHeader' onClick={handleWindowChange}>
                        {props.product.name} 
                    </Card.Text>
                    <div className='imgColSmall'>
                        
                            <img
                                        className="prodImgSmall"
                                        src={img}
                                        alt='Product Image'
                                        />
                        
                        </div>
                        <div className="priceCard">
                            ${props.product.price}
                        </div>
                        <div className="smallBtnDiv">
                            <button className="cartBtnSmall" onClick={handleAddToCart}>
                                    Add to Cart
                                </button>

                        </div>
                </div>
            </Card>
          );

    }
    if(!loaded){
        return(<>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </>)
    }
}
 
export default Product;