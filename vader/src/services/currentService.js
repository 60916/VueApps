export function getCurrent(location) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.position.lat}&longitude=${location.position.long}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,wind_gusts_10m`,
    )
      .then(respone => {
        if (respone.ok) {
          return respone.json()
        } else {
          reject(respone.json())
        }
      })
      .then(data => {
        resolve(transformCurrentWeather(data))
      })
  })
}

function transformCurrentWeather(raw) {
  let weatherData = {}
  weatherData.position = { lat: raw.latitude, long: raw.longitude }
  weatherData.timezone = {
    offset: raw.utc_offset_seconds,
    name: raw.timezone,
    short: raw.timezone_abbrevation,
  }

  weatherData.weather = []
  let data = {
    date: raw.current.time,
    code: raw.current.weather_code,
    temp: {
      current_temp: raw.current.temperature_2m,
      unit: raw.current_units.temperature_2m,
      app_temp: raw.current.apparent_temperature,
    },
    precipitation: raw.current.precipitation,

    wind: {
      direction: raw.current.wind_direction_10m,
      direction_unit: raw.current_units.wind_direction_10m,
      speed: raw.current.wind_speed_10m,
      gusts: raw.current.wind_gusts_10m,
      unit: raw.current_units.wind_speed_10m,
    },
    humidity: raw.current.relative_humidity_2m,
    cloud: raw.current.cloud_cover,
    pressure: raw.current.pressure_msl,
  }
  weatherData.weather.push(data)
  return weatherData
}
