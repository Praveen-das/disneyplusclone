import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthProvider from './contexts/Contexts';
import Firebase from './contexts/FirebaseContext';

ReactDOM.render(
  <React.StrictMode>
    <Firebase>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Firebase>
  </React.StrictMode>,
  document.getElementById('root')
);

