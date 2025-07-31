import { ReactComponent as SearchIcon } from "../../../../assets/icons/search-icon.svg";
import "./SearchBar.scss";

function SearchBar() {
  return (
    <form className={`search-form`}>
      <button type="button" className="search-btn" aria-label="Search">
        <SearchIcon className="search-icon" />
      </button>
      {/* {isOpen && (
        <input type="text" placeholder="Search" className="search-input" />
      )} */}
    </form>
  );
}

export default SearchBar;
