import React, { useState } from 'react';
import './Login.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";



const Login = () => {  
     const [username, setUsername] = useState("");
     const [password,setPassword] = useState("");
     const [erreur, setErreur] = useState("");


     const OnSubmit = async (event) => {
     event.preventDefault();
    try {
      
      
      const response = await fetch('http://localhost:8000/login',
        {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        
       
        });

        const resp = await response.json();
        console.log("Réponse du backend :", resp);

      if (response.ok && resp.access_token) {
        
        localStorage.setItem("token", resp.access_token);
        console.log("Token reçu :", resp.access_token);
        //  Redirection vers Sentiment
         window.location.href = "/Sentiment"
       }

      else { setErreur(resp.detail || "Login failed!"); }

     }
     catch (error) {
      setErreur("Login failed!"); 
    }
  };

    return (
    <div className="login-container">
      <form className="login-form" onSubmit={OnSubmit}>
        <h2>Connexion</h2>
         
        <div className="input-box">
          <label htmlFor="Username">Username</label>
          <input type="text"  placeholder="Enter your username" value={username}
         onChange={(e) => setUsername(e.target.value)} required />
          <FaUser className='icon'/>
        </div>
        <div className="input-box">
          <label htmlFor="password">password</label>
          <input type="password"  placeholder="Enter your password" value={password}
          onChange={(e) => setPassword(e.target.value)}required />
           <FaLock className='icon' />
        </div>
        <button type="submit">Login</button>
        <p className="error">{JSON.stringify(erreur)}</p>


      </form>
      

    </div>
  );
};

export default Login