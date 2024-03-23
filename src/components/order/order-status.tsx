import { useOrderStatusQuery } from '@framework/order/order-status';
import ProgressBox from './progress-box';

interface Props {
  status: string;
}

const OrderStatus = ({ status }: Props) => {
  return (<ProgressBox status={status} />);
};

export default OrderStatus;
