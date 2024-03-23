import {useForm} from 'react-hook-form';
import Input from '@components/ui/input';
import {useTranslation} from 'src/app/i18n/client';
import EmailIcon from '@components/icons/email-icon';
import Text from '@components/ui/text';
import Heading from '@components/ui/heading';
import {getDirection} from '@utils/get-direction';
import cn from 'classnames';
import NewletterIcon from "@components/icons/newletter-icon";

interface Props {
    className?: string;
    lang: string;
}

interface NewsLetterFormValues {
    email: string;
    lang: string;
}

const defaultValues = {
    email: '',
};
const WidgetSubscription: React.FC<Props> = ({lang, className}) => {
    const {t} = useTranslation(lang, 'footer');
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<NewsLetterFormValues>({
        defaultValues,
    });
    
    function onSubmit(values: NewsLetterFormValues) {
        console.log(values, 'Newsletter 3');
    }
    
    const dir = getDirection(lang);
    const bgNewletter = '/assets/images/bg_newsletter_bottom.png';
    return (
        <div className={cn('flex flex-col bg-no-repeat bg-[length:180px_auto] bg-right-bottom', className)}
             style={{backgroundImage: `url(${bgNewletter})`}}>
            <Heading variant="mediumHeading" className="text-base mb-4 sm:mb-5 lg:mb-6 pb-0.5">
                {t('footer:widget-title-subscribe')}
            </Heading>
            
            <Text className={"pb-4"}>
                {t('footer:text-subscribe-footer3')}
            </Text>
            
            <div className={" flex flex-col justify-between "}>
                <form
                    className="flex relative z-10  max-w-[400px] lg:max-w-[600px]"
                    onSubmit={handleSubmit(onSubmit)}
                >
                <span className="flex items-center absolute start-0 top-0 h-12 px-3.5 transform">
                  <EmailIcon className="w-4 2xl:w-[18px] h-4 2xl:h-[18px]"/>
                </span>
                    <Input
                        placeholder={t('placeholder-email-subscribe')}
                        type="email"
                        id="subscription-email"
                        variant="solid"
                        className="w-full"
                        inputClassName={`ps-10 md:ps-10 pe-10 md:pe-10 2xl:px-11 h-12 border-1 border-black/10 focus:outline-none focus:shadow-outline ${dir == 'rtl' ? 'rounded-r' : 'rounded-r'}`}
                        {...register('email', {
                            required: `${t('email-required')}`,
                            pattern: {
                                value:
                                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: `${t('email-error')}`,
                            },
                        })}
                        error={errors.email?.message}
                    />
                    <button
                        className={`bg-skin-two hover:bg-skin-primary text-sm font-medium text-white md:h-12 py-2 px-10   focus:outline-none focus:shadow-outline ${dir == 'rtl' ? 'rounded-r -mr-1' : 'rounded-r -ml-1'}`}
                        aria-label="Subscribe Button"
                    >
                        {t('text-btnsubscribe')}
                    </button>
                </form>
            </div>
        
        
        </div>
    );
};

export default WidgetSubscription;
