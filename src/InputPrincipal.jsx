export function InputPrincipal({handleMessageSubmit,  value, setInputPrincipal,  nickname,onClick}) {
  return <div className="inputPrincipal">
    <form onSubmit={handleMessageSubmit} className="message-input-form">
      <input
        type="text"
        value={value}
        onChange={(e) => setInputPrincipal(e.target.value)}
        placeholder="Type your message..."
        className="message-input"
        disabled={!nickname} />
      <button type="submit" className="send-button" onClick={onClick}>
        Send
      </button>
    </form>
  </div>;
}
