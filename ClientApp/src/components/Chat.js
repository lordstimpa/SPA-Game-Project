import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

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
            setMessages(prevMessages => [...prevMessages, `${receivedUser} says ${receivedMessage}`]);
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
        <div className="container">
            {/* Your JSX for input fields, button, and message list */}
            <div className="row p-1">
                <div className="col-1">User</div>
                <div className="col-5"><input type="text" value={user} onChange={(e) => setUser(e.target.value)} /></div>
            </div>
            <div className="row p-1">
                <div className="col-1">Message</div>
                <div className="col-5"><input type="text" className="w-100" value={message} onChange={(e) => setMessage(e.target.value)} /></div>
            </div>
            <div className="row p-1">
                <div className="col-6 text-end">
                    <input type="button" value="Send Message" onClick={sendMessage} />
                </div>
            </div>
            <div className="row p-1">
                <div className="col-6">
                    <hr />
                </div>
            </div>
            <div className="row p-1">
                <div className="col-6">
                    <ul>
                        {messages.map((msg, index) => (
                            <li key={index}>{msg}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Chat;