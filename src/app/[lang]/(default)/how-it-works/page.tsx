import PageHeroSection from '@components/ui/page-hero-section';
import PrivacyPageContent from './privacy-page-content';
import { Metadata } from 'next';
import { AiFillCloud, AiFillLike, AiFillUnlock, AiOutlineAlibaba, AiOutlineAppstore, AiOutlineBank, AiOutlineCar, AiOutlineCheck, AiOutlineCustomerService, AiOutlineFormatPainter, AiOutlineSearch, AiOutlineWoman, AiTwotoneEdit, AiTwotonePrinter } from 'react-icons/ai';

export const metadata: Metadata = {
  title: 'Privacy',
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
      <PageHeroSection heroTitle="text-page-how-it-works" lang={lang} />
      <div className="container mx-auto">
  <div className="coustomize_innerr text-center mt-4  max-w-[1320px] px-3 mx-auto">
    <h3 className="text-[20px] font-normal text-[#520B51] pb-[30px]">Customize by me</h3>
    <div className="block lg:flex relative processings">
      <div className="max-w-[80%]  sm:max-w-[50%] lg:max-w-full mx-auto mt-4  lg:mt-0">
        <div className=" cardbox text-center max-w-full lg:max-w-[256px] mx-auto"><a href="#" className="bg-[#da348f] flex w-16 h-16 justify-center items-center rounded-full mx-auto mb-3 relative z-30"> 
        <AiOutlineAppstore className='text-[35px] text-white'/>
          </a>
          <div className="card-body">
            <h3 className="text-[25px] font-extrabold text-[#520B51] pb-3">Choose Your Template</h3>
            <p className="text-[#525050] text-[15px] font-normal">Pick a template that tickles your fancy
              and suits your occasion.</p>
          </div>
        </div>
      </div>
      <div className="max-w-[80%]  sm:max-w-[50%] lg:max-w-full mx-auto mt-4  lg:mt-0">
        <div className=" cardbox text-center  max-w-full lg:max-w-[256px] mx-auto "><a href="#" className="bg-[#da348f] flex w-16 h-16 justify-center items-center rounded-full mx-auto mb-3 relative z-30">
          <AiTwotoneEdit className='text-[35px] text-white '/>
          </a>
          <div className="card-body">
            <h3 className="text-[25px] font-extrabold text-[#520B51] pb-3">Design &amp; Customize</h3>
            <p className="text-[#525050] text-[15px] font-normal">Dive into designing and personalizing up
              to 10 pages of your Yougazine.</p>
          </div>
        </div>
      </div>
      <div className="max-w-[80%]  sm:max-w-[50%] lg:max-w-full mx-auto mt-4  lg:mt-0">
        <div className=" cardbox text-center  max-w-full lg:max-w-[256px] mx-auto "><a href="#" className="bg-[#da348f] flex w-16 h-16 justify-center items-center rounded-full mx-auto mb-3 relative z-30">
         <AiOutlineSearch  className='text-[35px] text-white'/> </a>
          <div className="card-body">
            <h3 className="text-[25px] font-extrabold text-[#520B51] pb-3">Take a Peek</h3>
            <p className="text-[#525050] text-[15px] font-normal">Preview your creation, making sure it’s
              shaping up just the way you
              envisioned.</p>
          </div>
        </div>
      </div>
      <div className="max-w-[80%]  sm:max-w-[50%] lg:max-w-full mx-auto mt-4  lg:mt-0">
        <div className=" cardbox text-center  max-w-full lg:max-w-[256px] mx-auto "><a href="#" className="bg-[#da348f] flex w-16 h-16 justify-center items-center rounded-full mx-auto mb-3 relative z-30">
          <AiFillUnlock className='text-[35px] text-white'/>  </a>
          <div className="card-body">
            <h3 className="text-[25px] font-extrabold text-[#520B51] pb-3">Unlock Full Access</h3>
            <p className="text-[#525050] text-[15px] font-normal">Love what you see? Make a payment to
              unlock the rest of the pages and keep
              the creativity flowing.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="block lg:flex relative processings mt-4">
      <div className="max-w-[80%]  sm:max-w-[50%] lg:max-w-full mx-auto mt-4  lg:mt-0">
        <div className=" cardbox text-center max-w-full lg:max-w-[256px] mx-auto"><a href="#" className="bg-[#da348f] flex w-16 h-16 justify-center items-center rounded-full mx-auto mb-3 relative z-30">
         <AiOutlineFormatPainter  className='text-[35px] text-white'/> </a>
          <div className="card-body">
            <h3 className="text-[25px] font-extrabold text-[#520B51] pb-3">Wrap Up Your Design</h3>
            <p className="text-[#525050] text-[15px] font-normal">Finish crafting your Yougazine, adding all
              the special touches you desire.
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-[80%]  sm:max-w-[50%] lg:max-w-full mx-auto mt-4  lg:mt-0">
        <div className=" cardbox text-centerr  max-w-full lg:max-w-[256px] mx-auto"><a href="#" className="bg-[#da348f] flex w-16 h-16 justify-center items-center rounded-full mx-auto mb-3 relative z-30">
         <AiFillLike className='text-[35px] text-white'/> </a>
          <div className="card-body">
            <h3 className="text-[25px] font-extrabold text-[#520B51] pb-3">Final Review &amp; Thumbs Up</h3>
            <p className="text-[#525050] text-[15px] font-normal"> Give your design a final review and a big
              thumbs up when it’s all set.</p>
          </div>
        </div>
      </div>
      <div className="max-w-[80%]  sm:max-w-[50%] lg:max-w-full mx-auto mt-4  lg:mt-0">
        <div className="cardbox text-centerr  max-w-full lg:max-w-[256px] mx-auto"><a href="#" className="bg-[#da348f] flex w-16 h-16 justify-center items-center rounded-full mx-auto mb-3 relative z-30">
            <AiTwotonePrinter  className='text-[35px] text-white'/>    </a>
          <div className="card-body">
            <h3 className="text-[25px] font-extrabold text-[#520B51] pb-3">Design Only or Print Ahead</h3>
            <p className="text-[#525050] text-[15px] font-normal">If you’ve got what you need, we’re done
              here! But if you’re eyeing a
              printed version, let’s move onto the printing stage.</p>
          </div>
        </div>
      </div>
      <div className="max-w-[80%]  sm:max-w-[50%] lg:max-w-full mx-auto mt-4 lg:mt-0">
        <div className=" cardbox text-center  max-w-full lg:max-w-[256px] mx-auto"><a href="#" className="bg-[#da348f] flex w-16 h-16 justify-center items-center rounded-full mx-auto mb-3 relative z-30">
          <AiOutlineCustomerService  className='text-[35px] text-white'/>   </a>
          <div className="card-body">
            <h3 className="text-[25px] font-extrabold text-[#520B51] pb-3">Eagerly Await Your Yougazine</h3>
            <p className="text-[#525050] text-[15px] font-normal">Sit back and daydream about the moment
              your personalized Yougazine arrives
              in your hands.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="coustomize_innerr text-center mt-[124px] mb-[100px] max-w-[1320px] px-3 mx-auto">
    <h3 className="text-[20px] font-normal text-[#520B51] pb-[30px]">Customize for me</h3>
    <div className="block lg:flex relative processings">
      <div className="max-w-[80%]  sm:max-w-[50%] lg:max-w-full mx-auto mt-4  lg:mt-0">
        <div className=" cardbox text-center max-w-full lg:max-w-[256px] mx-auto"><a href="#" className="bg-[#da348f] flex w-16 h-16 justify-center items-center rounded-full mx-auto mb-3 relative z-30">
        <AiOutlineAppstore className='text-[35px] text-white'/></a>
          <div className="card-body">
            <h3 className="text-[25px] font-extrabold text-[#520B51] pb-3">Select Your Template and Details</h3>
            <p className="text-[#525050] text-[15px] font-normal">Start by selecting from our range of templates to find the perfect
              foundation for your story. Specify your desired size, number of pages, and copies to
              tailor it to your needs.</p>
          </div>
        </div>
      </div>
      <div className="max-w-[80%]  sm:max-w-[50%] lg:max-w-full mx-auto mt-4  lg:mt-0">
        <div className=" cardbox text-center  max-w-full lg:max-w-[256px] mx-auto  "><a href="#" className="bg-[#da348f] flex w-16 h-16 justify-center items-center rounded-full mx-auto mb-3 relative z-30">
           <AiOutlineBank className='text-[35px] text-white'/>  </a>
          <div className="card-body">
            <h3 className="text-[25px] font-extrabold text-[#520B51] pb-3">Make It Official</h3>
            <p className="text-[#525050] text-[15px] font-normal">eal the deal with your payment, and let the magic begin.</p>
          </div>
        </div>
      </div>
      <div className="max-w-[80%]  sm:max-w-[50%] lg:max-w-full mx-auto mt-4  lg:mt-0">
        <div className=" cardbox text-center  max-w-full lg:max-w-[256px] mx-auto "><a href="#" className="bg-[#da348f] flex w-16 h-16 justify-center items-center rounded-full mx-auto mb-3 relative z-30">
          <AiFillCloud className='text-[35px] text-white'/>  </a>
          <div className="card-body">
            <h3 className="text-[25px] font-extrabold text-[#520B51] pb-3">Your Personal Cloud Drive</h3>
            <p className="text-[#525050] text-[15px] font-normal">We set up a dedicated cloud drive just for you. Our unique design
              management system automatically creates a project account for you, complete with
              pre-established folders, guiding you on where to upload your content with ease,
              setting the stage for our designers to work their magic.</p>
          </div>
        </div>
      </div>
      <div className="max-w-[80%]  sm:max-w-[50%] lg:max-w-full mx-auto mt-4  lg:mt-0">
        <div className=" cardbox text-center  max-w-full lg:max-w-[256px] mx-auto "><a href="#" className="bg-[#da348f] flex w-16 h-16 justify-center items-center rounded-full mx-auto mb-3 relative z-30">
          <AiOutlineCar className='text-[35px] text-white'/>   </a>
          <div className="card-body">
            <h3 className="text-[25px] font-extrabold text-[#520B51] pb-3">The Creative Journey Begins</h3>
            <p className="text-[#525050] text-[15px] font-normal">Love what you see? Make a payment to
              unlock the rest of the pages and keep
              the creativity flowing.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="block lg:flex relative processings mt-4">
      <div className="max-w-[80%]  sm:max-w-[50%] lg:max-w-full mx-auto mt-4  lg:mt-0">
        <div className=" cardbox text-center max-w-full lg:max-w-[256px] mx-auto"><a href="#" className="bg-[#da348f] flex w-16 h-16 justify-center items-center rounded-full mx-auto mb-3 relative z-30">
          <AiOutlineWoman className='text-[35px] text-white'/>  </a>
          <div className="card-body">
            <h3 className="text-[25px] font-extrabold text-[#520B51] pb-3">Your First Look</h3>
            <p className="text-[#525050] text-[15px] font-normal">Take the first glance at your creation on our user-friendly
              platform, where you can see your Yougazine come to life with our <strong> WYSIWYG
              </strong> (What You See Is What You Get) page flipper.
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-[80%]  sm:max-w-[50%] lg:max-w-full mx-auto mt-4  lg:mt-0">
        <div className=" cardbox text-centerr  max-w-full lg:max-w-[256px] mx-auto"><a href="#" className="bg-[#da348f] flex w-16 h-16 justify-center items-center rounded-full mx-auto mb-3 relative z-30">
          <AiOutlineAlibaba className='text-[35px] text-white'/>  </a>
          <div className="card-body">
            <h3 className="text-[25px] font-extrabold text-[#520B51] pb-3">Tell Us What You Think</h3>
            <p className="text-[#525050] text-[15px] font-normal"> Your input drives the process. Use our platform's interactive
              features to provide and track feedback effortlessly until the design matches your
              vision perfectly.</p>
          </div>
        </div>
      </div>
      <div className="max-w-[80%]  sm:max-w-[50%] lg:max-w-full mx-auto mt-4  lg:mt-0">
        <div className="cardbox text-centerr  max-w-full lg:max-w-[256px] mx-auto"><a href="#" className="bg-[#da348f] flex w-16 h-16 justify-center items-center rounded-full mx-auto mb-3 relative z-30">
         <AiFillLike className='text-[35px] text-white'/>  </a>
          <div className="card-body">
            <h3 className="text-[25px] font-extrabold text-[#520B51] pb-3">Give Us the Green Light</h3>
            <p className="text-[#525050] text-[15px] font-normal">Fall in love with your design? Give us the go-ahead and we’ll
              prepare the final masterpiece.</p>
          </div>
        </div>
      </div>
      <div className="max-w-[80%]  sm:max-w-[50%] lg:max-w-full mx-auto mt-4 lg:mt-0">
        <div className=" cardbox text-center  max-w-full lg:max-w-[256px] mx-auto"><a href="#" className="bg-[#da348f] flex w-16 h-16 justify-center items-center rounded-full mx-auto mb-3 relative z-30">
         <AiOutlineCheck className='text-[35px] text-white'/>  </a>
          <div className="card-body">
            <h3 className="text-[25px] font-extrabold text-[#520B51] pb-3">The Finale</h3>
            <p className="text-[#525050] text-[15px] font-normal">The moment has arrived—the completion of your Yougazine. We're all
              set to send your printed magazine straight to your doorstep, where it's ready to be
              cherished and shared.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
}
