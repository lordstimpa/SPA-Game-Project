import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import Styled from "styled-components";

const Main = Styled.div`
  width: 35%;
  min-height: 60svh;
  background: #f2f2f2;
  justify-content: center;
  
  & h2 {
      font-family: 'Pixelify Sans', sans-serif;
      margin-top: 4rem;
      text-align:center;
      font-size: bold;
    }
    
    & .Board {
    display:flex;
    flex-start:left;
    flex-direction:column;
    justify-content:center;
    margin: 2rem;
    margin-top: 0rem;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 2px solid #000;

    & p {
        padding: 0.2rem 0.5rem;
    }
    & .message{
        font-family: 'Pixelify Sans', sans-serif;
        ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      li {
        padding: 0.5rem;
        border-bottom: 1px solid #ccc; /* Add a thin line as a bottom border */
        
      }
    }
  }
`;

const Chat = () => {
    const [connection, setConnection] = useState(null);
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("/chatHub")
            .build();

        setConnection(newConnection);

        newConnection.start()
            .then(() => {
                console.log('SignalR Connected');
            })
            .catch((err) => console.error(err));

        newConnection.on("ReceiveMessage", (receivedUser, receivedMessage) => {
            setMessages(prevMessages => [...prevMessages, `${receivedUser} says: ${receivedMessage}`]);
        });

        return () => {
            if (newConnection) {
                newConnection.stop();
            }
        };
    }, []); // Only run this effect once when the component mounts

    const sendMessage = () => {
        connection.invoke("SendMessage", user, message)
            .catch((err) => console.error(err));
    };

    return (
        <Main>
            <h2>TrashTalk</h2>
        <div className="Board">
            <div className="p-1">
                <div className="col-1">User</div>
                <div className="col-5"><input type="text" value={user} onChange={(e) => setUser(e.target.value)} /></div>
            </div>
            <div className="p-1">
                <div className="message">Message</div>
                <div className="col-5"><input type="text" className="w-100" value={message} onChange={(e) => setMessage(e.target.value)} /></div>
            </div>
            <div className="p-1">
                <div className="message">
                    <input type="button" value="Send Message" onClick={sendMessage} />
                </div>
            </div>
            <div className="p-1">
                <div className="col-6">
                    <hr />
                </div>
            </div>
            <div className="p-1">
                <div className="message">
                    <ul>
                        {messages.map((msg, index) => (
                            <li key={index} className='user-says'>{msg}</li>
                        ))}
                    </ul>
                </div>
            </div>
            </div>
        </Main>
    );
};

export default Chat;