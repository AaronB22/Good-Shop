import './Login.scss'
import GoogleLogin from "react-google-login";
import {Container, Card, Form, Button} from "react-bootstrap";
import { NavBarContext } from '../../utils/navBarStatus';
import { useContext, useEffect, useState } from 'react';

const Login = () => {
    const [loaded, setLoaded]= useState(false)
    const {navBarStatus, setNavBarStatus}= useContext(NavBarContext)
    const [email, setEmail]=useState()
    const [password, setPassword]= useState()
    useEffect(()=>{
        setNavBarStatus('closed')
        setLoaded(true)
   },[])
    const handleFailure= (result) =>{
        console.log('FAIL TO GET GOOGLE DATA')
        alert(result)
    }
    const handleGoogleLogin=(result)=>{
        console.log(result)
    }

    const handleLogin=()=>{
        const userReq={
            "email": email.trim(),
            "password": password.trim()
        }
        console.log(userReq)
        fetch('/api/validateUser',{
            method: "POST",
            body: JSON.stringify(userReq),
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
              }
        }).then((res)=>{
            return res.json()
        }).then(data=>{
            console.log(data)
        })
    }

    if(loaded){
        return ( 
            <Card className='loginCard'>
             <h1 className='signinHeader'>Sign in</h1>
            <Form className="loginForm" >
            <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(x)=>{
                    setEmail(x.target.value)
                }}>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(x)=>{
                    setPassword(x.target.value)
                }}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button  style={{
                width:'100%'
            }}
                onClick={handleLogin}
            >
                Continue
            </Button>
            </Form>
                <h4>Or sign In using</h4>
                <Card
                    className='loginBtnGoogle'
                >
                    <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    onSuccess={handleGoogleLogin}
                    onFailure={handleFailure}
                    style={{
                        marginLeft:"auto",
                        marginRight:"auto"
                    }}
                    />
    
                </Card>
                <Container className='createAccCont'>
                    <h2>
                        Don't have an account?
                    </h2>
                    <Button variant="primary" type="submit" style={{
                            width:'100%',
                            background:'white',
                            color:'black',
                            border:'black 3xp solid'
                     }}>
                        Create account
                    </Button>
                </Container>
                
            </Card>
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
 
export default Login;