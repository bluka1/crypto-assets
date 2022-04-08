import { useContext } from 'react';

import { ReactComponent as LeaveIcon } from '../assets/sign-out.svg';
import { ReactComponent as ArrowIcon } from '../assets/arrow.svg';

import AuthContext from '../store/auth-context';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import toast, { Toaster } from 'react-hot-toast';

const Page: React.FC<{ title: string }> = (props) => {
	const authCtx = useContext(AuthContext);
	const logOut = () => {
		signOut(auth)
			.then(() => {
				toast.success(
					'Sorry to see you go... but you successfully signed out.',
					{ duration: 3000 },
				);
			})
			.catch((error) => {
				toast.error('Something went wrong. ' + error.message);
			});
	};
	return (
		<div className='py-[40px] px-[30px] flex-1 relative overflow-auto scrollbar scroll-smooth'>
			<Toaster position='top-center' />

			<div className='flex justify-between items-center'>
				<h1 className='text-[26px] font-medium'>{props.title}</h1>
				<button className='flex hover:bg-gray-100 justify-between items-center  p-[5px] bg-white rounded-xl gap-[14px]'>
					<div className='flex items-center gap-[14px] p-2' onClick={logOut}>
						<LeaveIcon className='rounded-xl w-[20px] h-[20px]' />
						<span>Sign out</span>
					</div>
				</button>
			</div>
			<div className='mt-[30px] p-[20px] flex-1 bg-white rounded-xl '>
				{props.children}
			</div>
		</div>
	);
};

export default Page;
