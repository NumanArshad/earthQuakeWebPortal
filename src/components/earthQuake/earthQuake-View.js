import React, { Component } from 'react'
import { EarthQuake_Action, EarthQuake_Status } from '../../constants/earthQuakeActions'
import EarthQuakeContainer from './earthQuakeContainer'
import MaxWidthDialog from './postEarthQuake'
import { connect } from 'react-redux';
//import { login } from '../../../../actions/signInActions'
import { getData, getSpecific,postData } from '../../actions/earthQuakeActions'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({
    earthQuake_Status: state.earthQuake_Reducer.earthQuake_status,
    earthQuakeList: state.earthQuake_Reducer.earthQuakeList,
    earthQuakeDetail: state.earthQuake_Reducer.earthQuakeDetail,
})
const mapDipatchToProps = (dispatch) => {
    return {
        getData: () => { dispatch(getData()) },
        getSpecific: (id) => { dispatch(getSpecific(id)) },
        postData: (id,mag,place,dateTime,longitude,latitude) => { dispatch(postData(id,mag,place,dateTime,longitude,latitude) ) }
    }
}
class EarthQuakeView extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.getData()
        // alert('in parent'+this.props.getData())
    }

    getScreen(status) {
        //console.log(status)
        switch (status) {
            case EarthQuake_Status.NEW:
                return (<EarthQuakeContainer list={this.props.earthQuakeList}
                    getSpecific={this.props.getSpecific}
                    postData={this.props.postData} />)

            case EarthQuake_Status.SUCCESS:
                return (<EarthQuakeContainer list={this.props.earthQuakeList}
                    getSpecific={this.props.getSpecific}
                    postData={this.props.postData} />)

            case EarthQuake_Status.CREATE:
                return (<MaxWidthDialog  />)

            case EarthQuake_Status.DETAILSUCCESS:
                return (<EarthQuakeContainer list={this.props.earthQuakeList} earthQuakeDetail={this.props.earthQuakeDetail} />)

            default:
                break;
        }
    }
    render() {
        return (
            <div>{this.getScreen(this.props.earthQuake_Status)}</div>
        )
    }
}
export default connect(mapStateToProps, mapDipatchToProps)(withRouter(EarthQuakeView))