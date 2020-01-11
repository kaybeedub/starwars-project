const peopleDiv = document.querySelector('.people-view');
const filmsDiv = document.querySelector('.films-view');
const starshipsDiv = document.querySelector('.starships-view');
const vehiclesDiv = document.querySelector('.vehicles-view');

const peopleInput = document.getElementById('people-input');
const filmsInput = document.getElementById('films-input');
const starshipsInput = document.getElementById('starships-input');
const vehiclesInput = document.getElementById('vehicles-input');

let peopleState;
let filmsState;
let starshipsState;
let vehiclesState;

function renderPeople(people) {
  for (let i = 0; i < people.length; i++) {
    peopleDiv.innerHTML += `
    <div class="card">
    <div class="card-body">
      <h5 class="card-title">
        ${people[i].name}
      </h5>
      <p>Appeared in ${people[i].films.length + 1} films. </p>
    </div>
    </div>
    `;
  }
  renderPeopleDisplay();
}

async function getPeople() {
  fetch(`http://star-cors.herokuapp.com/people`)
    .then(response => response.json())
    .then(function(data) {
      peopleState = data;
      renderPeople(data.results);
    });
}

getPeople();

function filterPeople() {
  let filteredPeople = peopleState.results.filter(person =>
    person.name.includes(peopleInput.value.toUpperCase())
  );
  peopleDiv.innerHTML = ``;
  renderPeople(filteredPeople);
}

const peopleDisplay = document.querySelector('.people-display');
function renderPeopleDisplay() {
  peopleDisplay.innerHTML = `Viewing ${peopleState.results.length} of ${peopleState.count} people`;
}
/*
Phase Five - Add the Ability to Load More Data (if available)

using the next property of the api response show a load more button
clicking the button should add the next set of items
add the recently loaded items first
if there are no more items to add, don't show the load more button
*/

function renderFilms(films) {
  for (let i = 0; i < films.length; i++) {
    filmsDiv.innerHTML += `
    <div class="card">
    <div class="card-body">
      <h5 class="card-title">
        ${films[i].title}
      </h5>
      <p>Released On: ${films[i].release_date}.
    </div>
    </div>
    `;
  }
  renderFilmsDisplay();
}

async function getFilms() {
  fetch(`http://star-cors.herokuapp.com/films`)
    .then(response => response.json())
    .then(function(data) {
      filmsState = data;
      renderFilms(data.results);
    });
}
getFilms();

function filterFilms() {
  let filteredFilms = filmsState.results.filter(film =>
    film.title.includes(filmsInput.value.toUpperCase())
  );
  filmsDiv.innerHTML = ``;
  renderFilms(filteredFilms);
}

const filmsDisplay = document.querySelector('.films-display');
function renderFilmsDisplay() {
  filmsDisplay.innerHTML = `Viewing ${filmsState.results.length} of ${filmsState.count} films`;
}

function renderStarships(starships) {
  for (let i = 0; i < starships.length; i++) {
    starshipsDiv.innerHTML += `
    <div class="card">
    <div class="card-body">
      <h5 class="card-title">
        ${starships[i].name}
      </h5>
      <p>${starships[i].starship_class}</p>
    </div>
    </div>
    `;
  }
  renderStarshipsDisplay();
}

async function getStarships() {
  fetch(`http://star-cors.herokuapp.com/starships`)
    .then(response => response.json())
    .then(function(data) {
      starshipsState = data;
      renderStarships(data.results);
    });
}

getStarships();

function filterStarships() {
  let filteredStarships = starshipsState.results.filter(starship =>
    starship.name.includes(starshipsInput.value.toUpperCase())
  );
  starshipsDiv.innerHTML = ``;
  renderStarships(filteredStarships);
}

const starshipsDisplay = document.querySelector('.starships-display');
function renderStarshipsDisplay() {
  console.log(starshipsState);
  starshipsDisplay.innerHTML = `Viewing ${starshipsState.results.length} of ${starshipsState.count} starships`;
}
function renderVehicles(vehicles) {
  for (let i = 0; i < vehicles.length; i++) {
    vehiclesDiv.innerHTML += `
        <div class="card">
        <div class="card-body">

          <h5 class="card-title">
            ${vehicles[i].name}
          </h5>
          <p>Manufactured by ${vehicles[i].manufacturer}</p>
          </div>
        </div>
        `;
  }
  renderVehiclesDisplay();
}

async function getVehicles() {
  fetch(`http://star-cors.herokuapp.com/vehicles`)
    .then(response => response.json())
    .then(function(data) {
      vehiclesState = data;
      renderVehicles(data.results);
    });
}
getVehicles();

function filterVehicles() {
  let filteredVehicles = vehiclesState.results.filter(vehicle =>
    vehicle.name.includes(vehiclesInput.value.toUpperCase())
  );
  vehiclesDiv.innerHTML = ``;
  renderVehicles(filteredVehicles);
}

const vehiclesDisplay = document.querySelector('.vehicles-display');
function renderVehiclesDisplay() {
  console.log(vehiclesState);
  vehiclesDisplay.innerHTML = `Viewing ${vehiclesState.results.length} of ${vehiclesState.count} vehicles`;
}

/* no one including david can figure out how to get this to work:

const peopleInput = document.getElementById('people-input');
console.log(peopleInput);
peopleInput.addEventListener('click', console.log('clicked'));
*/
/*

futile attempts to "make it better":

const allData = async function fetchData() {
  const peopleData = fetch(`http://star-cors.herokuapp.com/people`);
  const filmsData = fetch(`http://star-cors.herokuapp.com/films`);
  const starshipsData = fetch(`http://star-cors.herokuapp.com/starships`);
  const vehiclesData = fetch(`http://star-cors.herokuapp.com/vehicles`);

  const allResponses = Promise.all([
    peopleData,
    filmsData,
    starshipsData,
    vehiclesData,
  ]);
  console.log('is anything happening');
  // looks like these variables are only scoped inside the function
  // figure out how to access these globally
  return allResponses
    .then(response => {
      const peopleData = response[0];
      const filmsData = response[1];
      const starshipsData = response[2];
      const vehiclesData = response[3];
      return Promise.all([
        peopleData.json(),
        filmsData.json(),
        starshipsData.json(),
        vehiclesData.json(),
      ]);
    })
    .then(JSONs => {
      const people = JSONs[0];
      const films = JSONs[1];
      const starships = JSONs[2];
      const vehicles = JSONs[3];
      return [people, films, starships, vehicles];
    });
};
*/
/*
async function getPeopleAndHomeworld() {
  const peopleData = fetch(`http://star-cors.herokuapp.com/people`);
  const planetsData = fetch(`http://star-cors.herokuapp.com/planets`);
  const allResponses = Promise.all([peopleData, planetsData]);
  return allResponses.then(response => {
    const people = response[0];
    const planets = response[1];
  });
}
/*
async function getHomeworld(people) {
  fetch(people.results[i].homeworld)
    .then(console.log(response))
    .then(response => response.json())
    .then(function() {
      let homeworld = response.name;
    });
  console.log(homeworld);
}
getHomeworld();
*/

// reall cool thing
// do this at beginning: const state={}
// then throughout functions can add state.key=value to add the variable to the state object and can access globally
// can use if thens in function where if !state.key=value, alert that the data isnt availabe yet (so you know why something isnt working)
