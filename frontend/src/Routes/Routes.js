import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicRoute from "./PublicRoute.jsx"
import PrivateRoute from "./PrivetRoute.jsx"
import Dashboard from '../Pages/Dashboard.jsx';
import ReactDOMServer from "react-dom/server";

import Error from '../Pages/Error.jsx';

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route element={<PublicRoute />}>
        {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/auth" element={<EmailAndPass />} /> */}
        </Route>

   

        <Route element={<PrivateRoute />}>
          {/* <Route path="/aboutyou" element={<AboutYou />} /> */}

          {/* <Route path="/" element={<Dashboard />} />
          <Route path="/Routine" element={<Routine />} />
          <Route path="/Links" element={<Link />} />
          <Route path="/Notices" element={<Notice />} />
          <Route path="/Peoples" element={<People />} /> */}
          {/* <Route path="/CR-Options" element={<CROption />}>
            <Route path="routineManagement" element={<RoutineManagement />} />
            <Route path="scheduleChanges" element={<ScheduleChanges />} />
            <Route path="verification" element={<h1>Verification</h1>} />
            <Route
              path="blockAndUnblock"
              element={<BlockAndUnblock/> }
            />
            <Route path="addAndRemoveCr" element={<AddAndRemoveCr />} />
            <Route path="addAndRemoveLink" element={<AddAndRemoveLink />} />
            <Route path="addAndRemoveNotice" element={<AddAndRemoveNotice />} />
          </Route> */}
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
