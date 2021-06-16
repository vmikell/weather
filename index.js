// global variables
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

// on page load starts here
window.addEventListener('DOMContentLoaded', function () {
  navigator.geolocation.getCurrentPosition(function (position) {
    lat = position.coords.latitude
    lng = position.coords.longitude
    console.log(lat, lng)
    fetchAndSetInfo()

    // fetch JSON for users device location & set HTML
    function fetchAndSetInfo() {
      fetch(
        'https://api.openweathermap.org/data/2.5/onecall?lat=' +
          lat +
          '&lon=' +
          lng +
          '&units=imperial&appid=4519d9be78fe231b763e377edc91aa15'
      )
        .then((response) => response.json())
        .then((data) => {
          tempInfo = data
          console.log(tempInfo)
          // current weather card starts here
          document.getElementById('temp').innerHTML =
            Math.round(tempInfo.current.temp) + '°'
          icon =
            'https://openweathermap.org/img/wn/' +
            tempInfo.current.weather[0].icon +
            '@2x.png'
          document.getElementById('icon').setAttribute('SRC', icon)
          document.getElementById('conditions').innerHTML =
            tempInfo.current.weather[0].main +
            ' - ' +
            tempInfo.current.weather[0].description
          document.getElementById('feels-like').innerHTML =
            'Feels like: ' + Math.round(tempInfo.current.feels_like) + '°'
          document.getElementById('high-temp').innerHTML =
            'Hi: ' + Math.round(tempInfo.daily[0].temp.max) + '°'
          document.getElementById('low-temp').innerHTML =
            'Low: ' + Math.round(tempInfo.daily[0].temp.min) + '°'

          fetch(
            'https://api.openweathermap.org/data/2.5/forecast?lat=' +
              lat +
              '&lon=' +
              lng +
              '&units=imperial&cnt=0&appid=4519d9be78fe231b763e377edc91aa15'
          )
            .then((response) => response.json())
            .then((data) => {
              console.log('forecast', data)
              forecast = data
              document.getElementById('name').innerHTML = forecast.city.name
              forecastIcon1 =
                'https://openweathermap.org/img/wn/' +
                tempInfo.hourly[1].weather[0].icon +
                '@2x.png'
              forecastIcon2 =
                'https://openweathermap.org/img/wn/' +
                tempInfo.hourly[2].weather[0].icon +
                '@2x.png'
              forecastIcon3 =
                'https://openweathermap.org/img/wn/' +
                tempInfo.hourly[3].weather[0].icon +
                '@2x.png'

              // converting dateTime to human format
              const utcSeconds = tempInfo.hourly[1].dt
              const d = new Date(0)
              d.setUTCSeconds(utcSeconds)
              const firstHourName = days[d.getDay()]
              const firstHour = time[d.getHours()]

              const utcSeconds2 = tempInfo.hourly[2].dt
              const d2 = new Date(0)
              d2.setUTCSeconds(utcSeconds2)
              const secondHourName = days[d2.getDay()]
              const secondHour = time[d2.getHours()]

              const utcSeconds3 = tempInfo.hourly[3].dt
              const d3 = new Date(0)
              d3.setUTCSeconds(utcSeconds3)
              const thirdHourName = days[d3.getDay()]
              const thirdHour = time[d3.getHours()]

              // forecast card starts here
              //  first time slot
              document.getElementById('first-time').innerHTML =
                firstHourName + ' ' + firstHour
              document.getElementById('first-temp').innerHTML =
                Math.round(tempInfo.hourly[1].temp) + '°'
              document
                .getElementById('first-icon')
                .setAttribute('SRC', forecastIcon1)
              document.getElementById('first-condition').innerHTML =
                tempInfo.hourly[1].weather[0].main
              document.getElementById('first-pop').innerHTML =
                Math.round(tempInfo.hourly[1].pop * 100) + '%'

              //  second time slot
              document.getElementById('second-time').innerHTML =
                secondHourName + ' ' + secondHour
              document.getElementById('second-temp').innerHTML =
                Math.round(tempInfo.hourly[2].temp) + '°'
              document
                .getElementById('second-icon')
                .setAttribute('SRC', forecastIcon2)
              document.getElementById('second-condition').innerHTML =
                tempInfo.hourly[2].weather[0].main
              document.getElementById('second-pop').innerHTML =
                Math.round(tempInfo.hourly[2].pop * 100) + '%'

              //  third time slot
              document.getElementById('third-time').innerHTML =
                thirdHourName + ' ' + thirdHour
              document.getElementById('third-temp').innerHTML =
                Math.round(tempInfo.hourly[3].temp) + '°'
              document
                .getElementById('third-icon')
                .setAttribute('SRC', forecastIcon3)
              document.getElementById('third-condition').innerHTML =
                tempInfo.hourly[3].weather[0].main
              document.getElementById('third-pop').innerHTML =
                Math.round(tempInfo.hourly[3].pop * 100) + '%'

              // 5-day forecast card starts here
              // turning dateTime to human format
              const utcSec1 = tempInfo.daily[1].dt
              const day1 = new Date(0)
              day1.setUTCSeconds(utcSec1)
              const firstDayName = days[day1.getDay()]

              const utcSec2 = tempInfo.daily[2].dt
              const day2 = new Date(0)
              day2.setUTCSeconds(utcSec2)
              const secondDayName = days[day2.getDay()]

              const utcSec3 = tempInfo.daily[3].dt
              const day3 = new Date(0)
              day3.setUTCSeconds(utcSec3)
              const thirdDayName = days[day3.getDay()]

              const utcSec4 = tempInfo.daily[4].dt
              const day4 = new Date(0)
              day4.setUTCSeconds(utcSec4)
              const fourthDayName = days[day4.getDay()]

              const utcSec5 = tempInfo.daily[5].dt
              const day5 = new Date(0)
              day5.setUTCSeconds(utcSec5)
              const fifthDayName = days[day5.getDay()]

              dayOneIcon =
                'https://openweathermap.org/img/wn/' +
                tempInfo.daily[1].weather[0].icon +
                '@2x.png'
              dayTwoIcon =
                'https://openweathermap.org/img/wn/' +
                tempInfo.daily[2].weather[0].icon +
                '@2x.png'
              dayThreeIcon =
                'https://openweathermap.org/img/wn/' +
                tempInfo.daily[3].weather[0].icon +
                '@2x.png'
              dayFourIcon =
                'https://openweathermap.org/img/wn/' +
                tempInfo.daily[4].weather[0].icon +
                '@2x.png'
              dayFiveIcon =
                'https://openweathermap.org/img/wn/' +
                tempInfo.daily[5].weather[0].icon +
                '@2x.png'

              document.getElementById('day-one').innerHTML = firstDayName
              document.getElementById('temp-one').innerHTML =
                Math.round(tempInfo.daily[1].temp.max) +
                '° / ' +
                Math.round(tempInfo.daily[1].temp.min) +
                '°'
              document
                .getElementById('icon-one')
                .setAttribute('SRC', dayOneIcon)
              document.getElementById('pop-one').innerHTML =
                Math.round(tempInfo.daily[1].pop * 100) + '%'

              document.getElementById('day-two').innerHTML = secondDayName
              document.getElementById('temp-two').innerHTML =
                Math.round(tempInfo.daily[2].temp.max) +
                '° / ' +
                Math.round(tempInfo.daily[2].temp.min) +
                '°'
              document
                .getElementById('icon-two')
                .setAttribute('SRC', dayTwoIcon)
              document.getElementById('pop-two').innerHTML =
                Math.round(tempInfo.daily[2].pop * 100) + '%'

              document.getElementById('day-three').innerHTML = thirdDayName
              document.getElementById('temp-three').innerHTML =
                Math.round(tempInfo.daily[3].temp.max) +
                '° / ' +
                Math.round(tempInfo.daily[3].temp.min) +
                '°'
              document
                .getElementById('icon-three')
                .setAttribute('SRC', dayThreeIcon)
              document.getElementById('pop-three').innerHTML =
                Math.round(tempInfo.daily[3].pop * 100) + '%'

              document.getElementById('day-four').innerHTML = fourthDayName
              document.getElementById('temp-four').innerHTML =
                Math.round(tempInfo.daily[4].temp.max) +
                '° / ' +
                Math.round(tempInfo.daily[4].temp.min) +
                '°'
              document
                .getElementById('icon-four')
                .setAttribute('SRC', dayFourIcon)
              document.getElementById('pop-four').innerHTML =
                Math.round(tempInfo.daily[4].pop * 100) + '%'

              document.getElementById('day-five').innerHTML = fifthDayName
              document.getElementById('temp-five').innerHTML =
                Math.round(tempInfo.daily[5].temp.max) +
                '° / ' +
                Math.round(tempInfo.daily[5].temp.min) +
                '°'
              document
                .getElementById('icon-five')
                .setAttribute('SRC', dayFiveIcon)
              document.getElementById('pop-five').innerHTML =
                Math.round(tempInfo.daily[5].pop * 100) + '%'
            })
        })
    }

    // onClick / search starts here
    const search = document.getElementById('search-button')
    const input = document.getElementById('search')
    let data = {}

    search.addEventListener('click', () => {
      txtInput = input.value
      getInputTemp()
      navigator.vibrate([100])
    })

    // on 'Enter' button press starts here
    document.addEventListener('keyup', function (event) {
      if (event.keyCode === 13) {
        txtInput = input.value
        getInputTemp()
        navigator.vibrate([100])
      }
    })

    // get user input location and populate cards
    function getInputTemp() {
      txtInput = txtInput
      fetch(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
          txtInput +
          '&key=AIzaSyDQpgWl8Agt8U3yuVIR9C8GeWMPsVov_ro'
      )
        .then((response) => response.json())
        .then((data) => {
          data = data
          lat = data.results[0].geometry.location.lat
          lng = data.results[0].geometry.location.lng
          fetchAndSetInfo()
        })
    }

    const reload = document.getElementById('reload-button')
    reload.addEventListener('click', () => {
      getInputTemp()
      console.log('great success!!!')
      navigator.vibrate([100])
    })
  })
})
