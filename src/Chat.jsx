import { useState, useEffect, useRef } from "react";
import { InputPrincipal } from "./InputPrincipal";
import { MessageViewer } from "./MessageViewer";
import { Utils } from "./Utils";

const exampleMessages = [
  {
    id: 0,
    text: "¡Hola! ¿Cómo estás?",
    user: "Usuario1",
    time: "15:52",
  },
  {
    id: 1,
    text: "¡Hola Usuario1! Estoy bien, ¿y tú?",
    user: "Usuario2",
    time: "15:55",
  },
  {
    id: 2,
    user: "Usuario1",
    text: "¡Estoy genial! Gracias por preguntar.",
    time: "16:22",
  },
  {
    id: 3,
    user: "Usuario2",
    text: "¿Qué has estado haciendo últimamente?",
    time: "16:43",
  },
  {
    id: 4,
    user: "Usuario1",
    text: "He estado trabajando en un nuevo proyecto de desarrollo web.",
    time: "16:57",
  },
];

export const Chat = () => {
  //USE STATE
  const [messages, setMessages] = useState(exampleMessages);
  const [inputValue, setInputValue] = useState("");
  const [inputPrincipal, setInputPrincipal] = useState("");
  const [user, setUser] = useState("Usuario1");
  const [nickname, setNickName] = useState(false);
  const [horaActual, setHoraActual] = useState("");

  const obtenerHoraActual = () => {
    const fecha = new Date();
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();

    // Formatear las horas y minutos en un formato de 24 horas
    const horaFormateada = `${horas < 10 ? "0" + horas : horas}:${
      minutos < 10 ? "0" + minutos : minutos
    }`;

    // Actualizar el estado con la hora formateada
    setHoraActual(horaFormateada);
  };
  // USE REF

  const containerRef = useRef(null);

  //USEEFFECT
  useEffect(() => {
    if (user == "Usuario1") {
      setNickName(true);
    }
    containerRef.current.scrollTop =
      containerRef.current.scrollHeight - containerRef.current.clientHeight;
    const storedMessages = JSON.parse(localStorage.getItem("chatMessages"));
    // Verificar si hay un cambio en los mensajes almacenados antes de actualizar el estado
    if (
      storedMessages &&
      JSON.stringify(storedMessages) !== JSON.stringify(messages)
    ) {
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
    } else {
      setUser("Usuario2");
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
        time: horaActual,
        img: imageSrc || null,
      };
      // Update messages state first
      setMessages([...messages, newMessage]);
      // Then save to localStorage
      localStorage.setItem(
        "chatMessages",
        JSON.stringify([...messages, newMessage])
      );
    }
    setInputPrincipal("");
    setImageSrc("");
  };

  const [clipboardLink, setClipboardLink] = useState("");
  const [containerStyle, setContainerStyle] = useState({});

  const handlePaste = () => {
    navigator.clipboard
      .readText()
      .then((pastedData) => {
        if (isValidLink(pastedData)) {
          setClipboardLink(pastedData);
        }
      })
      .catch((error) => {
        console.error("Error al leer el portapapeles: ", error);
      });
  };

  const isValidLink = (link) => {
    return /^https?:\/\/.*/.test(link);
  };

  const inputFileRef = useRef(null);
  const applyBackground = () => {
    setContainerStyle({
      backgroundImage: clipboardLink ? `url(${clipboardLink})` : "none",
    });
  };

  const [imageSrc, setImageSrc] = useState(null);
  const [friend, setFriend] = useState("Unknown");
  const [profile, setProfile] = useState("user2.png");

  const handleFriend = (text) => {
    if (text != user) setFriend(text);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Utils
        handlePaste={handlePaste}
        applyBackground={applyBackground}
        VaciarLocal={VaciarLocal}
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleAddItem={handleAddItem}
        user={user}
      />

      <div className="chat-container">
        <div className="profile">
          <img src={profile} alt="" />
          <div>
            {friend}
            <span>Online</span>
          </div>
        </div>
        <MessageViewer
          handleFriend={handleFriend}
          containerRef={containerRef}
          messages={messages}
          user={user}
          containerStyle={containerStyle}
        />

        <InputPrincipal
          ref={inputFileRef}
          onClick={obtenerHoraActual}
          handleMessageSubmit={handleMessageSubmit}
          value={inputPrincipal}
          setInputPrincipal={setInputPrincipal}
          nickname={nickname}
          onChange={handleImageChange}
          imageSrc={imageSrc}
        />
      </div>
    </div>
  );
};
