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
import TenantDashboard from "./Tenantdash";
import PostBuilding from "./Postbuilding";
import PostFlat from "./postflat";
import RequestFlat from "./reqflat";
import ServiceRequest from "./req_ser";
import Payments from "./payment";
import OwnerNotifications from "./owner_notf";
import TenantNotifications from "./Tenant_notf";
import SendNotification from "./send_notf";
import ServiceRequestList from "./serreqlist";
import ServiceRequestForm from "./serreqform";


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
          <Route path="/tenant_dash" element={<TenantDashboard />} />
          <Route path="/post_building" element={<PostBuilding />} />
          <Route path="/post_flat" element={<PostFlat />} />
          <Route path="/req_flat" element={<RequestFlat />} />
          <Route path="/req_ser" element={<ServiceRequest />} />
          <Route path="/payment" element={<Payments />} />
          <Route path="/owner_notf" element={<OwnerNotifications />} />
          <Route path="/tenant_notf" element={<TenantNotifications />} />
          <Route path="/send_notf" element={<SendNotification />} />
          <Route path="/ser_req_list" element={<ServiceRequestList />} />
          <Route path="/ser_req_form" element={<ServiceRequestForm />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
