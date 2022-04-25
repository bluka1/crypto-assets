import { useCallback, useEffect, useState } from 'react';

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
const useFetch = (debouncedValue: string | null) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<CurrencyType[]>([]);
	const [error, setError] = useState();
	const [offset, setOffset] = useState(data.length);

	const loadmoreHandler = useCallback(() => {
		setOffset((prevState) => prevState + 30);
	}, []);

	let controller = new AbortController();
	let url: string;

	const fetchData = useCallback(() => {
		if (!!debouncedValue) {
			setData([]);
			url = `https://api.coincap.io/v2/assets?&search=${debouncedValue}`;
		}
		if (!!offset) {
			url = `https://api.coincap.io/v2/assets?limit=30`;
		} else {
			url = `https://api.coincap.io/v2/assets?limit=30&offset=${offset}`;
		}

		fetch(url, {
			signal: controller?.signal,
		})
			.then((res) => res.json())
			.then((data) => {
				if (offset) {
					setData((prevState) => [...prevState, data.data]);
				} else {
					setData(data.data);
				}
				setLoading(false);
			})
			.catch((err) => {
				setError(err);
				setLoading(false);
			});
	}, [debouncedValue, offset, controller]);

	useEffect(() => {
		fetchData();
		return () => controller?.abort();
	}, []);

	return {
		loading,
		data,
		error,
		loadmoreHandler,
	};
};

export default useFetch;
