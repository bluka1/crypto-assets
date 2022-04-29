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

const Dashboard: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [offset, setOffset] = useState(0);
	const debouncedValue = useDebounce(searchQuery, 300);

	const [apiPath, setApiPath] = useState(`assets?limit=30`);
	const { loading, data, error } = useFetch(apiPath);

	if (error) {
		toast.error(error);
	}

	useEffect(() => {
		if (searchQuery.length > 0) {
			setOffset(0);
			setApiPath(`assets?search=${debouncedValue}`);
		} else {
			if (apiPath !== `assets?limit=30`) {
				setApiPath(`assets?limit=30`);
			}
		}
	}, [searchQuery, debouncedValue]);

	useEffect(() => {
		if (offset > 0) {
			setApiPath(`assets?limit=30&offset=${offset}`);
		}
	}, [offset]);

	const loadmoreHandler = () => {
		setOffset((prevState) => prevState + 30);
	};

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
				{!loading && data.length > 0 && searchQuery.length === 0 && (
					<LoadMore onClick={loadmoreHandler} />
				)}
			</div>
		</Page>
	);
};

export default Dashboard;
