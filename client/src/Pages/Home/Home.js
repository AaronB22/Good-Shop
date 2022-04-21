import { 
    Card,
    Container,
    Button,
    Carousel,
    Row,
    Col
    } from "react-bootstrap";
import './Home.scss'
import Product from "../../Components/Product/Product";
import { NavBarContext } from '../../utils/navBarStatus';
import { useContext, useEffect, useState } from 'react';


const Home = () => {
    const {setNavBarStatus}= useContext(NavBarContext)
    const [products, setProducts]= useState();
    const [loaded,setLoaded]= useState(false)
    useEffect(()=>{
        console.log('home')
        fetch('/api/getAllProdsByCat/Phone')
        .then((res)=>{return(res.json())}).then((data)=>{
            console.log(data)
           
            setProducts(data)
            setLoaded(true)
        })
    },[])
    useEffect(()=>{
        setNavBarStatus('open')
    })
    if(loaded){
        return (
            <div>
                <Carousel className="car-block">
                    <Carousel.Item>
                    <img
                        src={require('../../assests/laptop.jpg')}
                        className='imgHome'
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                    <img
                        src={require('../../assests/tablet.jpg')}
                        className='imgHome'
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        src={require('../../assests/phone.jpg')}
                        className='imgHome'
                        />
                    </Carousel.Item>
                </Carousel>
                <Row>
                    <Card.Text className='featured'>
                        Featured Products:
                    </Card.Text>
                    {products.map(x=>{
                        return(
                            <Col>
                                <Product
                                    product={x}
                                />
                            </Col>
                        )
                    })}
    

                </Row>
            </div>
          );
    }
        if(!loaded){
            return(
                <h1>
                    Loading...
                </h1>
            )
        }
    }
 
export default Home;