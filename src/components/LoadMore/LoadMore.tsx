import React from 'react';

const LoadMore = (props: {
	onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
	return (
		<div className="flex justify-center items-center p-5 mt-4">
			<button
				className="bg-violetPrimary text-white rounded-full animate-pulse py-2 px-10 flex items-center justify-center"
				onClick={props.onClick}
			>
				Click to load more...
			</button>
		</div>
	);
};

export default LoadMore;
