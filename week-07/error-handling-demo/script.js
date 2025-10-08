const GOOD_URL = 'https://swapi.dev/api/people/'
const BAD_URL = 'https://swapi.dev/api/peoplesss/' // 404
const BROKEN_URL = 'https://swapi12345.dev/api/people/' // network error

const output = document.getElementById('output')

const log = (message) => {
  output.textContent += message + '\n'
}

const clearLog = () => {
  output.textContent = ''
}

const testFetch = async (url) => {
  clearLog()
  log('Fetching: ' + url)

  try {
    const res = await fetch(url)
    log('✅ Fetch succeeded at network level!')
    log('Status code: ' + res.status)
    log('res.ok: ' + res.ok)

    // Uncomment this to see "manual throw"
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`)

    const data = await res.json()
    log('Data: ' + JSON.stringify(data, null, 2))
  } catch (err) {
    log('💥 Caught in catch: ' + err.message)
  }

  log('---')
}

document.getElementById('good').addEventListener('click', () => testFetch(GOOD_URL))
document.getElementById('bad').addEventListener('click', () => testFetch(BAD_URL))
document.getElementById('broken').addEventListener('click', () => testFetch(BROKEN_URL))