import { useEffect, useState } from "react";
import { 
    Card,
    Container,
    Button,
    Row,
    Col,
    } from "react-bootstrap";
import './Product.scss'

const Product = (props) => {
    console.log(props)
    console.log(props.product.name)
        return (
            <>
                <Card className="prodcard">
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
           
                    {/* <Container>
                        <Row>
                            <Col>
                            <Card.Text>
                                ${props.product.price}
                            </Card.Text>
                            </Col>
                            <Col>
                            <img
                                className="prodRate"
                                src={require('../../assests/star.png')}
                            />
                            </Col>
                        </Row>
                    </Container> */}
                    <Button className="cartBtn">
                        Add to Cart
                    </Button>
                </Card>
            </>
          );
}
 
export default Product;