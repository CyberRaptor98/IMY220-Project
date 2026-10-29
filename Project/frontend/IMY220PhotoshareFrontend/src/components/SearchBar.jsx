import { useState } from 'react'

function SearchBar(props){
    const [seacrhParam,SetSearchParam] = useState("");

    const setFeed = props.toggleFeed;

    const globalFeed = () => {
        setFeed(true);
    }

    const localFeed = () => {
        setFeed(false);
    }

    return (
    <div className="mx-auto my-4 flex w-full max-w-4xl flex-wrap items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
        <input
            type="text"
            placeholder="SearchBar"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 flex-1 min-w-[12rem]"
            value={seacrhParam}
            onChange={(e)=> SetSearchParam(e.target.value)}
        />

        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
            Global Feed
            <input type="radio" className="accent-indigo-600" 
                onClick={globalFeed}
            />
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
            Local Feed
            <input type="radio" className="accent-indigo-600" 
                onClick={localFeed}
            />
        </label>
    </div>
    )
}

export default SearchBar;