import { ThemeProvider } from "./contexts/ThemeProvider";
import { MainPage } from './pages/Main';
import './App.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

function App() {

  return (
    <ThemeProvider>
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
