import { useContext, useState, useEffect } from "react"
import { Context } from "../App"
import io from 'socket.io-client';
import { reformatTimestamp } from '../functions/functions';
const serverURL = `${window.location.origin}`;
const socket = io(serverURL);


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
        socket.on('message_deleted', (deletedMsg) => {
          if (Array.isArray(context.messages)) {
            let updatedMessages = context.messages.filter((message) => message.id !== deletedMsg.msg_id)
            context.setMessages(updatedMessages);
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

function handleDeleteMessage(id) {
  const msgToDelete = {
    msg_id: id
  }
  socket.emit('delete', msgToDelete);
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
                  <div className="flex flex-wrap justify-between ">
                    <h2 className="font-semibold text-lg">{msg.user.id === context.user.id ? 'Me' : msg.user.username}:</h2>
                    <p className="text-sm text-gray-500">{reformatTimestamp(msg.time_created)}</p>
                  </div>
                  <div className='flex flex-wrap items-right justify-between'>
                      <div className="flex flex-row">
                        <p className="text-gray-600">{msg.text}</p>
                      </div>
                  </div>
                  {msg.user.id === context.user.id && <div className="flex justify-end mt-2">
                        <button className="text-red-500" onClick={() => handleDeleteMessage(msg.id)}>x</button>
                      </div>}
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
                }}
                className="text-blue-500 hover:text-blue-700 font-semibold"
            >
                Close
            </button>
            </div>
            </div>
          ) : (
            <span onClick={() => setRevealMsgs(true)} class="material-symbols-outlined" style={{cursor: 'pointer', fontSize: '4em', marginRight: '.2em' }}>
chat
</span>
          )}
        </div>
      );
    }
export default Message