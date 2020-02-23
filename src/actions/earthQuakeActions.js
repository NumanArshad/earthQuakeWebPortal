import { EarthQuake_Action } from '../constants/earthQuakeActions'


export const postData=(id,mag,place,dateTime,longitude,latitude)=>dispatch=>{
  var datetime = formatDate(dateTime)
                var user = {
                  'Id': id, 'Magnitude': mag, 'Place': place,
                  'Time': datetime, 'MoreInfo': '', 'Longitude': longitude,
                  'Latitude': latitude
                }
                const postRequest = fetch('http://localhost:5000/earthquake/save', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                  mode: 'cors',
                  body: JSON.stringify(user)
                }).then((response) => {
                  response.json().then(data => {
                    alert('hahah')
                      return dispatch({ type: EarthQuake_Action.SUCCESS, list: data });
                    

                  }) //data
                })  //response

}

export const getData = () => dispatch => {

  const postRequest = fetch('http://localhost:5000/earthquake/getAll', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    mode: 'cors',
    //  body: JSON.stringify(user)
  }).then((response) => {
    response.json().then(data => {
      //  console.log(data.length)
      if (data.length >= 99) {
        return dispatch({ type: EarthQuake_Action.SUCCESS, list: data });

      }
      else {
        const getRequest = fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json;charset=UTF-8' },
          mode: 'cors',
          // body:JSON.stringify(user)
        }).then((response) => {
          console.log("required" + response.status)

          response.json().then(data => {


            data.features.filter((obj, index) =>
              (index < 99)).map((obj, index) => {
                //alert(index)

                var dateTime = formatDate(obj.properties.time)
                var user = {
                  'Id': obj.id, 'Magnitude': obj.properties.mag, 'Place': obj.properties.place,
                  'Time': dateTime, 'MoreInfo': obj.properties.url, 'Longitude': obj.geometry.coordinates[0],
                  'Latitude': obj.geometry.coordinates[1]
                }
                const postRequest = fetch('http://localhost:5000/earthquake/save', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                  mode: 'cors',
                  body: JSON.stringify(user)
                }).then((response) => {
                  response.json().then(data => {
                    if (data.length >= 99) {
                      return dispatch({ type: EarthQuake_Action.SUCCESS, list: data });
                    }

                  }) //data
                })  //response

              })  //map

          })
          //   return dispatch({ type: EarthQuake_Action.SUCCESS, list: data.features });
        })



      }

    }) //data get all
  })  //response get all


}

function formatDate(number) {
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

function saveLocal(obj) {
  // return function dispatch(dispatch){
  var dateTime = formatDate(obj.properties.time)
  var user = {
    'Id': obj.Id, 'Magnitude': obj.properties.mag, 'Place': obj.properties.place,
    'Time': dateTime, 'MoreInfo': obj.properties.url, 'Langitude': obj.geometry.coordinates[0],
    'Latitude': obj.geometry.coordinates[1]
  }
  const postRequest = fetch('http://localhost:5000/earthquake/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    mode: 'cors',
    body: JSON.stringify(user)
  }).then((response) => {
    // alert("required" + response.status)

    response.json().then(data => {

      alert(data)
    })
  })

  //}
}

export const getSpecific = (id) => dispatch => {

  const postRequest = fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/' + id + '.geojson', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    mode: 'cors',
    // body:JSON.stringify(user)
  }).then((response) => {
    console.log("required" + response.status)

    response.json().then(data => {


      if (data.type == 'Feature') {
        //   alert('auth')

        return dispatch({ type: EarthQuake_Action.GETSPECIFIC, earthQuakeDetail: data });
      }

    })
  })
}

