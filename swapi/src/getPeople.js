let persons = [];
let matchingPeople = [];

async function getPeople() {
    let url = 'http://localhost:4000/people';

        try {
            const fetchedPersons = await fetch(url)
                .then(res => res.json())
            await persons.push(...fetchedPersons);
        }
        catch (ex) {
            console.error("Error reading people.", ex.message);
        }
    console.log("All the persons are ", persons)
}


// take a list of people and match on a regular expression searched by user
const filterPeople = (searchParam) => {
    const re = new RegExp(searchParam, "i");
    matchingPeople = persons.filter(person => re.test(person.fields.name))
    console.log(matchingPeople)
    return matchingPeople;
}


export { getPeople, filterPeople };
