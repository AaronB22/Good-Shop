import  './CreateAccount.scss'
import {Container, Card, Form, Button, Alert} from "react-bootstrap";
import { NavBarContext } from '../../utils/navBarStatus';
import { UserContext } from '../../utils/UserContext';
import { LogInAuthContext } from '../../utils/LogInAuth';
import { useContext, useEffect, useState } from 'react';
import GoogleLogin from "react-google-login";

const CreateAccount = () => {
    const { setNavBarStatus}= useContext(NavBarContext);
    const {logInStatus, setLogInStatus} = useContext(LogInAuthContext);
    const {userInfo, setUserInfo}= useContext(UserContext);
    const [email, setEmail]=useState()
    const [password, setPassword]= useState()
    const [conPassword, setConPassword]= useState()
    const [name, setName]=useState()
    const [passwordAlert, setPasswordAlert]= useState()
    const [emailAlert, setEmailAlert]=useState()
    const [nameAlert, setNameAlert]= useState()
    useEffect(()=>{
        setNavBarStatus('closed')
   },[])

   const handleCreateAcc=async()=>{
       if(!name){
           setNameAlert('Must insert name')
        }
        if(!email){
            setEmailAlert('Must insert email')
        }
        let validEmail
        if(email){
            validEmail=email.includes('@'&&'.')
        }
        if(!password){
            setPasswordAlert('Must insert Password')
        }

        if(password.length<7){
            setPasswordAlert('Password Must Have Atleast 8 Characters')
        }

       if(password!==conPassword){
           setPasswordAlert('Passwords Must Match')
       }
       
       console.log(validEmail)
       if(password.length>=7 && password===conPassword &&validEmail){
           const newUser={
               "name":name,
               "email":email,
               "password":password
           }
           const res= await fetch('/api/newUser',{
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
              }
        })
        if(res.status===400){
            console.log('email in use')
            setEmailAlert('Email already used. Sign in?')
        }
        if(res.status===200){
            const data= await res.json()
            setUserInfo(data)
            window.localStorage.setItem('userData', JSON.stringify(data))
            setLogInStatus(true)
            window.location.assign('./')
        }
       }
   }

   const handleFailure= (result) =>{
    console.log('FAIL TO GET GOOGLE DATA')
    alert(result)
    }
    const handleGoogleLogin=async(data)=>{
        const newUser={
            "name":data.profileObj.name,
            "email":data.profileObj.email,
            "googleToken":data.tokenId
        }
        const res= await fetch('/api/newUser',{
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
              }
        })
        if(res.status===200){
            const data= await res.json()
            setUserInfo(data)
            window.localStorage.setItem('userData', JSON.stringify(data))
            setLogInStatus(true)
            window.location.assign('./')
        }
        if(res.status===400){
            console.log('email in use')
            setEmailAlert('Email already used. Sign in?')
        }
        
    }

    return ( 
        <Card className='createCard'>
            <h1 className='createHeader'>Create Your Account</h1>
            <Form className="createForm" >
                <Form.Group className="mb-3" onChange={(x)=>{
                        setName(x.target.value)
                    }}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="email"  />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Card.Text className='passwordAlert'>{nameAlert}</Card.Text>
                <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(x)=>{
                        setEmail(x.target.value)
                    }}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                
                <Card.Text className='passwordAlert'>{emailAlert}</Card.Text>
                <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(x)=>{
                        setPassword(x.target.value)
                    }}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="At least 8 characters" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicConPassword" onChange={(x)=>{
                        setConPassword(x.target.value)
                    }}>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password"/>
                </Form.Group>
                
                <Card.Text className='passwordAlert'>{passwordAlert}</Card.Text>
                <Button  style={{
                    width:'100%'
                }}
                    onClick={handleCreateAcc}
                >
                    Continue
                </Button>
                </Form>
                <h4>Or create account with</h4>
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
        </Card>
     );
}
 
export default CreateAccount;