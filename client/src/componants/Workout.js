import { useContext } from "react"
import { Context } from "../App"
import picsArray from '/home/michoel/post-grad-apps/fit-tracker/client/src/pictures/pics.js'
function Workout() {
    const context = useContext(Context)
    if (!context.workouts) {
        return 
    }
    return <>
    {context.workouts.map((workout, i) => {
        return <div key={workout.id}>
        <img src={picsArray[i]} alt={workout.name}/>
        <h2>{workout.name}</h2>
        <h4>{workout.body_section}</h4>
        <p>{workout.description}</p>
        </div>
    })}
    </>
}
export default Workout