import Container from "@components/ui/container";
import Link from "next/link";

const SecondaryBanner: React.FC<{ lang: string }> = ({ lang }) => {
    return (
        <div className="flex bg-[#072E57] w-full pl-10">
            <div className="w-1/2">
                <Container>
                <div className="needlft w-100 pt-[60px] max-w-[525px] xl:text-left text-center">
                    <h2 className="text-left w-full mt-[50px]  text-white text-[80px] aquawax-medium mb-5">
                        We Print, Design, Deliver: Effortless <span className='head-design cormorant-thin text-skin relative'>Elegance</span> in Every Page
                    </h2>
                    <p className="lg:text-[20px] md:text-[18px] text-[14px] max-w-[493px]  text-[#D9D9D9] leading-8 font-normal pt-[18px]">Embark on a seamless journey from concept to doorstep with Yougazine’s classy, painless experience. </p>
                    <Link href="/en/search" className="text-[15px] text-white leading-normal font-normal py-[19px] px-[23px] rounded-[50px] mb-5 mt-5 inline-block" style={{ background: 'linear-gradient(180deg, #DA348F 0%, #FF008C 100%)' }}>Create your Yougazine</Link>
                </div>
                </Container>
            </div>
            <div className="w-1/2">
                <img className="w-full h-full object-cover" src={'/assets/images/home/frame.png'} />
            </div>
        </div>

    );
}

export default SecondaryBanner;