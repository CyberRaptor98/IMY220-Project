import Post from '../components/Post'
import {useState, useEffect} from 'react'
import { useLocation } from "react-router-dom";

function PostPage(){
    const [posts,setPosts] = useState([]);

    const location = useLocation();
    const post = location.state;

    return(
        <div> 
            <Post Post={post}/>
        </div>
    )
}

export default PostPage;