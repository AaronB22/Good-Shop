import './Login.scss'
import GoogleLogin from "react-google-login";

const Login = () => {
    return ( 
        <>
            <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            
            />
            
        </>
     );
}
 
export default Login;