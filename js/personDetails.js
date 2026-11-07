let countries = [];

async function  loadCountries() {
    const response = await fetch("data/birthCountries.json")
    countries = await response.json();
}

const params = new URLSearchParams(window.location.search);
const personId = params.get("id");

console.log(personId);

const savedPeople = localStorage.getItem("people");
const people = JSON.parse(savedPeople) || [];

const selectedPerson = people.find(function(person) {
    return person.id === personId;
})

console.log(selectedPerson);

const personInformation = document.querySelector("#person-information");

if (selectedPerson) {
    personInformation.innerHTML = `
        <h3>${selectedPerson.firstName} ${selectedPerson.lastName}</h3>
        <p>Gender: ${selectedPerson.gender}</p>
        <p>Status: ${selectedPerson.status}</p>
        <p>Birth Date: ${selectedPerson.birthMonth || "Unknown"} / ${selectedPerson.birthDay || "Unknown"} / ${selectedPerson.birthYear || "Unknown"}</p>
        <p>Birth Country: ${getCountryName(selectedPerson.birthCountry)}</p>
    `;
}
/* Sources: */

/*
https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
https://www.w3schools.com/jsref/dom_obj_param.asp
https://www.w3schools.com/tags/tag_param.asp
*/