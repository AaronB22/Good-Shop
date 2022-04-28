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
import { UserContext } from "../../utils/UserContext";

const Product = (props) => {
    const {userInfo, setUserInfo}= useContext(UserContext)
    console.log(userInfo)
    console.log(props)
    const handleAddToCart=async(e)=>{
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
    const tags=props.product.tags
        return (
            <>
                <Card className="prodcard" style={{
                    // borderBlockColor:'white',
                    // borderColor:'white',
                }}>
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
                    <Card.Text className="priceCard">
                                ${props.product.price}
                            </Card.Text>
                    <Card.Text className='prodHeader'>
                       {props.product.name}
                    </Card.Text>
                    {/* <Card.Text className="prodDes">
                        {props.product.description}
                    </Card.Text> */}
                        <Container className="ratingCont">
                        <img
                                className="prodRate"
                                src={require('../../assests/star.png')}
                            />
                        </Container>
                        <Container className="TagCont">
                           
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