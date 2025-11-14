import { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";


export const Carousel = (props: any) => {
  const { items = [] } = props;

  const swiperRef = useRef(null);

  return (
    <div className="relative !pb-5">

      <Swiper
        ref={swiperRef} // Attach the ref to the Swiper component
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        autoplay={true}
        modules={[Pagination, Navigation]}
        className="mySwiper !pb-10"
      >
        {items.map((item: any, index: any) => {
          return <SwiperSlide  key={"Carousel_" + index}>{item}</SwiperSlide>;
        })}
      </Swiper>
    </div>
  );
};
