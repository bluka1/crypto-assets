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
	maxSupply: number;
}> = (props) => {
	return (
		<div className='grid grid-cols-currency place-items-center p-[15px] border-b-[1px] border-grayPrimary drop-shadow-md'>
			<p className='text-[14px]'>{props.rank}</p>
			<p className='text-[14px]'>{props.name}</p>
			<p className='text-[14px]'>{props.symbol}</p>
			<p className='text-[14px]'>$ {Number(props.price).toFixed(2)}</p>
			<p className='text-[14px]'>$ {Number(props.volume).toFixed(2)}</p>
			<p className='text-[14px]'>
				{Number(
					props.maxSupply
						? (props.supply / props.maxSupply) * 100
						: props.supply,
				).toFixed(2)}
				{props.maxSupply ? ' %' : ''}
			</p>
			{props.change > 0 ? (
				<p className='text-[14px] text-green-600'>
					{Number(props.change).toFixed(2)}%
				</p>
			) : (
				<p className='text-[14px] text-red-600'>
					{Number(props.change).toFixed(2)}%
				</p>
			)}

			<div>
				<ChartIcon className='w-[34px] h-[34px] p-[10px] bg-violetPrimary text-white rounded-[15px] cursor-pointer' />
			</div>
		</div>
	);
};

export default Currency;
