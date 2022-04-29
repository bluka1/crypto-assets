import { useEffect, useState } from 'react';

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
//offset: number | null,

const useFetch = (url: string) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<CurrencyType[]>([]);
	const [error, setError] = useState();

	useEffect(() => {
		const controller = new AbortController();
		const fetchData = (url: string) => {
			fetch(`https://api.coincap.io/v2/${url}`, {
				signal: controller.signal,
			})
				.then((res) => res.json())
				.then((data) => {
					if (url.includes('offset')) {
						setData((prevState) => [...prevState, ...data.data]);
					} else {
						setData(data.data);
					}
					setLoading(false);
				})
				.catch((err) => {
					setError(err);
					setLoading(false);
				});
		};

		fetchData(url);

		return () => {
			controller.abort();
		};
	}, [url]);

	return {
		loading,
		data,
		error,
	};
};

export default useFetch;
