import { useUser } from "./UserContext.jsx";

function LogoutButton () {
    const { currentUser, setCurrentUser } = useUser();

  const logout = () => {
    setCurrentUser(null);
  }
  return(
    <>
        {currentUser && (
        <button onClick={logout}>Log Out</button>
    )}
    </>
  );
}

export default LogoutButton;