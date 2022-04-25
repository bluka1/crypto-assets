import { ReactElement } from 'react';

const MenuIcon: React.FC<{ icon: ReactElement; text: string }> = ({
	icon,
	text,
}) => {
	return (
		<div className="flex gap-[10px] justify-start p-[16px] items-center hover:bg-violet-50 rounded-2xl cursor-pointer">
			{icon}
			<p>{text}</p>
		</div>
	);
};

export default MenuIcon;
