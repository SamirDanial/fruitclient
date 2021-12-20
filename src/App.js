import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Landing, Navbar } from "./components";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
