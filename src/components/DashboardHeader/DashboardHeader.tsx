import React from 'react';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';

const DashboardHeader = (props: {
	filterCurrencies: string | number | readonly string[] | undefined;
	changeHandler: React.ChangeEventHandler<HTMLInputElement> | undefined;
}) => {
	return (
		<div className="flex justify-between items-center">
			<h3>Dashboard</h3>
			<div className="p-[2px] border-[1px] border-graySecondary rounded-xl flex items-center">
				<input
					type="text"
					placeholder="Search"
					className="text-[14px] pl-[10px] border-none outline-none"
					value={props.filterCurrencies}
					onChange={props.changeHandler}
				/>
				<div className="bg-violetPrimary rounded-[10px] cursor-pointer">
					<SearchIcon className="h-[30px] w-[30px] p-[8px] text-white" />
				</div>
			</div>
		</div>
	);
};

export default DashboardHeader;
