import Comment from './Comment'
import Image from './Image'
import {useState, useEffect } from 'react'
import { useUser } from "./UserContext.jsx";

function Post(props){
    const [comment,setComment] = useState ("");
    const [commentArray, setCommentArray] = useState ([]);
    
    const { currentUser } = useUser();

    const post = props.Post;

    const addComment = async (e) => {
        e.preventDefault();
        const newComment = {
            postid:post._id,
            userId: currentUser._id,
            currentUsername: currentUser.username,
            comment: comment
        }

        fetch("http://localhost:3000/comment",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(newComment)
        }).then((response) => 
            response.json()
        ).then((res)=>{
            console.log(res);
            if (res.comment) {
                setCommentArray(prevComments => [ ...prevComments, res.comment]);
            } else if (res.message) {
                console.error(res.message);
            }
        }).catch((res)=>{
            console.error(res.message)
        })
        //recieve confirmation comment was added
        setComment("");
    }
    useEffect(() => {
    setCommentArray(post.Comments||[]);
    },[])

    return(
        <div key = {post._id}>
            <h2>{post.Name}</h2>
            
            <Image image={post.image}/>
            <p>Posted by: {post.username}</p>
            <p>Date Posted: {post.DatePosted}</p>
            <p>{post.Tag.map((tag) => `#${tag}`).join(" ")}</p>
            <p>Views: {post.views}</p>
            <p>Likes: {post.Likes}</p><button>Like Post</button>

            <p>{post.Description}</p>
            
            <h3>Comments</h3>
            <form onSubmit={addComment}>
                <input placeholder='Leave a comment' 
                value={comment} 
                onChange={(e)=> setComment(e.target.value)}
                />

                <button type="submit">comment</button>
            </form>
                
            <Comment 
            post={commentArray} 
            setCommentArray={setCommentArray} 
            postId={post._id}/>

        </div>
        
    )
}

export default Post;