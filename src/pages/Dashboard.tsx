import { useEffect, useState } from 'react';

import { ReactComponent as SearchIcon } from '../assets/search.svg';
import { ReactComponent as StarIcon } from '../assets/star.svg';
import { ReactComponent as ChartIcon } from '../assets/chart-bar.svg';

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

	useEffect(() => {
		fetch('https://api.coincap.io/v2/assets?limit=10')
			.then((res) => res.json())
			.then((data) => {
				let currenciesArray: CurrencyType[] = [];
				data.data.map((currency: CurrencyType) =>
					currenciesArray.push(currency),
				);
				setCurrencies((prevState: CurrencyType[]) => {
					return [...prevState, ...currenciesArray];
				});
			})
			.catch((err) => console.log(err.message));
	}, [setCurrencies]);

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
					/>
					<div className='bg-violetPrimary rounded-[10px] cursor-pointer'>
						<SearchIcon className='h-[30px] w-[30px] p-[8px] text-white' />
					</div>
				</div>
			</div>

			{/* MAIN */}
			<div className=' mt-[35px]'>
				<div className='grid grid-cols-8 mb-[20px] place-items-center p-[15px]'>
					<p>Rank</p>
					<p>Name</p>
					<p>Symbol</p>
					<p>Price</p>
					<p>24h volume</p>
					<p>Supply %</p>
					<p>24h Change</p>
					<p>Info</p>
				</div>
				<div className='overflow-auto'>
					{currencies.map((curr) => (
						<Currency
							key={curr.id}
							rank={curr.rank}
							name={curr.name}
							symbol={curr.symbol}
							price={Math.round((curr.priceUsd * 100) / 100)}
							volume={Math.round((curr.volumeUsd24Hr * 100) / 100)}
							supply={Math.round((curr.supply * 100) / 100)}
							change={Math.round((curr.changePercent24Hr * 100) / 100)}
							// price={curr.priceUsd}
							// volume={curr.volumeUsd24Hr}
							// supply={curr.supply}
							// change={curr.changePercent24Hr}
						/>
					))}
				</div>
				{/* <div className='grid grid-cols-8 place-items-center p-[15px] border-b-[1px] border-grayPrimary drop-shadow-md'>
					<div className='self-center'>
					<StarIcon className='w-[18px] h-[18px] cursor-pointer' />
					</div>
					<p>Bitcoin</p>
					<p>BTC</p>
					<p>$ 40 000,00</p>
					<p>$ 1 000 000 000</p>
					<p>90%</p>
					<p>+10%</p>
					<div>
					<ChartIcon className='w-[30px] h-[30px] text-violetPrimary cursor-pointer place-self-center' />
					</div>
				</div>
				<div className='grid grid-cols-8 place-items-center p-[15px] border-b-[1px] border-grayPrimary drop-shadow-md'>
					<div className='self-center'>
						<StarIcon className='w-[18px] h-[18px] cursor-pointer' />
					</div>
					<p>Ethereum</p>
					<p>ETH</p>
					<p>$ 4 000,00</p>
					<p>$ 1 000 000 000</p>
					<p>~%</p>
					<p>+20%</p>
					<div>
						<ChartIcon className='w-[30px] h-[30px] text-violetPrimary cursor-pointer place-self-center' />
					</div>
				</div>
				<div className='grid grid-cols-8 place-items-center p-[15px] border-b-[1px] border-grayPrimary drop-shadow-md'>
					<div className='self-center'>
						<StarIcon className='w-[18px] h-[18px] cursor-pointer' />
					</div>
					<p>Polkadot</p>
					<p>DOT</p>
					<p>$ 40,00</p>
					<p>$ 1 000 000 000</p>
					<p>80%</p>
					<p>~%</p>
					<div>
						<ChartIcon className='w-[30px] h-[30px] text-violetPrimary cursor-pointer place-self-center' />
					</div>
				</div>
				<div className='grid grid-cols-8 place-items-center p-[15px] border-b-[1px] border-grayPrimary drop-shadow-md'>
					<div className='self-center'>
						<StarIcon className='w-[18px] h-[18px] cursor-pointer' />
					</div>
					<p>Bitcoin</p>
					<p>BTC</p>
					<p>$ 40 000,00</p>
					<p>$ 1 000 000 000</p>
					<p>90%</p>
					<p>+10%</p>
					<div>
						<ChartIcon className='w-[30px] h-[30px] text-violetPrimary cursor-pointer place-self-center' />
					</div>
				</div> */}
			</div>
		</Page>
	);
};

export default Dashboard;
