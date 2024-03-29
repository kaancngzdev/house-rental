import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./index.js";
import "./styles.css";

// views
import Home from "./views/Home.js";
import Houses from "./views/Houses.js";
import AboutUs from "./views/AboutUs.js";
import SignUp from "./views/SignUp.js";
import SignIn from "./views/SignIn.js";
import LearnMore from "./views/LearnMore.js";
import AdminPanel from "./views/AdminPanel.js";
import Profile from "./views/Profile.js";
import AdminPanelButtons from "./views/AdminPanelButtons.js";
import DeleteHouse from "./views/DeleteHouse.js";
import DeleteBooking from "./views/DeleteBooking.js";
// layouts
import MainLayout from "./layouts/MainLayout.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="houses" element={<Houses />} />
      <Route path="aboutus" element={<AboutUs />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="learnmore" element={<LearnMore />} />
      <Route path="adminpanel" element={<AdminPanel />} />
      <Route path="deletehouse" element={<DeleteHouse />} />
      <Route path="profile" element={<Profile />} />
      <Route path="learnmore/:id" element={<LearnMore />} />
      <Route path="deletebooking" element={<DeleteBooking />} />
      <Route path="adminpanelbuttons" element={<AdminPanelButtons />} />
      {/* Use element prop */}
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
