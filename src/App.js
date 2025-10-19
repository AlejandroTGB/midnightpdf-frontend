import React, { useState } from 'react';
import UploadForm from './components/UploadForm';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [mode, setMode] = useState('oscuro');

  const handleUpload = async (formData, selectedMode) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setMode(selectedMode);

    try {
      const response = await fetch('http://localhost:8080/process-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al procesar el PDF en el backend');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>MidnightPDF</h1>
      <UploadForm onUpload={handleUpload} />
      {loading && <p>Procesando el archivo...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {success && (
        <div>
          <p style={{ color: 'green' }}>¡PDF procesado con éxito!</p>
          <a href={downloadUrl} download={`midnightpdf_${mode}.pdf`}>Descargar PDF</a>
        </div>
      )}
    </div>
  );
}

export default App;