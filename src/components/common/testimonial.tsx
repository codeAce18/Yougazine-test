'use client';
import TestimonialCard from '@components/cards/testimonial-card';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';
import { ROUTES } from '@utils/routes';

const data = [
  {
    id: 1,
    slug: 'feel-the-thirsty-in-summer-anytime',
    image: '/assets/images/support/1.jpg',
    description: 'testimonial-description-one',
    author_name: 'testimonial-author-name-one',
    author_position: 'testimonial-author-position-one'
  },
  {
    id: 2,
    slug: 'most-popular-item-for-Fast-food',
    image: '/assets/images/support/2.jpg',
    description: 'testimonial-description-two',
    author_name: 'testimonial-author-name-two',
    author_position: 'testimonial-author-position-two'
  }
];

interface Props {
  className?: string;
  lang?: string;
}


const Testimonial: React.FC<Props> = ({
  className = 'relative mb-8',
    lang
}) => {
  return (
    <div className={className}>
      <Carousel
          lang={lang}
          slidesPerView={1}
          autoplay={false}
          className="carouselTestimonial  border border-[#ebebeb] rounded"
          navigation = {false}
          pagination = {{
            clickable: true,
          }}
          prevActivateId="collection-carousel-button-prev"
          nextActivateId="collection-carousel-button-next"
      >
        {data.map((item) => (
            <SwiperSlide
                key={`collection-key-${item.id}`}
            >
              <TestimonialCard
                  lang={lang}
                  key={item.id}
                  collection={item}
              />
            </SwiperSlide>
        ))}
      </Carousel>

    </div>
  );
};

export default Testimonial;
