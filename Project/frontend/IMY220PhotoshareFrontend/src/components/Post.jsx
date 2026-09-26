import Comment from './Comment'
import Image from './Image'

function Post(props){
    const post = props.Post;
    return(
        <>
        {post.map((post) =>
        <div key = {post._id}>
            <h2>{post.Name}</h2>
            
            <Image image={post.image}/>
            <p>{post.username}</p>
            <p>Date Posted: {post.DatePosted}</p>
            <p>{post.Tag.map((tag) => `#${tag}`).join(" ")}</p>
            <p>Views: {post.views}</p>
            <p>Likes: {post.Likes}</p><button>Like Post</button>

            <p>{post.Description}</p>
            
            <h3>Comments</h3>
            <Comment post={post.Comments}/>
        </div>)}
        </>
    )
}

export default Post;