export function getForecast(location) {
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
        resolve(transformData(data))
      })
  })
}

function transformData(raw) {
  let weatherData = {}
  weatherData.position = { lat: raw.latitude, long: raw.longitude }
  weatherData.timezone = {
    offset: raw.utc_offset_seconds,
    name: raw.timezone,
    short: raw.timezone_abbrevation,
  }

  weatherData.weather = []
  for (let i = 0; i < raw.daily.time.length; i++) {
    let data = {
      date: raw.daily.time[i],
      code: raw.daily.weather_code[i],
      temp: {
        max: raw.daily.temperature_2m_max[i],
        min: raw.daily.temperature_2m_min[i],
        unit: raw.daily_units.temperature_2m_max,
      },
      precipitation: {
        sum: raw.daily.precipitation_sum[i],
        probability: raw.daily.precipitation_probability_max[i],
        unit: raw.daily_units.precipitation_sum,
      },
      wind: {
        direction: raw.daily.wind_direction_10m_dominant[i],
        direction_unit: raw.daily_units.wind_direction_10m_dominant,
        speed: raw.daily.wind_speed_10m_max[i],
        gusts: raw.daily.wind_gusts_10m_max[i],
        unit: raw.daily_units.wind_speed_10m_max,
      },
    }
    weatherData.weather.push(data)
  }
  return weatherData
}