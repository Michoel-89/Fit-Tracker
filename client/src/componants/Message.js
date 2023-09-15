import { useContext, useState, useEffect } from "react"
import { Context } from "../App"
import messageIcon from '/home/michoel/post-grad-apps/fit-tracker/client/src/pictures/messageIcon.jpg'
import io from 'socket.io-client';
const socket = io('http://localhost:5555');

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

function Message() {
    const [revealMsgs, setRevealMsgs] = useState(false)
    const [messageInState, setMessage] = useState('')
    const context = useContext(Context)

    useEffect(() => {
      socket.on('message', (newMessage) => {
          if (Array.isArray(context.messages)) {
            context.setMessages([...context.messages, newMessage]);
          }
      })
  }, [context]);

  function handleSendMessage() {
    if (messageInState.length < 1) {
        return null;
    }
    const newMessage = {
        text: messageInState,
        user_id: context.user.id
    };

    socket.emit('message', newMessage);

    setMessage('');
}

    if (!context.messages) {
        return 
    }
    return (
        <div className="fixed bottom-0 right-0 m-4">
          {revealMsgs ? (
            <div className="bg-white p-4 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4">Fit Community</h1>
            <div className="max-h-[60vh] max-w-[60vh] overflow-y-auto">
            {context.messages.map((msg) => {
                return <div key={msg.id} className={msg.user.id === context.user.id ? 'bg-green-300 p-3 mb-4 rounded-lg shadow-md ml-10' :'bg-gray-100 p-3 mb-4 rounded-lg shadow-md mr-10'}>
                <div className='flex items-right justify-between'>
                    <div>
                      <h2 className="font-semibold text-lg">{msg.user.id === context.user.id ? 'Me' : msg.user.username}:</h2>
                      <p className="text-gray-600">{msg.text}</p>
                      </div>
                      <p className="text-sm mb-6 text-gray-500">{reformatTimestamp(msg.time_created)}</p>
                    </div>
                </div>
            })}
            <div className="mb-4">
                <input
                placeholder="Type your message..."
                className="w-full p-2 border rounded"
                value={messageInState}
                onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            <button onClick={() => handleSendMessage()} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold">
                Send Message
            </button>
            </div>
            <div className="flex justify-end mt-2">
            <button
                onClick={() => {
                  setRevealMsgs(false)
                  if (socket) {
                    socket.close();
                  }
                }}
                className="text-blue-500 hover:text-blue-700 font-semibold"
            >
                Close
            </button>
            </div>
            </div>
          ) : (
            <img
              onClick={() => setRevealMsgs(true)}
              src={messageIcon}
              alt="message icon"
              className="cursor-pointer w-15 h-14 rounded-2xl  "
            />
          )}
        </div>
      );
    }
export default Message