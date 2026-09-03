

function Image(props){
    const image = props.image;

    return(
        <>
            <img src={image} alt="an image"></img>
        </>
    )
}

export default Image;