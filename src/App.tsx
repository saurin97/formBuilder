import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import './styles/app.scss';
import Forms from './features/forms/container/forms';
import Form from './features/form/container/form';
import store from './store';

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Suspense fallback={<div>Loading...</div>}>
					<Switch>
						<Route exact path='/forms' component={Forms} />
						<Route exact path='/form/:id' component={Form} />
						<Redirect exact to='/forms' />
					</Switch>
				</Suspense>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
