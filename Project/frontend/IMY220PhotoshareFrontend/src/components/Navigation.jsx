import { Link } from "react-router-dom";

function Navigation(){
    return(
        <div>
            <Link to="/">SplashPage</Link>
            <Link to="/home">Home</Link>
            <Link to="/post">PostPage</Link>
            <Link to="/Profile">ProfilePage</Link>
        </div>
    )
}


export default Navigation;