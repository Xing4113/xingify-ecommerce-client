import "./ProductCard.scss";

const ProductCard = ({ category, product, onClick }) => {
  return (
    <div className="product-card" onClick={onClick}>
      <img src={product.imageUrl} alt={product.name} className="product-img" />

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-brand">{product.brand}</p>
        <p className="product-style">
          {category.toLowerCase() === "new-arrival"
            ? `${product.category}'s Shoe`
            : `${product.style}'s Shoe`}
        </p>

        <p className="product-color">{product.color.length} Colors</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
