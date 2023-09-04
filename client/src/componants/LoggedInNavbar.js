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
<div class="flex bg-black p-4 justify-between items-center">
    <h2 class="text-white font-bold text-xl">Fit Tracker</h2>
    <div class="space-x-4">
        <button class="text-white px-4 py-2 rounded">
            <Link to="/MyWorkouts">My Workouts</Link>
        </button>
        <button class="text-white px-4 py-2 rounded" onClick={handleLogoutClick}>
            <Link to="/">Logout</Link>
        </button>
    </div>
</div>
</>
}
export default LoggedInNavbar