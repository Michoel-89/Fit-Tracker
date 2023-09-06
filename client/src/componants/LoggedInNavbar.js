import { useContext } from "react"
import { Context } from "../App"
import { Link } from "react-router-dom"
function LoggedInNavbar() {
    const context = useContext(Context)
    function handleLogoutClick() {
        fetch('logout', {
            method: 'DELETE',
          }).then(() => {
            context.setIsLoggedIn(false)
        })
    }
    return <>
<div className="flex bg-black p-4 justify-between items-center">
    <h2 className="text-white font-bold text-xl">Fit Tracker</h2>
    <div className="space-x-4">
        <button className="text-white px-4 py-2 rounded">
            <Link to="/MyWorkouts">My Workouts</Link>
        </button>
        <button className="text-white px-4 py-2 rounded" onClick={handleLogoutClick}>
            <Link to="/">Logout</Link>
        </button>
    </div>
</div>
</>
}
export default LoggedInNavbar