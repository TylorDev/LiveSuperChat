import { useRef, useState } from "react";




export function InputPrincipal({handleMessageSubmit,  value, setInputPrincipal,  nickname,onClick, imageSrc, onChange}) {

  const [enviado, setEnviado] = useState(false);
  const fileInputRef = useRef(null);

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Limpiar el valor del input
      setEnviado(true);
    }

  };

  return <div className="inputPrincipal">
    <form onSubmit={handleMessageSubmit} className="message-input-form">
      <input
        type="text"
        value={value}
        onChange={(e) => setInputPrincipal(e.target.value)}
        placeholder="Type your message..."
        className="message-input"
        disabled={!nickname} />
      <button type="submit" className="send-button" onClick={() => {
          // Llamar a la función de enviar del padre
          onClick();
          // Limpiar el input de archivos después de enviar
          clearFileInput();
        }}>
        Mensaje
      </button>

      <button type="submit" className="send-button" onClick={() => {
          // Llamar a la función de enviar del padre
          onClick();
          // Limpiar el input de archivos después de enviar
          clearFileInput();
        }}>
        Imgxdxdxd
      </button>
    </form>
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*, .gif"   
        onChange={onChange}
      />
      <div className="screen" style={{ marginTop: '20px' }}>
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Uploaded"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        )}
      </div>
    </div>

  </div>;
}
