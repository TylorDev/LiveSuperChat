import { useState, useEffect, useRef } from "react";
import { InputPrincipal } from "./InputPrincipal";
import { UserCreate } from "./userCreate";
import { MessageViewer } from "./MessageViewer";

export const Chat = () => {
  //USE STATE
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputPrincipal, setInputPrincipal] = useState("");
  const [user, setUser] = useState("Receptor");
  const [nickname, setNickName] = useState(false);

  // USE REF

  const containerRef = useRef(null);

  //USEEFFECT
  useEffect(() => {

     
    containerRef.current.scrollTop =
    containerRef.current.scrollHeight - containerRef.current.clientHeight;
    const storedMessages = JSON.parse(localStorage.getItem("chatMessages"));
    // Verificar si hay un cambio en los mensajes almacenados antes de actualizar el estado
    if (storedMessages && JSON.stringify(storedMessages) !== JSON.stringify(messages)) {
      setMessages(storedMessages);
    }
    const handleStorageChange = (event) => {
      if (event.key === "chatMessages") {
        // Verificar si hay un cambio en los mensajes almacenados antes de actualizar el estado
        if (JSON.stringify(messages) !== event.newValue) {
          setMessages(JSON.parse(event.newValue));
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    // Limpiar el event listener al desmontar el componente
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [messages]); // Dependencia de efecto para ejecutarse solo cuando los mensajes cambien

  //Handlers

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      setUser(inputValue.trim());
      setNickName(true);
    }
  };

  const VaciarLocal = () => {
    localStorage.removeItem("chatMessages");
    window.location.reload();
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (inputPrincipal.trim() !== "") {
      const newMessage = {
        id: messages.length,
        text: inputPrincipal.trim(),
        user: user,
      };
      // Update messages state first
      setMessages([...messages, newMessage]);
      // Then save to localStorage
      localStorage.setItem(
        "chatMessages",
        JSON.stringify([...messages, newMessage])
      );
      setInputPrincipal("");
    }
  };




  return (
    <div className="chat-container">
      <UserCreate
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleAddItem={handleAddItem}
        user={user}
      />

      <MessageViewer
        containerRef={containerRef}
        messages={messages}
        user={user}
      />

      <InputPrincipal
        handleMessageSubmit={handleMessageSubmit}
        InputPrincipal={inputPrincipal}
        setInputPrincipal={setInputPrincipal}
        nickname={nickname}
      />

      <div>
        <button onClick={VaciarLocal}>Vaciar LocalStorage</button>
      </div>
    </div>
  );
};
