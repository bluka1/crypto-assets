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
	const [offset, setOffset] = useState<number>(0);
	const [filterCurrencies, setFilterCurrencies] = useState('');
	const [loading, setLoading] = useState(true);

	const debouncedSearch = useDebounce(filterCurrencies, 1000);

	const offsetHandler = () => {
		setOffset(currencies.length);
	};

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
			const data = await fetch(
				`https://api.coincap.io/v2/assets?limit=30&offset=${offset}`,
			);
			const response = data
				.json()
				.then((data) =>
					setCurrencies((prevState) => [...prevState, ...data.data]),
				)
				.catch((err) => alert(err.message));
		}
		if (!filterCurrencies) {
			fetchAllData();
			setLoading(false);
		}
	}, [filterCurrencies, offset]);

	return (
		<Page title="Dashboard">
			<div className="pageMainContentHeader">
				<h3>Dashboard</h3>
				<div className="searchContainer">
					<input
						type="text"
						placeholder="Search"
						className="searchInput"
						value={filterCurrencies}
						onChange={(e) => setFilterCurrencies(e.target.value)}
					/>
					<div className="searchIconContainer">
						<SearchIcon className="searchIcon" />
					</div>
				</div>
			</div>

			<div>
				<div className="pageMainContentGrid">
					<p>Rank</p>
					<p>Name</p>
					<p>Symbol</p>
					<p>Price</p>
					<p>24h volume</p>
					<p>Supply %</p>
					<p>24h Change</p>
					<p>Info</p>
				</div>
				{currencies.length === 0 && (
					<h1 className="flex justify-center items-center p-4">
						No data fetched
					</h1>
				)}
				{!loading && (
					<div>
						{currencies.map((curr) => (
							<Currency curr={curr} key={curr.id} />
						))}
						{loading && <Loading />}
					</div>
				)}
				{currencies.length > 0 && offset !== null && (
					<div className="flex justify-center items-center pt-6">
						<button
							className="bg-violetPrimary text-white rounded-full animate-pulse py-2 px-4"
							onClick={offsetHandler}
						>
							Load more...
						</button>
					</div>
				)}
			</div>
		</Page>
	);
};

export default Dashboard;
