import { useContext } from "react"
import { Context } from "../App"
import picsArray from '/home/michoel/post-grad-apps/fit-tracker/client/src/pictures/pics.js'
function Workout() {
    const context = useContext(Context)
    if (!context.workouts) {
        return 
    }
    return <div class=" text-center grid grid-cols-3 gap-4">
        {context.workouts.map((workout, i) => {
        return (
        <div key={workout.id} className="border p-4">
            <h2>{workout.name}</h2>
            <div className="aspect-w-1 aspect-h-2 mb-4">
                <img className="w-full h-80 object-cover" src={picsArray[i]} alt={workout.name}/>
            </div>
            <h4>{workout.body_section}</h4>
            <p>{workout.description}</p>
        </div>
        )
    })}
    </div>
}
export default Workout