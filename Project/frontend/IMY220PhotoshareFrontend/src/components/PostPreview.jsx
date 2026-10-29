import { useNavigate } from "react-router-dom";
import Image from "./Image";

function PostPreview(props){
    const post = props.posts;
    const navigate = useNavigate();

    return(
        <div onClick={() => navigate("/post", { state: post })} className="flex w-full cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl [&>img]:h-56 [&>img]:w-full [&>img]:object-cover">
                <Image image={post.image} alt={post.Description}/>
                <h3 className="px-4 pt-3 text-lg font-semibold text-gray-900">{post.Name}</h3>
                <p className="px-4 text-sm text-gray-500">{post.username}</p>
                <p className="px-4 pb-4 text-sm font-medium text-indigo-600">{post.Tag.map((tag) => `#${tag}`).join(" ")}</p>

                <br className="hidden"/>
                <br className="hidden"/>
                <br className="hidden"/>
        </div>
    )
}

export default PostPreview;