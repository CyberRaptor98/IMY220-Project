import Tag from "./Tag";
import { useState } from "react";


function AddRemoveTag ({tagArray,setTagArray,addTag,removeTag}) {
    const [tagInput,setInputTag] = useState("");

    function addTagToArray() {
        if(tagInput === ""){
            alert("Pleas add text");
            return;
        }
        addTag(tagInput);
        setInputTag(""); 
    }

    return(
        <div className="flex flex-wrap items-end gap-2">
            <label className="flex min-w-[10rem] flex-1 flex-col gap-1 text-sm font-medium text-gray-700">Add Tags<br className="hidden"/>
            <input type="text" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                value={tagInput} 
                onChange={(e)=> setInputTag(e.target.value)}
                />
            </label>
            <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                onClick={addTagToArray}
            > Add Tag</button>
            {
                (tagArray.length === 0 )? (
                <p className="w-full text-sm italic text-gray-400">
                    No tags
                </p>
                ):(
                    tagArray.map((tag ,index) => 
                    <div key = {index}>
                    <Tag tag={tag} removeTag={removeTag}/>
                </div>)
                )
            }
        </div>
    );
}

export default AddRemoveTag;