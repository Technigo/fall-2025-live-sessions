// True constants and global variables

const DOGS = [
  {
    name: 'Alfons',
    img: 'assets/dog1.jpg',
    fur: 'Brown',
    puppy: false,
  },
  {
    name: 'Bingo',
    img: 'assets/dog2.jpg',
    fur: 'Brown',
    puppy: false,
  },
  {
    name: 'Cecilia',
    img: 'assets/dog3.jpg',
    fur: 'miXed',
    puppy: true,
  },
  {
    name: 'Doggo',
    img: 'assets/dog4.jpg',
    fur: 'black',
    puppy: true,
  },
  {
    name: 'Eddie',
    img: 'assets/dog5.jpg',
    fur: 'grey',
    puppy: true,
  },
  {
    name: 'Flora',
    img: 'assets/dog6.jpg',
    fur: 'mixed',
    puppy: true,
  },
  {
    name: 'Gullan',
    img: 'assets/dog7.jpg',
    fur: 'black',
    puppy: false,
  }
]

//DOM selectors
const container = document.getElementById('container')
const furColorDropDown = document.getElementById('furColorDropDown')


//Logic split up into functions
const showDogs = dogsArray => {
  container.innerHTML = '' // resetting the container before filling it

  dogsArray.forEach(dog => {
    container.innerHTML += `
      <div class="card">
        <p>${dog.name}</p>
        <img src=${dog.img} alt=${dog.name} />
        <p>${dog.fur}</p>
        <p>${dog.puppy ? '🐶' : '🐕'}</p>
      </div>
    `
  })
}

showDogs(DOGS)

const filterOnFurColor = () => {
  const furColorFilter = furColorDropDown.value

  if (furColorFilter === "all") {
    showDogs(DOGS)
  } else {
    const filteredDogs = DOGS.filter(dog => dog.fur.toLowerCase() === furColorFilter.toLowerCase())
    showDogs(filteredDogs)
  }
}

//Event listeners
furColorDropDown.addEventListener('change', filterOnFurColor)
