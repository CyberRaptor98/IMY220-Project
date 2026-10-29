import { useState, useEffect } from "react";
import { useUser } from "../components/UserContext.jsx";
import FriendList from "../components/FriendList.jsx"
import PostList from "../components/PostList.jsx";
import AddFriend from "../components/AddFreind.jsx"
import Image from "../components/Image.jsx";
import UserProfilePicture from "../components/UserProfilePicture.jsx";

function ProfilePage(){
    const { currentUser } = useUser();
    const[myPostArray,setMyPostArray] = useState([]);
    const[myFriendArray,setmyFriendArray] = useState(currentUser.friends);
    

    const getMyPosts = async () => {
        try{
            const response = await fetch( `http://localhost:3000/user/${currentUser._id}`, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
            }
            });

            const res = await response.json();

            console.log("Profile Posts", res);

            if(response.ok){
                setMyPostArray(res);
            }else{
                throw new Error(res.message);
            }
        }catch(err){
            console.error(err.message);
        }  
    }

    useEffect(() =>{
        getMyPosts();
    },[])

    
    return(
        <div className="flex min-h-screen flex-col items-center gap-2 bg-gray-100 px-4 py-8">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Profile</h1>
            <UserProfilePicture
            image={
                currentUser.profilePicture
            }
            alt={
                currentUser.profilePicture === ""
                    ? "Placeholder profile picture" :
                    `${currentUser.username}'s profile picture`
            }
            />
            <h2 className="text-2xl font-semibold text-gray-900">{currentUser.username}</h2>
            <p className="text-sm text-gray-500">Joined: {currentUser.dateJoined}</p>
            <p className="max-w-md text-center text-gray-700">{currentUser.biography}</p>

            <AddFriend/>
            <FriendList friendList={myFriendArray} setFreindsArray={setmyFriendArray}/>
            <p className="text-sm text-gray-500">Email: {currentUser.email}</p>

            <h2 className="mt-8 w-full max-w-6xl border-b border-gray-300 pb-2 text-2xl font-bold text-gray-800">Posts</h2>
            <PostList posts={myPostArray}/>
            
            <h2 className="mt-8 w-full max-w-6xl border-b border-gray-300 pb-2 text-2xl font-bold text-gray-800">Albums</h2>
        </div>
    )
    
}

export default ProfilePage;