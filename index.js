window.addEventListener('DOMContentLoaded', () => {
  // variables
  let icon = ''
  let forecastIcon1 = ''
  let forecastIcon2 = ''
  let forecastIcon3 = ''
  let lat = 0.0
  let lng = 0.0
  let tempInfo = {}
  let forecast = {}
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const time = [
    '12am',
    '1am',
    '2am',
    '3am',
    '4am',
    '5am',
    '6am',
    '7am',
    '8am',
    '9am',
    '10am',
    '11am',
    '12pm',
    '1pm',
    '2pm',
    '3pm',
    '4pm',
    '5pm',
    '6pm',
    '7pm',
    '8pm',
    '9pm',
    '10pm',
    '11pm',
  ]
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
          'Hi: ' + tempInfo.main.temp_max + '°'
        document.getElementById('low-temp').innerHTML =
          'Low: ' + tempInfo.main.temp_min + '°'
      })

    fetch(
      'https://api.openweathermap.org/data/2.5/forecast?lat=' +
        lat +
        '&lon=' +
        lng +
        '&units=imperial&cnt=8&appid=4519d9be78fe231b763e377edc91aa15'
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        forecast = data
        console.log('time', forecast.list[0].dt_txt)
        console.log('temp', forecast.list[0].main.temp)
        console.log('icon', forecast.list[1].weather[0].icon)
        forecastIcon1 =
          'https://openweathermap.org/img/wn/' +
          forecast.list[1].weather[0].icon +
          '@2x.png'
        forecastIcon2 =
          'https://openweathermap.org/img/wn/' +
          forecast.list[3].weather[0].icon +
          '@2x.png'
        forecastIcon3 =
          'https://openweathermap.org/img/wn/' +
          forecast.list[5].weather[0].icon +
          '@2x.png'

        let firstDayString = (forecast.list[0].dt_txt)
        let d1 = new Date(firstDayString)
        let firstDayName = days[d1.getDay()]
        let firstHour = time[d1.getHours()]
        
        let secondDayString = forecast.list[1].dt_txt
        let d2 = new Date(secondDayString)
        let secondDayName = days[d2.getDay()]
        let secondHour = time[d2.getHours()]

        let thirdDayString = forecast.list[2].dt_txt
        let d3 = new Date(thirdDayString)
        let thirdDayName = days[d3.getDay()]
        let thirdHour = time[d3.getHours()]

        //  first time slot
        document.getElementById('first-time').innerHTML = firstDayName + ' ' + firstHour
          document.getElementById('first-temp').innerHTML =
            forecast.list[0].main.temp + '°'
        document.getElementById('first-icon').setAttribute('SRC', forecastIcon1)

        //  second time slot
        document.getElementById('second-time').innerHTML =
          secondDayName + ' ' + secondHour
        document.getElementById('second-temp').innerHTML =
          forecast.list[1].main.temp + '°'
        document
          .getElementById('second-icon')
          .setAttribute('SRC', forecastIcon2)

        //  third time slot
        document.getElementById('third-time').innerHTML =
          thirdDayName + ' ' + thirdHour
        document.getElementById('third-temp').innerHTML =
          forecast.list[2].main.temp + '°'
        document.getElementById('third-icon').setAttribute('SRC', forecastIcon3)
      })

    //   let url =
    //     'https://openweathermap.org/weathermap?basemap=map&cities=false&layer=clouds&lat=' +
    //     lat +
    //     '&lon=' +
    //     lng +
    //     '&zoom=8'
    //   let map = `url(${url})`
    // document.getElementById('map').style.backgroundImage = map;
    // console.log(map)
  })
})
