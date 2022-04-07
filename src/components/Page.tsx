import { ReactComponent as UserIcon } from '../assets/user.svg';
import { ReactComponent as ArrowIcon } from '../assets/arrow.svg';

const Page: React.FC<{ title: string }> = (props) => {
	return (
		<div className='py-[40px] px-[30px] flex-1 relative'>
			<div className='flex justify-between items-center'>
				<h1 className='text-[26px] font-medium'>{props.title}</h1>
				<button className='flex hover:bg-gray-100 justify-between items-center  p-[5px] bg-white rounded-xl gap-[14px]'>
					<div className='flex items-center gap-[14px]'>
						<UserIcon className='rounded-xl w-[38px] h-[38px]' />
						<span>Luka Batarelo</span>
					</div>
					<ArrowIcon className='w-[24px] h-[24px]' />
				</button>
			</div>
			<div className='mt-[30px] p-[20px] flex-1 bg-white rounded-xl'>
				{props.children}
			</div>
		</div>
	);
};

export default Page;
