import './Login.scss'
import GoogleLogin from "react-google-login";
import {Container, Card, Form, Button} from "react-bootstrap";
import { NavBarContext } from '../../utils/navBarStatus';
import { useContext } from 'react';

const Login = () => {
    const {navBarStatus, setNavBarStatus}= useContext(NavBarContext)
    setNavBarStatus('closed')
    const handleFailure= (result) =>{
        console.log('FAIL TO GET GOOGLE DATA')
        alert(result)
    }
    const handleLogin=(result)=>{
        console.log(result)
    }


    return ( 
        <>
         <h1 className='signinHeader'>Sign in</h1>
        <Form className="loginForm">
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>

            <Card
                className='loginBtn'
            >
                <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                onSuccess={handleLogin}
                onFailure={handleFailure}
                style={{
                    marginLeft:"auto",
                    marginRight:"auto"
                }}
                />

            </Card>
            
        </>
     );
}
 
export default Login;