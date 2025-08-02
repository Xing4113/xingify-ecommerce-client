import "./ProductModal.scss";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FiArrowLeftCircle } from "react-icons/fi";
import { FiArrowRightCircle } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { addToCart } from "../../../api/cartAPI";
import { useCart } from "../../../context/CartContext";
import { useModal } from "../../../context/ModalContext";

const ProductModal = ({ product, onClose }) => {
  const { showModal } = useModal();
  const { updateCartCount } = useCart();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [filteredImages, setFilteredImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClose = () => {
    setSelectedColor("");
    setSelectedSize("");
    setFilteredImages([]);
    setActiveIndex(0);
    onClose(); // This closes the modal externally
  };

  const handleAddToCart = async () => {
    showModal("loading");
    try {
      const selectedVarianty = {
        productId: product.productId,
        color: selectedColor,
        size: selectedSize,
      };
      const res = await addToCart(selectedVarianty);

      showModal("success", res.data.message); // "Item added to cart"
      updateCartCount();
    } catch (err) {
      if (err.response?.status === 409) {
        showModal(
          "success",
          "Item already in your cart with this color & size."
        );
      } else if (err.response?.status === 401) {
        window.location.href = "/login";
      } else {
        showModal("error", "Failed to add to cart. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (product) {
      setSelectedColor(product.color?.[0] || "");
    }
  }, [product]);

  useEffect(() => {
    if (product && selectedColor) {
      const matched = product.images
        ?.filter(
          (img) => img.color.toLowerCase() === selectedColor.toLowerCase()
        )
        .sort((a, b) => a.sequence - b.sequence);

      setFilteredImages(matched || []);
      setActiveIndex(0); // default to first image
    }
  }, [product, selectedColor]);

  if (!product) return null;

  return (
    <div className="product-modal-overlay" onClick={handleClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={handleClose}>
          <IoMdClose />
        </button>

        <div className="product-modal-content">
          <div className="product-images">
            <div className="main-image">
              <img
                src={filteredImages[activeIndex]?.imageUrl}
                alt={`Main view of ${selectedColor}`}
              />

              {/* Overlayed navigation buttons */}
              <div className="main-image-button-group">
                <button
                  className="main-image-nav prev"
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev === 0 ? filteredImages.length - 1 : prev - 1
                    )
                  }
                >
                  <FiArrowLeftCircle />
                </button>

                <button
                  className="main-image-nav next"
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev === filteredImages.length - 1 ? 0 : prev + 1
                    )
                  }
                >
                  <FiArrowRightCircle />
                </button>
              </div>
            </div>

            <div className="thumbnail-swiper-wrapper">
              <Swiper
                slidesPerView="auto"
                spaceBetween={10}
                freeMode={true}
                modules={[FreeMode]}
                className="thumbnail-swiper"
                containerModifierClass="thumbnail-" // changes prefix for internal modifiers
              >
                {filteredImages
                  .sort((a, b) => a.sequence - b.sequence)
                  .map((img, index) => (
                    <SwiperSlide key={img.id} className="thumbnail-slide">
                      <img
                        src={img.imageUrl}
                        className={`thumbnail ${
                          activeIndex === index ? "active" : ""
                        }`}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => setActiveIndex(index)}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>

          <div className="product-details">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div className="price">${product.price.toFixed(2)}</div>

            <div className="color-options-container">
              {product.color?.map((c) => {
                const thumbnail = product.images?.find(
                  (img) =>
                    img.color.toLowerCase() === c.toLowerCase() &&
                    img.isThumbnail === 1
                );

                return (
                  <button
                    key={c}
                    className={`color-option-button ${
                      selectedColor === c ? "active" : ""
                    }`}
                    onClick={() => {
                      setSelectedColor(c);
                      setSelectedSize("");

                      // Set activeIndex based on thumbnail position in filteredImages
                      const indexInFiltered = filteredImages.findIndex(
                        (img) =>
                          img.color.toLowerCase() === c.toLowerCase() &&
                          img.isThumbnail === 1
                      );
                      setActiveIndex(
                        indexInFiltered !== -1 ? indexInFiltered : 0
                      );
                    }}
                  >
                    {thumbnail ? (
                      <img
                        src={thumbnail.imageUrl}
                        alt={c}
                        className="color-thumbnail"
                      />
                    ) : (
                      c
                    )}
                  </button>
                );
              })}
            </div>

            <div className="size-options-container">
              <label>Select Size:</label>
              <div className="size-options-button-container">
                {product.size?.map((size) => {
                  const stock =
                    product.variants.find(
                      (v) =>
                        v.color.toLowerCase() === selectedColor.toLowerCase() &&
                        String(v.size) === String(size)
                    )?.stock || 0;

                  return (
                    <button
                      key={size}
                      className={`size-btn ${
                        selectedSize === size ? "active" : ""
                      }`}
                      onClick={() => {
                        if (stock > 0) setSelectedSize(size);
                      }}
                      disabled={stock === 0}
                    >
                      US{size}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              className="add-to-cart"
              disabled={!selectedSize || !selectedColor}
              onClick={handleAddToCart}
            >
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
