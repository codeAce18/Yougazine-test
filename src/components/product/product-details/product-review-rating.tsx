import { useEffect, type FC, useState } from 'react';

import ReviewCard from '@components/cards/review-card';
import ReviewForm from '@components/common/form/review-form';
import { useTranslation } from 'src/app/i18n/client';
import http from '@framework/utils/http';

const ProductReviewRating: FC<{ lang: string, template: string }> = ({ lang, template }) => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await http.get(`/review?id=${template}`);
      setReviews(res.data.data);
    };

    getData();
  },[])
  return (
    <div className="lg:flex">
      <div className="pt-2 grow">
        {reviews?.map((item) => (
          <ReviewCard item={item} key={`review-key-${item._id}`} lang={lang} />
        ))}
      </div>
      <ReviewForm
        className="lg:w-[500px] xl:w-[540px] 2xl:w-[600px] 3xl:w-[730px] lg:ltr:pl-10 lg:rtl:pr-10 xl:ltr:pl-14 xl:rtl:pr-14 3xl:ltr:pl-20 3xl:rtl:pr-20 shrink-0 pt-10"
        lang={lang}
        template={template}
      />
    </div>
  );
};

export default ProductReviewRating;
