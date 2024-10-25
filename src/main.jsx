import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {configureAntDesign} from "../ant-design-config.js";
// import 'antd/dist/reset.css'
configureAntDesign();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
