import { Card } from 'react-bootstrap';
import './Tags.scss';


const Tags = (props) => {
    return ( 
        <>
        <Card className='Tag' style={{
            backgroundColor:'lightBlue'
        }}>
            {props.tag}
        </Card>
        
        </>

     );
}
 
export default Tags;