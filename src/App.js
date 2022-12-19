import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserList from "./components/UserList";
import EditNik from "./components/EditNik";
import CreateNik from "./components/InsertNik";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<UserList/>}/>
              <Route path="/add" element={<CreateNik/>}/>
              <Route path="edit/:nik" element={<EditNik/>}/>
          </Routes>
      </BrowserRouter>
  );
}


export default App;
