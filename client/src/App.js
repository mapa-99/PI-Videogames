import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Details from "./components/Details";
import VideoForm from "./components/VideoForm";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path={"/home/:id"} element={<Details />} />
          <Route path={"/videogame"} element={<VideoForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
