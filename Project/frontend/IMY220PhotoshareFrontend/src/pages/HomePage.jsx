import { useState,useEffect } from 'react'
import SearchBar from "../components/SearchBar";
import PostList from "../components/PostList"
import { useUser } from "../components/UserContext";

function HomePage(){
    const [localFeed, setlocalFeed] = useState([]);
    const [globalFeed, setGlobalFeed] = useState([]);
    const [viewGlobal, setViewGlobal] = useState(true);
    const { currentUser } = useUser();

    const localFeedArray = [];
    //const globalFeedArray = []

    async function getLocalFeed(){
        localFeedArray.length = 0;

        let friendIds = currentUser.friends;
    
        friendIds.map((friend) => {
            // console.log("Friend array");
            // console.log(friend._id);
        fetch( `http://localhost:3000/user/${friend._id}` , {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
        .then(data => {
            if ("message" in data) {
                console.error(data.message);
            } else {
                //console.log(data);
                localFeedArray.push(...data);
                setlocalFeed(localFeedArray);
            }
        }).catch((error) => console.error(error))
        });
    }

    const getGlobalFeed = async () =>{
        fetch( `http://localhost:3000/api/posts` , {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
        .then(data => {
            if ("message" in data) {
                console.error(data.message);
            } else {
                //globalFeedArray.push(...data);
                setGlobalFeed(data);
                // console.log("Global Feed")
                // console.log(data)
            }
        }).catch((error) => console.error(error))
    }
    
    useEffect(() => {
        getLocalFeed();
        getGlobalFeed();
    },[]
    )

    return(
        <div>
            <SearchBar toggleFeed={setViewGlobal}/>      
            {
                viewGlobal ? (
                <>
                    <h2>Global Feed</h2>
                    <PostList posts={globalFeed}/>
                </>
                ) : (
                <>
                    <h2>Local Feed</h2>
                    <PostList posts={localFeed}/>
                </>
                )
            }
        </div>
    )
}

export default HomePage;