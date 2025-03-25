import { FaSpinner } from "react-icons/fa";
import "../index.css";

const Spinner = () => {
  return (
    <div className="spinnerContainer">
      <FaSpinner className="spin" />
    </div>
  );
};

export default Spinner;
