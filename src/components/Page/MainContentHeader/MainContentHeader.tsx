import React from 'react';

const MainContentHeader = () => {
	return (
		<div className="grid grid-cols-currency mb-[20px] mt-[35px] place-items-center p-[15px] border-b-[1px] bg-white z-10 border-gray-200 sticky top-[-40px]">
			<p>Rank</p>
			<p>Name</p>
			<p>Symbol</p>
			<p>Price</p>
			<p>24h volume</p>
			<p>Supply %</p>
			<p>24h Change</p>
			<p>Info</p>
		</div>
	);
};

export default MainContentHeader;
