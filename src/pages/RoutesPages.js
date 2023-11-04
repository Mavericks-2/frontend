// RoutesPage.js

import React, { Fragment, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import UploadPlanogramPage from "./UploadPlanogramPage";
import PlanogramModifierPage from "./PlanogramModifierPage";
import Navbar from "../components/Navbar";
import UserSignInPage from "./UserSignInPage";
import { ContextProvider } from "../providers/ContextProvider";
import DashboardPage from "./DashboardPage";

export const Context = createContext();

function RoutesPage() {
  return (
    <Fragment>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<UploadPlanogramPage />} />
          <Route path="/planogram" element={<PlanogramModifierPage />} />
          <Route path="/login" element={<UserSignInPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </ContextProvider>
    </Fragment>
  );
}

export default RoutesPage;
