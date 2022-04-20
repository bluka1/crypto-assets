const formatDate = (time: string | number | Date) => {
	const fdate = new Date(time).getDate();
	const fmonth = new Date(time).getMonth() + 1;
	const fyear = new Date(time).getFullYear();

	return `${fdate}.${fmonth}.${fyear}`;
};

export default formatDate;
