import Product from "../../Components/Product/Product";
import { Col,Row } from "react-bootstrap";

const ProductList = () => {
    const test=(e)=>{
        console.log(e.target.files[0])
    }
    return ( 
    <>
    <Row>
        {/* <input type='file' onChange={test}/> */}
        <Col>
        <Product/>
        </Col>
        <Col>
        <Product/>
        </Col>
        <Col>
        <Product/>
        </Col>
        <Col>
        <Product/>
        </Col>
    </Row>
        
    </> );
}
 
export default ProductList;