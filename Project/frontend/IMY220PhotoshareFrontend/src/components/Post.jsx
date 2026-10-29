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
        <div key = {post._id} className="mx-auto my-6 flex w-full max-w-2xl flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl bg-white p-6 shadow-md [&>img]:max-h-[32rem] [&>img]:w-full [&>img]:rounded-xl [&>img]:bg-gray-100 [&>img]:object-contain">
            <h2 className="w-full text-2xl font-bold text-gray-900">{post.Name}</h2>
            
            <Image image={post.image}/>
            <p className="w-full text-sm text-gray-500">Posted by: {post.username}</p>
            <p className="w-full text-sm text-gray-500">Date Posted: {post.DatePosted}</p>
            <p className="w-full text-sm font-medium text-indigo-600">{post.Tag.map((tag) => `#${tag}`).join(" ")}</p>
            <p className="text-sm text-gray-600">Views: {post.views}</p>
            <p className="text-sm text-gray-600">Likes: {post.Likes}</p><button className="rounded-full bg-pink-500 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-pink-600">Like Post</button>

            <p className="mt-2 w-full text-gray-800">{post.Description}</p>
            
            <h3 className="mt-4 w-full border-t border-gray-200 pt-4 text-lg font-semibold text-gray-900">Comments</h3>
            <form onSubmit={addComment} className="flex w-full gap-2">
                <input className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" placeholder='Leave a comment' 
                value={comment} 
                onChange={(e)=> setComment(e.target.value)}
                />

                <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">comment</button>
            </form>
                
            <Comment 
            post={commentArray} 
            setCommentArray={setCommentArray} 
            postId={post._id}/>

        </div>
        
    )
}

export default Post;