import {useState} from 'react'
import { useUser } from "./UserContext.jsx";

function Comment(props){
    const comments = props.post;
    const setCommentArray = props.setCommentArray;
    const postId = props.postId;
    const { currentUser } = useUser();

    const removeComment = async (commetId) => {
        const response = await fetch(`http://localhost:3000/post/comment/delete/${commetId}`,
            {
                method : "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify({ "postId" : postId })
            });

            const res = await response.json();
            console.log("Comment Id",commetId);
            console.log("postID",postId);
            console.log("Comment response",res);
        if(response.ok){
            const commentId = res.id;
            setCommentArray( prevComment => prevComment.filter(comment => comment._id !== commentId));
        }else{
            alert("Failed to delete comment");
        }
    }

    return(
        <dl className="mt-4 flex w-full flex-col gap-3">
            {comments.map((comment)=>
            <div key={comment._id} className="flex flex-col gap-1 rounded-lg bg-gray-50 p-3">
                <dt className="text-sm font-semibold text-gray-900">{comment.user}</dt>
                <dd className="text-sm text-gray-700">{comment.comment}</dd>
                {currentUser.username === comment.user ? (<button onClick={() => removeComment(comment._id)} className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-600 self-start">Delete Comment</button>) : (<></>)}
                <br className="hidden"></br>
            </div>
            )}
        </dl> 
    );
}

export default Comment;