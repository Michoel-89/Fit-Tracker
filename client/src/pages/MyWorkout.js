import { useContext } from "react"
import { Context } from "../App"
import trashcan from '/home/michoel/post-grad-apps/fit-tracker/client/src/pictures/trash.jpg'

function reformatTimestamp(timestamp) {
  const dateParts = timestamp.split(' ');
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  let period = "AM";

  if (hours >= 12) {
    period = "PM";
    if (hours > 12) {
      date.setHours(hours - 12);
    }
  }
  
  const formattedTime = `${dateParts[0]} ${date.getHours()}:${String(minutes).padStart(2, '0')}${period}`;

  return formattedTime;
}

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
    if (!context.myWorkouts) {
      return null
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {context.myWorkouts.map((workout) => (
            <div key={workout.id} className="bg-white p-4 rounded-lg shadow-md">
              <h1 className="text-xl text-center font-semibold">{workout.workout.name}</h1>
              <h2 className="text-lg text-center">{workout.workout_count}</h2>
              <h2 className="text-sm text-center text-gray-500">{reformatTimestamp(workout.time_created)}</h2>
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