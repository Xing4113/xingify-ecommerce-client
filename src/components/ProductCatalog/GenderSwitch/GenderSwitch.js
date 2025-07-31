import { Link, useLocation } from "react-router-dom";
import "./GenderSwitch.scss";

const GenderSwitch = () => {
  const location = useLocation();
  const current = location.pathname.toLowerCase();

  const options = ["Men", "Women", "Kids"];

  return (
    <div className="gender-pill-container">
      <div className="gender-pill-toggle">
        {options.map((option) => (
          <Link
            key={option}
            to={`/shop/${option}`}
            className={`pill ${
              current.includes(`/shop/${option.toLowerCase()}`) ? "active" : ""
            }`}
          >
            {option}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GenderSwitch;
