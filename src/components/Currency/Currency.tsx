import { ReactComponent as ArrowUpIcon } from '../../assets/arrow-up.svg';
import { ReactComponent as ArrowDownIcon } from '../../assets/arrow-down.svg';
import { ReactComponent as ChartIcon } from '../../assets/chart-bar.svg';

const Currency: React.FC<{
	curr: {
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
}> = ({ curr }) => {
	const formatPrice = (num: number) => {
		return Number(num).toLocaleString(undefined, {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	};

	const formatSupply = (num: number) => {
		return Number(Math.round(num)).toLocaleString();
	};

	const formatPercent = (num: number) => {
		return Number(num).toFixed(2);
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
					{formatPercent(curr.changePercent24Hr)}%
				</div>
			) : (
				<div className="currencyFall">
					{<ArrowDownIcon className="fallIcon" />}&nbsp;
					{formatPercent(curr.changePercent24Hr)}%
				</div>
			)}

			<div>
				<ChartIcon className="currencyChartIcon" />
			</div>
		</div>
	);
};

export default Currency;
