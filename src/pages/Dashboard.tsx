import { useEffect, useState } from 'react';

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
// useEffect(() => {
// 	// if (!!debouncedValue) {
// 	// 	setApiPath(`assets?search=${debouncedValue}`);
// 	// }
// 	// else {
// 	// 	setApiPath(`assets?limit=30`);
// 	// }
// }, [debouncedValue]);
// if (filterCurrencies.length > 0) {
// 	setOffset(0);
// 	url = `assets?search=${filterCurrencies}`;
// } else {
// 	url = `assets?limit=30&offset=${offset}`;
// }

const Dashboard: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const debouncedValue = useDebounce(searchQuery, 300);

	const [apiPath, setApiPath] = useState(`assets?limit=30`);
	const { loading, data, error } = useFetch(apiPath);

	console.log('render');

	if (error) {
		toast.error(error);
	}

	return (
		<Page title="Dashboard">
			<DashboardHeader
				handleChange={setSearchQuery}
				filterCurrencies={searchQuery}
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
				{/* {!loading && data.length > 0 && searchQuery.length === 0 && (
					<LoadMore onClick={loadmoreHandler} />
				)} */}
			</div>
		</Page>
	);
};

export default Dashboard;
