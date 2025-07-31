import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "./CategoryCard.scss";

const cards = [
  {
    className: "men",
    title: "Men",
    description:
      "Explore the latest in men's footwear, from casual to classic.",
    link: "/shop/men",
  },
  {
    className: "women",
    title: "Women",
    description: "Step into style with our newest women's shoe collections.",
    link: "/shop/women",
  },
  {
    className: "kids",
    title: "Kids",
    description: "Fun, comfort, and support for every growing step.",
    link: "/shop/kids",
  },
];

const CategoryCard = () => {
  const CategoryCardItem = ({ className, title, description, link }) => (
    <div className={`category-card ${className}`}>
      <div className="card-content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <a href={link} className="shop-button">
        Explore Now
      </a>
    </div>
  );

  return (
    <section className="category-scroll-section">
      <Swiper
        className="category-scroll-wrapper"
        spaceBetween={16}
        modules={[FreeMode]}
        freeMode={true}
        breakpoints={{
          0: {
            slidesPerView: 1.15,
          },
          576: {
            slidesPerView: "auto",
          },
        }}
        containerModifierClass="category-"
      >
        {cards.map((card) => (
          <SwiperSlide
            key={card.className}
            style={{ width: "80vw", maxWidth: "450px" }}
          >
            <CategoryCardItem {...card} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CategoryCard;
