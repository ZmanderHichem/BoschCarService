import React, { useEffect, useState } from 'react';
import { ref, onValue, push, serverTimestamp, off } from 'firebase/database';
import { database } from '../../../../firebase/configFirebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../../../firebase/configFirebase';
import './ChatStyles.css';

const Chat = ({ userRole }) => {
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const chatRef = ref(database, 'Chat');
    const callback = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesArray = Object.values(data);
        setMessages(messagesArray);
           } else {
        setMessages([]);
      }
    };

    onValue(chatRef, callback);

    return () => {
      off(chatRef, 'value', callback);
    };
  }, []);

  useEffect(() => {
    const getUserName = async () => {
      const q = query(collection(firestore, 'users'), where('uid', '==', userRole));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserName(doc.data().name);
      });
    };

    getUserName();
  }, [userRole]);

  const sendMessage = () => {
    const chatRef = ref(database, 'Chat');
    push(chatRef, {
      message: newMessage,
      timestamp: serverTimestamp(),
      role: userRole, // Indique le rôle de l'expéditeur (admin ou user)
    }).catch((error) => {
      console.error('Error sending message:', error);
    });

    setNewMessage('');
  };

  const [newMessage, setNewMessage] = useState('');

  return (
    <div className="chat-container">
      <div>
        <h2>Espace {userName}</h2>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.role === 'admin' ? 'admin-message' : 'user-message'}`}
          >
            {message.message}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat; 