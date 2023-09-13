import { useContext, useState } from "react"
import { Context } from "../App"
import messageIcon from '/home/michoel/post-grad-apps/fit-tracker/client/src/pictures/messageIcon.jpg'
function Message() {
    const [revealMsgs, setRevealMsgs] = useState(false)
    const context = useContext(Context)

    function handleSendMessage() {
        
    }

    if (!context.messages) {
        return 
    }
    return (
        <div className="fixed bottom-0 right-0 m-4">
          {revealMsgs ? (
            <div className="bg-white p-4 rounded-lg shadow-lg">
            <button
                onClick={() => setRevealMsgs(false)}
                className="text-blue-500 hover:text-blue-700 font-semibold"
            >
                Close
            </button>
            <h1 className="text-3xl font-bold mb-4">Fit Community</h1>
            {context.messages.map((message) => (
                <div key={message.id} className="bg-gray-100 p-3 mb-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                    <div>
                    <h2 className="font-semibold text-lg">{message.user.username}:</h2>
                    <p className="text-gray-600">{message.text}</p>
                    </div>
                    <p className="text-sm text-gray-500">{message.time_created}</p>
                </div>
                </div>
            ))}
            <div className="mb-4">
                <input
                placeholder="Type your message..."
                className="w-full p-2 border rounded"
                />
            </div>
            <button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold">
                Send Message
            </button>
            </div>

          ) : (
            <img
              onClick={() => setRevealMsgs(true)}
              src={messageIcon}
              alt="message icon"
              className="cursor-pointer w-15 h-14"
            />
          )}
        </div>
      );
    }
export default Message