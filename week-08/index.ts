const places = [
  { name: 'oslo', lat: 59.913245, lon: 59.913245 },
  { name: 'stockholm', lat: 59.329468, lon: 18.062639 }
]

const weatherURL = `https://opendata-download-metfcst.smhi.se/api/category/snow1g/version/1/geotype/point/lon/18.062639/lat/59.329468/data.json?timeseries=24`
// const placesURL = `https://wpt-a-tst.smhi.se/backend-startpage/geo/autocomplete/places/${city}?pmponly=true`

interface currentWeatherData {
  airTemp: number,
  condition: number
}

const weatherSymbols: { [key: number]: string } = {
  1: 'Clear sky',
  2: 'Nearly clear sky',
  3: 'Variable cloudiness',
  4: 'Halfclear sky',
  5: 'Cloudy sky',
  6: 'Overcast',
  7: 'Fog',
  8: 'Light rain showers',
  // …continue with the rest
}

let currentWeather: currentWeatherData


const fetchWeather = async () => {
  try {
    const response = await fetch(weatherURL)

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`)

    const data = await response.json()

    console.log('data', data)

    // currentWeather = data.timeSeries[0].data

    currentWeather = {
      airTemp: data.timeSeries[0].data.air_temperature,
      condition: data.timeSeries[0].data.symbol_code
    }

    // a way to get a hold of the acutaly mening of the weather symbols (found in the docs)
    const actualCondition = weatherSymbols[currentWeather.condition]

    console.log('airTemp', currentWeather.airTemp)
    console.log('condition', currentWeather.condition)
    console.log('actualCondition', actualCondition)


  } catch (error) {
    console.log(`caught an error, ${error}`)
  }
}

fetchWeather()
