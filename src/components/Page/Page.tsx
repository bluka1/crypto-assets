import { Toaster } from 'react-hot-toast';

import { logOut } from '../../firebase';
import { ReactComponent as LeaveIcon } from '../../assets/sign-out.svg';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { useContext } from 'react';
import AuthContext from '../../context/auth-context';

const Page: React.FC<{ title: string }> = (props) => {
	const navigate = useNavigate();
	const authCtx = useContext(AuthContext);

	const logoutHandler = () => {
		logOut();
		navigate('/');
	};

	return (
		<div className="h-screen w-screen bg-stone-50 flex border-2 border-grayPrimary">
			<Navbar />
			<div className="py-[40px] px-[30px] flex-1 relative overflow-auto scrollbar">
				<Toaster position="top-center" />

				<div className="flex justify-between items-center">
					<h1 className="text-[26px] font-medium">{props.title}</h1>
					<button className="flex hover:bg-gray-100 justify-between items-center p-[5px] bg-white rounded-xl gap-[14px]">
						<div
							className="flex items-center gap-[14px] p-2"
							onClick={logoutHandler}
						>
							<LeaveIcon className="rounded-xl w-[20px] h-[20px]" />
							<span>{authCtx.username}</span>
						</div>
					</button>
				</div>
				<div className="mt-[30px] p-[20px] flex-1 bg-white rounded-xl">
					{props.children}
				</div>
			</div>
		</div>
	);
};

export default Page;
