import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./signin";
import SignUp from "./signup";
import PostingApartment from "./postingApartment";
import EditPostingApartment from "./editPostingApartment";
import FlatsInfo from "./flatsinfo";
import OwnerDash from "./ownerdash";
import { Toaster } from "react-hot-toast";
import UsersList from "./users";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/posting_apartment" element={<PostingApartment />} />
          <Route path="/edit_post" element={<EditPostingApartment />} />
          <Route path="/flats_info" element={<FlatsInfo />} />
          <Route path="/owner_dash" element={<OwnerDash />} />
          <Route path="/users" element={<UsersList />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
