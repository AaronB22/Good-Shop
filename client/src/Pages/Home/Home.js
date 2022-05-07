import { 
    Card,
    Carousel,
    Row,
    Col
    } from "react-bootstrap";
import './Home.scss'
import Product from "../../Components/Product/Product";
import { NavBarContext } from '../../utils/navBarStatus';
import { useContext, useEffect, useState } from 'react';


const Home = () => {
    let productCount=0;
    const {setNavBarStatus}= useContext(NavBarContext)
    const [products, setProducts]= useState();
    const [loaded,setLoaded]= useState(false)
    useEffect(()=>{
        fetch('/api/getAllProdsByCat/Phone')
        .then((res)=>{return(res.json())}).then((data)=>{
            setProducts(data)
            setLoaded(true)
        })
    },[])
    useEffect(()=>{
        setNavBarStatus('open')
    })
    const handleWindowChange=(e)=>{
        window.location.assign('/productList/'+e.target.id)
    }

    if(loaded){
        return (
            <div>
                <Carousel className="car-block">
                    <Carousel.Item>
                    <img
                        src={require('../../assests/laptop.jpg')}
                        className='imgHome'
                        onClick={handleWindowChange}
                        id='Laptop'
                        alt="Laptop Category"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                    <img
                        src={require('../../assests/tablet.jpg')}
                        className='imgHome'
                        onClick={handleWindowChange}
                        id='Tablet'
                        alt="Tablet Category"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        src={require('../../assests/phone.jpg')}
                        className='imgHome'
                        onClick={handleWindowChange}
                        id='Phone'
                        alt="Phone Category"
                        />
                    </Carousel.Item>
                </Carousel>
                <Row>
                    <Card.Text className='featured'>
                        Featured Products:
                    </Card.Text>
                    {products.map(x=>{
                        productCount+=1;
                        if(productCount<=10){
                            return(
                                <Col className="FeatureProd"
                                    key={x._id}
                                >
                                    <Product
                                        product={x}
                                    />
                                </Col>
                            )

                        }
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