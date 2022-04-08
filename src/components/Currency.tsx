import { ReactComponent as ArrowUpIcon } from '../assets/arrow-up.svg';
import { ReactComponent as ArrowDownIcon } from '../assets/arrow-down.svg';
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
			<p className='text-[14px]'>
				${' '}
				{Number(props.price).toLocaleString(undefined, {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				})}
			</p>
			<p className='text-[14px]'>
				${' '}
				{Number(props.volume).toLocaleString(undefined, {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				})}
			</p>
			<p className='text-[14px]'>
				{props.maxSupply
					? Number(
							Math.round((props.supply / props.maxSupply) * 100),
					  ).toLocaleString()
					: Number(Math.round(props.supply)).toLocaleString()}
				{props.maxSupply ? ' %' : ''}
			</p>
			{props.change > 0 ? (
				<div className='flex text-[14px] items-center text-green-600'>
					{<ArrowUpIcon className='text-green-500 w-[22px] h-[22px]' />}&nbsp;{' '}
					{Number(props.change).toFixed(2)}%
				</div>
			) : (
				<div className='flex text-[14px] items-center text-red-600 '>
					{<ArrowDownIcon className='text-red-500 w-[22px] h-[22px]' />}&nbsp;
					{Number(props.change).toFixed(2)}%
				</div>
			)}

			<div>
				<ChartIcon className='w-[34px] h-[34px] p-[10px] bg-violetPrimary text-white rounded-[15px] cursor-pointer' />
			</div>
		</div>
	);
};

export default Currency;
