import { QueryClient, QueryClientProvider } from 'react-query';
import AppMain from './components/app-main';
import './app.css';

export const queryClient = new QueryClient();

/**
 * Create an app with the standard wrappers required (ReactQuery, Intl, Redux, etc)
 */
function AppWithWrappers() {
	return (
		<QueryClientProvider client={queryClient}>
			<AppMain />
		</QueryClientProvider>
	);
}

export default AppWithWrappers;
