import React, { useState } from 'react';

function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState('oscuro');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert('Por favor, selecciona un archivo PDF.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('mode', mode);
    formData.append('fileName', file.name);

    // Pasamos el mode junto con el formData
    onUpload(formData, mode);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Subir PDF:</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <div>
        <label>Modo:</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="oscuro">Oscuro</option>
          <option value="claro">Claro</option>
        </select>
      </div>
      <button type="submit">Procesar PDF</button>
    </form>
  );
}

export default UploadForm;