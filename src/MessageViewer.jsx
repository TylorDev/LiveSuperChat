export function MessageViewer({
  containerRef,
  messages,
  user,
  containerStyle,
}) {
  return (
    <div ref={containerRef} className="chat-messages" style={containerStyle}>
      {messages.map((message, index) => (
        <div
          key={message.id}
          className={
            message.user == user ? "emisor message" : "receptor message"
          }
        >
          <div className="mensaje-info">
            <span className="mensaje-usuario">{message.user}</span>
            <span className="mensaje-hora">{message.time}</span>
          </div>
          <div className="mensaje-texto">{message.text}</div>
        </div>
      ))}
    </div>
  );
}
