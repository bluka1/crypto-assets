import { Toaster } from 'react-hot-toast';

import { logOut } from '../../firebase';
import { ReactComponent as LeaveIcon } from '../../assets/sign-out.svg';

const Page: React.FC<{ title: string }> = (props) => {
	return (
		<div className="page">
			<Toaster position="top-center" />

			<div className="pageHeader">
				<h1 className="pageHeaderTitle">{props.title}</h1>
				<button className="pageSignOutButton">
					<div className="signOutContent" onClick={logOut}>
						<LeaveIcon className="signOutIcon" />
						<span>Sign out</span>
					</div>
				</button>
			</div>
			<div className="pageContent">{props.children}</div>
		</div>
	);
};

export default Page;
