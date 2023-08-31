import { useContext } from "react"
import { Context } from "../App"
function Workout() {
    const context = useContext(Context)
    if (!context.workouts) {
        return 
    }
    return <>
    {context.workouts.map((workout) => {
        return <div key={workout.id}>
        <h2>{workout.name}</h2>
        <h4>{workout.body_section}</h4>
        <p>{workout.description}</p>
        </div>
    })}
    </>
}
export default Workout