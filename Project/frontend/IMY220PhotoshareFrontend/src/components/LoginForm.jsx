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
        <div className="mx-auto flex w-full max-w-md flex-wrap gap-3 rounded-2xl bg-white p-8 shadow-xl">
            <h1 className="w-full text-center text-3xl font-bold text-indigo-600">Photoshare</h1>
            <p className="w-full text-center text-gray-500">Share Photos here WOW</p><br className="hidden"/>

            {isLogin?(
                <form onSubmit={getLoginForm} className="flex w-full flex-col gap-4">
                    <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">Username: <br className="hidden"/>
                    <input className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" 
                    value = {username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text" required></input>
                    </label>
                    <br className="hidden"/>

                    <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">Password: <br className="hidden"/>
                    <input className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" 
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" required></input>
                    </label>
                    <br className="hidden"/>

                    <p className="text-xs text-gray-500">Forgot your password Too bad make a new account Lol</p>
                    <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 w-full">Login</button>
                </form>
        
            ):(
                <form onSubmit={getLoginForm} className="flex w-full flex-col gap-4">
                <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">Username: <br className="hidden"/>
                <input className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" 
                value = {username}
                onChange={(e) => setUsername(e.target.value)}
                type="text" required></input>
                </label>
                <br className="hidden"/>


                <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">Email: <br className="hidden"/>
                <input className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" 
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
                type="text" required></input><br className="hidden"/>
                </label>

                <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">Password: <br className="hidden"/>
                <input className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" 
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" required></input>
                </label>
                <br className="hidden"/>

                <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">Repeat Password: <br className="hidden"/>
                <input className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" 
                value = {rPassword}
                onChange={(e) => setRPassword(e.target.value)}
                type="password" required></input><br className="hidden"/>
                </label>
                <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 w-full">Register</button>
                </form>
            )}
            
            <h2 className="hidden"></h2>
            <button className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-300 flex-1"
                onClick={()=>setIsLogin(true)}
            >Login</button>

            <button className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-300 flex-1"
                onClick={()=>setIsLogin(false)}
            >SignUp</button>

        </div>
    )
}

export default LoginForm;