import { useState, useEffect, useRef } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="livechat">
        <Chat></Chat>
      </div>
    </>
  );
}

export default App;
const Chat = () => {
  const [messages, setMessages] = useState([]);
  
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [user, setUser] = useState("Receptor");
  const [Unique, setUnique] = useState("");
  const [inputFilled, setInputFilled] = useState(false);
  const containerRef = useRef(null);
  const generateRandomLetters = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Letras disponibles
    let result = "";
    for (let i = 0; i < 5; i++) {
      // Generar 10 letras aleatorias
      const randomIndex = Math.floor(Math.random() * letters.length);
      result += letters.charAt(randomIndex);
    }
    return result;
  };

  // useEffect se ejecuta cuando el componente se monta
  useEffect(() => {
    // Generar letras aleatorias y actualizar el estado
    const random = generateRandomLetters();
    setUnique(random);
    containerRef.current.scrollTop = containerRef.current.scrollHeight - containerRef.current.clientHeight;
  }, [messages]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
 
  };



  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      setUser(inputValue.trim());
      setInputFilled(true); 
    }
  };

  // Load messages from localStorage on component mount
  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("chatMessages"));
    if (storedMessages) {
      setMessages(storedMessages);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "chatMessages") {
        setMessages(JSON.parse(event.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleClick = () => {
    localStorage.removeItem("chatMessages");
    window.location.reload();
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (inputValue2.trim() !== "") {
      const newMessage = {
        id: messages.length,
        text: inputValue2.trim(),
        user: user,
        session: Unique,
      };
      // Update messages state first
      setMessages([...messages, newMessage]);
      // Then save to localStorage
      console.log(messages);
      localStorage.setItem(
        "chatMessages",
        JSON.stringify([...messages, newMessage])
      );
      setInputValue2("");

     
    }

   
  };

  return (
    <div className="chat-container">
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Escribe un nuevo elemento"
        />
        <button onClick={handleAddItem}>Agregar</button>
        <ul>
          <li>{user}</li>
        </ul>
      </div>

      <div  ref ={containerRef} className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={message.user == user ? "enviador message" : "receptor message"}
          >
         
             [{message.user}]:{message.text}

          </div>
        ))}
      </div>

      <form onSubmit={handleMessageSubmit} className="message-input-form">
        <input
          type="text"
          value={inputValue2}
          onChange={(e) => setInputValue2(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
          disabled={!inputFilled}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>

      <div>
        <button onClick={handleClick}>
          Eliminar chatMessages de localStorage
        </button>
      </div>
    </div>
  );
};
