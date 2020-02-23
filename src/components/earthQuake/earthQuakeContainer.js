import React, { useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import DenseAppBar from './appBar'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import SimpleTabs from './Tabs'

function EarthQuakeContainer(props) {
	return (
		<div>
			<DenseAppBar />
			<CssBaseline />
			<div style={{ marginLeft: 20, marginRight: 20 }}>

				<br />

				<SimpleTabs list={props.list} getSpecific={props.getSpecific}
					earthQuakeDetail={props.earthQuakeDetail} 
					postData={props.postData}
					/>

			</div>
		</div >

	);
}
export default withRouter(EarthQuakeContainer);
