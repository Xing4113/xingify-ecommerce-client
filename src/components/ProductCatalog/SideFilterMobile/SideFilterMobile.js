import "./SideFilterMobile.scss";
import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const SideFilterMobile = ({
  filterOptions,
  filterApplied,
  setFilterApplied,
  onClose,
}) => {
  const [minPrice, setMinPrice] = useState(
    filterApplied.price.min?.toString() || ""
  );
  const [maxPrice, setMaxPrice] = useState(
    filterApplied.price.max?.toString() || ""
  );

  const handleMinChange = () => {
    setFilterApplied((prev) => ({
      ...prev,
      price: { ...prev.price, min: minPrice },
    }));
  };

  const handleMaxChange = () => {
    setFilterApplied((prev) => ({
      ...prev,
      price: { ...prev.price, max: maxPrice },
    }));
  };

  return (
    <div className="side-filter-container mobile-only">
      <div className="close-icon-container">
        <FaArrowRightLong onClick={onClose} />
      </div>

      {/* BRAND */}
      <div className="filter-section">
        <h3 className="filter-title">Brand</h3>
        <ul className="brand-filter">
          {filterOptions.Brand.map((brand) => (
            <li key={brand}>
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={filterApplied.brand.includes(brand)}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...filterApplied.brand, brand]
                      : filterApplied.brand.filter((b) => b !== brand);
                    setFilterApplied({ ...filterApplied, brand: updated });
                  }}
                />
                <span className="checkmark" />
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* SIZE */}
      <div className="filter-section">
        <h3 className="filter-title">Size</h3>
        <ul className="size-filter">
          {filterOptions.Size.map((size) => (
            <li
              key={size}
              className={filterApplied.size.includes(size) ? "active" : ""}
              onClick={() => {
                const updated = filterApplied.size.includes(size)
                  ? filterApplied.size.filter((s) => s !== size)
                  : [...filterApplied.size, size];
                setFilterApplied({ ...filterApplied, size: updated });
              }}
            >
              {size}
            </li>
          ))}
        </ul>
      </div>

      {/* COLOR */}
      <div className="filter-section">
        <h3 className="filter-title">Color</h3>
        <ul className="color-filter">
          {filterOptions.Color.map((color) => (
            <li
              key={color.name}
              onClick={() => {
                const updated = filterApplied.color.includes(color.name)
                  ? filterApplied.color.filter((c) => c !== color.name)
                  : [...filterApplied.color, color.name];
                setFilterApplied({ ...filterApplied, color: updated });
              }}
            >
              <div
                className={`color-circle-container ${
                  filterApplied.color.includes(color.name) ? "active" : ""
                }`}
              >
                <div
                  className="color-circle"
                  style={{ backgroundColor: color.code }}
                />
              </div>
              <span>{color.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* PRICE */}
      <div className="filter-section price-filter">
        <h3 className="filter-title">Price</h3>
        <div className="price-inputs">
          <div className="input-wrapper">
            <span className="dollar-sign">$</span>
            <input
              type="text"
              value={minPrice}
              placeholder="Min"
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || !isNaN(Number(value))) {
                  setMinPrice(value);
                }
              }}
              onBlur={handleMinChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleMinChange();
                  return;
                }
              }}
            />
          </div>
          <span className="separator">–</span>
          <div className="input-wrapper">
            <span className="dollar-sign">$</span>
            <input
              type="text"
              value={maxPrice}
              placeholder="Max"
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || !isNaN(Number(value))) {
                  setMaxPrice(value);
                }
              }}
              onBlur={handleMaxChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleMaxChange();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideFilterMobile;
