import { 
    Card,
    Container,
    Button,
    Carousel
    } from "react-bootstrap";
import './Home.scss'

const Home = () => {
    return (
        <div className="homeBlock">
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
        </div>
      );
}
 
export default Home;