import { BiCheck } from 'react-icons/bi';
import Scrollbar from '@components/ui/scrollbar';

type ProgressProps = {
  status: string;
};

const statusList = [
  {
      "id": 1,
      "name": "Payment Received",
      "serial": "paid",
      "color": "#02B290",
  },
  {
      "id": 2,
      "name": "In Design",
      "serial": "design",
      "color": "#02B290",
  },
  {
      "id": 3,
      "name": "Dispatched",
      "serial": "dispatched",
      "color": "#FED030",
  },
  {
      "id": 4,
      "name": "Delivered",
      "serial": "delivered",
      "color": "#02B290",
  }
]

const ProgressBox: React.FC<ProgressProps> = ({ status, data }) => {
  return (
    <Scrollbar
      className="w-full h-full"
      options={{
        scrollbars: {
          autoHide: 'never',
        },
      }}
    >
      <div className="flex flex-row flex-wrap w-full pt-8 pb-10">
        {statusList.map((item: any, index: number) => (
          <div className="block w-3/12" key={index}>
            {statusList.findIndex(s => s.serial == status) >= index ? (
              <div className="text-center">
                <div className="relative">
                  <span className="h-[33px] w-[33px] md:h-[55px] md:w-[55px] mx-auto border-solid border-2 md:border-4 border-white flex items-center justify-center bg-brand rounded-full mb-3 z-10 relative">
                    <BiCheck className="text-white" size={25} />
                  </span>
                  <div
                    className={`absolute ${
                      index === 0
                        ? 'w-1/2 ltr:right-0 rtl:left-0'
                        : 'w-full ltr:left-0 rtl:right-0'
                    } ${
                      statusList.length - 1 === index &&
                      'w-1/2 ltr:left-0 rtl:right-0'
                    } top-1/2 transform-[1/2] h-[5px] bg-brand`}
                  ></div>
                </div>
                <p className="text-brand-dark text-[12px] md:text-[14px] font-medium">
                  {item?.name}
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="relative">
                  <span className="h-[33px] w-[33px] md:h-[55px] md:w-[55px] mx-auto border-solid border-2 md:border-4 border-white flex items-center justify-center bg-[#E2E7EC] rounded-full mb-3 z-10 relative">
                    <BiCheck className="text-white" size={25} />
                  </span>
                  <div
                    className={`absolute ${
                      index === 0
                        ? 'w-1/2 ltr:right-0 rtl:left-0'
                        : 'w-full ltr:left-0 rtl:right-0'
                    } ${
                      statusList.length - 1 === index &&
                      'w-1/2 ltr:left-0 rtl:right-0'
                    } top-1/2 transform-[1/2] h-[5px] bg-[#E2E7EC]`}
                  ></div>
                </div>
                <p className="text-brand-dark text-[12px] md:text-[14px] font-medium">
                  {item?.name}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </Scrollbar>
  );
};

export default ProgressBox;
