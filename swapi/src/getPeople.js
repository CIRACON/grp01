let persons = [];
let matchingPeople = [];
// const personsSection = document.querySelector("#people")

// document.addEventListener('DOMContentLoaded', getPeople)

async function getPeople() {
  let url = 'https://swapi.dev/api/people';

  while (url) {
    try {
      const fetchedPersons = await fetch(url)
        .then(res => res.json())
        .then(res => { url = res.next; return res })
        .then(res => res.results)
        .then(res => res.map(p => ({ ...p, id: +getPersonIdFromUrl(p.url) })))
      persons.push(...fetchedPersons);
    }
    catch (ex) {
      console.error("Error reading people.", ex.message);
    }
  }
  console.log("All the persons are ", persons)
  // return these instead
  //renderPeople(persons);
  return persons; // use in fetchPersons, but filter please?
}

const getPersonIdFromUrl = (url) => {
  const re = /.*people\/(\d+).*/
  const matches = url.match(re)
  if (!matches) throw "Bad URL. Not a people URL."
  return matches[1]
}

// take a list of people and 
const filterPeople = (searchParam, people) => {
  const re = new RegExp(searchParam, "i");
  matchingPeople = people.filter(person => re.test(person.name))
  return matchingPeople;
}

// const renderPeople = persons => {
//   const divs = persons.map(person => {
//     const el = document.createElement('div');
//     el.addEventListener('click', () => goToPersonPage(person.id));
//     el.textContent = person.name;
//     return el;
//   })
//   personsSection.replaceChildren(...divs)
// }

// const goToPersonPage = id => window.location = `/person.html?id=${id}`

export {getPeople, filterPeople};
