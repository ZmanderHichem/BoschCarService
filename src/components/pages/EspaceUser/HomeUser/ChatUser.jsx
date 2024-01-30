import { useEffect, useState } from 'react';
import { ref, onValue, push, serverTimestamp, off } from 'firebase/database';  // Import push and serverTimestamp
import { database } from '../../../../firebase/configFirebase';

const ChatUser = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

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

  const sendMessage = () => {
    const chatRef = ref(database, 'Chat');
    // Assuming 'newMessage' contains the message content
    push(chatRef, {
      message: newMessage,
      timestamp: serverTimestamp(),
    }).catch(error => {
      console.error("Error sending message:", error);
    });
  
    // Clear the input field after sending the message
    setNewMessage('');
  };

  return (
    <div>
    <h2>Chat</h2>
    <ul>
      {Array.isArray(messages) ? (
        messages.map((message, index) => (
          <li key={index}>{message.message}</li>
        ))
      ) : (
        <p>No messages yet.</p>
      )}
      </ul>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Envoyer</button>
    </div>
  );
};

export default ChatUser;
