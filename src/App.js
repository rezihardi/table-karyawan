import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserList from "./components/UserList";
import EditNik from "./components/EditNik";
import CreateNik from "./components/InsertNik";
import ProductList from "./components/ProductList"
import AddProduct from "./components/AddProduct"
import EditProduct from "./components/EditProduct"
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<UserList/>}/>
              <Route path="/add" element={<CreateNik/>}/>
              <Route path="edit/:nik" element={<EditNik/>}/>
              <Route path="/product" element={<ProductList/>}/>
              <Route path="/add-product" element={<AddProduct/>}/>
              <Route path="/edit-product/:name" element={<EditProduct/>}/>
          </Routes>
      </BrowserRouter>
  );
}


export default App;
