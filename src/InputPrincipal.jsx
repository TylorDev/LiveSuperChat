export function InputPrincipal({handleMessageSubmit,  inputPrincipal, setInputPrincipal,  nickname}) {
  return <div className="inputPrincipal">
    <form onSubmit={handleMessageSubmit} className="message-input-form">
      <input
        type="text"
        value={inputPrincipal}
        onChange={(e) => setInputPrincipal(e.target.value)}
        placeholder="Type your message..."
        className="message-input"
        disabled={!nickname} />
      <button type="submit" className="send-button">
        Send
      </button>
    </form>
  </div>;
}
