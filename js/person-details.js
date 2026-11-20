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

    const personInformation = document.querySelector("#person-information");

    if (selectedPerson) {

        let spouseName = "Unknown";

        if (selectedPerson.spouseIds && selectedPerson.spouseIds.length > 0) {
            const spousePerson = people.find(function(person) {
                return person.id === selectedPerson.spouseIds[0];
            });

            if (spousePerson) {
                spouseName = spousePerson.firstName + " " + spousePerson.lastName;
            }
        }

        const spouse = document.querySelector("#spouse");

        people.forEach(function(person) {
            if (person.id !== selectedPerson.id) {
                const option = document.createElement("option");
                option.value = person.id;
                option.textContent = person.firstName + " " + person.lastName;
                spouse.appendChild(option);
            }
        });
        if (selectedPerson.spouseIds && selectedPerson.spouseIds.length > 0) {
            spouse.value = selectedPerson.spouseIds[0];
        }

        birthCountry.value = selectedPerson.birthCountry;

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
        if (selectedPerson.deathDate) {
            document.querySelector("#deathDate").value = selectedPerson.deathDate;
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
            <p>Birth Place: ${selectedPerson.birthCity}, ${selectedPerson.birthState}, ${getCountryName(selectedPerson.birthCountry)}</p>
            <p>Christening Date: ${selectedPerson.christeningDate}</p>
            <p>Christening Place: ${selectedPerson.christeningCity}, ${selectedPerson.christeningState}, ${getCountryName(selectedPerson.christeningCountry)}</p>
            <p>Spouse: ${spouseName}</p>
            <p>Marriage Date: ${selectedPerson.marriageDate}</p>
            <p>Marriage Place: ${selectedPerson.marriageCity}, ${selectedPerson.marriageState}, ${getCountryName(selectedPerson.marriageCountry)}</p>
            <p>Death Date: ${selectedPerson.deathDate}</p>
            <p>Death Place: ${selectedPerson.deathCity}, ${selectedPerson.deathState}, ${getCountryName(selectedPerson.deathCountry)}</p>
            <p>Burial Date: ${selectedPerson.burialDate}</p>
            <p>Burial Place: ${selectedPerson.burialCity}, ${selectedPerson.burialState}, ${getCountryName(selectedPerson.burialCountry)}</p>
        `;
    } else {
        personInformation.textContent = "Person not found.";
    }
}

displayPerson();

const submitModal = document.querySelector("#submit-message");

const personForm = document.querySelector("#person-details-form");

personForm.addEventListener("submit", function(event) {
    event.preventDefault();
    if (selectedPerson) {
        selectedPerson.firstName = document.querySelector("#firstName").value;
        selectedPerson.lastName = document.querySelector("#lastName").value;
        selectedPerson.gender = document.querySelector("#gender").value;
        selectedPerson.status = document.querySelector("#status").value;
        
        const birthDate = document.querySelector("#birthDate").value;

        if (birthDate) {
            const dateParts = birthDate.split("-");

            selectedPerson.birthYear = Number(dateParts[0]);
            selectedPerson.birthMonth = Number(dateParts[1]);
            selectedPerson.birthDay = Number(dateParts[2]);
        } else {
            selectedPerson.birthYear = "";
            selectedPerson.birthMonth = "";
            selectedPerson.birthDay = "";
        }
        selectedPerson.birthCity = document.querySelector("#birthCity").value;
        selectedPerson.birthState = document.querySelector("#birthState").value;
        selectedPerson.birthCountry = document.querySelector("#birthCountry").value;
        selectedPerson.christeningDate = document.querySelector("#christeningDate").value;
        selectedPerson.christeningCity = document.querySelector("#christeningCity").value;
        selectedPerson.christeningState = document.querySelector("#christeningState").value;
        selectedPerson.christeningCountry = document.querySelector("#christeningCountry").value;
        selectedPerson.marriageDate = document.querySelector("#marriageDate").value;
        selectedPerson.marriageCity = document.querySelector("#marriageCity").value;
        selectedPerson.marriageState = document.querySelector("#marriageState").value;
        selectedPerson.marriageCountry = document.querySelector("#marriageCountry").value;
        selectedPerson.deathDate = document.querySelector("#deathDate").value;
        selectedPerson.deathCity = document.querySelector("#deathCity").value;
        selectedPerson.deathState = document.querySelector("#deathState").value;
        selectedPerson.deathCountry = document.querySelector("#deathCountry").value;
        selectedPerson.burialDate = document.querySelector("#burialDate").value;
        selectedPerson.burialCity = document.querySelector("#burialCity").value;
        selectedPerson.burialState = document.querySelector("#burialState").value;
        selectedPerson.burialCountry = document.querySelector("#burialCountry").value;

        const spouseId = document.querySelector("#spouse").value;
        let oldSpouseId = "";

        if (selectedPerson.spouseIds && selectedPerson.spouseIds.length > 0) {
            oldSpouseId = selectedPerson.spouseIds[0];
        }
        
        const oldSpouse = people.find(function(person) {
            return person.id === oldSpouseId;
        });
        
        if (oldSpouse) {
            oldSpouse.spouseIds = [];
        }
        
        if (spouseId) {
            selectedPerson.spouseIds = [spouseId];
        } else {
            selectedPerson.spouseIds = [];
        }
        
        const spousePerson = people.find(function(person) {
            return person.id === spouseId;
        });
        
        if (spousePerson) {
            if (!spousePerson.spouseIds) {
                spousePerson.spouseIds = [];
            }

            if (!spousePerson.spouseIds.includes(selectedPerson.id)) {
                spousePerson.spouseIds.push(selectedPerson.id);
            }
        }
        
        localStorage.setItem("people", JSON.stringify(people));
        displayPerson();
        submitModal.setAttribute("aria-hidden", "false");
        submitModal.classList.add("show");
    }
});
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        submitModal.classList.remove("show");
        submitModal.setAttribute("aria-hidden", "true");
    }
});
submitModal.addEventListener("click", function(event) {
    if (event.target === submitModal) {
        submitModal.classList.remove("show");
        submitModal.setAttribute("aria-hidden", "true");
    }
});
const closeButton = document.querySelector(".close-button");

closeButton.addEventListener("click", function() {
    submitModal.classList.remove("show");
    submitModal.setAttribute("aria-hidden", "true");
});

/* Sources: */

/*
https://www.w3schools.com/jsref/met_dialog_showmodal.asp
https://www.w3schools.com/js/js_date_formats.asp
https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
https://www.w3schools.com/jsref/dom_obj_param.asp
https://www.w3schools.com/tags/tag_param.asp
https://www.w3schools.com/jsref/jsref_string_padstart.asp
*/