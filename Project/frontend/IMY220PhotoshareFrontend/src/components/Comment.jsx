

function Comment(props){
    const comments = props.post;
    return(
        <dl>
            {comments.map((comment)=>
            <>
                <dt>{comment.user}</dt>
                <dd>{comment.comment}</dd>
                <br></br>
            </>
            )}
        </dl>
    );
}

export default Comment;