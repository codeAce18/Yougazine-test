import StarIcon from "@components/icons/star-icon";
import Image from "@components/ui/image";
import externaImageLoader from "@utils/external-image-loader";

const TestimonialCard: React.FC<{ lang: string, testimonial: any }> = ({ lang, testimonial }) => {
    return (
        <div className="bg-brand-secondary flex min-h-[50vw]">
            <div className="w-1/2 flex flex-col justify-center p-10 px-32">
                <p className="text-[40px] pb-10  text-white font-normal leading-normal">
                    "{testimonial.description}"
                </p>
                <h3 className="text-[40px] text-brand cormorant-thin font-extrabold pb-[8px] leading-normal capitalize">{testimonial.name}</h3>
                <div className="flex -mx-0.5 mb-3.5">
                    <span className="text-white text-lg mr-3"> 4.8 | </span>{[...Array(5)].map((_, idx) => (

                        <StarIcon
                            key={idx}
                            color={idx < testimonial.rating ? '#fff' : '#DFE6EA'}
                            className="w-3.5 lg:w-4 h-3.5 lg:h-4 mx-0.5 mt-1"
                        />
                    ))} 
                    <span className="text-white text-lg flex ml-3">|
                        <img className="ml-2" src="./assets/images/rating.svg" alt="" />
                        <p className="ml-3">rating</p>
                    </span>


                </div>

            </div>

            <div className="w-1/2 relative">
                <Image loader={externaImageLoader} fill src={testimonial.image} alt="img" className="w-full h-full" />
            </div>
        </div>

    )
};

export default TestimonialCard