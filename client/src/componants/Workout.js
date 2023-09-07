import { useContext, useState } from "react"
import { Context } from "../App"
import picsArray from '/home/michoel/post-grad-apps/fit-tracker/client/src/pictures/pics.js'
function Workout() {
    const context = useContext(Context)
    const [pending, setPending] = useState([])
    const [pendingHover, setPendingHover] = useState(null)
    const [revealWorkoutForm, setRevealWorkoutForm] = useState(null)
    const [workoutCount, setWorkoutCount] = useState('')
    
    if (!context.workouts) {
        return 
    }

    function handleCompletedWorkout(e, id) {
        e.preventDefault()
        const newWorkout = {
            workout_count: Number(workoutCount),
            user_id: context.user.id,
            workout_id: id
        }
        console.log(newWorkout)
        fetch('user_workouts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newWorkout)
          })
          .then(r => r.json())
          .then(r => {
            const newList = [...context.myWorkouts, r]
            context.setMyWorkouts(newList)
          })
    }

    return <div className=" text-center grid grid-cols-3 gap-4">
        {context.workouts.map((workout, i) => {
        return (
        <div key={workout.id} className="border p-4">
            
            {revealWorkoutForm === i ? 
            <form onSubmit={(e) => handleCompletedWorkout(e, workout.id)}>
                <h2>Workout Details</h2>
                <p>
                  Workout Name: <strong>{workout.name}</strong>
                </p>
                <p>
                  Body Section: <strong>{workout.body_section}</strong>
                </p>
                <h2>Workout Count</h2>
                <input
                  type="number"
                  placeholder="Enter workout count"
                  required
                  value={workoutCount}
                  onChange={(e) => setWorkoutCount(e.target.value)}
                />
                <button className="border" type="submit">Submit</button>
            </form>
            : 
            <><h2>{workout.name}</h2>
            <div className="aspect-w-1 aspect-h-2 mb-4">
                <img className="w-full h-80 object-cover" src={picsArray[i]} alt={workout.name}/>
            </div>
            <h4>{workout.body_section}</h4>
            {!pending.includes(i) ?
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setPending(prev => [...prev, i])}>Start Workout</button>
            :
            <div> 
                {pendingHover === i ?
                <div onMouseLeave={() => setPendingHover(null)}><button className="bg-red-500 hover:bg-red-700 font-bold mr-1 text-white py-2 px-4 rounded" onClick={() => setPending(prev => prev.filter((num) => num !== i))}>Cancel</button>
                <button className=" ml-1 hover:bg-green-700 bg-green-500 font-bold text-white py-2 px-4 rounded" onClick={() => setRevealWorkoutForm(i)}>Complete</button></div>
                :
                <button className="bg-orange-500 text-white font-bold py-2 px-4 rounded" onMouseEnter={() => setPendingHover(i)}>Workout in Progress</button>
                }
            </div>
            }   
            <p>{workout.description}</p></>}
        </div>
        )
    })}
    </div>
}
export default Workout