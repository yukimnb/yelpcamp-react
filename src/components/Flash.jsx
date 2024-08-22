import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Flash = () => (
  <ToastContainer position="top-center" hideProgressBar={true} closeOnClick={true} theme="dark" />
);
