import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/DEMO-Dubra"> {/* Aquí envuelves la aplicación con BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
