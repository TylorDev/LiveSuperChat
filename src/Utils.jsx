/* eslint-disable react/prop-types */
import { UserCreate } from "./userCreate";

export function Utils({
  handlePaste,
  applyBackground,
  VaciarLocal,
  inputValue,
  handleInputChange,
  handleAddItem,
  user,
}) {
  return (
    <div className="utilidades">
      <button onClick={handlePaste}>Pegar Link de imagen de fondo</button>
      <button onClick={applyBackground}>Aplicar Fondo</button>
      <div>
        <button onClick={VaciarLocal}>Vaciar LocalStorage</button>
      </div>
      <UserCreate
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleAddItem={handleAddItem}
        user={user}
      />
    </div>
  );
}
