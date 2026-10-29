

function Image({image,alt}){

    return(
        <>
            <img className="block w-full object-cover" src={`http://localhost:3000/uploads/${image}`} alt={alt}></img>
        </>
    )
}

export default Image;