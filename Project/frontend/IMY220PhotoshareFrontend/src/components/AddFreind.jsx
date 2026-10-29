import { useState,useEffect } from "react";
import {useUser} from "../components/UserContext.jsx"

function AddFriend() {
    const [friendUser,setFriendUser] = useState("")

    const {currentUser} = useUser();

    const addFriend = async (e) => {
       try{
         e.preventDefault();

        if(friendUser.trim() === ""){
            alert("Enter Friend Username");
            return;
        }

        const freindRequest = {
            senderId: currentUser._id,
            senderName: currentUser.username,
            receiverUserName : friendUser 
        }

        const response = await fetch("http://localhost:3000/friend",
            {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(freindRequest)
            }
        );

        const res = await response.json();

        if(response.ok){
            alert(`Friend Request sent ${friendUser}`);
            setFriendUser("");
        }else if("status" in res){
            alert(res.status)
        }else{
            throw new Error (res.message);
        }

       }catch(err){
        console.error(err.message)
       }

    }

    return(
        <>
            <form onSubmit={addFriend} className="my-4 flex w-full max-w-md flex-col gap-2 sm:flex-row">
            <input
                value={friendUser}
                onChange={(e) => setFriendUser(e.target.value)} 
                type="text"
                placeholder="Enter Username"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />

            <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 whitespace-nowrap"> Send Friend Request</button>
            </form>
        </>
        
    )
}

export default AddFriend;