import { ReactComponent as ArrowUpIcon } from '../../assets/arrow-up.svg';
import { ReactComponent as ArrowDownIcon } from '../../assets/arrow-down.svg';
import { ReactComponent as ChartIcon } from '../../assets/chart-bar.svg';
import { Link, useNavigate } from 'react-router-dom';
import formatPrice from '../../utils/formatPrice';
import formatSupply from '../../utils/formatSupply';
import formatChange from '../../utils/formatChange';

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
	const navigate = useNavigate();

	const navigateHandler = () => {
		navigate(`/${curr.id}`);
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
				<ChartIcon className="currencyChartIcon" onClick={navigateHandler} />
			</div>
		</div>
	);
};

export default Currency;
