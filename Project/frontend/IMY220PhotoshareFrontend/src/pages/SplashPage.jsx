import { useState } from 'react'
import '../components/LoginForm.jsx'
import LoginForm from '../components/LoginForm.jsx';

function SplashPage(){
    const [serverLink, setServerLink] = useState("");

    const handleUserForm = (uForm)=>{
        if(uForm.type == "Register"){
            setServerLink("http://localhost:3000/register");
        } else {
            setServerLink("http://localhost:3000/login");
        }


        fetch(serverLink, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
        },
        body: JSON.stringify(uForm)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
}

    return(
    <div>
        <LoginForm handleUForm = {handleUserForm}/>
    </div>
    )
}

export default SplashPage;