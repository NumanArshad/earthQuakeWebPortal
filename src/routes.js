import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EarthQuakeView from './components/earthQuake/earthQuake-View'
const Root = () => (
	<BrowserRouter>
		<Switch>
		  <Route exact path="/" component={EarthQuakeView} />
		</Switch>
	</BrowserRouter>
);
export default Root;
