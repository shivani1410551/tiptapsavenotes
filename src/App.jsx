// import NoteApp from "./Components/NoteMaking-app"
import MainNav from "./Components/MainNav"
import SideView from "./Components/SideView";
import Home from "./Components/Home";
import ShowSavedNotes from "./Components/ShowSavedNotes";
import MainEditor from "./Components/Maineditor";
import { Route,Routes } from "react-router-dom";
import "./styles/App.css"
const App = () => {
  return (
<div>
      <MainNav/>
      <div className="below_nav">
        <SideView />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ShowSaved" element={<ShowSavedNotes />} />
          <Route path="/editor" element={<MainEditor />} />{" "}
        </Routes>
      </div>
    </div>
  )
}

export default App
