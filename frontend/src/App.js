import { createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import AppNavigationBar from "./components/AppNavigationBar";
import Home from "./pages/Home";
import Review from "./pages/Review";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#071B31",

      },
      secondary: {
        main: "#007FFF",
      }
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppNavigationBar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/review/:courseID" element={<Review />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
