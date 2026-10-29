import placeHolder from "../assets/placeholder.jpg";
import { useUser } from "./UserContext";

function UserProfilePicture({ image, alt }) {
    const { currentUser } = useUser();

    function handleImage() {
        if (!image) {
            return placeHolder;
        } else {
            return `http://localhost:3000/uploads/${image}`;
        }
    }

    function handleAlt() {
        if (!image) {
            return "Placeholder profile picture";
        } else {
            return alt;
        }
    }

    return (
        <img
            className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-md"
            src={handleImage()}
            alt={handleAlt()}
        />
    );
}

export default UserProfilePicture;