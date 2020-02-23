import React from 'react';
import { withStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit'
import { TextField } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
// import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: 30,//theme.spacing.unit * 3 ,
    width: '100%',
    overflowX: 'auto',
    marginBottom: 20,//theme.spacing.unit *2,
    padding: 15
  },
  table: {
    width: '100%',
    //  minWidth: 650,
    marginTop: 10
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  textField: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    width:'100%'
  },
  formControl: {
    marginTop: 20,//theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: 10//theme.spacing(1),
  },
});

class DenseTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchText: '',open:false,fullWidth:true,maxWidth:'sm' ,
  id:'',mag:0.0,place:'',time:'edf',longitude:0.0,latitude:0.0}
    
  }

  formatDate = (number) => {
    var month = [
      'January',
      'February',
      'March',
      'April', 'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December'
    ]
    var d = new Date(number);
    var formattedDate = d.getDate() + " " + month[(d.getMonth() + 1)] + " " + d.getFullYear();
    var hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
    var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
    var formattedTime = hours + ":" + minutes;
    var timeMedium = 'PM';
    if (hours < 12) {
      timeMedium = 'AM'
    }
    formattedDate = formattedDate + " - " + formattedTime + " " + timeMedium;
    return formattedDate
  }

  showData = row => {
    if (this.state.searchText !== "" && row.Place.toLowerCase().indexOf(this.state.searchText.toLowerCase()) === -1) {
      return null;
    }
    return <TableRow key={row.Id}>
         <TableCell component="th" scope="row">
        {row.Id}
      </TableCell>

      <TableCell align="right">{row.Magnitude}</TableCell>
      <TableCell align="right">{row.Place}</TableCell>
      <TableCell align="right">{row.Time}</TableCell>
      <TableCell align="right">
        <a href={row.MoreInfo} target="_blank">{row.MoreInfo}</a></TableCell>
      <TableCell align="right">{row.Longitude}</TableCell>
      <TableCell align="right">{row.Latitude}</TableCell>
      {/* <TableCell component="th" scope="row">
        {row.id}
      </TableCell>

      <TableCell align="right">{row.properties.mag}</TableCell>
      <TableCell align="right">{row.properties.place}</TableCell>
      <TableCell align="right">{this.formatDate(row.properties.time)}</TableCell>
      <TableCell align="right">
        <a href={row.properties.url} target="_blank">{row.properties.url}</a></TableCell>
      <TableCell align="right">{row.geometry.coordinates[0]}</TableCell>
      <TableCell align="right">{row.geometry.coordinates[1]}</TableCell> */}
      <TableCell align="right"><EditIcon /></TableCell>
    </TableRow>


  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}
      >
        <Paper className={classes.paper}
        >

       {/**modal */}
 <Dialog
      //  fullWidth={this.state.fullWidth}
        maxWidth={this.state.maxWidth}
        open={this.state.open}
        onClose={()=>this.setState({open:false})}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText>
<Grid container spacing={4} direction="row">

      <Grid item lg={6} md={6} sm={6} xs={12}>
      <TextField
        id="standard-with-placeholder"
        label="With placeholder"
        placeholder="magnitude"
        className={classes.textField}
        onChange={(event)=>this.setState({mag:event.target.value})}
       // margin="normal"
      />
      </Grid>
      <Grid item lg={6} md={6} sm={6} xs={12}>
      <TextField
        id="standard-with-placeholder"
        label="With placeholder"
        placeholder="place"
        className={classes.textField}
        onChange={(event)=>this.setState({place:event.target.value})}
       // margin="normal"
      />
      </Grid>
      <Grid item lg={6} md={6} sm={6} xs={12}>
      <TextField
        id="standard-with-placeholder"
        label="With placeholder"
        placeholder="Placeholder"
        className={classes.textField}
        onChange={(event)=>this.setState({time:event.target.value})}
     //   margin="normal"
      />
      </Grid>
      <Grid item lg={6} md={6} sm={6} xs={12}>
      <TextField
        id="standard-with-placeholder"
        label="With placeholder"
        placeholder="Placeholder"
        className={classes.textField}
        onChange={(event)=>this.setState({longitude:event.target.value})}
       // margin="normal"
      />
      </Grid>
      <Grid item lg={6} md={6} sm={6} xs={12}>
          <TextField 
        id="standard-with-placeholder"
        label="With placeholder"
        placeholder="Placeholder"
        className={classes.textField}
        onChange={(event)=>this.setState({latitude:event.target.value})}
       // margin="normal"
      />
      </Grid>
    </Grid>
          <form className={classes.form} noValidate>
            {/* <FormControl className={classes.formControl}>
              <InputLabel htmlFor="max-width">maxWidth</InputLabel>
              <Select
             //   value={maxWidth}
               // onChange={handleMaxWidthChange}
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                }}
              >
                <MenuItem value={false}>false</MenuItem>
                <MenuItem value="xs">xs</MenuItem>
                <MenuItem value="sm">sm</MenuItem>
                <MenuItem value="md">md</MenuItem>
                <MenuItem value="lg">lg</MenuItem>
                <MenuItem value="xl">xl</MenuItem>
              </Select>
            </FormControl> */}
            {/* <FormControlLabel
              className={classes.formControlLabel}
              control={
                <Switch checked={this.state.fullWidth} //onChange={handleFullWidthChange}
                 value="fullWidth" />
              }
              label="Full width"
            /> */}
          </form>
        </DialogContent>
        <DialogActions>
        <Button onClick={()=>{this.setState({open:false});
      this.props.postData(this.state.id,this.state.mag,this.state.place,
        this.state.time,
      this.state.longitude,this.state.latitude)}} color="primary" variant="contained">
            Save
          </Button>
          <Button onClick={()=>this.setState({open:false})} color='default' variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/*modal * */}

    
     <Fab color="primary" aria-label="Add" onClick={()=>this.setState({open:true})}>
        <AddIcon />
      </Fab>

      
          {this.props.list.length !== 0 ?
            <div> <TextField type="text"
              onChange={(event) => this.setState({ searchText: event.target.value })}
              placeholder="Search Place" />
              <Table className={classes.table} //style={{textAlign:'center'}}
                size="small" >
                <TableHead>
                  <TableRow>
                    <TableCell  >Id</TableCell>
                    <TableCell align="center">Magnitude</TableCell>
                    <TableCell align="center">Place</TableCell>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="center">More Info</TableCell>
                    <TableCell align="center">Longitude</TableCell>
                    <TableCell align="center">Latitude</TableCell>
                    <TableCell align="center">Edit</TableCell>
                    {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>

                  {this.props.list.filter((row, index) => (index < 10)).
                    map((row, index) => {
                      return this.showData(row)
                    }

                    )}
                </TableBody>
              </Table></div> : <div>Loading...</div>}
         
        </Paper>
      </div>
    );
  }
}
DenseTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(DenseTable)