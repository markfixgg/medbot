import {TextField} from '@material-ui/core'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';


const ChatComponent = ({ ticketID, creatorID, messagesList }) => {
    const [messages, setMessages] = useState(messagesList)
    const eventHandler = async (e) => {
        e.preventDefault()
        const message = e.target[0].value;   
        const payload = {
            ticketID: ticketID, 
            data: {
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: "Europe/Kiev", hour: "numeric", minute: "numeric" }),
                message: message,
                messageID: uuidv4()
            }
        }
        await axios.post('http://127.0.0.1:80/api/bags', payload)
        .then(response => {
            console.log(response)
            if(response.data.success){
                setMessages([...messages, payload.data])
            }
        })
        .catch(e => console.log(e))

        e.target[0].value = "";
    }

    return(
        <div className="chat">
            <div className="messagesBlock">
                {
                    messages.map((item, id) => {
                        return(
                            <div className={`message-${item.tgID == creatorID ? "blue" : "orange"}`} key={id}>
                                <div className='message-content'> {item.message} </div>
                                <div className='message-timestamp-right'> {item.time} </div>
                            </div>
                        )
                    })
                }
            </div>
            <form onSubmit={ e => eventHandler(e) } className="inputForm" noValidate autoComplete="off">
                <TextField id="standard-basic" variant="filled" label="Введите новое сообщение"/>
            </form>
        </div>
    )
}

export default ChatComponent