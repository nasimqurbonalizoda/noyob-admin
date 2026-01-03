import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';  
import App from './App.tsx';
import './index.css';
import { Toaster } from 'react-hot-toast';  
import { store } from './store/stores/store.ts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>              
      <App />
      <ToastContainer 
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
/>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#fff',
            borderRadius: '12px',
          },
          success: {
            icon: '✅',
            style: { background: '#10b981' },
          },
          error: {
            icon: '❌',
            style: { background: '#ef4444' },
          },
        }}
      />
    </Provider>
  </React.StrictMode>
);