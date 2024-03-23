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
import { BiArrowFromBottom, BiArrowToTop } from 'react-icons/bi';
import { FaArrowUp, FaArrowsAltH } from 'react-icons/fa';
const defaultValues = {};

const FreeCover: React.FC<{ lang: string }> = ({ lang }) => {
  const { mutate: updateUser, isLoading } = useUpdateUserMutation();
  const { openModal } = useModalAction();
  const { t } = useTranslation(lang);
  const [sel, setSel] = useState('dfy');
  return (
    <div className="pb-[100px]">

      <Container className='py-32'>
        <div className='bg-[url(/assets/images/home/free-cover-bg.png)] bg-no-repeat bg-cover min-h-[534.42px] flex justify-center flex-col'>
          <div className='flex flex-col justify-center max-w-[700px] m-auto text-center'>
            <h1 className='cormorant-medium text-[#231F20] text-[45px]'>Test drive the Yougazine experience. Get a Free Cover Done for you!</h1>
            <p className='text-sm text-[#575757] max-w-[559.34px] leading-8 mx-auto'>Flowbase is the world's largest premium library of Webflow, Figma & Framer
              components and tools. Build better, faster with Flowbase.</p>
            <Link className='flex m-auto bg-white font-bold px-12 py-4 border-4 border-[#520B510F]   rounded-full mt-6  text-brand-secondary' href={'#'}><FaArrowUp className='rotate-45 mt-1 mr-2 text-skin' /> Get started</Link>
          </div>
        </div>
      </Container>
    </div>

  );
};

export default FreeCover;
