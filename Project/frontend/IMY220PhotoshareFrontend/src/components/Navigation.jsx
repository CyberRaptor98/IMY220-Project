import { Link } from "react-router-dom";

function Navigation(){
    return(
        <div
            className="sticky top-0 z-10 flex flex-wrap items-center gap-1 bg-indigo-600 px-4 py-3 shadow-md"
        >
            <Link to="/" className="rounded-md px-3 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-500">SplashPage</Link>
            <Link to="/home" className="rounded-md px-3 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-500">Home</Link>
            <Link to="/Profile" className="rounded-md px-3 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-500">ProfilePage</Link>
            <Link to="/create/post" className="rounded-md px-3 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-500"> Add Post</Link>
            <Link to="/profile/user" className="rounded-md px-3 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-500"> Edit Profile</Link>
        </div>
    )
}


export default Navigation;