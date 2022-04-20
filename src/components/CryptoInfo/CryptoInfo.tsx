import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import Page from '../Page/Page';
import Chart from '../ResponsiveChart/Chart';

type dataType = {
	price: number;
	date: string;
};

const CryptoInfo = () => {
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
						const fd = formatDate(value.time);

						return {
							price: value.priceUsd,
							date: fd,
						};
					}),
				);
			})
			.catch((err) => alert(err.message));
		setLoading(false);
	}, []);

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Page title={params.currencyId!.toUpperCase()}>
			<Chart data={dataInfo} />
		</Page>
	);
};

export default CryptoInfo;
