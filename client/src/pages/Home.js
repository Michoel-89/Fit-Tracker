import { useContext } from "react"
import { Context } from "../App"
import Message from "../componants/Message"
import Workout from "../componants/Workout"
function Home() {
    const context = useContext(Context)
    function handleLogoutClick() {
        fetch('logout', {
            method: 'DELETE',
          }).then(() => {
            context.setIsLoggedIn(false)
        })
    }
    return <>
    <button onClick={handleLogoutClick}>logout</button>
    <Workout />
    <Message />
    </>
}

export default Home