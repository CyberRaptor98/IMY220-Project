

function PostPreview(props){
    const posts = props.posts;
    return(
        <div>
            {posts.map((post)=>
            <div key={post.id}>
                <img src={post.image} alt={post.Description}/>
                <p>{post.username}</p>
                <p>{post.Tag.map((tag) => `#${tag}`).join(" ")}</p>

                <br/>
                <br/>
                <br/>
            </div>    
            )}
        </div>
    )
}

export default PostPreview;