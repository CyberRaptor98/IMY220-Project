import Post from '../components/Post'
import {useState, useEffect} from 'react'

function PostPage(){
    const [posts,setPosts] = useState([]);

    useEffect (()=>{
        fetch("http://localhost:3000/api/posts")
        .then((response) => response.json())
        .then((data) => setPosts(data))
        .catch((error) => console.error("Error fetching posts:", error));
    },[])

    return(
        <div>
            
            <Post Post={posts}/>
        </div>
    )
}

export default PostPage;