export function UserCreate({inputValue, handleInputChange, handleAddItem, user}) {
  return <div>
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Escribe un nuevo elemento" />
    <button onClick={handleAddItem}>Agregar</button>
    <ul>
      <li>{user}</li>
    </ul>
  </div>;
}
