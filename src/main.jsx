import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios';
import { API_URL, UNSPLASH_PUBLIC_KEY } from './utils/constants.js';

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Authorization'] = `Client-ID ${UNSPLASH_PUBLIC_KEY}`;

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
