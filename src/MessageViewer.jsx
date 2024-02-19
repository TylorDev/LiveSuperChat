import { useRef } from "react";



export function MessageViewer({
  containerRef,
  messages,
  user,
  containerStyle,
}) 

{



  const handleRightClick = (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del menú del clic derecho
    console.log("Proximamente menu contextual"); // Muestra un mensaje por consola
  };

  return (
    <div
      ref={containerRef}
      className="chat-messages"
      style={containerStyle}
      onContextMenu={handleRightClick}
    >
      {messages.map((message, index) => (
        <div
          key={message.id}
          className={
            message.user == user ? "emisor message" : "receptor message"
          }
        >
        
        
              <img className="imgAdjunta"
                src={message.img}
                alt=""
              />
           
          <div className="mensaje-texto">{message.text}</div>
          <div className="mensaje-info">
            <span className="mensaje-usuario">{message.user}</span>
          
            <span className="mensaje-hora">{message.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
