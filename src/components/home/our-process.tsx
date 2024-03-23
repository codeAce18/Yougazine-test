'use client';

import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { useForm, Controller } from 'react-hook-form';
import {
  useUpdateUserMutation,
  UpdateUserType,
} from '@framework/customer/use-update-customer';
import Switch from '@components/ui/switch';
import Text from '@components/ui/text';
import { useTranslation } from 'src/app/i18n/client';
import { useState } from 'react';
import Link from 'next/link';
import { AiFillCloud, AiFillLike, AiFillUnlock, AiOutlineAlibaba, AiOutlineAntCloud, AiOutlineAppstore, AiOutlineBank, AiOutlineCar, AiOutlineCheck, AiOutlineCustomerService, AiOutlineFormatPainter, AiOutlineSearch, AiOutlineWoman, AiTwotoneAccountBook, AiTwotoneEdit, AiTwotonePrinter, AiTwotoneUnlock } from 'react-icons/ai';
import Container from '@components/ui/container';
import { IoPlaySharp } from 'react-icons/io5';
import { useModalAction } from '@components/common/modal/modal.context';
import { BsPlayCircleFill } from 'react-icons/bs';
const defaultValues = {};

const OurProcess: React.FC<{ lang: string }> = ({ lang }) => {
  const { mutate: updateUser, isLoading } = useUpdateUserMutation();
  const {openModal} = useModalAction();
  const { t } = useTranslation(lang);
  const [sel, setSel] = useState('dfy');
  return (
    <div className="pb-[100px]">

        <h2 className="heading-with-line text-[40px] cormorant-medium text-black text-center relative"><span className='relative px-8 bg-white'>How it works</span></h2>
        <Container>
        <div className='flex'>
          <div className="progess_headcontent text-center mx-auto justify-center  pt-20">
            <div className="dodone flex align-items-center text-center justify-content-center border-gray-100 border rounded-full ">
              <button onClick={() => setSel('diy')} className={`do text-[16px] 
             mx-4 px-4 my-1.5 py-2.5 text-brand-secondary inline-block cursor-pointer flex align-center gap-[15px] ${sel == 'diy' ? 'bg-skin-lightfill bg-opacity-50 border-skin-fill border rounded-full' : ''}`}>
              <img src="./assets/images/SVG1.svg" alt="icon" height={25} width={25} />
              <p className= 'font-semibold text-[#520B51]'>Done for you</p></button>
              <button onClick={() => setSel('dfy')} className={`do done text-[16px] font-semibold
                  mx-4 px-4 my-1.5 py-2.5  text-brand-secondary inline-block cursor-pointer flex align-center gap-[15px] ${sel == 'dfy' ? 'bg-skin-lightfill bg-opacity-50 border-skin-fill border rounded-full' : ''}`}>
                  <img src="./assets/images/Vectoricon2.svg" alt="icon" height={25} width={25} />
                  <p className='text-brand font-bold'>Do it yourself</p></button></div>
          </div>
        </div>
        <div className="w-full pt-40 pb-20">
              {
                sel === 'diy' && (
                  <div className="flex flex-wrap">
                      <div className="w-1/4 p-2 border-r-2 border-gray-300 align-middle text-center">
                        <div className="m-4">
                        <h1 className="cormorant-thin text-[72px] text-brand">1</h1>
                        <h3 className="text-[25px] text-[#520B51] aquawax relative">Choose
                          Your Template</h3>
                        <p className="text-[15px] text-[#525050] font-normal">Pick a template
                          that tickles your fancy and suits your occasion.</p>
                        </div>
                      </div>
                      <div className="w-1/4 p-2 border-r-2 border-gray-300 align-middle text-center">
                        <div className="m-4">
                        <h1 className="cormorant-thin text-[72px] text-brand">2</h1>
                        <h3 className="text-[25px] text-[#520B51] aquawax relative">Design & Customize</h3>
                        <p className="text-[15px] text-[#525050] font-normal max-w-[250px] text-center mx-auto">Dive into designing and personalizing up to 10 pages of your Yougazine.</p>
                        </div>
                      </div>
                      <div className="w-1/4 p-2 border-r-2 border-gray-300 align-middle text-center">
                        <div className="m-4">
                        <h1 className="cormorant-thin text-[72px] text-brand">3</h1>
                        <h3 className="text-[25px] text-[#520B51] aquawax relative">Take a Peek</h3>
                        <p className="text-[15px] text-[#525050] font-normal max-w-[155px] text-center mx-auto">Preview your creation, making sure it's shaping up just the way you envisioned.</p>
                        </div>
                      </div>
                      <div className="w-1/4 p-2 align-middle text-center">
                        <div className="m-4">
                        <h1 className="cormorant-thin text-[72px] text-brand">4</h1>
                        <h3 className="text-[25px] text-[#520B51] aquawax relative">Unlock Full Access</h3>
                        <p className="text-[15px] text-[#525050] font-normal max-w-[248px] text-center mx-auto">Love what you see? Make a payment to unlock the rest of the pages and keep the creativity flowing.</p>
                        </div>
                      </div>
                      
                    </div>
                )
              }
              {
                sel === 'dfy' && (
                  <div className="flex flex-wrap">
                      <div className="w-1/4 p-2 border-r-2 border-gray-300 align-middle text-center">
                        <div className="m-4">
                        <h1 className="cormorant-thin text-[72px] text-brand">1</h1>
                        <h3 className="text-[25px] text-[#520B51] aquawax relative  mb-[8px] font-bold">Choose
                          Your Template</h3>
                        <p className="text-[15px] text-[#525050] font-normal">Pick a template
                          that tickles your fancy and suits your occasion.</p>
                        </div>
                      </div>
                      <div className="w-1/4 p-2 border-r-2 border-gray-300 align-middle text-center">
                        <div className="m-4">
                        <h1 className="cormorant-thin text-[72px] text-brand">2</h1>
                        <h3 className="text-[25px] text-[#520B51] aquawax relative mb-[8px] font-bold">Design & Customize</h3>
                        <p className="text-[15px] text-[#525050] font-normal max-w-[250px] text-center mx-auto">Dive into designing and personalizing up to 10 pages of your Yougazine.</p>
                        </div>
                      </div>
                      <div className="w-1/4 p-2 border-r-2 border-gray-300 align-middle text-center">
                        <div className="m-4">
                        <h1 className="cormorant-thin text-[72px] text-brand">3</h1>
                        <h3 className="text-[25px] text-[#520B51] aquawax relative mb-[8px] font-bold">Take a Peek</h3>
                        <p className="text-[15px] text-[#525050] font-normal max-w-[155px] text-center mx-auto">Preview your creation, making sure it's shaping up just the way you envisioned.</p>
                        </div>
                      </div>
                      <div className="w-1/4 p-2 align-middle text-center">
                        <div className="m-4">
                        <h1 className="cormorant-thin text-[72px] text-brand">4</h1>
                        <h3 className="text-[25px] text-[#520B51] aquawax relative mb-[8px] font-bold">Unlock Full Access</h3>
                        <p className="text-[15px] text-[#525050] font-normal max-w-[248px] text-center mx-auto">Love what you see? Make a payment to unlock the rest of the pages and keep the creativity flowing.</p>
                        </div>
                      </div>
                      
                    </div>
                )
              }
              
              <div className='m-[40px] max-w-[1730px] mx-auto px-4 md:px-6 lg:px-8 2xl:px-20 w-[100%] h-[2px] bg-gray-300'></div>

              {
                sel === 'dfy' && (
                  <div className="flex flex-wrap">
                      <div className="w-1/4 p-2 border-r-2 border-gray-300 align-middle text-center">
                        <div className="m-4">
                        <h1 className="cormorant-thin text-[72px] text-brand">5</h1>
                        <h3 className="text-[25px] text-[#520B51] aquawax relative mb-[8px] font-bold">Wrap Up Your Design</h3>
                        <p className="text-[15px] text-[#525050] font-normal max-w-[290px] text-center mx-auto">Finish crafting your Yougazine, adding all the special touches you desire.</p>
                        </div>
                      </div>
                      <div className="w-1/4 p-2 border-r-2 border-gray-300 align-middle text-center">
                        <div className="m-4">
                        <h1 className="cormorant-thin text-[72px] text-brand">6</h1>
                        <h3 className="text-[25px] text-[#520B51] aquawax relative mb-[8px] font-bold max-w-[200px] mx-auto">Final Review & Thumbs Up</h3>
                        <p className="text-[15px] text-[#525050] font-normal max-w-[250px] text-center mx-auto">Give your design a final review and a  big thumbs up when it's all set.</p>
                        </div>
                      </div>
                      <div className="w-1/4 p-2 border-r-2 border-gray-300 align-middle text-center">
                        <div className="m-4">
                        <h1 className="cormorant-thin text-[72px] text-brand">7</h1>
                        <h3 className="text-[25px] text-[#520B51] aquawax relative mb-[8px] font-bold max-w-[200px] mx-auto">Design Only or Print Ahead</h3>
                        <p className="text-[15px] text-[#525050] font-normal max-w-[250px] text-center mx-auto">If you've got what you need, we're done here! But if you're eyeing a printed version, let's move onto the printing stage.</p>
                        </div>
                      </div>
                      <div className="w-1/4 p-2 align-middle text-center">
                        <div className="m-4">
                        <h1 className="cormorant-thin text-[72px] text-brand">8</h1>
                        <h3 className="text-[25px] text-[#520B51] aquawax relative mb-[8px] font-bold max-w-[200px] text-center mx-auto">Eagerly Await Your Yougazine</h3>
                        <p className="text-[15px] text-[#525050] font-normal max-w-[230px] text-center mx-auto">Sit back and daydream about the moment your personalized Yougazine arrives in your hands.</p>
                        </div>
                      </div>
                      
                    </div>
                )
              }
              <div className='flex justify-center pt-20'>
              <Link className="bg-skin text-white p-3 mr-4 px-10 rounded-full mt-11 text-left flex flex-col justify-center" href={`/${lang}/get-started/introduction`}><span>Start creating</span> </Link>
              <button className="bg-white text-brand-secondary p-3 border-4 border-gray-300 rounded-full mt-11 text-left flex flex-col justify-center" onClick={() => {openModal('BANNER_VIDEO')}}><span className='flex align-middle'><BsPlayCircleFill className='text-[30px] mr-2 text-fill-secondary' /><span className='mt-0.5'>See how it works</span></span> </button>
              </div>
            </div>
        </Container>
      </div>

  );
};

export default OurProcess;
