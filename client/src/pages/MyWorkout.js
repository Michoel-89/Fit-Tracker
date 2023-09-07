import { useContext } from "react"
import { Context } from "../App"
import trashcan from '/home/michoel/post-grad-apps/fit-tracker/client/src/pages/trash.jpg'
function MyWorkout() {
    const context = useContext(Context)
    function handleDeleteWorkout(id) {
        fetch(`/user_workouts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
          })
          .then(r => r)
          .then(r => {
            const updatedMyWorkoutList = context.myWorkouts.filter((workout) => workout.id !== id)
            context.setMyWorkouts(updatedMyWorkoutList)
          })
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {context.myWorkouts.map((workout) => (
            <div key={workout.id} className="bg-white p-4 rounded-lg shadow-md">
              <h1 className="text-xl text-center font-semibold">{workout.workout.name}</h1>
              <h2 className="text-lg text-center">{workout.workout_count}</h2>
              <h2 className="text-sm text-center text-gray-500">{workout.time_created}</h2>
              <div className="">
                    <img 
                    onClick={() => handleDeleteWorkout(workout.id)} 
                    className="mx-auto mt-3 max-h-7 cursor-pointer transform transition-transform hover:translate-y-[-5px]"               
                    src={trashcan} 
                    alt="trashcan"
                    />
              </div>
            </div>
          ))}
        </div>
)};
      
export default MyWorkout