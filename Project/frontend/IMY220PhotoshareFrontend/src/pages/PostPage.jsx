import Post from '../components/Post'
const post ={
        id:1,
        username: "john_doe",
        DatePosted: "2026-09-01",
        Name: "Sunset at the Beach",
        image: "/beach.jpg",
        Tag: ["beach", "sunset"],
        views: 1250,
        Likes: 342,
        Description: "Beautiful sunset at the beach this evening.",
        Comments: [
            { user: "sarah", comment: "What an amazing view!" },
            { user: "mike", comment: "The colours are incredible." },
            { user: "james", comment: "I need to visit this place." },
            { user: "emma", comment: "Absolutely beautiful!" }
        ]
    }



function PostPage(){
    return(
        <div>
            
            <Post Post={post}/>
        </div>
    )
}

export default PostPage;