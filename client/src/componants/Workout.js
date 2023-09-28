import { useContext, useState } from "react"
import { Context } from "../App"
import picsArray from '/home/michoel/post-grad-apps/fit-tracker/client/src/pictures/pics.js'
function Workout() {
    const context = useContext(Context)
    const [pending, setPending] = useState([])
    const [pendingHover, setPendingHover] = useState(null)
    const [revealWorkoutForm, setRevealWorkoutForm] = useState(null)
    
    if (!context.workouts) {
        return <h2 className="text-center">Loading...</h2>
    }

    function handleCompletedWorkout(e, id, i) {
        setRevealWorkoutForm(null)
        setPending(prev => prev.filter((num) => num !== i))
        e.preventDefault()
        const newWorkout = {
            workout_count: Number(e.target.querySelector(`[name="${i}"]`).value),
            user_id: context.user.id,
            workout_id: id
        }
        fetch('/user_workouts', {
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
    
    let filteredWorkouts = context.workouts.filter((workout) => {
        return (context.workoutDropdown === 'All' || context.workoutDropdown.includes(workout.body_section))
    })

    return <div className=" text-center grid grid-cols-1 lg:grid-cols-3 gap-4">
        {filteredWorkouts.map((workout, i) => {
        return (
        <div key={workout.id} className="border p-4">
            
            {revealWorkoutForm === i ? 
            <form onSubmit={(e) => handleCompletedWorkout(e, workout.id, i)} className="">
                <h2 className="text-2xl font-semibold mb-2 text-gray-900">{workout.name}</h2>
                <div className="aspect-w-1 aspect-h-2 mb-4">
                    {context.workoutDropdown === 'All' ? <img loading="lazy" className="w-full h-80 object-cover" src={picsArray[i]} alt={workout.name}/> : null}
                </div>
                <h2 className="text-2xl font-bold">Workout Count</h2>
                <div className="flex flex-wrap justify-around pt-5 items-center">
                    <button onClick={() => setRevealWorkoutForm(false)} className=" py-2 bg-red-500 font-bold hover:bg-red-700 text-white px-4 rounded">Back</button>
                    <div className="mb-4">
                    <input
                    type="number"
                    placeholder="Enter workout count"
                    required
                    name={i}
                    className="w-full mt-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-500 font-bold text-white rounded hover:bg-blue-600 focus:outline-none ">Add</button>
                </div>
            </form>
            : // display workout
            <><h2 className="text-2xl font-semibold mb-2 text-gray-900">{workout.name}</h2>
            <div className="aspect-w-1 aspect-h-2 mb-4">
                {context.workoutDropdown === 'All' ? <img className="w-full h-80 object-cover" src={picsArray[i]} alt={workout.name}/> : null}
            </div>
            <h4 className="text-lg font-medium mb-2 text-black-500">{workout.body_section}</h4>
            {!pending.includes(i) ?
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setPending(prev => [...prev, i])}>Start Workout</button>
            :
            <div> 
                {pendingHover === i ?
                <div onMouseLeave={() => setPendingHover(null)}>
                <button className="bg-red-500 hover:bg-red-700 font-bold mr-1 text-white py-2 px-4 rounded" onClick={() => setPending(prev => prev.filter((num) => num !== i))}>Cancel</button>
                <button className=" ml-1 hover:bg-green-700 bg-green-500 font-bold text-white py-2 px-4 rounded" onClick={() => setRevealWorkoutForm(i)}>Complete</button>
                </div>
                :
                <button className="bg-orange-500 text-white font-bold py-2 px-4 rounded" onMouseEnter={() => setPendingHover(i)}>Workout in Progress</button>
                }
            </div>
            }   
            <p className=" mt-2">{workout.description}</p></>}
        </div>
        )
    })}
    </div>
}
export default Workout