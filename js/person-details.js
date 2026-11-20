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
    
    const birthCountry = document.querySelector("#birthCountry");

    countries.forEach(function(country) {
        const option = document.createElement("option");
        option.value = country.value;
        option.textContent = country.name;
        birthCountry.appendChild(option);
    });

    birthCountry.value = selectedPerson.birthCountry;

    const personInformation = document.querySelector("#person-information");

    if (selectedPerson) {
        document.querySelector("#firstName").value = selectedPerson.firstName;
        document.querySelector("#lastName").value = selectedPerson.lastName;
        document.querySelector("#gender").value = selectedPerson.gender;
        document.querySelector("#status").value = selectedPerson.status;
        if (selectedPerson.birthCity) {
            document.querySelector("#birthCity").value = selectedPerson.birthCity;
        }

        if (selectedPerson.birthState) {
            document.querySelector("#birthState").value = selectedPerson.birthState;
        }
        
        let birthDate = "Unknown";

        if (selectedPerson.birthMonth && selectedPerson.birthDay && selectedPerson.birthYear) {
            const date = new Date(
                selectedPerson.birthYear,
                selectedPerson.birthMonth - 1,
                selectedPerson.birthDay
            );
            document.querySelector("#birthDate").value =
                selectedPerson.birthYear + "-" +
                String(selectedPerson.birthMonth).padStart(2, "0") + "-" +
                String(selectedPerson.birthDay).padStart(2, "0");

            birthDate = date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });
        }
        if (selectedPerson.christeningDate) {
            document.querySelector("#christeningDate").value = selectedPerson.christeningDate;
        }
        if (selectedPerson.christeningCity) {
            document.querySelector("#christeningCity").value = selectedPerson.christeningCity;
        }

        if (selectedPerson.christeningState) {
            document.querySelector("#christeningState").value = selectedPerson.christeningState;
        }
        const christeningCountry = document.querySelector("#christeningCountry");

        countries.forEach(function(country) {
            const option = document.createElement("option");
            option.value = country.value;
            option.textContent = country.name;
            christeningCountry.appendChild(option);
        });

        if (selectedPerson.christeningCountry) {
            christeningCountry.value = selectedPerson.christeningCountry;
        }
        if (selectedPerson.marriageDate) {
            document.querySelector("#marriageDate").value = selectedPerson.marriageDate;
        }
        if (selectedPerson.marriageCity) {
            document.querySelector("#marriageCity").value = selectedPerson.marriageCity;
        }

        if (selectedPerson.marriageState) {
            document.querySelector("#marriageState").value = selectedPerson.marriageState;
        }

        const marriageCountry = document.querySelector("#marriageCountry");

        countries.forEach(function(country) {
            const option = document.createElement("option");
            option.value = country.value;
            option.textContent = country.name;
            marriageCountry.appendChild(option);
        });
        if (selectedPerson.marriageCountry) {
            marriageCountry.value = selectedPerson.marriageCountry;
        }

        if (selectedPerson.deathState) {
            document.querySelector("#deathState").value = selectedPerson.deathState;
        }
        if (selectedPerson.deathCity) {
            document.querySelector("#deathCity").value = selectedPerson.deathCity;
        }

        if (selectedPerson.deathState) {
            document.querySelector("#deathState").value = selectedPerson.deathState;
        }
        const deathCountry = document.querySelector("#deathCountry");

        countries.forEach(function(country) {
            const option = document.createElement("option");
            option.value = country.value;
            option.textContent = country.name;
            deathCountry.appendChild(option);
        });

        if (selectedPerson.deathCountry) {
            deathCountry.value = selectedPerson.deathCountry;
        }
        if (selectedPerson.burialDate) {
            document.querySelector("#burialDate").value = selectedPerson.burialDate;
        }
        if (selectedPerson.burialCity) {
            document.querySelector("#burialCity").value = selectedPerson.burialCity;
        }
        const burialCountry = document.querySelector("#burialCountry");

        countries.forEach(function(country) {
            const option = document.createElement("option");
            option.value = country.value;
            option.textContent = country.name;
            burialCountry.appendChild(option);
        });

        if (selectedPerson.burialCountry) {
            burialCountry.value = selectedPerson.burialCountry;
        }

        if (selectedPerson.burialState) {
    document.querySelector("#burialState").value = selectedPerson.burialState;
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
https://www.w3schools.com/jsref/met_dialog_showmodal.asp
https://www.w3schools.com/js/js_date_formats.asp
https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
https://www.w3schools.com/jsref/dom_obj_param.asp
https://www.w3schools.com/tags/tag_param.asp
https://www.w3schools.com/jsref/jsref_string_padstart.asp
*/