export function MessageViewer({containerRef, messages, user, containerStyle }) {
  return <div ref={containerRef} className="chat-messages"  style={containerStyle}>
    {messages.map((message, index) => (
      <div
        key={message.id}
        className={message.user == user ? "emisor message" : "receptor message"}
      >
        [{message.user}]:{message.text}
      </div>
    ))}
  </div>;
}
