import { useUser } from "../components/UserContext";
import { useState } from "react";

function EditProfile(props){
    const { currentUser , updateUserContext} = useUser();
    const [username,setUsername] = useState(currentUser.username);
    const [biography,setBiography] = useState(currentUser.biography);
    const [email,setEmail] = useState(currentUser.email);
    const [profile,setProfile] = useState(null);

    console.log(currentUser);

    async function handleEdit(e) {
        e.preventDefault();

        const profileEdits = new FormData;

        if( username === currentUser.username && biography === currentUser.biography && email === currentUser.email && 
            profile === null){
                alert("Please enter new details.");
            }

        profileEdits.append("username", username);
        profileEdits.append("email", email);
        profileEdits.append("biography",biography);
        profileEdits.append("image", profile);
        
        const response = await fetch(`http://localhost:3000/api/user/${currentUser._id}`,{
            method : "PUT",
            body : profileEdits
        })

        const data = await response.json();

        if(!response.ok){
            alert(data.message);
            return;
        }

        alert(data.message);
        await updateUserContext(currentUser._id);

        e.target.reset();

    }
    return(
        <>
            <form onSubmit={handleEdit} className="mx-auto my-8 flex w-full max-w-md flex-col gap-4 rounded-2xl bg-white p-6 shadow-md">
                <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                    Username:
                    <input className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    >

                    </input>
                </label>
                <br className="hidden"/>
                <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                    Email:
                    <input className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >

                    </input>
                </label>
                <br className="hidden"/>
                <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                    Biograpghy:
                    <input className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        type="text"
                        value={biography}
                        onChange={(e) => setBiography(e.target.value)}
                    >

                    </input>
                </label>
                <br className="hidden"/>
                <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                    Profile picture:
                    <input className="w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProfile(e.target.files[0] || null)}
                    >

                    </input>
                </label>

                <br className="hidden"/>
                <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">Save Edits</button>
            </form>
        </>
    );
    
}

export default EditProfile;