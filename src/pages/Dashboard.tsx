import { useState } from 'react';

import useDebounce from '../hooks/useDebounce';
import Page from '../components/Page/Page';
import Currency from '../components/Currency/Currency';
import Loading from '../components/Loading/Loading';
import useFetch from '../hooks/useFetch';
import MainContentHeader from '../components/Page/MainContentHeader/MainContentHeader';
import LoadMore from '../components/LoadMore/LoadMore';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import toast from 'react-hot-toast';

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

// const [currencies, setCurrencies] = useState<CurrencyType[]>([]);
//const [offset, setOffset] = useState(currencies.length);
// const currenciesHandler = (data: CurrencyType[]) => {
// 	setCurrencies(data);
// }
//useEffect(() => {}, [filterCurrencies, offset]);

const Dashboard: React.FC = () => {
	const [filterCurrencies, setFilterCurrencies] = useState<string>('');

	const debouncedValue = useDebounce(filterCurrencies, 750);
	const { loading, data, error, loadmoreHandler } = useFetch(filterCurrencies);

	console.log(data);

	if (error) {
		toast.error(error);
	}

	return (
		<Page title="Dashboard">
			<DashboardHeader
				changeHandler={(e) => setFilterCurrencies(e.target.value)}
				filterCurrencies={filterCurrencies}
			/>
			<div>
				<MainContentHeader />
				{loading && <Loading />}
				{!loading && data.length === 0 && <p>No data fetched.</p>}
				{!loading && (
					<div>
						{data.map((currency) => (
							<Currency key={currency.id} currency={currency} />
						))}
					</div>
				)}
				{!loading && data.length > 0 && filterCurrencies.length === 0 && (
					<LoadMore onClick={loadmoreHandler} />
				)}
			</div>
		</Page>
	);
};

export default Dashboard;
