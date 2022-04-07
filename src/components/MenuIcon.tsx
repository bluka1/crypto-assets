import { ReactElement } from 'react';

const MenuIcon: React.FC<{ icon: ReactElement; text: string }> = ({
	icon,
	text,
}) => {
	return (
		<div className='menuIcon'>
			{icon}
			<p>{text}</p>
		</div>
	);
};

export default MenuIcon;
