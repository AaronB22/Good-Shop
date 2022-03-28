import { Card, Container, Col, Row} from "react-bootstrap";
import "./Category.scss"

const Category = (props) => {
    const categories= props.props;
    console.log(categories)
    categories.map(x=>{
        console.log(x)
    })
    return ( 
        <>
        <Container>
            <Row>
                {categories.map(x=>{
                    
                    return(
                        <Col>
                            <Card className="catBlock">
                                <img
                                className="catImg"
                                src={x.img}
                                />
                                <div className="hoverCat" >
                                <div className="catTitle">
                                    {x.category}
                                </div>
                                </div>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Container>
        </>
     );
}
 
export default Category;