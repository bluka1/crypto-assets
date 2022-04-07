import { NavLink } from 'react-router-dom';

import { ReactComponent as GearIcon } from '../assets/gear-six.svg';
import { ReactComponent as DashIcon } from '../assets/circles-four.svg';
import { ReactComponent as ChartIcon } from '../assets/chart-bar.svg';
import { ReactComponent as StarIcon } from '../assets/star.svg';

import MenuIcon from '../components/MenuIcon';

const Navbar: React.FC = (props) => {
	return (
		<div className='py-[30px] px-[20px] bg-white w-[250px] flex flex-col'>
			<div className='flex justify-center items-center gap-[12px] pb-[36px] border-b-2 border-grayPrimary cursor-pointer'>
				<img
					className='rounded-full w-[36px] h-[36px]'
					src='/images/logo.jpg'
					alt='logo'
				/>
				<h1 className='text-[22px] font-semibold'>Crypto Assets</h1>
			</div>

			<div className='flex flex-1 flex-col justify-between pt-[35px]'>
				<div className='flex flex-col gap-[14px]'>
					<NavLink to='/dashboard'>
						<MenuIcon
							icon={<DashIcon className='w-[16px] h-[16px]' />}
							text='Dashboard'
						/>
					</NavLink>
					<NavLink to='/market'>
						<MenuIcon
							icon={<ChartIcon className='w-[16px] h-[16px]' />}
							text='Market'
						/>
					</NavLink>
					<NavLink to='/favorites'>
						<MenuIcon
							icon={<StarIcon className='w-[16px] h-[16px]' />}
							text='Favorites'
						/>
					</NavLink>
				</div>
				<NavLink to='/settings'>
					<MenuIcon
						icon={<GearIcon className='w-[16px] h-[16px]' />}
						text='Settings'
					/>
				</NavLink>
			</div>
		</div>
	);
};

export default Navbar;
