import { useState,useEffect } from 'react'
import AddRemoveTag from './AddRemoveTag';
import { useUser } from "../components/UserContext.jsx";

function EnterPost(){
    const [tagArray,setTagArray] = useState([]);
    const [Name , setName] = useState ("");
    const [image,setImage] = useState  (null);
    const [description , setDescription] = useState ("");
    //const []
    const { currentUser } = useUser();

    function addTag(newTag){
        setTagArray(prev => [...tagArray, newTag]);
    }

    function removeTag(tagToRemove){
        setTagArray(tagArray.filter(tag => tag !== tagToRemove))
    }

    const addPost = async (e) => {
    e.preventDefault();

    if (
        Name.trim() === "" ||
        description.trim() === "" ||
        !image 
    ) {
        alert("Please fill in all fields.");
        return;
    }

    const formData = new FormData();

    formData.append("username", currentUser.username);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("Name", Name);
    formData.append("ownerId", currentUser._id);
    formData.append("Tag", JSON.stringify(tagArray));

    try {
        const response = await fetch("http://localhost:3000/post", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }


        setName("");
        setDescription("");
        setImage(null);
        setTagArray([]);

        e.target.reset();

    } catch (err) {
        console.error(err);
    }
};

    return(
        <>
        <form onSubmit={addPost} className="mx-auto my-8 flex w-full max-w-lg flex-col gap-4 rounded-2xl bg-white p-6 shadow-md">
            <label className="flex flex-col gap-1 text-sm font-medium text-gray-700"> Name 
            <input className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" 
            type="text" required 
            placeholder="post Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            />
            </label>
            <br className="hidden"/>

            <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">Upload Image
            <input className="w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100" 
            type="file" required
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            />
            </label>
            <br className="hidden"/>

            <AddRemoveTag 
                tagArray={tagArray} 
                setTagArray = {setTagArray} 
                addTag={addTag} 
                removeTag={removeTag}/>
            <br className="hidden"/>

            <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">Enter a Description
            <input className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" 
            type="text" required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            />
            </label>
            <br className="hidden"/>

            <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"> Add Post</button>
        </form>
        </>
    );
}

export default EnterPost;