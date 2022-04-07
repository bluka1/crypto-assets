import { ReactComponent as StarIcon } from '../assets/star.svg';
import { ReactComponent as ChartIcon } from '../assets/chart-bar.svg';

const Currency: React.FC<{
	rank: string;
	name: string;
	symbol: string;
	price: number;
	volume: number;
	supply: number;
	change: number;
}> = (props) => {
	return (
		<div className='grid grid-cols-8 place-items-center p-[15px] border-b-[1px] border-grayPrimary drop-shadow-md'>
			<p>{props.rank}</p>
			<p>{props.name}</p>
			<p>{props.symbol}</p>
			<p>$ {props.price}</p>
			<p>$ {props.volume}</p>
			<p>{props.supply}</p>
			<p>{props.change}%</p>
			<div>
				<ChartIcon className='w-[30px] h-[30px] text-violetPrimary cursor-pointer' />
			</div>
		</div>
	);
};

export default Currency;
