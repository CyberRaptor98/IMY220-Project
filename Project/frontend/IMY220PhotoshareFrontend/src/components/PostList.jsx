import PostPreview from './PostPreview'

function PostList(props){
    const posts = props.posts
    return(
        <>
            {posts.map((post) => 
        <div key = {post.id}>
            <PostPreview posts={post} />
        </div>
        )} 
        </>
         
    )
}

export default PostList;