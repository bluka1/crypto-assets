import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles/tailwind.css';
import App from './App';
import { AuthContextProvider } from './store/auth-context';

ReactDOM.render(
	<AuthContextProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</AuthContextProvider>,
	document.getElementById('root'),
);
