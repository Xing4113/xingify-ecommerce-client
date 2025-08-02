// src/pages/ProductCatalog.jsx
import "../styles/pages/ProductCatalog.scss";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchFilteredProducts, getProductById } from "../api/productsAPI";
import SideFilterDesktop from "../components/ProductCatalog/SideFilterDesktop/SideFilterDesktop";
import SideFilterMobile from "../components/ProductCatalog/SideFilterMobile/SideFilterMobile";
import ProductCard from "../components/ProductCatalog/ProductCard/ProductCard";
import GenderSwitch from "../components/ProductCatalog/GenderSwitch/GenderSwitch";
import FilterSortDropdown from "../components/ProductCatalog/FilterSortDropdown/FilterSortDropdown";
import useIsMobileView from "../hook/useIsMobileView";
import ProductModal from "../components/ProductCatalog/ProductModal/ProductModal";
import { useModal } from "../context/ModalContext";

function ProductCatalog() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { showModal, hideModal } = useModal();
  const isMobileView = useIsMobileView();
  const [products, setProducts] = useState([]);
  const filterOptions = {
    Style: ["lifestyle", "sport", "fromal", "sandals", "slip-Ons", "boots"],
    Brand: ["nike", "adidas", "ECCO", "albirds", "skechers"],
    Size: [
      6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5,
      14,
    ],
    Color: [
      { name: "black", code: "#2C2C2C" },
      { name: "white", code: "#f7f5f5" },
      { name: "grey", code: "#B3B3B3" },
      { name: "blue", code: "#51677A" },
      { name: "red", code: "#B94B4B" },
      { name: "green", code: "#6B745E" },
      { name: "brown", code: "#A5825F" },
      { name: "orange", code: "#F6B357" },
      { name: "beige", code: "#C9BBA7" },
    ],
    Price: [],
  };
  const [filterApplied, setFilterApplied] = useState({
    style: "",
    brand: [],
    size: [],
    color: [],
    price: {
      min: 0,
      max: "",
    },
    sort: { by: "price", order: "" },
  });
  const [isDesktopFilterVisible, setIsDesktopFilterVisible] = useState(true);
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Reset filters when category changes
  useEffect(() => {
    setFilterApplied({
      style: "",
      brand: [],
      size: [],
      color: [],
      price: {
        min: 0,
        max: "",
      },
      sort: { by: "price", order: "" },
    });

    setSearchParams({}); // Also clear the URL filters
  }, [category]);

  useEffect(() => {
    const params = {};

    if (filterApplied.style !== "") {
      params.style = filterApplied.style;
    }

    if (filterApplied.brand.length > 0) {
      params.brand = filterApplied.brand.join(",");
    }

    if (filterApplied.size.length > 0) {
      params.size = filterApplied.size.join(",");
    }

    if (filterApplied.color.length > 0) {
      params.color = filterApplied.color.join(",");
    }

    if (
      filterApplied.price.min !== 0 &&
      filterApplied.price.min !== "" &&
      !isNaN(filterApplied.price.min)
    ) {
      params.minPrice = filterApplied.price.min;
    }

    if (filterApplied.price.max !== "" && !isNaN(filterApplied.price.max)) {
      params.maxPrice = filterApplied.price.max;
    }

    if (filterApplied.sort.by && filterApplied.sort.order) {
      params.sortBy = filterApplied.sort.by;
      params.sortOrder = filterApplied.sort.order;
    }

    setSearchParams(params);
  }, [filterApplied]);

  useEffect(() => {
    const urlStyle = searchParams.get("style") || "";
    const urlBrand = searchParams.get("brand")?.split(",") || [];
    const urlSize = searchParams.get("size")?.split(",").map(Number) || [];
    const urlColor = searchParams.get("color")?.split(",") || [];

    const minPriceStr = searchParams.get("minPrice");
    const maxPriceStr = searchParams.get("maxPrice");

    const price = {};
    if (minPriceStr !== null && minPriceStr !== "" && !isNaN(minPriceStr)) {
      price.min = parseFloat(minPriceStr);
    }
    if (maxPriceStr !== null && maxPriceStr !== "" && !isNaN(maxPriceStr)) {
      price.max = parseFloat(maxPriceStr);
    }

    const sortBy = searchParams.get("sortBy") || "price";
    const sortOrder = searchParams.get("sortOrder") || "";

    setFilterApplied({
      style: urlStyle,
      brand: urlBrand,
      size: urlSize,
      color: urlColor,
      price: price, // only contains `min` or `max` if provided
      sort: { by: sortBy, order: sortOrder },
    });
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      showModal("loading");
      try {
        const params = {
          category, // pass category explicitly
        };

        if (searchParams.get("style")) {
          params.style = searchParams.get("style");
        }
        if (searchParams.get("brand")) {
          params.brand = searchParams.get("brand");
        }
        if (searchParams.get("size")) {
          params.size = searchParams.get("size");
        }
        if (searchParams.get("color")) {
          params.color = searchParams.get("color");
        }
        if (searchParams.get("minPrice")) {
          params.minPrice = searchParams.get("minPrice");
        }
        if (searchParams.get("maxPrice")) {
          params.maxPrice = searchParams.get("maxPrice");
        }

        if (searchParams.get("sortBy")) {
          params.sortBy = searchParams.get("sortBy");
        }
        if (searchParams.get("sortOrder")) {
          params.sortOrder = searchParams.get("sortOrder");
        }

        const res = await fetchFilteredProducts(params);

        setProducts(res.data);
      } catch (err) {
        console.log("API Error: ", err);
      } finally {
        hideModal();
      }
    };

    fetchProducts();
  }, [searchParams, category]);

  useEffect(() => {
    if (!isMobileView) {
      setIsMobileFilterVisible(false);
    }
  }, [isMobileView]);

  useEffect(() => {
    if (isMobileFilterVisible || selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileFilterVisible, selectedProduct]);

  const onToggleDesktopFilter = () => {
    setIsDesktopFilterVisible((prev) => !prev);
  };

  const onToggleMobileFilter = () => {
    setIsMobileFilterVisible((prev) => !prev);
  };

  const handleProductClick = async (productId) => {
    try {
      showModal("loading");
      const res = await getProductById(productId);
      setSelectedProduct(res.data);
      hideModal();
    } catch (err) {
      showModal("error", "Please try again later.");
      console.error("Failed to fetch product detail:", err);
    }
  };

  return (
    <>
      <div className="product-category-title">
        {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
        's Shoes
      </div>

      <ul className="mobile-style-list">
        {filterOptions.Style.map((style) => (
          <li key={style}>
            <a
              href="#"
              className={
                filterApplied.style === style ? "style-filter-active" : ""
              }
              onClick={(e) => {
                e.preventDefault();
                setFilterApplied((prev) => ({
                  ...prev,
                  style: prev.style === style ? "" : style,
                }));
              }}
            >
              {style}
            </a>
          </li>
        ))}
      </ul>

      <div className="product-catalog-header">
        <FilterSortDropdown
          sort={filterApplied.sort}
          setSort={(sort) => {
            setFilterApplied((prev) => ({
              ...prev,
              sort,
            }));
          }}
          onToggleFilter={() => {
            if (isMobileView) {
              onToggleMobileFilter();
            } else {
              onToggleDesktopFilter();
            }
          }}
        />

        <GenderSwitch />
      </div>

      <div className="product-catalog-container">
        {/* Mobile overlay */}
        {isMobileView && isMobileFilterVisible && (
          <div
            className="mobile-filter-overlay"
            onClick={onToggleMobileFilter}
          />
        )}

        {isMobileView ? (
          <div
            className={`side-filter-mobile-container ${
              isMobileFilterVisible
                ? "side-filter-mobile-visible"
                : "side-filter-mobile-hidden"
            }`}
          >
            <SideFilterMobile
              onClose={onToggleMobileFilter}
              filterOptions={filterOptions}
              filterApplied={filterApplied}
              setFilterApplied={setFilterApplied}
            />
          </div>
        ) : (
          <div
            className={`side-filter-desktop-container ${
              isDesktopFilterVisible
                ? "side-filter-desktop-visible"
                : "side-filter-desktop-hidden"
            }`}
          >
            <SideFilterDesktop
              filterOptions={filterOptions}
              filterApplied={filterApplied}
              setFilterApplied={setFilterApplied}
            />
          </div>
        )}

        <div
          className={`product-catalog ${
            isDesktopFilterVisible ? "with-filter" : "full-width"
          }`}
        >
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                category={category}
                key={product.productId}
                product={product}
                onClick={() => handleProductClick(product.productId)}
              />
            ))}
          </div>
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}

export default ProductCatalog;
