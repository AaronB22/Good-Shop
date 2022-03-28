import { 
    Card,
    Container,
    Button,
    Carousel
    } from "react-bootstrap";
import './Home.scss'
import Product from "../../Components/Product/Product";
import { NavBarContext } from '../../utils/navBarStatus';
import { useContext } from 'react';


const Home = () => {
    const {setNavBarStatus}= useContext(NavBarContext)
    setNavBarStatus('open')
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
            <Product/>
        </div>
      );
}
 
export default Home;