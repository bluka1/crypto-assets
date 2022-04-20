const formatPrice = (price: number) => {
	return Number(price).toLocaleString(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
};

export default formatPrice;
