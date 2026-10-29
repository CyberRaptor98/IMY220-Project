import { useUser } from "./UserContext.jsx";

function LogoutButton () {
    const { currentUser, setCurrentUser } = useUser();

  const logout = () => {
    setCurrentUser(null);
  }
  return(
    <>
        {currentUser && (
        <button onClick={logout} className="rounded-lg border border-red-300 px-3 py-1.5 text-sm font-semibold text-red-600 transition hover:bg-red-50">Log Out</button>
    )}
    </>
  );
}
export default LogoutButton;