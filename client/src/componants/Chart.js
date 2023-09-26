import { useContext } from 'react';
import { Context } from '../App';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { reformatTimestamp } from '../functions/functions';

function Chart() {
  const context = useContext(Context)

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white bg-opacity-90 p-2 border border-gray-300">
          <p>{`Date: ${reformatTimestamp(label)}`}</p>
          <p>{`${payload[0].value} ${payload[1].value}`}</p>
        </div>
      );
    }
  
    return null;
  };
  
    if (!context.myWorkouts) {
      return <h2>Loading...</h2>
    }
    
    return (<div className='pt-5 '>
        <ResponsiveContainer height={400}>
        <BarChart
          width={400}
          height={400}
          data={context.myWorkouts}
        >
          <XAxis hide dataKey="time_created" />
          <YAxis />
          <Tooltip cursor={{fill: 'transparent'}} content={CustomTooltip}/>
          <Bar type="monotone" dataKey='workout_count' isAnimationActive={false} stroke="#8884d8" fill="rgb(0,250,154)" />
          <Bar type="monotone" dataKey='workout.name' stroke="#8884d8" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      </div>
    );
  }
export default Chart
