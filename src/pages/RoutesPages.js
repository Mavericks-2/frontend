import React, { Fragment, createContext } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import UploadPlanogramPage from './UploadPlanogramPage';

export const UserContext = createContext();

function RoutesPage() {
  return (
    <Fragment>
          <Routes>
              <Route path="/" element={<UploadPlanogramPage />}/>
          </Routes>
    </Fragment>
    
  )
}

export default RoutesPage;