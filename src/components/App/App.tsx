import React from 'react';
import '../../Themes/App.css';
import { AppBar } from '@material-ui/core';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <AppBar >TEST123</AppBar>
        <h1>Welcome to PowerPaint Presentations</h1>
      </header>
    </div>
  );
}

export default App;
