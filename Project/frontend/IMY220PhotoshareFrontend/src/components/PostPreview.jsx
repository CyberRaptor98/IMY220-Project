import { useNavigate } from "react-router-dom";

function PostPreview(props){
    const post = props.posts;
    const navigate = useNavigate();

    return(
        <div onClick={() => navigate("/post", { state: post })}>
                <img src={post.image} alt={post.Description}/>
                <h3 >{post.Name}</h3>
                <p>{post.username}</p>
                <p>{post.Tag.map((tag) => `#${tag}`).join(" ")}</p>

                <br/>
                <br/>
                <br/>
        </div>
    )
}

export default PostPreview;