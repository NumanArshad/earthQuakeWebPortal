import {EarthQuake_Action,EarthQuake_Status} from '../constants/earthQuakeActions'
const initialState={
    earthQuake_status:EarthQuake_Status.NEW,
    earthQuakeList:[],
    earthQuakeDetail:{}
}
export default function(state=initialState,action){
    switch (action.type) {
        case EarthQuake_Action.NEW:
       // alert(action.list.length+"in redcuer")
            return {...state,earthQuake_status:EarthQuake_Status.NEW}
        case EarthQuake_Action.SUCCESS:
   //  alert(action.list.length+"in redcuer")
            return {...state,earthQuake_status:EarthQuake_Status.SUCCESS,earthQuakeList:action.list}
            case EarthQuake_Action.GETSPECIFIC:
            alert("in  specifc reducer"+action.earthQuakeDetail.properties.mag)
            return {...state,earthQuake_status:EarthQuake_Status.DETAILSUCCESS,earthQuakeDetail:action.earthQuakeDetail}
            case EarthQuake_Action.CREATE:
                return {...state,earthQuake_status:EarthQuake_Status.CREATE}
    
        default:
        return {...state}
           
    }
}