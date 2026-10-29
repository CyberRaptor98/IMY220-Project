import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    async function updateUserContext(userId) {
        try {
            const response = await fetch(`http://localhost:3000/usercontext/${userId}`);

            if (!response.ok) {
                throw new Error("Failed to fetch user");
            }

            const data = await response.json();

            setCurrentUser(data);
        } catch (error) {
            console.error("Error updating user context:", error);
        }
    }

    
    return (
        <UserContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                updateUserContext
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}