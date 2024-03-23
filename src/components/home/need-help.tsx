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
import { BiArrowFromBottom, BiArrowToTop, BiChevronRight } from 'react-icons/bi';
import { FaArrowUp, FaArrowsAltH } from 'react-icons/fa';
const defaultValues = {};

const NeedHelp: React.FC<{ lang: string }> = ({ lang }) => {
  const { mutate: updateUser, isLoading } = useUpdateUserMutation();
  const { openModal } = useModalAction();
  const { t } = useTranslation(lang);
  const [sel, setSel] = useState('dfy');
  return (
    <div className="pt-20">

      <Container>
        <h2 className="heading-with-line  text-[40px] cormorant-medium text-[#231F20] text-center relative"><span className='relative px-8 bg-white'>Need more help?</span></h2>
      </Container>

      <Container className='pt-20'>
        <div className='flex flex-wrap'>
          <div className='w-full md:w-1/2 lg:w-1/3 p-2 px-8'>
            <img src='/assets/images/home/help/help-1.png' className='w-[30px] h-[30px] mb-5'/>
            <h2 className='text-[16px] font-[600] pb-2 text-[#4E4E4E]'>Startup Sales</h2>
            <p className='text-[14px] text-[#575757] max-w-[304px] leading-6'>Get a custom proposal from our sales team, who will tailor a solution to your specific business model and challenges.</p>
            <button className='mt-8 flex text-sm text-brand-secondary font-bold border-b-2 border-brand-secondary pb-1'>Get started <BiChevronRight className='mt-1' /></button>
          </div>
          <div className='w-full md:w-1/2 lg:w-1/3 p-2 px-8'>
            <img src='/assets/images/home/help/help-2.png' className='w-[30px] h-[30px] mb-5'/>
            <h2 className='text-[16px] font-[600] pb-2'>Corporate Orders</h2>
            <p className='text-[14px] text-[#575757] max-w-[304px] leading-6'>Get a custom proposal from our sales team, who will tailor a solution to your specific business model and challenges.</p>
            <button className='mt-8 flex text-sm text-brand-secondary font-bold border-b-2 border-brand-secondary pb-1'>Get started <BiChevronRight className='mt-1' /></button>
          </div>
          <div className='w-full md:w-1/2 lg:w-1/3 p-2 px-8'>
            <img src='/assets/images/home/help/help-3.png' className='w-[30px] h-[30px] mb-5'/>
            <h2 className='text-[16px] font-[600] pb-2'>15 min consultation call</h2>
            <p className='text-[14px] text-[#575757] max-w-[304px] leading-6'>Let’s hope on a quick call to talk about your yougazine. </p>
            <button className='mt-8 flex text-sm text-brand-secondary font-bold border-b-2 border-brand-secondary pb-1'>Get started <BiChevronRight className='mt-1' /></button>
          </div>
          <div className='w-full md:w-1/2 lg:w-1/3 p-2 px-8 mt-5'>
            <img src='/assets/images/home/help/help-4.png' className='w-[30px] h-[30px] mb-5'/>
            <h2 className='text-[16px] font-[600] pb-2'>Startup sales</h2>
            <p className='text-[14px] text-[#575757] max-w-[304px] leading-6'>Get a custom proposal from our sales team, who will tailor a solution to your specific business model and challenges. </p>
            <button className='mt-8 flex text-sm text-brand-secondary font-bold border-b-2 border-brand-secondary pb-1'>Get started <BiChevronRight className='mt-1' /></button>
          </div>
          <div className='w-full md:w-1/2 lg:w-1/3 p-2 px-8 mt-5'>
            <img src='/assets/images/home/help/help-5.png' className='w-[30px] h-[30px] mb-5'/>
            <h2 className='text-[16px] font-[600] pb-2'>Large Orders </h2>
            <p className='text-[14px] text-[#575757] max-w-[304px] leading-6'>Call us let’s talk about special offers we have for orders above 500 copies.</p>
            <button className='mt-8 flex text-sm text-brand-secondary font-bold border-b-2 border-brand-secondary pb-1'>Get started <BiChevronRight className='mt-1' /></button>
          </div>
          
        </div>
      </Container>
    </div>

  );
};

export default NeedHelp;
