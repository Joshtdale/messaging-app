import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './style.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import NavBar from './components/Navbar';
import { GlobalProvider } from './context/GlobalState';
import Home from './Home';
import ChatWindow from './ChatWindow';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <GlobalProvider>

        <Router>
        {/* <NavBar/> */}
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="profile" element={<Profile />} />
            <Route path="/msgs" element={<Home />} />
            <Route path="/msgs/:chatid" element={<ChatWindow />} />
            </Route>
          </Routes>
        </Router>
      </GlobalProvider>
  </React.StrictMode>
);