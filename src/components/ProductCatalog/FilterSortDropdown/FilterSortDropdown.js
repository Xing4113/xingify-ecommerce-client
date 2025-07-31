import "./FilterSortDropdown.scss";
import { VscSettings } from "react-icons/vsc";
import { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiChevronUp, FiCheck } from "react-icons/fi";

const FilterSortDropdown = ({ sort, setSort, onToggleFilter }) => {
  const [filterStatus, setFilterStatus] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [sortOption, setSortOption] = useState("");

  const dropdownRef = useRef();

  const handleSort = (option) => {
    setSortOption(option);
    if (option === "lowToHigh") {
      setSort({ by: "price", order: "asc" });
    } else if (option === "highToLow") {
      setSort({ by: "price", order: "desc" });
    }
    setShowOptions(false);
  };

  const handleToggleFilter = () => {
    setFilterStatus((prev) => !prev);
    onToggleFilter();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (sort?.by === "price" && sort?.order === "asc") {
      setSortOption("lowToHigh");
    } else if (sort?.by === "price" && sort?.order === "desc") {
      setSortOption("highToLow");
    } else {
      setSortOption("");
    }
  }, [sort]);

  return (
    <div className="filter-sort-dropdown">
      <button onClick={handleToggleFilter} className="toggle-btn">
        <span className="text-full">
          {filterStatus ? "Hide" : "Show"} Filters
        </span>
        <span className="text-short">Filters</span>
        <VscSettings />
      </button>

      <div className="dropdown-wrapper" ref={dropdownRef}>
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="sort-btn"
        >
          Sort By
          {showOptions ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {showOptions && (
          <ul className="sort-options">
            <li onClick={() => handleSort("lowToHigh")}>
              Price: Low - High{" "}
              {sortOption === "lowToHigh" && <FiCheck className="check-icon" />}
            </li>
            <li onClick={() => handleSort("highToLow")}>
              Price: High - Low{" "}
              {sortOption === "highToLow" && <FiCheck className="check-icon" />}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default FilterSortDropdown;
