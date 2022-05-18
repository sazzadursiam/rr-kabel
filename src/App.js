import Dashbord from "./Pages/Dashbord/Dashbord";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./Pages/Rightbar/Products/ViewProduct/Products";
import AddProduct from "./Pages/Rightbar/Products/AddProduct/AddProduct";

import "./App.css";
import AddImage from "./Pages/Rightbar/Gallery/Image/AddImage";
import AllImage from "./Pages/Rightbar/Gallery/Image/AllImage";
import AddVideo from "./Pages/Rightbar/Gallery/Video/AddVideo";
import AllVideo from "./Pages/Rightbar/Gallery/Video/AllVideo";
import EditImage from "./Pages/Rightbar/Gallery/Image/EditImage";
import EditVideo from "./Pages/Rightbar/Gallery/Video/EditVideo";
// import "./globalVariables";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="admin" element={<Dashbord />}>
            <Route path="viewproduct" element={<Products />} />
            <Route path="addproduct" element={<AddProduct />} />

            <Route path="allImage" element={<AllImage />} />
            <Route path="addImage" element={<AddImage />} />
            <Route path="edit-image/:id" element={<EditImage />} />

            <Route path="all-video" element={<AllVideo />} />
            <Route path="add-video" element={<AddVideo />} />
            <Route path="edit-video/:id" element={<EditVideo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
