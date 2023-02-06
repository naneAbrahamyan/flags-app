import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import "./assets/globalStyles.css";
import ThemeProvider from "./context/ThemeProvider";
import MainPage from "./pages/MainPage";
import CountryPage from "./pages/CountryPage";
import DataProvider from "./context/DataProvider";


function App() {
  return (
    <div>
      <DataProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/countries" element={<MainPage />} />
              <Route path="/countries/:country" element={<CountryPage />} />
              <Route path="*" element={<Navigate to="/countries" replace />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </DataProvider>
    </div>
  );
}

export default App;
