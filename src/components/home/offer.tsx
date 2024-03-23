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
import { BiArrowFromBottom, BiArrowToTop, BiCopy } from 'react-icons/bi';
import { FaArrowUp, FaArrowsAltH, FaCopy } from 'react-icons/fa';
const defaultValues = {};

const Offer: React.FC<{ lang: string }> = ({ lang }) => {
  const { mutate: updateUser, isLoading } = useUpdateUserMutation();
  const { openModal } = useModalAction();
  const { t } = useTranslation(lang);
  const [sel, setSel] = useState('dfy');
  return (
    <div className='bg-brand-secondary h-[367px] bg-[url(/assets/images/home/offer-banner.png)] bg-right bg-no-repeat bg-contain min-h-[500px] flex justify-center flex-col'>
        <Container className='!mx-1'>
          <div className='w-full'>
            <div className='flex flex-col max-w-[400px] ml-[30px] '>
              <h1 className='text-white text-[45px] font-bold'>10% off on Wedding Orders</h1>
              <p className='text-white text-[14px] max-w-[433px] leading-6'>We've collated the top 20 UI inspiration sites, all with links in one handy spot! Find your inspiration for your next project.</p>
              <button className='bg-[#FFFFFF] text-white bg-opacity-10 rounded-full flex p-4 py-2 my-5 max-w-[180px]'>TE7-WY8-820<BiCopy className='ml-2 mt-1 text-white'/></button>
            </div>
          </div>
        </Container>
      </div>

  );
};

export default Offer;
