import PostPreview from './PostPreview'

function PostList(props){
    const posts = props.posts

    
    return(
        <div className="flex w-full flex-wrap justify-center gap-6 p-4">
        {posts.length === 0 ? (<p className="text-gray-500 italic">No Posts</p>) : (
        posts.map((post) => 
        <div key = {post._id} className="flex w-full sm:w-72">
            <PostPreview posts={post} />
        </div>
        )
        )}
        </div>
         
    
)
}

export default PostList;