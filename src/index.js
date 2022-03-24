import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FirebaseAppProvider } from "reactfire";
import { BrowserRouter } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyA81SPJVE67uXG-X86cq2VTjdX3OVbVvOo",
  authDomain: "tb-timeliste.firebaseapp.com",
  projectId: "tb-timeliste",
  storageBucket: "tb-timeliste.appspot.com",
  messagingSenderId: "5479753723",
  appId: "1:5479753723:web:e83045f726e7d368e10d5e"
};


ReactDOM.render(
  <BrowserRouter>
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
    </FirebaseAppProvider>
    </BrowserRouter>
 ,
  document.getElementById('root')
);

