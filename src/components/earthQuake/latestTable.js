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
import PropTypes from 'prop-types';
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
});

class DenseLatestTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchText: '' }
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

                  {this.props.list.
                  //filter((row, index) => (index < 10)).
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
DenseLatestTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(DenseLatestTable)