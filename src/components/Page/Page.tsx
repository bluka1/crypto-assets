import { Toaster } from 'react-hot-toast';

import { logOut } from '../../firebase';
import { ReactComponent as LeaveIcon } from '../../assets/sign-out.svg';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

const Page: React.FC<{ title: string }> = (props) => {
	const navigate = useNavigate();

	const logoutHandler = () => {
		navigate('/login');
		logOut();
	};

	const authCtx = useContext(AuthContext);

	return (
		<div className="page">
			<Toaster position="top-center" />

			<div className="pageHeader">
				<h1 className="pageHeaderTitle">{props.title}</h1>
				<button className="pageSignOutButton">
					<div className="signOutContent" onClick={logoutHandler}>
						<LeaveIcon className="signOutIcon" />
						<span>{authCtx.name}</span>
					</div>
				</button>
			</div>
			<div className="pageContent">{props.children}</div>
		</div>
	);
};

export default Page;
