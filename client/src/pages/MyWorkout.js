import { useContext } from "react"
import { Context } from "../App"
function MyWorkout() {
    const context = useContext(Context)
    return <>
        {context.myWorkouts.map((workout) => {
            return <h2 key={workout.id}>{workout.workout_count}</h2>})}
    </>
}
export default MyWorkout