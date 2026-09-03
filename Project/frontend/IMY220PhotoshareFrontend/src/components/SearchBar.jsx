import { useState } from 'react'

function SearchBar(){
    const [seacrhParam,SetSearchParam] = useState("");

    return (
    <div>
        <input
        type="text"
        placeholder="SearchBar"
        value={seacrhParam}
        />

        <label>
            <input type="radio" />
            Condition 1
        </label>
        <label>
            <input type="radio" />
            Condition 2
        </label>
    </div>
    )
}

export default SearchBar;