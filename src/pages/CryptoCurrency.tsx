import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import Page from '../components/Page/Page';
import Chart from '../components/ResponsiveChart/Chart';
import Loading from '../components/Loading/Loading';

type dataType = {
	price: number;
	date: string;
};

const CryptoCurrency = () => {
	const params = useParams();
	const [dataInfo, setDataInfo] = useState<dataType[]>();
	const [loading, setLoading] = useState(false);
	const now = new Date();
	const aMonthAgo = new Date();
	aMonthAgo.setMonth(now.getMonth() - 1);

	const fetchData = useCallback(() => {
		setLoading(true);
		fetch(
			`https://api.coincap.io/v2/assets/${
				params.currencyId
			}/history?interval=d1&start=${+aMonthAgo}&end=${+now}`,
		)
			.then((res) => res.json())
			.then((data) => {
				setDataInfo(
					data.data.map((value: { priceUsd: number; time: string }) => {
						const formattedDate = formatDate(value.time);

						return {
							price: value.priceUsd,
							date: formattedDate,
						};
					}),
				);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				toast.error('Error: ' + error.message);
			});
	}, []);

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Page title={params.currencyId!.toUpperCase()}>
			{loading && <Loading />}
			<Chart data={dataInfo} />
		</Page>
	);
};

export default CryptoCurrency;
