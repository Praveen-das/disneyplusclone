import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthProvider from './contexts/Contexts';
import Firebase from './contexts/FirebaseContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Firebase>
        <App />
      </Firebase>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

