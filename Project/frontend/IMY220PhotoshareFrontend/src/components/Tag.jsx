
function Tag({tag,removeTag}){
    return(
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700">
            <p className="font-medium">{tag}</p>
           <button onClick={() => removeTag(tag)} className="text-xs font-semibold text-indigo-500 hover:text-red-600">Remove</button> 
        </div>
    );
}

export default Tag;