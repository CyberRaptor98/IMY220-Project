import { useState } from 'react'
import '../components/LoginForm.jsx'
import LoginForm from '../components/LoginForm.jsx';
import { useNavigate } from 'react-router-dom';
import {useUser} from "../components/UserContext.jsx";

function SplashPage(){
    const navigate = useNavigate();
    const { setCurrentUser } = useUser();

    const handleUserForm = (uForm)=>{
        console.log(uForm);
        let serverlink;
        if(uForm.type == "Register"){
            serverlink = "http://localhost:3000/register";
        } else {
            serverlink = "http://localhost:3000/login";
        }


        fetch(serverlink, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
        },
        body: JSON.stringify(uForm)
    })
    .then(response => response.json())
    .then(data => {
        if(!data.message){
        console.log(data);
        setCurrentUser(data);
        navigate("/home");
        } else {
            alert(data.message);
        }

    }).catch((error) => console.error(error))
}

    return(
    <div>
        <LoginForm handleUForm = {handleUserForm}/>
    </div>
    )
}

export default SplashPage;