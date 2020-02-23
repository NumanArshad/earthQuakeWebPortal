import React, { useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import DenseAppBar from './appBar'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import SimpleTabs from './Tabs'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
class EarthQuakeDetail extends React.Component {
    constructor(props) {
        super(props);
        // const [user,setUser]=useState('');
        this.state = {
            user: '',loading:false
        }
    }

formatDate=(number)=>{
    var month=[
        'January',
        'February',
        'March',
        'April' ,'May', 'June', 'July', 'August', 'September',
         'October' ,'November', 'December'
        ]
        var d = new Date(number);
        var formattedDate =  d.getDate() + " " + month[(d.getMonth() + 1)] + " " + d.getFullYear();
        var hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
        var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
        var formattedTime = hours + ":" + minutes;
        var timeMedium='PM';
      if(hours<12){
        timeMedium='AM'
      }
        formattedDate = formattedDate + " - " + formattedTime + " " + timeMedium;
        return formattedDate
}


    render() {

       
     
        return (
            <div>

                <Grid container direction="row" style={{marginBo:20}}>
                    <Grid item>

                        <TextField label="Enter Id" placeholder="Earthquake Id"
                            onChange={(event) => this.setState({ user: event.target.value })} />
                    </Grid>
                    <Grid item>
                        <Button color="primary" variant="contained"  onClick={() => this.props.earthQuakeDetail==undefined?(this.setState({loading:true}),this.props.getSpecific(this.state.user)):null}>
                        Retrieve</Button>
                    </Grid>
                </Grid>
                {this.state.loading && this.props.earthQuakeDetail === undefined ?<div>Loading...</div>:null}
                {this.props.earthQuakeDetail !== undefined ?
                    <Grid container direction="column">
                        <Grid item>
                            <span style={{fontWeight:'bold'}}>ID : </span> {this.props.earthQuakeDetail.properties.ids}
                        </Grid>
                        <Grid item>
                        <span style={{fontWeight:'bold'}}> Magnitude : </span>  {this.props.earthQuakeDetail.properties.mag}
                        </Grid>
                        <Grid item>
                        <span style={{fontWeight:'bold'}}>Place: </span>{this.props.earthQuakeDetail.properties.place}
                        </Grid>
                        <Grid item>
                        <span style={{fontWeight:'bold'}}> Time : </span> {this.formatDate(this.props.earthQuakeDetail.properties.time)}
                            {/* {this.props.earthQuakeDetail.properties.products.origin[0].properties.eventtime} */}
                        </Grid>
                        <Grid item>
                        <span style={{fontWeight:'bold'}}>  More Information : </span>
                            <a href={this.props.earthQuakeDetail.properties.url} target="_blank">
                            {this.props.earthQuakeDetail.properties.url} </a>
                        </Grid>
                        <Grid item>
                        <span style={{fontWeight:'bold'}}> Coordinates : </span> {this.props.earthQuakeDetail.geometry.coordinates[0]} ,
                           {this.props.earthQuakeDetail.geometry.coordinates[1]}
                        </Grid>
                    </Grid> : <div>Enter EarthQuake Id to get EarthQuakeDetail</div>}


            </div >

        );
    }
    //	const classes = useStyles();
}
export default EarthQuakeDetail;
