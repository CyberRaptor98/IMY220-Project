

function Comment(props){
    const comments = props.post;
    return(
        <dl>
            {comments.map((comment,index)=>
            <div key={index}>
                <dt>{comment.user}</dt>
                <dd>{comment.comment}</dd>
                <br></br>
            </div>
            )}
        </dl>
    );
}

export default Comment;