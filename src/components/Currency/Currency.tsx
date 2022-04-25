import { ReactComponent as ArrowUpIcon } from '../../assets/arrow-up.svg';
import { ReactComponent as ArrowDownIcon } from '../../assets/arrow-down.svg';
import { ReactComponent as ChartIcon } from '../../assets/chart-bar.svg';
import { useNavigate } from 'react-router-dom';
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

const Currency: React.FC<{ currency: CurrencyType }> = ({ currency }) => {
	const navigate = useNavigate();

	const navigateHandler = () => {
		navigate(`/c/${currency.id}`);
	};

	return (
		<div className="grid grid-cols-currency place-items-center p-[15px] border-b-[1px] border-grayPrimary drop-shadow-md">
			<p className="text-[14px]">{currency.rank}</p>
			<p className="text-[14px]">{currency.name}</p>
			<p className="text-[14px]">{currency.symbol}</p>
			<p className="text-[14px]">$ {formatPrice(currency.priceUsd)}</p>
			<p className="text-[14px]">$ {formatPrice(currency.volumeUsd24Hr)}</p>
			<p className="text-[14px]">
				{currency.maxSupply
					? formatSupply((currency.supply / currency.maxSupply) * 100)
					: formatSupply(currency.supply)}
				{currency.maxSupply ? ' %' : ''}
			</p>
			{currency.changePercent24Hr > 0 ? (
				<div className="flex text-[14px] items-center text-green-600">
					{<ArrowUpIcon className="text-green-500 w-[22px] h-[22px]" />}&nbsp;{' '}
					{formatChange(currency.changePercent24Hr)}%
				</div>
			) : (
				<div className="flex text-[14px] items-center text-red-600">
					{<ArrowDownIcon className="text-red-500 w-[22px] h-[22px]" />}&nbsp;
					{formatChange(currency.changePercent24Hr)}%
				</div>
			)}

			<div>
				<ChartIcon
					className="w-[34px] h-[34px] p-[10px] bg-violetPrimary text-white rounded-[15px] cursor-pointer"
					onClick={navigateHandler}
				/>
			</div>
		</div>
	);
};

export default Currency;
