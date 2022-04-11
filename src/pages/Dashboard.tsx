import { useCallback, useEffect, useState } from 'react';

import { ReactComponent as SearchIcon } from '../assets/search.svg';

import Page from '../components/Page/Page';
import Currency from '../components/Currency/Currency';
import useDebounce from '../hooks/useDebounce';
import Loading from '../components/Loading/Loading';

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

const Dashboard: React.FC<{}> = (props) => {
	const [currencies, setCurrencies] = useState<CurrencyType[]>([]);
	const [filterCurrencies, setFilterCurrencies] = useState('');
	const [loading, setLoading] = useState(true);

	const debouncedSearch = useDebounce(filterCurrencies, 1000);

	useEffect(() => {
		async function fetchData() {
			setCurrencies([]);
			const data = await fetch(
				`https://api.coincap.io/v2/assets?search=${debouncedSearch}`,
			);
			const response = data
				.json()
				.then((data) => {
					setCurrencies([...data.data]);
				})
				.catch((err) => alert(err.message));
		}

		if (debouncedSearch) {
			fetchData();
			setLoading(false);
		}
	}, [debouncedSearch]);

	useEffect(() => {
		async function fetchAllData() {
			const data = await fetch(`https://api.coincap.io/v2/assets?limit=30`);
			const response = data
				.json()
				.then((data) => setCurrencies([...data.data]))
				.catch((err) => alert(err.message));
		}
		if (!filterCurrencies) {
			fetchAllData();
			setLoading(false);
		}
	}, [filterCurrencies]);

	return (
		<Page title='Dashboard'>
			<div className='pageMainContentHeader'>
				<h3>Dashboard</h3>
				<div className='searchContainer'>
					<input
						type='text'
						placeholder='Search'
						className='searchInput'
						value={filterCurrencies}
						onChange={(e) => setFilterCurrencies(e.target.value)}
					/>
					<div className='searchIconContainer'>
						<SearchIcon className='searchIcon' />
					</div>
				</div>
			</div>

			<div>
				<div className='pageMainContentGrid'>
					<p>Rank</p>
					<p>Name</p>
					<p>Symbol</p>
					<p>Price</p>
					<p>24h volume</p>
					<p>Supply %</p>
					<p>24h Change</p>
					<p>Info</p>
				</div>
				{!loading && (
					<div>
						{currencies.map((curr) => (
							<Currency
								key={curr.id}
								rank={curr.rank}
								name={curr.name}
								symbol={curr.symbol}
								price={curr.priceUsd}
								volume={curr.volumeUsd24Hr}
								supply={curr.supply}
								change={curr.changePercent24Hr}
								maxSupply={curr.maxSupply}
							/>
						))}
						{loading && <Loading />}
					</div>
				)}
			</div>
		</Page>
	);
};

export default Dashboard;
