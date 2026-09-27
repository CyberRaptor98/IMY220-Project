

function PostPreview(props){
    const post = props.posts;
    return(
        <div>
                <img src={post.image} alt={post.Description}/>
                <p>{post.username}</p>
                <p>{post.Tag.map((tag) => `#${tag}`).join(" ")}</p>

                <br/>
                <br/>
                <br/>
        </div>
    )
}

export default PostPreview;