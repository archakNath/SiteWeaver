import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Store from "./pages/Store";
import HomeSection from "./sections/Home";
import Collections from "./sections/Collections";
import Themes from "./sections/Themes";
import Orders from "./sections/Orders";
import Products from "./sections/Products";
import Tags from "./sections/Tags";
import NewProduct from "./sections/NewProduct";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />}>
            <Route path="" element={<HomeSection />} />
            <Route path="themes" element={<Themes />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products/*" element={<Products />}> {/* Note the `*` */}
              <Route path="new" element={<NewProduct />} />
            </Route>
            <Route path="collections" element={<Collections />} />
            <Route path="tags" element={<Tags />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
