import { useEffect, useState } from 'react';

import { ReactComponent as SearchIcon } from '../assets/search.svg';

import Page from '../components/Page';
import Currency from '../components/Currency';

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

	const filterHandler = (e: React.FormEvent<HTMLInputElement>) => {
		setFilterCurrencies(e.currentTarget.value);
		console.log(e.currentTarget.value);
	};

	useEffect(() => {
		setTimeout(() => {
			fetch(`https://api.coincap.io/v2/assets?search=${filterCurrencies}`)
				.then((res) => res.json())
				.then((data) => {
					let currenciesArray: CurrencyType[] = [];
					data.data.map((currency: CurrencyType) =>
						currenciesArray.push(currency),
					);
					setCurrencies((prevState: CurrencyType[]) => {
						return [...currenciesArray];
					});
				})
				.catch((err) => console.log(err.message));
		}, 1000);

		return () => {
			clearTimeout();
		};
	}, [filterCurrencies]);

	return (
		<Page title='Dashboard'>
			{/* TOP */}
			<div className='flex justify-between items-center '>
				<h3>Dashboard</h3>
				<div className='p-[2px] border-[1px] border-graySecondary rounded-xl flex items-center'>
					<input
						type='text'
						placeholder='Search'
						className='text-[14px] pl-[10px] border-none outline-none '
						value={filterCurrencies}
						onChange={filterHandler}
					/>
					<div className='bg-violetPrimary rounded-[10px] cursor-pointer'>
						<SearchIcon className='h-[30px] w-[30px] p-[8px] text-white' />
					</div>
				</div>
			</div>

			{/* MAIN */}
			<div className=''>
				<div className=' grid grid-cols-currency mb-[20px] mt-[35px] place-items-center p-[15px] border-b-[1px] bg-white z-10 border-gray-200 sticky top-[-40px]'>
					<p>Rank</p>
					<p>Name</p>
					<p>Symbol</p>
					<p>Price</p>
					<p>24h volume</p>
					<p>Supply %</p>
					<p>24h Change</p>
					<p>Info</p>
				</div>
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
				</div>
			</div>
		</Page>
	);
};

export default Dashboard;
