import Container from '@components/ui/container';
import { Metadata } from 'next';
import FeatureCarousel from '@components/common/featured-carousel';
import BannerGrid from "@components/common/banner-grid";
import HeroSliderBlock from '@components/hero/hero-slider-block';
import BannerAllCarousel from '@components/common/banner-all-carousel';
import BestSellerProductFeed from '@components/product/feeds/best-seller-product-feed';

import {
    bannerBrand,
    homeOnesGridHero as bannerGrid,
    homeHeroSlider as heroSlider,
} from '@framework/static/banner';
import CategoryGridBlock from "@components/common/category-grid-block";
import ListingTabsElectronicFeed from "@components/product/feeds/listingtabs-electronic-feed";
import Latestblog from "@components/common/latestblog";
import OurProcess from '@components/home/our-process';
import SecondaryBanner from '@components/home/secondary-banner';
import TestimonialSection from '@components/home/testimonial-section';
import FAQ from '@components/faq/faq';
import Preview from '../(preview)/preview/[id]/page';
import PreviewDesign from '@components/home/preview-design';
import FreeCover from '@components/home/free-cover';
import NeedHelp from '@components/home/need-help';
import Offer from '@components/home/offer';

export const metadata: Metadata = {
    title: 'Yougazine',
    description:
        'Yougazine',
};

export default async function Page({ params: { lang }, }: { params: { lang: string; } }) {
    return (
        <>
            <HeroSliderBlock
                lang={lang}
                heroBanner={heroSlider}
                showHeroContent={false}
                className={`mb-8`}
                contentClassName="p-7 sm:pb-24 xl:pb-32 sm:pt-16 xl:pt-24 md:min-h-[270px] xl:min-h-[360px] 2xl:min-h-[550px]"
            />
            <FeatureCarousel lang={lang} />
            <BannerGrid
                    lang={lang}
                    data={bannerGrid}
                    grid={3}
                    className="mb-8 lg:mb-12 relative pt-10"
                    girdClassName="xl:gap-5 xl:grid-cols-[1fr_minmax(770px,_1fr)_1fr] "
                />
            {/* <BestSellerProductFeed lang={lang} /> */}
            <PreviewDesign lang={lang} />
            <OurProcess lang={lang} />
            <CategoryGridBlock className="mb-0 lg:mb-0 pb-32" lang={lang} />
            <TestimonialSection lang={lang} />
            <FreeCover lang={lang} />
            <Container>
                <ListingTabsElectronicFeed lang={lang} />
            </Container>
            <SecondaryBanner lang={lang} />
            
            <FAQ showTitle={true} lang={lang} />

            <NeedHelp lang={lang} />
            <Container>
            <Latestblog lang={lang} className="mb-8 lg:mb-12 navTopSlider py-32" />
            </Container>
            <Offer lang={lang}/>
        </>
    );
}
