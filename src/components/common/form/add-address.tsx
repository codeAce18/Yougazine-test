import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import TextArea from '@components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import Heading from '@components/ui/heading';
import Map from '@components/ui/map';
import { useTranslation } from 'src/app/i18n/client';
import { addAddress, useAddressMutation } from '@utils/add-address';
import { useEditAressMutation } from '@utils/edit-address';

interface ContactFormValues {
  title: string;
  default: boolean;
  lat: number;
  lng: number;
  formatted_address?: string;
  first_name: string;
  last_name : string;
  country:string;
  state:string;
  city:string;
  pincode:number;
  phone:number;
  id:string
}


const AddAddressForm: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation(lang);
  const { data } = useModalState();
  const {mutate:address,isLoading}= useAddressMutation()
  const {mutate:editAddress,isLoading:editLoading}= useEditAressMutation()

  const { closeModal } = useModalAction();

  console.log( "ADDRESSDATA", data)

  const onSubmit=async(values: ContactFormValues, e: any)=> {
   if(data?._id){
    values.id = data?._id
      editAddress(values)
    return
   }else address(values)


    
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      title: data || data?.title ? data?.title : '',
      default: data || data?.default ? data?.default : '',
      formatted_address:
        data || data?.address
          ? data?.address
          : '',
      first_name:data?.first_name,
      last_name:data?.last_name,
      country:data?.country,
      state:data?.state,
      city:data?.city,
      phone:data?.phone,
      pincode:data?.pincode

    },
  });

  return (
    <div className="w-full md:w-[600px] lg:w-[900px] xl:w-[1000px] mx-auto p-5 sm:p-8 bg-brand-light rounded-md">
      <CloseButton onClick={closeModal} />
      <Heading variant="title" className="mb-8 -mt-1.5">
        {t('common:text-add-delivery-address')}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-6">
          <Input
            variant="solid"
            label="Address Title"
            {...register('title', { required: 'Title Required' })}
            error={errors.title?.message}
            lang={lang}
          />
        </div>
        <div className="grid grid-cols-1 mb-6 gap-7">
          <Map
            lat={data?.address?.lat || 1.295831}
            lng={data?.address?.lng || 103.76261}
            height={'420px'}
            zoom={15}
            showInfoWindow={false}
            mapCurrentPosition={(value: string) =>
              setValue('formatted_address', value)
            }
          />

<Input
                label={"First Name"}
                type="text"
                variant="solid"
                {...register('first_name', {
                  required: 'forms:first-name-required',
                })}
                error={errors.first_name?.message}
                lang={lang}
              />
                            <Input
                label={"Last Name"}
                type="text"
                variant="solid"
                {...register('last_name', {
                  required: 'forms:last-name-required',
                })}
                error={errors.last_name?.message}
                lang={lang}
              />
             <Input
                label={"Phone Number"}
                type="number"
                variant="solid"
                {...register('phone', {
                  required: 'forms:mobile-required',
                })}
                error={errors.phone?.message}
                lang={lang}
              />

                    <TextArea
            label="Address"
            {...register('formatted_address', {
              required: 'forms:address-required',
            })}
            error={errors.formatted_address?.message}
            className="text-brand-dark"
            variant="solid"
            lang={lang}
          />
          <Input
                label={"Country"}
                type="text"
                variant="solid"
                {...register('country', {
                  required: 'forms:country-required',
                })}
                error={errors.country?.message}
                lang={lang}
              />

<Input
                label={"State"}
                type="text"
                variant="solid"
                {...register('state', {
                  required: 'forms:state-required',
                })}
                error={errors.state?.message}
                lang={lang}
              />

<Input
                label={"City"}
                type="text"
                variant="solid"
                {...register('city', {
                  required: 'forms:city-required',
                })}
                error={errors.city?.message}
                lang={lang}
              />

<Input
                label={"Pincode "}
                type="number"
                variant="solid"
                {...register('pincode', {
                  required: 'forms:pincode-required',
                })}
                error={errors.pincode?.message}
                lang={lang}
              />

        </div>
        <div className="flex justify-end w-full">
          <Button className="h-11 md:h-12 mt-1.5" type="submit">
            {t('common:text-save-address')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAddressForm;
