import { useCallback, useEffect, useState } from 'react';

import { ReactComponent as SearchIcon } from '../assets/search.svg';

import useDebounce from '../hooks/useDebounce';
import Page from '../components/Page/Page';
import Currency from '../components/Currency/Currency';
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

const Dashboard: React.FC<{ user: boolean }> = (props) => {
	const [currencies, setCurrencies] = useState<CurrencyType[]>([]);
	const [offset, setOffset] = useState(currencies.length);
	const [filterCurrencies, setFilterCurrencies] = useState('');
	const [loading, setLoading] = useState(false);

	const debouncedSearch = useDebounce(filterCurrencies, 750);

	const loadmoreHandler = () => {
		setOffset((prevState) => prevState + 30);
	};

	const fetchData = useCallback(() => {
		setLoading(true);
		setCurrencies([]);
		setOffset(0);
		fetch(`https://api.coincap.io/v2/assets?search=${debouncedSearch}`)
			.then((res) => res.json())
			.then((data) => {
				setCurrencies(data.data);
			})
			.catch((err) => alert(err.message));
		setLoading(false);
	}, [debouncedSearch]);

	const fetchAllData = useCallback(() => {
		setLoading(true);
		fetch(`https://api.coincap.io/v2/assets?limit=30&offset=${offset}`)
			.then((res) => res.json())
			.then((data) =>
				setCurrencies((prevState) => [...prevState, ...data.data]),
			)
			.catch((err) => alert(err.message));
		setLoading(false);
	}, [offset]);

	useEffect(() => {
		if (debouncedSearch) {
			fetchData();
		}
		if (!filterCurrencies) {
			fetchAllData();
		}
	}, [debouncedSearch, fetchData, filterCurrencies, fetchAllData]);

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
				{loading && <Loading />}
				{!loading && currencies.length === 0 && <p>No data fetched.</p>}
				{!loading && (
					<div>
						{currencies.map((curr) => (
							<Currency key={curr.id} curr={curr} />
						))}
					</div>
				)}
				{!loading && currencies.length > 0 && !(filterCurrencies.length > 0) && (
					<div className="loadmoreContainer">
						<button className="loadmoreButton" onClick={loadmoreHandler}>
							Click to load more...
						</button>
					</div>
				)}
			</div>
		</Page>
	);
};

export default Dashboard;
