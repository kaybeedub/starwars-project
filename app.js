const peopleDiv = document.querySelector('.people-view');
const filmsDiv = document.querySelector('.films');
const starshipsDiv = document.querySelector('.starships');
const vehiclesDiv = document.querySelector('.vehicles');

const peopleView = document.querySelector('.people-view');

const peopleInput = document.getElementById('people-input');

let people;

function renderPeople(people) {
  for (let i = 0; i < people.length; i++) {
    console.log(peopleDiv);
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
}

async function getPeople() {
  fetch(`http://star-cors.herokuapp.com/people`)
    .then(response => response.json())
    .then(function(data) {
      renderPeople(data.results);
      people = data;
    });
}

getPeople();

/*
function filterPeople
passes filtered data into renderPeople
how to filter the data
  look at the first letter (slice? position 0) of
people.results[i] (?) and see if it is equal to the user input

but what about if they type two letters?...

*/
/* no one including david can figure out how to get this to work:

const peopleInput = document.getElementById('people-input');
console.log(peopleInput);
peopleInput.addEventListener('click', console.log('clicked'));
*/

function filterPeople() {
  // console.log(people.results);

  let filteredPeople = people.results.filter(person =>
    person.name.includes(peopleInput.value.toUpperCase())
  );
  // console.log(filteredPeople);
  renderPeople(filteredPeople);
}

function renderFilms(films) {
  for (let i = 0; i < films.results.length; i++) {
    filmsDiv.innerHTML += `
    <div class="card">
    <div class="card-body">
      <h5 class="card-title">
        ${films.results[i].title}
      </h5>
      <p>Released On: ${films.results[i].release_date}.
    </div>
    </div>
    `;
  }
}

async function getFilms() {
  fetch(`http://star-cors.herokuapp.com/films`)
    .then(response => response.json())
    .then(renderFilms);
}
getFilms();

function renderStarships(starships) {
  for (let i = 0; i < starships.results.length; i++) {
    starshipsDiv.innerHTML += `
    <div class="card">
    <div class="card-body">
      <h5 class="card-title">
        ${starships.results[i].name}
      </h5>
      <p>${starships.results[i].starship_class}</p>
    </div>
    </div>
    `;
  }
}

async function getStarships() {
  fetch(`http://star-cors.herokuapp.com/starships`)
    .then(response => response.json())
    .then(renderStarships);
}

getStarships();

function renderVehicles(vehicles) {
  for (let i = 0; i < vehicles.results.length; i++) {
    vehiclesDiv.innerHTML += `
        <div class="card">
        <div class="card-body">

          <h5 class="card-title">
            ${vehicles.results[i].name}
          </h5>
          <p>Manufactured by ${vehicles.results[i].manufacturer}</p>
          </div>
        </div>
        `;
  }
}

async function getVehicles() {
  fetch(`http://star-cors.herokuapp.com/vehicles`)
    .then(response => response.json())
    .then(renderVehicles);
}
getVehicles();

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
