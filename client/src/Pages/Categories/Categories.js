import { Card, Container} from "react-bootstrap";
import Category from "../../Components/Category/Category";
import './Categories.scss';
import { NavBarContext } from '../../utils/navBarStatus';
import { useContext, useEffect } from 'react';

const placeholderArray=[
    {
        "category":"Laptop",
        "img":require("../../assests/laptop.jpg")
    },
    {
        "category":"Phone",
        "img":require("../../assests/phone.jpg")
    },
    {
        "category":"Tablet",
        "img":require("../../assests/tablet.jpg")
    }
]
    
const Categories = () => {
    const {setNavBarStatus}= useContext(NavBarContext)
    useEffect(()=>{
        setNavBarStatus('open')

    })
    return (
        <>
            <Container className="CatCont">
                <h1 className="CatHeader">Portable Devices</h1>
                <Category
                props={placeholderArray}
                />

            </Container>

        </>
      );
}
 
export default Categories;