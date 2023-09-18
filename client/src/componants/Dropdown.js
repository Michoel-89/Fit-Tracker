import { useContext } from "react"
import { Context } from "../App"

function Dropdown() {
    const context = useContext(Context);
    return <>
    <select onChange={(e) => context.setWorkoutDropdown(e.target.value)}>
        <option hidden >Filter</option>
        <option>All</option>
        <option>Lower Body</option>
        <option>Upper Body</option>
        <option>Full Body</option>
        <option>Core</option>
        <option>Cardio</option>
    </select>
    </>
}

export default Dropdown