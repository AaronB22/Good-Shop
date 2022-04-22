import { useEffect, useState } from "react";
import Tags from '../Tags/Tags'
import { 
    Card,
    Container,
    Button,
    Row,
    Col,
    } from "react-bootstrap";
import './Product.scss'

const Product = (props) => {
    const tags=props.product.tags
    console.log(props)
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
            
                    <Button className="cartBtn">
                        Add to Cart
                    </Button>
                </Card>
            </>
          );
}
 
export default Product;