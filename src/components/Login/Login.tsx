import { useNavigate } from 'react-router-dom';

const Login = (props: any) => {
	const navigate = useNavigate();
	const loginHandler = () => {
		props.login().then(() => navigate('/'));
	};
	return (
		<>
			<div className="appContent">
				<img className="logo" src="/images/logo.jpg" alt="logo" />
				<h1 className="logoText">Crypto Assets</h1>
			</div>
			<button className="signInButton" onClick={loginHandler}>
				<img
					className="signInWithGoogleIcon"
					src="/images/google.jpg"
					alt="google sign"
				/>
				Sign In with Google
			</button>
		</>
	);
};

export default Login;
