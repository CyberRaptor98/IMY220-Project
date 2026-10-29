import {useUser} from "../components/UserContext.jsx"

function FriendList({ friendList , setFreindsArray}) {
    const {currentUser} = useUser();
    if (friendList.length === 0) {
        return <p className="my-4 text-sm italic text-gray-400">No friends</p>;
    }

    async function handleFriendReq(freindObj, instruction){
        const request ={
            "id":currentUser._id, 
            "instruction" : instruction,
            "friend" : freindObj
        };

        const response = await fetch("http://localhost:3000/friend/id",{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request)
            });

        const data = await response.json();
        alert(data.message);

        if(data.message === "Friend request accepted"){
            freindObj.status ="accepted";
        }


    }


    return (
        <div className="my-4 flex w-full flex-wrap justify-center gap-3">
            {friendList.map((friend) => (
                <div key={friend._id.toString()} className="flex min-w-[16rem] flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                    <p className="font-semibold text-gray-900">{friend.name}</p>
                    <p className="text-sm text-gray-500">Status: {friend.status}</p>

                    {friend.status === "pending" && (
                        <>
                            <button onClick={() => handleFriendReq(friend,"accepted")} className="rounded-lg bg-green-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-600">
                                Accept
                            </button>

                            <button onClick={() => handleFriendReq(friend,"rejected")} className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-600">
                                Reject
                            </button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default FriendList;