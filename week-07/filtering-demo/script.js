const API_KEY = 'e5ce814e5cdb4cd8b978bc195ddda335'
const URL = `https://api.spoonacular.com/recipes/complexSearch?number=20&apiKey=${API_KEY}&addRecipeInformation=true&addRecipeInstructions=true&cuisine=Mexican,Italian,African,Greek,French`

// To not specify cuisines, remove this from the url: &cuisine=Mexican,Italian,African,Greek,French

const grid = document.getElementById('grid')
const select = document.getElementById('filter')
const count = document.getElementById('count')

let allRecipes = []

const fetchData = async () => {
  try {
    const res = await fetch(URL)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const data = await res.json()

    /*******
     if you dont want to specfiy in the URL, this is how you could filter out the recipes that doesnt have cuisine specfied. This can also be done for i.e image. Then you would set those recipies as the value of allRecipes.
    const onlyRecipesWithSpecifiedCuisines = data.results.filter(r => r.cuisines.length)
    const onlyRecipesWithImage = data.results.filter(r => r.image !== undefined)
    ******/

    allRecipes = data.results // set the global variable to the result from the API
    render(allRecipes) // paint them out in the DOM

  } catch (err) {
    grid.textContent = `Could not load recipes: ${err.message}`
  }
}

// 👇🏼 This function takes care of the filtering and returns the filtered array.
// That means you can use this function as a varible, forexample to pass it in the render function.
// Another approach would be to create another global variable and call it filteredArray (better name than list also...) And reassign it the value of your filtering.
const applyFilter = (type, list) => {
  console.log('type', type) // just checking the values we get passed in to the function
  console.log('list', list) //

  if (type === 'vegetarian') {
    // boolean example
    return list.filter(recipe => recipe.vegetarian === true)
  }
  if (type === 'cuisineMexican') {
    // array example — some recipes might have empty or missing arrays hence adding ?
    return list.filter(recipe => recipe.cuisines?.includes('Mexican'))
  }
  if (type === 'titleGuacamole') {
    // string example — case-insensitive contains
    return list.filter(recipe => (recipe.title).toLowerCase().includes('guacamole'))
  }
  return list
}

const render = (recipes) => {
  // Clear the grid first so we don't keep adding new stuff
  grid.innerHTML = ''

  // Show how many recipes are displayed
  count.textContent = `Showing ${recipes.length} of ${allRecipes.length}`

  // Loop through each recipe and add HTML directly
  recipes.forEach(recipe => {
    grid.innerHTML += recipeCard(recipe)
  })
}

const recipeCard = (r) => {
  // This function only creates the actual recipe card with all info.
  const cuisines = r.cuisines?.join(', ') || 'No cuisines listed'
  const time = r.readyInMinutes ? `${r.readyInMinutes} min` : ''
  const vegetarian = r.vegetarian ? 'Vegetarian' : ''
  const meta = [time, vegetarian, cuisines].filter(Boolean).join(' • ')

  return `
    <article class="card">
      <h3 class="title">${r.title || 'Untitled'}</h3>
      <p class="meta">${meta}</p>
    </article>
  `
}



select.addEventListener('change', () => {
  const filtered = applyFilter(select.value, allRecipes)
  render(filtered)
})

fetchData()