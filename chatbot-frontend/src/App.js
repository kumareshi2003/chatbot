import React from 'react';
import { ThemeProvider, createTheme,MUIThemeProvider } from '@mui/material/styles';
import Chatbot from './components/Chatbot';
import { CssBaseline } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', 
    },
    secondary: {
      main: '#00cc66', 
    },
    background: {
      default: '#FEFEFA', 
    },
    text: {
      primary: '#333333', 
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Chatbot />
  </ThemeProvider>
  );
}

export default App;
