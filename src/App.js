import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserList from "./components/UserList";
import EditNik from "./components/EditNik";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<UserList/>}/>
              <Route path="edit/:nik" element={<EditNik/>}/>
          </Routes>
      </BrowserRouter>
  );
}


export default App;
