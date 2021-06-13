window.addEventListener('DOMContentLoaded', () => {
  // variables
  let icon = ''
  let lat = 0.0
  let lng = 0.0
  let tempInfo = {}

  // determine user's device location
  navigator.geolocation.getCurrentPosition(function (position) {
    lat = position.coords.latitude
    lng = position.coords.longitude
    console.log({ lat: lat, lng: lng })
    // fetch JSON for users device location
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?lat=' +
        lat +
        '&lon=' +
        lng +
        '&units=imperial&appid=4519d9be78fe231b763e377edc91aa15'
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        tempInfo = data
        document.getElementById('name').innerHTML = tempInfo.name
        document.getElementById('temp').innerHTML = tempInfo.main.temp + '°'
        icon =
          'https://openweathermap.org/img/wn/' +
          tempInfo.weather[0].icon +
          '@2x.png'
        document.getElementById('icon').setAttribute('SRC', icon)
        document.getElementById('conditions').innerHTML =
          tempInfo.weather[0].main + ' - ' + tempInfo.weather[0].description
        document.getElementById('feels-like').innerHTML =
          'Feels like: ' + tempInfo.main.feels_like + '°'
        document.getElementById('high-temp').innerHTML =
          'Day: ' + tempInfo.main.temp_max + '°'
        document.getElementById('low-temp').innerHTML =
          'Night: ' + tempInfo.main.temp_min + '°'
      })
  })
})
