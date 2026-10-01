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
    <div>
        <input
            type="text"
            placeholder="SearchBar"
            value={seacrhParam}
            onChange={(e)=> SetSearchParam(e.target.value)}
        />

        <label>
            Global Feed
            <input type="radio" 
                onClick={globalFeed}
            />
        </label>
        <label>
            Local Feed
            <input type="radio" 
                onClick={localFeed}
            />
        </label>
    </div>
    )
}

export default SearchBar;