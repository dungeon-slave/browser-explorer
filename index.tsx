import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Explorer from './subComponents/Explorer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Explorer/>
  </React.StrictMode>
);
