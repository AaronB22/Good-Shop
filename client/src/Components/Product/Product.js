import { useEffect, useState, useContext } from "react";
import Tags from '../Tags/Tags'
import { 
    Card,
    Container,
    Button,
    Row,
    Col,
    } from "react-bootstrap";
import './Product.scss'
import { LogInAuthContext } from "../../utils/LogInAuth";
import { UserContext } from "../../utils/UserContext";

const Product = (props) => {
    const {userInfo, setUserInfo}= useContext(UserContext)
    const {logInStatus, setLogInStatus}=useContext(LogInAuthContext)
    const handleWindowChange=(e)=>{
        console.log(props.product._id)
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
            const cart=await fetch('/api/addToCart',{
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
    const tags=props.product.tags
        return (
            <>
                <Card className="prodcard" style={{
                }}
                >
                    <Container className= "contImg">
                    {(()=>{
                        try{
                            return(
                                <img
                                className="prodImg"
                                src={require(props.product.img)}
                                />
                            )
                        }
                        catch(err){
                            return(
                                <img
                                className="prodImg"
                                src={require('../../assests/phone.jpg')}
                                />
                            )
                        }

                    })()}
                    </Container>
                    <Card.Text className="priceCard" onClick={handleWindowChange}>
                                ${props.product.price}
                            </Card.Text>
                    <Card.Text className='prodHeader' onClick={handleWindowChange}>
                       {props.product.name}
                    </Card.Text>
                        <Container className="ratingCont" onClick={handleWindowChange}>
                        <img
                                className="prodRate"
                                src={require('../../assests/star.png')}
                            />
                        </Container>
                        <Container className="TagCont" onClick={handleWindowChange}>
                           
                        {tags.map(x=>{
                            return(
                                <Tags
                                    tag={x}
                                />
                            )
                        })}
                        </Container>
            
                    <Button className="cartBtn" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                </Card>
            </>
          );
}
 
export default Product;