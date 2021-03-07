import './App.css';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SERVER = "http://localhost:4000/";

var socket = io(SERVER);
socket.on('connection', () => {
  console.log(`I'm connected with the back-end`);
});

function App() {


  const [state, setState] = useState({ name: "", message: "" });
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('chat', ({ name, message }) => {
      setChat([...chat, { name, message }])
    })
  })

  const handleOnSubmit = e => {
    e.preventDefault();
    // console.log(state);
    const { name, message } = state;
    // console.log(name);
    // console.log(message);
    socket.emit('chat', { name: name, message: message })
    setState({ message: " ", name })
  }

  const handleOnChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const renderChat = () => {
    return chat.map(({ name, message }, idx) => (
      // console.log(name, ":", message)
      <p><strong>{name}</strong> : {message}</p>
      // <div key={idx}>
      //   <span style={{ color: "green" }}>{name}: </span>
      //   <span>{message}</span>
      // </div>
    ));
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="display-4">CHATTER</div>
        <div className="chat-window">
          <div id="output">{renderChat()}</div>
          <div id="feedback"></div>
        </div>
        <form onSubmit={e => handleOnSubmit(e)}>
          <input
            id="handle"
            type="text"
            autoComplete="off"
            value={state.name}
            name="name"
            onChange={e => handleOnChange(e)}
            placeholder="Name"
          />
          <input
            id="message"
            autoComplete="off"
            type="text"
            value={state.message}
            name="message"
            onChange={e => handleOnChange(e)}
            placeholder="Message"
          />
          <input type="submit" id="send" value="Send" />
          {/* <button id="send">Send</button> */}
        </form>
      </header>
    </div>
  );
}

export default App;
