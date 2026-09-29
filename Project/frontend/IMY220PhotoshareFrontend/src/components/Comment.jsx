import {useState} from 'react'

function Comment(props){
    const comments = props.post;
    return(
        <dl>
            {comments.map((comment)=>
            <div key={comment._id}>
                <dt>{comment.user}</dt>
                <dd>{comment.comment}</dd>
                <br></br>
            </div>
            )}
        </dl>
    );
}

export default Comment;