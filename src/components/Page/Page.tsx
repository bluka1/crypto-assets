import { Toaster } from 'react-hot-toast';

import { logOut } from '../../firebase';
import { ReactComponent as LeaveIcon } from '../../assets/sign-out.svg';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Page: React.FC<{ title: string }> = (props) => {
	const navigate = useNavigate();
	const logoutHandler = () => {
		logOut();
		navigate('/');
	};
	return (
		<div className="pageLayout">
			<Navbar />
			<div className="page">
				<Toaster position="top-center" />

				<div className="pageHeader">
					<h1 className="pageHeaderTitle">{props.title}</h1>
					<button className="pageSignOutButton">
						<div className="signOutContent" onClick={logoutHandler}>
							<LeaveIcon className="signOutIcon" />
							<span>Sign out</span>
						</div>
					</button>
				</div>
				<div className="pageContent">{props.children}</div>
			</div>
		</div>
	);
};

export default Page;
