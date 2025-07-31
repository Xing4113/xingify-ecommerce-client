import "./SideFilterDesktop.scss";
import { useState } from "react";
import { Collapse } from "react-collapse";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const SideFilter = ({ filterOptions, filterApplied, setFilterApplied }) => {
  const [activeSections, setActiveSections] = useState({
    Brand: false,
    Size: false,
    Color: false,
    Price: false,
  });

  const toggleSection = (key) => {
    setActiveSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
    <div className="side-filter-container">
      {Object.entries(filterOptions).map(([key, values]) => (
        <div key={key} className="filter-section">
          {/* Style filter section */}
          {key === "Style" && (
            <div className="style-filter-container">
              <h3 className="filter-title">{key}</h3>
              <ul className={key.toLowerCase() + "-filter"}>
                {values.map((style) => (
                  <li key={style}>
                    <a
                      href="#"
                      className={
                        filterApplied.style === style
                          ? "style-filter-active"
                          : ""
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setFilterApplied((prev) => ({
                          ...prev,
                          style: prev.style === style ? "" : style, // toggle
                        }));
                      }}
                    >
                      {style}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="filter-section-border"></div>
            </div>
          )}

          {key !== "Style" && (
            <>
              {/* Filter title */}
              <div
                className="filter-title-container"
                onClick={() => toggleSection(key)}
              >
                <h3 className="filter-title">{key}</h3>
                <span className="filter-toggle-icons">
                  {activeSections[key] ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              </div>

              <Collapse
                isOpened={activeSections[key]}
                theme={{
                  collapse: "ReactCollapse--collapse",
                  content: "ReactCollapse--content",
                }}
              >
                {/* Brand filter section */}
                {key === "Brand" && (
                  <ul className={key.toLowerCase() + "-filter"}>
                    {values.map((brand) => (
                      <li key={brand}>
                        <label className="custom-checkbox">
                          <input
                            type="checkbox"
                            checked={filterApplied.brand.includes(brand)}
                            onChange={(e) => {
                              const updated = e.target.checked
                                ? [...filterApplied.brand, brand]
                                : filterApplied.brand.filter(
                                    (b) => b !== brand
                                  );
                              setFilterApplied({
                                ...filterApplied,
                                brand: updated,
                              });
                            }}
                          />
                          <span className="checkmark"></span>
                          {brand}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Size filter section */}
                {key === "Size" && (
                  <ul className={key.toLowerCase() + "-filter"}>
                    {values.map((size) => (
                      <li
                        key={size}
                        className={
                          filterApplied.size.includes(size) ? "active" : ""
                        }
                        onClick={(e) => {
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
                )}

                {/* Color filter section */}
                {key === "Color" && (
                  <ul className={key.toLowerCase() + "-filter"}>
                    {values.map((color) => (
                      <li
                        key={color.name}
                        onClick={() => {
                          const updated = filterApplied.color.includes(
                            color.name
                          )
                            ? filterApplied.color.filter(
                                (c) => c !== color.name
                              )
                            : [...filterApplied.color, color.name];

                          setFilterApplied({
                            ...filterApplied,
                            color: updated,
                          });
                        }}
                      >
                        <div
                          className={`color-circle-container ${
                            filterApplied.color.includes(color.name)
                              ? "active"
                              : ""
                          }`}
                        >
                          <div
                            className="color-circle"
                            style={{ backgroundColor: color.code }}
                          ></div>
                        </div>
                        <span>{color.name}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Price filter section */}
                {key === "Price" && (
                  <div className="price-filter">
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

                      <div className="minus-sign"></div>

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
                )}
              </Collapse>

              {key !== "Price" && <div className="filter-section-border"></div>}
            </>
          )}
        </div>
      ))}

      {/* Price Section */}
    </div>
  );
};

export default SideFilter;
