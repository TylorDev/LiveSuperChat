export function UserCreate({
  inputValue,
  handleInputChange,
  handleAddItem,
  user,
}) {
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Escribe un nuevo nombre"
      />
      <button onClick={handleAddItem}>Cambiar username</button>
      <ul>
        <li>Te llamas: {user}</li>
      </ul>
    </div>
  );
}
