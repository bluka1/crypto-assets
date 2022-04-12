import { ReactComponent as ArrowUpIcon } from '../../assets/arrow-up.svg';
import { ReactComponent as ArrowDownIcon } from '../../assets/arrow-down.svg';
import { ReactComponent as ChartIcon } from '../../assets/chart-bar.svg';

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
		<div className='currencyGrid'>
			<p className='currencyText'>{props.rank}</p>
			<p className='currencyText'>{props.name}</p>
			<p className='currencyText'>{props.symbol}</p>
			<p className='currencyText'>
				${' '}
				{Number(props.price).toLocaleString(undefined, {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				})}
			</p>
			<p className='currencyText'>
				${' '}
				{Number(props.volume).toLocaleString(undefined, {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				})}
			</p>
			<p className='currencyText'>
				{props.maxSupply
					? Number(
							Math.round((props.supply / props.maxSupply) * 100),
					  ).toLocaleString()
					: Number(Math.round(props.supply)).toLocaleString()}
				{props.maxSupply ? ' %' : ''}
			</p>
			{props.change > 0 ? (
				<div className='currencyGrowth'>
					{<ArrowUpIcon className='growthIcon' />}&nbsp;{' '}
					{Number(props.change).toFixed(2)}%
				</div>
			) : (
				<div className='currencyFall'>
					{<ArrowDownIcon className='fallIcon' />}&nbsp;
					{Number(props.change).toFixed(2)}%
				</div>
			)}

			<div>
				<ChartIcon className='currencyChartIcon' />
			</div>
		</div>
	);
};

export default Currency;
