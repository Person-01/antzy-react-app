//username: mor_2314
//password: 83r5^_
import React,{useState, useEffect} from 'react';
import Axios from 'axios';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import '../css/style.css';
import closeicon from '../images/close.png';
import logopng from '../images/logo_artzy.png';
import questionmarkicon from '../images/question_mark.png';


function Login(){
    const [show, showSplash] = React.useState(true);
    const [color, showColor] = React.useState(true);
    useEffect(()=>{
        setTimeout(()=>{
            showSplash(!show);
            showColor(!color);
        }, 1500);
    },[]);
    return (
        <div className={color ? "layer login-bg-color" : "layer"}>
            <Logo />
            <div className={show ? "login-disappear" : "login-appear"}>
                <Header />
                <Line />
                <LoginForm />
            </div>
        </div>
    );
}
const Logo = () => {
    const [logo, showLogo] = React.useState(true);
    useEffect(()=>{
        setTimeout(()=>{
            showLogo(!logo);
        }, 1500);
    },[]);
    return (
        <div className={logo ? "logo":"logo-disappear"}>
            <img className="logo-width" src={logopng} alt="logo png"/>
        </div>
    )
}
const Header = () => {
    return (
        <header>
            <h1 className="title">Log in</h1>
            <img className="login-close" src={closeicon} alt="close icon" />
        </header>
    )
}

const Line = () => {
    return (
        <div>
            <hr className="login-line"/>
        </div>
    )
}
const LoginForm = () => {
    const [data, setData] = useState({
        username: "",
        password: ""
    })
    const [cookies, setCookie] = useCookies(['user']);
    const navigate = useNavigate();
    const submit = (e) =>{
        e.preventDefault();
        Axios.post('https://fakestoreapi.com/auth/login',{
            username: data.username,
            password: data.password
        })
        //.then(res=>console.log('Posting data',res.data))
        // .then(
        //     res=>setCookie('Authentication Token', res.data, { path: '/', secure: true, sameSite:'strict'}),
        // )
        .then((response) =>{
            setCookie('Authentication Token', response.data, { path: '/', secure: true, sameSite:'strict'});
            navigate("/products");
        })
        .catch(
            err => console.log(err),
        )
    }
    function handle(e){
        const newdata={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }
    return (
        <div>
            <form className = "login-form" onSubmit={(e)=> submit(e)}>
                <input onChange={(e)=>handle(e)} value={data.username} className="email" type="text" placeholder="EMAIL" id="username" size="37" required />
                <input onChange={(e)=>handle(e)} value={data.password} className="password" type="password" placeholder="PASSWORD" id="password" name="pasword" size="37" required />
                <img className="questionMark" src={questionmarkicon} alt="questionmark icon"/>
                <button onClick={submit} className="login-button">LOG IN</button>
            </form>
        </div>
    )
}

export default Login;