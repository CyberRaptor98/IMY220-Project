import { useState } from 'react'


function LoginForm(props){
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [rPassword,setRPassword] = useState("");

    const clearFeilds = () => {
        setPassword("");
        setUsername("");
        setEmail("");
        setRPassword("");
    }

    const getLoginForm = (e) => {
        e.preventDefault();
        //Validation
        if(username.length < 0){
            alert("enter a Username.");
            return;
        }
        if(password.length < 8){
            alert("Password must be at least 8 characters.");
            return;
        }

        //making Json objects
        if(isLogin){
            const loginJson = {
                type : "Login",
                username : username,
                password : password
            }
            //console.log(loginJson)
            props.handleUForm(loginJson);

            clearFeilds();
        }else{

            if(password != rPassword ){
                alert("Passwords Should match.");
                return;
            }

            if(!email.includes("@")){
                alert("Email Should contain @ character.");
                return;
            }
            
            const registerJson = {
                type : "Register",
                username : username,
                password : password,
                email : email
            }

            //console.log(registerJson)
            props.handleUForm(registerJson);
            clearFeilds();
            
        }
    }

    return(
        <div>
            <h1>Photoshare</h1>
            <p>Share Photos here WOW</p><br/>

            {isLogin?(
                <form onSubmit={getLoginForm}>
                    <label>Username: </label><br/>
                    <input 
                    value = {username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text" required></input><br/>

                    <label>Password: </label><br/>
                    <input 
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" required></input><br/>
                    <p>Forgot your password Too bad make a new account Lol</p>
                    <button type="submit" >Login</button>
                </form>
        
            ):(
                <form onSubmit={getLoginForm}>
                <label>Username: </label><br/>
                <input 
                value = {username}
                onChange={(e) => setUsername(e.target.value)}
                type="text" required></input><br/>

                <label>Email: </label><br/>
                <input 
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
                type="text" required></input><br/>

                <label>Password: </label><br/>
                <input 
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" required></input><br/>

                <label>Repeat Password: </label><br/>
                <input 
                value = {rPassword}
                onChange={(e) => setRPassword(e.target.value)}
                type="password" required></input><br/>
                <button type="submit" >Register</button>
                </form>
            )}
            
            <h2></h2>
            <button
                onClick={()=>setIsLogin(true)}
            >Login</button>

            <button
                onClick={()=>setIsLogin(false)}
            >SignUp</button>

        </div>
    )
}

export default LoginForm;