"use client";
import { useTestimonialsQuery } from "@framework/testimonial/get-all-testimonials";
import TestimonialCarousel from "./testimonial-carousel"

const TestimonialSection: React.FC<{ lang: string }> = ({ lang }) => {
    const {data, isLoading, error} = useTestimonialsQuery({});
    return (
        <TestimonialCarousel
            sectionHeading="text-testimonials"
            testimonials={data?.data || []}
            loading={isLoading}
            error={error?.message}
            uniqueKey="testimonials"
            lang={lang}
            className={`mb-8 lg:mb-12 mt-10 navTopSlider`}
        />
    )
}

export default TestimonialSection;