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
        <dl>
            {comments.map((comment)=>
            <div key={comment._id}>
                <dt>{comment.user}</dt>
                <dd>{comment.comment}</dd>
                {currentUser.username === comment.user ? (<button onClick={() => removeComment(comment._id)}>Delete Comment</button>) : (<></>)}
                <br></br>
            </div>
            )}
        </dl> 
    );
}

export default Comment;