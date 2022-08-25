import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
//Alertify
import 'alertifyjs/build/css/alertify.min.css'
//Datepicker
import "react-datepicker/dist/react-datepicker.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
