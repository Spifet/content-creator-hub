import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Layout/Footer";
import HubUser from "./Components/Hub/HubUser";
import Profile from "./Components/Profile/Profile";

function App() {
  return (
    <div className="App">
      <>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="home" element={<Homepage />} />
          <Route path="hub" element={<HubUser />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
        <Footer />
      </>
    </div>
  );
}

export default App;
