/**
 * @fileOverview Componente que despliega la interfaz de carga de planograma.
 *
 * @component UploadPlanogramPage
 * 
 * @requires ../components/FileUpload
 * @requires ../components/Navbar
 *
 * @example
 *  <UploadPlanogramPage />
 * 
 */

import FileUpload from "../components/FileUpload";
import Navbar from "../components/Navbar";

function UploadPlanogramPage() {
  return (
    <>
      <Navbar />
      <FileUpload />

    </>
  );
}

export default UploadPlanogramPage;
