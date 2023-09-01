import { useContext } from "react"
import { Context } from "../App"
function Message() {
    const context = useContext(Context)
    if (!context.messages) {
        return 
    }
    return <>
    {context.messages.map((message) => {
        return <div key={message.id}>
        <h2>{message.text}</h2></div>
    })}</>
}
export default Message