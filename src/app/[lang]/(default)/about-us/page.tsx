// 'use client';

import PageHeroSection from '@components/ui/page-hero-section';
import { Metadata } from 'next';
import { useTranslation } from 'src/app/i18n/client';
import { CarrerFormPage, CarrerFormProps } from '@components/common/form/carrerform';
export const metadata: Metadata = {
  title: 'About Us',
};



export default async function Page({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
 



  return (
    <>
      <PageHeroSection heroTitle="text-page-aboutus" lang={lang}/>
      <div className="contact">
  <section>
    <div className="aboutyoucagnize max-w-[1320px] mx-auto">
      {/* <div className="aboutyoucagnizeheading text-center max-w-[693px] mx-auto text-center pb-[54px]">
        <h3 className="text-[20px] text-[#520B51] font-semibold pb-2.5 ">
          About Us
        </h3>
        <p className="text-[15px] text-[#8C8888] font-nomal">
          {" "}
          About our business firm
        </p>
      </div> */}
      <div className="mt-2 stepproge w-full mx-auto">
        <div className="flex:col-reverse xl:flex justify-between mx-auto ">
          <div className="steplft w-full xl:w-[47%] pb-12 xl:pb-0">
            <img
              src="/assets/images/aboutus/aboutone.png"
              alt="img"
              className="rounded w-[70%] xl:w-full mx-auto"
            />
          </div>
          <div className="steprightsec w-[70%] xl:w-[47%] mx-auto">
            <div className="whatyoucazrht">
              <h3 className="text-[20px] text-[#520B51] font-semibold pb-[11px] ">
                What is Yougazine?
              </h3>
              <p className="text-[15px] text-[#8C8888] font-nomal pb-[20px]">
                The inception of Yougazine is deeply personal. It began over a
                decade ago, following the loss of my uncle. In my quest to
                celebrate his life, I envisioned a funeral magazine that wasn't
                just a collection of memories, but a vibrant chronicle of his
                life's achievements. The creation of that first Yougazine was a
                labor of love, steeped in research and creativity. It became the
                centerpiece of the funeral, sparking conversations and evoking
                emotions.
              </p>
              <p className="text-[15px] text-[#8C8888] font-nomal pb-[20px]">
                That first issue was just the beginning. Requests poured in, and
                what started as a singular tribute grew into a beloved service.
                Over the years, we've honed our craft, creating hundreds of
                Yougazines that allow others to tell their stories with the same
                passion and vibrancy. Born from a desire to honor a cherished
                life in Nigeria, Yougazine now helps people worldwide share
                their narratives in the most dynamic ways possible. I cherish
                the journey thus far and hope that Yougazine helps you share
                your story, celebrate your milestones, and connect with others
                in a deeply meaningful way
              </p>
              <p className="text-[15px] text-[#8C8888] font-nomal pb-[20px]">
                – Keley A, Creator of Yougazine
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="aboutclient overflow-hidden bg-[#FEE8F4] pt-[65px] pb-[60px] mt-[63px] mb-[20px]">
    <div className="max-w-[1320px] mx-auto">
      <div className="clientheading text-center mb-[40px]">
        <h3 className="text-[20px] text-[#520B51] font-semibold pb-[8px] ">
          Client Review
        </h3>
        <p className="text-[15px] text-[#4E4E4E] font-nomal ">
          About our business firm
        </p>
      </div>
    </div>
    <div className="reviewjack bg-white max-w-[1086px] mx-auto shadow pt-[62px] pb-[32px]">
      <div className="clientcntnt relative max-w-[566px] mx-auto text-center">
        <p className="text-[15px] text-[#8C8888] font-semibold pb-[8px] ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id
          purus at risus pellentesque faucibus a quis eros. In eu ermentum
          leo.Proin ut accumsan leo. Morbi vitae est eget
        </p>
        <h3 className="text-[20px] text-[#520B51] font-bold">John Jack</h3>
        <p className="text-[15px] text-[#8C8888] font-semibold ">
          General Manager
        </p>
        <div className="starrates d-flex justify-content-center">
          <a href="#" className="text-[10px] text-[#FFB800]">
            <i className="fa-solid fa-star" />
          </a>
          <a href="#" className="text-[10px] text-[#FFB800]">
            <i className="fa-solid fa-star" />
          </a>
          <a href="#" className="text-[10px] text-[#FFB800]">
            <i className="fa-solid fa-star" />
          </a>
          <a href="#" className="text-[10px] text-[#FFB800]">
            <i className="fa-solid fa-star" />
          </a>
        </div>
        <div className="secinverted">
          <img src="/assets/images/aboutus/comatwo.png" alt="" />
        </div>
      </div>
    </div>
    <div className="max-w-[366px] mx-auto flex items-center justify-between mt-[20px]">
      <div className="reviewone">
        <img src="/assets/images/aboutus/needfour.png" alt="img" className="img-fluid" />
      </div>
      <div className="reviewone">
        <img src="/assets/images/aboutus/needfour.png" alt="img" className="img-fluid" />
      </div>
      <div className="reviewone">
        <img src="/assets/images/aboutus/needfour.png" alt="img" className="img-fluid" />
      </div>
    </div>
  </section>
  <section>
    <div className="aboutdelievery_inner max-w-[1320px] mx-auto py-[70px]">
      <div className="delivmainsec flex flex-wrap items-center gap-x-[20px] justify-center">
        <div className="delivrybxmain">
          <div className="delivrybx text-center ">
            <a href="#">
              <img src="/assets/images/aboutus/truck.png" alt="icon" />
            </a>
            <br />
            <a href="#">
              <h6 className="text-[15px] text-[#525050] font-semibold pt-[15px] cursor-pointer ">
                Worldwide Delivery
              </h6>
            </a>
            <p className="text-[10px] text-[#7B7878] font-nomal pb-[5px] ">
              For order over $100
            </p>
          </div>
        </div>
        <div className="delivrybxmain">
          <div className="delivrybx text-center ">
            <a href="#">
              <img src="/assets/images/aboutus/highlevel.png" alt="icon" />
            </a>
            <br />
            <a href="#">
              <h6 className="text-[15px] text-[#525050] font-semibold pt-[15px] cursor-pointer">
                Next Day Delivery
              </h6>
            </a>
            <p className="text-[10px] text-[#7B7878] font-nomal pb-[5px] ">
              Canada Order Only
            </p>
          </div>
        </div>
        <div className="delivrybxmain">
          <div className="delivrybx text-center ">
            <a href="#">
              <img src="/assets/images/aboutus/contacicon.png" alt="icon" />
            </a>
            <br />
            <a href="#">
              <h6 className="text-[15px] text-[#525050] font-semibold pt-[15px] cursor-pointer">
                Best Online Support
              </h6>
            </a>
            <p className="text-[10px] text-[#7B7878] font-nomal pb-[5px] ">
              Hours: 8am - 11pm
            </p>
          </div>
        </div>
        <div className="delivrybxmain">
          <div className="delivrybx text-center ">
            <a href="#">
              <img src="/assets/images/aboutus/return.png" alt="icon" />
            </a>
            <br />
            <a href="#">
              <h6 className="text-[15px] text-[#525050] font-semibold pt-[5px] cursor-pointer">
                Return Policy
              </h6>
            </a>
            <p className="text-[10px] text-[#7B7878] font-nomal pb-[5px] ">
              Easy &amp; Free Return
            </p>
          </div>
        </div>
        <div className="delivrybxmain">
          <div className="delivrybx text-center">
            <a href="#">
              <img src="/assets/images/aboutus/penicon.png" alt="icon" />
            </a>
            <br />
            <a href="#">
              <h6 className="text-[15px] text-[#525050] font-semibold pt-[18px] cursor-pointer">
                Graphics Design
              </h6>
            </a>
            <p className="text-[10px] text-[#7B7878] font-nomal pb-[5px] ">
              High Quality Design
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="abouthiring_inner mt-5 max-w-[1320px] mx-auto">
    <div className="block lg:flex items-center max-w-[1320px] mx-auto">
      <div className="abouthiringlft  w-[75%] xl:w-[56%] mx-auto">
        <div className="hireheading  mb-10">
          <h3 className="text-[25px] text-[#520B51] font-semibold  ">
            We are hiring new talents
          </h3>
          <p className="text-[15px] text-[#525050] font-nomal ">
            If you want to be part of our team please submit you CV using the
            form below:
          </p>
        </div>
        <CarrerFormPage lang={lang}  />
        
      </div>
      <div className="abouthiringlft w-[75%] xl:w-[38%] mx-auto px-3">
        <img src="/assets/images/aboutus/about.jpg" alt="img" className="w-100" />
      </div>
    </div>
  </section>
</div>

    </>
  );
}
