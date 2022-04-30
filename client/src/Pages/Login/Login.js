import './Login.scss'
import GoogleLogin from "react-google-login";
import {Container, Card, Form, Button} from "react-bootstrap";
import { NavBarContext } from '../../utils/navBarStatus';
import { UserContext } from '../../utils/UserContext';
import { LogInAuthContext } from '../../utils/LogInAuth';
import { useContext, useEffect, useState } from 'react';

const Login = () => {
    const [loaded, setLoaded]= useState(false)
    const {logInStatus, setLogInStatus} = useContext(LogInAuthContext);
    const {navBarStatus, setNavBarStatus}= useContext(NavBarContext);
    const {userInfo, setUserInfo}= useContext(UserContext);
    const [email, setEmail]=useState()
    const [password, setPassword]= useState()
    useEffect(()=>{
        setNavBarStatus('closed')
        setLoaded(true)
   },[])
    const handleFailure= (result) =>{
        console.log('FAIL TO GET DATA')
        alert(result)
    }
    const handleGoogleLogin=async(data)=>{
        const reqUser={
            "email":data.profileObj.email,
            "name":data.profileObj.name,
            "googleToken":data.tokenId
        }
        const res= await fetch('/api/googlevalidate',{
            method: "POST",
            body: JSON.stringify(reqUser),
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
              }
        })
        if(res.status===200){
            const data= await res.json()
            console.log(data)
            setUserInfo(data)
            setLogInStatus(true)
            window.localStorage.setItem('userData', JSON.stringify(data))
            window.location.assign('/')
        }
        else{
            handleFailure()
        }
    }

    const handleLogin=async()=>{
        const userReq={
            "email": email.trim(),
            "password": password.trim()
        }
        
       const res= await fetch('/api/validateUser',{
            method: "POST",
            body: JSON.stringify(userReq),
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
              }
        })
        console.log(res)
      
      if(res.status===200){
          const data= await res.json()
          console.log(data)
          setUserInfo(data)
          window.localStorage.setItem('userData', JSON.stringify(data))
          window.location.assign('/')
      }
      else{
          alert("Log In Info Incorrect")
      }
        
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
                     }}
                     onClick={()=>{window.location.assign('/createAccount')}}
                     >
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