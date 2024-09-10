import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Adminlogin from "./Adminlogin";

const AdminLoginWrapper = ({
  setadminShowModal,
  showadminModal,
  showAlert,
  setProgress,
}) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("modal") === "true") {
      setadminShowModal(true);
    }
  }, [location, searchParams, setadminShowModal]);

  return (
    <Adminlogin
      showadminModal={showadminModal}
      setadminShowModal={setadminShowModal}
      showAlert={showAlert}
      setProgress={setProgress}
    />
  );
};

export default AdminLoginWrapper;
