import { ReactComponent as ArrowUpIcon } from '../../assets/arrow-up.svg';
import { ReactComponent as ArrowDownIcon } from '../../assets/arrow-down.svg';
import { ReactComponent as ChartIcon } from '../../assets/chart-bar.svg';

type CurrencyType = {
	id: string;
	rank: string;
	symbol: string;
	name: string;
	supply: number;
	maxSupply: number;
	marketCapUsd: number;
	volumeUsd24Hr: number;
	priceUsd: number;
	changePercent24Hr: number;
	vWap24Hr: number;
	explorer: string;
};

const Currency: React.FC<{ curr: CurrencyType }> = ({ curr }) => {
	const formatPrice = (price: number) => {
		return Number(price).toLocaleString(undefined, {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	};
	const formatSupply = (supply: number) => {
		return Number(Math.round(supply)).toLocaleString();
	};
	const formatChange = (change: number) => {
		return Number(change).toFixed(2);
	};
	return (
		<div className="currencyGrid">
			<p className="currencyText">{curr.rank}</p>
			<p className="currencyText">{curr.name}</p>
			<p className="currencyText">{curr.symbol}</p>
			<p className="currencyText">$ {formatPrice(curr.priceUsd)}</p>
			<p className="currencyText">$ {formatPrice(curr.volumeUsd24Hr)}</p>
			<p className="currencyText">
				{curr.maxSupply
					? formatSupply((curr.supply / curr.maxSupply) * 100)
					: formatSupply(curr.supply)}
				{curr.maxSupply ? ' %' : ''}
			</p>
			{curr.changePercent24Hr > 0 ? (
				<div className="currencyGrowth">
					{<ArrowUpIcon className="growthIcon" />}&nbsp;{' '}
					{formatChange(curr.changePercent24Hr)}%
				</div>
			) : (
				<div className="currencyFall">
					{<ArrowDownIcon className="fallIcon" />}&nbsp;
					{formatChange(curr.changePercent24Hr)}%
				</div>
			)}

			<div>
				<ChartIcon className="currencyChartIcon" />
			</div>
		</div>
	);
};

export default Currency;
