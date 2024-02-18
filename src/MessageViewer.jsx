export function MessageViewer({containerRef, messages, user}) {
  return <div ref={containerRef} className="chat-messages">
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
