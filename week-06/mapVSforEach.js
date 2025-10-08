const makeThemBig = () => {
  pokemons.forEach((pokemon) => {
    console.log(pokemon.toUpperCase())
  })
}

makeThemBig()

const makeABigList = () => {
  const listWithCapitalPokemons = pokemons.map((pokemon) => pokemon.toUpperCase())
  console.log(listWithCapitalPokemons)
}

makeABigList()