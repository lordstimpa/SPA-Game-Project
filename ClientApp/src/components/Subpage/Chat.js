import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import Styled from "styled-components";
import axios from 'axios';
import authService from "../api-authorization/AuthorizeService";

const Main = Styled.div`
  width: 35%;
  min-height: 60svh;
  max-height: 80svh;
  
  & h2 {
      font-family: 'Pixelify Sans', sans-serif;
      margin-top: 4rem;
      text-align:center;
      font-size: bold;

    }
    & h5 {
        font-family: 'Pixelify Sans', sans-serif;
        font-size: bold
    }
    
    & .Board {
        height:800px;
    display:flex;
    flex-start:left;
    flex-direction:column;
    margin: 2rem;
    margin-top: 0rem;
    padding: 1.5rem;
    border-radius: 0.25rem;
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
        border-bottom: 1px solid #ccc; 
        
      }
    }
    & .p-2 {
        height:100%;
        overflow-y:scroll;
    }
  }
`;

const Chat = () => {
    const [connection, setConnection] = useState(null);
    const [message, setMessage] = useState('');
    const [gamerTag, setGamerTag] = useState('');
    const [messages, setMessages] = useState([]);

    const fetchGamerTag = async () => {
        try {
            const accessToken = await authService.getAccessToken();
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };
            const response = await axios.get('/api/user/getuser', {
                headers: headers,
            });
            setGamerTag(response.data.gamerTag);
        } catch (error) {
            console.error('Error fetching gamer tag:', error);
        }
    };

    useEffect(() => {

        fetchGamerTag(); 

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
        connection.invoke("SendMessage", gamerTag, message)
            .catch((err) => console.error(err));
    };
    return (
        <Main>
            <h2>TrashTalk</h2>
        <div className="Board">
            <div className="p-1">
                    <div className="col-1"><h5>{gamerTag}</h5></div>
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
            <div className="p-2">
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