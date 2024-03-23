import { useState } from 'react';
import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import TextArea from '@components/ui/form/text-area';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import cn from 'classnames';
import Rate from '@components/ui/rate';
import { useTranslation } from 'src/app/i18n/client';
import { useUI } from '@contexts/ui.context';
import { useModalAction } from '../modal/modal.context';
import http from '@framework/utils/http';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';

interface ReviewFormProps {
  className?: string;
  lang: string;
  template: string;
}
interface ReviewFormValues {
  title: string;
  description: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ lang, className = '', template }) => {
  const { t } = useTranslation(lang);
  const { isAuthorized } = useUI();
  const { openModal } = useModalAction();
  const { width } = useWindowSize();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormValues>();
  const [rating_custom_icon, set_rating_custom_icon] = useState(1);
  async function onSubmit(values: ReviewFormValues) {
    console.log(values, 'review');
    const res = await http.post('/review',{...values, rating: rating_custom_icon, template_id: template});
    console.log(res);
    if(res.data.success) {
      toast('Review Submitted', {
        progressClassName: 'fancy-progress-bar',
        position: width! > 768 ? 'bottom-right' : 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast('Error in Submission. Please try again.', {
        progressClassName: 'fancy-progress-bar',
        position: width! > 768 ? 'bottom-right' : 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  function handleLogin() {
    openModal('LOGIN_VIEW');
}

  return (
    <div className={cn(className)}>
      <Heading className="mb-2">Write your review</Heading>
      <Text>
        Your email address will not be published. Required fields are marked*
      </Text>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-full mx-auto mt-5 lg:mt-7 xl:mt-9"
        noValidate
      >
        {
          !isAuthorized ? (
            <div className="flex flex-col space-y-5 md:space-y-6 lg:space-y-7">
              <Text>
                You Need to Login before adding review to templates
              </Text>
              <div className="pt-1">
                <Button
                  onClick={() => {handleLogin()}}
                  type="button"
                  className="w-full h-12 text-sm md:mt-1 lg:text-base sm:w-auto"
                >
                  {t('common:login-button')}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-5 md:space-y-6 lg:space-y-7">
              <div className="pb-1.5 flex items-center">
                <label className="block text-sm leading-none cursor-pointer shrink-0 text-brand-dark md:text-15px ltr:pr-3 rtl:pl-3">
                  {t('forms:label-your-rating')}
                </label>
                <Rate
                  size="lg"
                  defaultValue={1}
                  value={rating_custom_icon}
                  className="-mb-2"
                  onChange={(value) => set_rating_custom_icon(value)}
                />
              </div>
              <Input
                label={t('forms:label-title-star') as string}
                {...register('title', { required: 'Title is required' })}
                error={errors.title?.message}
                variant="solid"
                lang={lang}
              />
              <TextArea
                variant="solid"
                label="forms:label-message-star"
                {...register('description', { required: 'Message is required' })}
                error={errors.description?.message}
                lang={lang}
              />
              <div className="pt-1">
                <Button
                  type="submit"
                  className="w-full h-12 text-sm md:mt-1 lg:text-base sm:w-auto"
                >
                  {t('common:button-submit')}
                </Button>
              </div>
            </div>
          )
        }

      </form>
    </div>
  );
};

export default ReviewForm;
