import { 
    Card,
    Container,
    Button,
    } from "react-bootstrap";
import './Product.scss'

const Product = () => {
    return (
        <>
            <Card className="prodcard">
                <Card.Header>
                    PRODUCT NAME
                </Card.Header>
                <Container>
                    <img
                    className="prodImg"
                    src={require('../../assests/phone.jpg')}
                    />
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
 
export default Product;