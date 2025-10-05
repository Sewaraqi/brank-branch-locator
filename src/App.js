import './App.css';
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Closest from "./components/Closest";
import AboutUs from "./components/AboutUs";
import {ROUTES} from "./utils/routes"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.SEARCH_BY_CITY} element={<Home />} />
        <Route path={ROUTES.CLOSEST} element={<Closest />} />
        <Route path={ROUTES.ABOUT_US} element={<AboutUs />} />
      </Route>
    </Routes>
  );
}
