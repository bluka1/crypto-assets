import { NavLink } from 'react-router-dom';

import { ReactComponent as GearIcon } from '../../assets/gear-six.svg';
import { ReactComponent as DashIcon } from '../../assets/circles-four.svg';
import { ReactComponent as ChartIcon } from '../../assets/chart-bar.svg';
import { ReactComponent as StarIcon } from '../../assets/star.svg';

import MenuIcon from '../MenuIcon/MenuIcon';

const Navbar: React.FC = (props) => {
	return (
		<div className='navbar'>
			<div className='navbarHeader'>
				<img className='navbarLogo' src='/images/logo.jpg' alt='logo' />
				<h1 className='navbarText'>Crypto Assets</h1>
			</div>

			<div className='navbarMain'>
				<div className='navbarMainItems'>
					<NavLink to='/dashboard'>
						<MenuIcon
							icon={<DashIcon className='menuSvg' />}
							text='Dashboard'
						/>
					</NavLink>
					<NavLink to='/market'>
						<MenuIcon icon={<ChartIcon className='menuSvg' />} text='Market' />
					</NavLink>
					<NavLink to='/favorites'>
						<MenuIcon
							icon={<StarIcon className='menuSvg' />}
							text='Favorites'
						/>
					</NavLink>
				</div>
				<NavLink to='/settings'>
					<MenuIcon icon={<GearIcon className='menuSvg' />} text='Settings' />
				</NavLink>
			</div>
		</div>
	);
};

export default Navbar;
