'use client';

import HeroBannerCard from '@components/hero/hero-banner-card';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';
import Link from 'next/link';
import BannerVideo from './banner-video';
import TestimonialCard from './testimonial-card';
import Container from '@components/ui/container';
import Image from 'next/image';
import { BsPlayCircleFill } from 'react-icons/bs';
import { useModalAction } from '@components/common/modal/modal.context';

interface Props {
  lang: string;
  heroBanner?: any;
  className?: string;
  contentClassName?: string;
  showHeroContent?: boolean;
}

const HeroSliderBlock: React.FC<Props> = ({
  lang,
  heroBanner,
  className = 'mb-7',
  contentClassName = 'px-5 py-10 xl:py-24',
  showHeroContent = true,
}) => {
  const {openModal} = useModalAction();
  return (
    <section className='bg-skin-lightfill bg-opacity-50 min-h-[80vh] flex flex-col justify-center'>
      <Container>
        <div className="block lg:flex lg:flex-wrap sm:flex-wrap sm:flex-column-reverse md:flex-row items-center justify-center gap-28 m-auto">
          <div className="xl:w-5/12 lg:w-1/2 sm:w-full">
            <div className="flex flex-col px-6 p-3">
              <h1 className="text-left w-full text-skin-inverted text-[80px] aquawax-medium mb-10">Personalized magazines for every <span className='head-design cormorant-thin text-skin relative'><b className='text-[120px]'>o</b>ccasion</span></h1>
              <p className="text-left w-full pr-10">Celebrate, Commemorate, and Chronicle Your Unique Journey-  Let Yougazine be your storytelling buddy, making your tales eternal and echo through the ages.</p>
              <div className="flex">
              <Link className="bg-skin text-white p-3 mr-4 px-5 rounded-full mt-11 text-left flex flex-col justify-center" href={`/${lang}/get-started/introduction`}><span>Create your Yougazine</span> </Link>
              <button className="bg-white text-brand-secondary p-3 border-4 border-gray-300 rounded-full mt-11 text-left flex flex-col justify-center" onClick={() => {openModal('BANNER_VIDEO')}}><span className='flex align-middle'><BsPlayCircleFill className='text-[30px] mr-2 text-fill-secondary' /><span className='mt-0.5 font-bold'>See how it works</span></span> </button>
              </div>
            </div>
          </div>
          <div className="xl:w-5/12 lg:w-full sm:w-full  p-3 flex justify-end relative p-10">
            <Image src={'/assets/images/home/Banner.png'} alt="Yougazine" width={500} height={500}  />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSliderBlock;
