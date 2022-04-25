import { useNavigate } from 'react-router-dom';

const Login = (props: any) => {
	const navigate = useNavigate();
	const loginHandler = (props: any) => {
		props.login();
		navigate('/');
	};
	return (
		<>
			<div className="flex justify-center items-center p-[20px] lg:p-[38px] border-b-2 border-grayPrimary font-semibold">
				<img
					className="mr-[32px] rounded-full"
					src="/images/logo.jpg"
					alt="logo"
				/>
				<h1 className="text-[40px] lg:text-[64px]">Crypto Assets</h1>
			</div>
			<button
				className="flex justify-center items-center mt-[42px] px-14 py-2 rounded-lg border-2 border-grayPrimary"
				onClick={loginHandler}
			>
				<img className="mr-[10px]" src="/images/google.jpg" alt="google sign" />
				Sign In with Google
			</button>
		</>
	);
};

export default Login;
