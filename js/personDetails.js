let countries = [];

async function loadCountries() {
    const response = await fetch("data/birthCountries.json")
    countries = await response.json();
}
function getCountryName(countryValue) {
    const country = countries.find(function(country) {
        return country.value === countryValue;
    });
    if (country) {
        return country.name;
    }
    return "Unknown";
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

async function displayPerson() {
    await loadCountries();

    const personInformation = document.querySelector("#person-information");

    if (selectedPerson) {
        let birthDate = "Unknown";

        if (selectedPerson.birthMonth && selectedPerson.birthDay && selectedPerson.birthYear) {
            const date = new Date(
                selectedPerson.birthYear,
                selectedPerson.birthMonth - 1,
                selectedPerson.birthDay
            );

            birthDate = date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });
        }

        personInformation.innerHTML = `
            <h3>${selectedPerson.firstName} ${selectedPerson.lastName}</h3>
            <p>Gender: ${selectedPerson.gender}</p>
            <p>Status: ${selectedPerson.status}</p>
            <p>Birth Date: ${birthDate}</p>
            <p>Birth Country: ${getCountryName(selectedPerson.birthCountry)}</p>
        `;
    } else {
        personInformation.textContent = "Person not found.";
    }
}
displayPerson();

/* Sources: */

/*
https://www.w3schools.com/js/js_date_formats.asp
https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
https://www.w3schools.com/jsref/dom_obj_param.asp
https://www.w3schools.com/tags/tag_param.asp
*/