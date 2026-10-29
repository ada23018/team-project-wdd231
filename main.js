const testPerson = {
    relationship: "Self",
    firstName: "John",
    lastName: "Smith",
    birthDate: "1880-01-23",
    birthCounty: "El Paso",
    birthCity: "Colorado Springs",
    birthState: "CO",
    birthCountry: "United States",
    deathDate: "1942-12-28",
    deathCounty: "Converse",
    deathCity: "Casper",
    deathState: "WY",
    deathCountry: "United States",
    spouseFirstName: "Wilhelmina",
    spouseLastName: "Falconer",
    marriageDate: "1900-04-15",
    marriageCounty: "Chaffee",
    marriageCity: "Salida",
    marriageState: "CO",
    marriageCountry: "United States"
};

const relativeChoice = document.querySelector("#relativeChoice");
const personFields = document.querySelector("#person-fields");

if (relativeChoice && personFields) {
    /*
    https://www.w3schools.com/js/js_htmldom_eventlistener.asp
    https://www.w3schools.com/jsref/dom_obj_event.asp
    https://www.w3schools.com/tags/att_hidden.asp
    */
    personFields.hidden = true;
    relativeChoice.addEventListener("change", function () {
        /*console.log(relativeChoice.value);*/
        if (relativeChoice.value === "new") {
            personFields.hidden = false;
        } else {
            personFields.hidden = true;
        }
    })
}

const personForm = document.querySelector("#add-person");

/*https://www.w3schools.com/jsref/event_preventdefault.asp*/

if (personForm) {
    personForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const person = {
            firstName: personForm.firstName.value.trim(),
            lastName: personForm.lastName.value.trim()
        };
        console.log(person);
    })
}

/*First attempt:*/
/*const todaysDate = new Date();
document.querySelector("#todaysDate").textContent =    `Printed: ${todaysDate.toLocaleDateString()}`;*/

/* 
https://www.w3schools.com/jsref/jsref_date_new.asp
https://www.w3schools.com/jsref/jsref_tolocaledatestring.asp
https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_tolocaledatestring
*/

const dateElement = document.querySelector("#todaysDate");

if (dateElement) {
    const todaysDate = new Date();
    dateElement.textContent =
        `Printed: ${todaysDate.toLocaleDateString()}`;
}


function createPersonTemplate(person) {
    return `
        <div class="person-box">
            <h3>Name: ${person.firstName} ${person.lastName}</h3>
            <p><strong>Relationship: </strong> ${person.relationship}<p>
            <p><strong>Birth date:</strong> ${person.birthDate}</p>
            <p><strong>Birthplace:</strong> ${person.birthCounty}, ${person.birthCity}, ${person.birthState}, ${person.birthCountry}</p>
            <p><strong>Marrige date:</strong> ${person.marriageDate}</p>
            <p><strong>Marrige place:</strong> ${person.marriageCounty}, ${person.marriageCity}, ${person.marriageState}, ${person.marriageCountry}</p>
            <p><strong>Death date:</strong> ${person.deathDate}</p>
            <p><strong>Death place:</strong> ${person.deathCounty}, ${person.deathCity}, ${person.deathState}, ${person.deathCountry}</p>
            <p><strong>Spouse:</strong> ${person.spouseFirstName} ${person.spouseLastName}</p>
        </div>
    `
}

/* First Attempt:*/
/*
console.log(createPersonTemplate(testPerson));

document.querySelector("#person-container").innerHTML =
    createPersonTemplate(testPerson);
*/

const personContainer = document.querySelector("#person-container");

if (personContainer) {
    console.log(createPersonTemplate(testPerson));

    personContainer.innerHTML = createPersonTemplate(testPerson)
}

function loadDashboard() {
    const people = JSON.parse(localStorage.getItem("people")) || [];
    document.querySelector("#totalPeople").textContent =
        people.length;
    document.querySelector("#totalGenerations").textContent = 4;
    document.querySelector("#totalGroups").textContent = 1;
    const countries = new Set();
    people.forEach(person => {
        if (person.birthCountry) {
            countries.add(person.birthCountry);
        }
    });
    document.querySelector("#totalCountries").textContent =
        countries.size;
}
if (document.querySelector("#totalPeople")) {
    loadDashboard();
}

async function loadHeritageCountries() {
    const response =
        await fetch("data/countries.json");
    const countries =
        await response.json();
    const container =
        document.querySelector("#countryContainer");
    if (!container) return;
    countries.forEach(country => {
        const card =
            document.createElement("div");
        card.classList.add("country-card");
        card.innerHTML = `
            <h3>${country.country}</h3>
            <p>${country.percentage}%</p>
            <a href="heritage.html?id=${country.id}">
                View Details
            </a>
        `;
        container.appendChild(card);
    });
    openCountryFromURL(countries);
}

function openCountryFromURL(countries) {
    const params =
        new URLSearchParams(window.location.search);
    const id =
        Number(params.get("id"));
    if (!id) return;
    const selected =
        countries.find(c => c.id === id);
    if (!selected) return;
    document.querySelector("#modalCountryName").textContent =
        selected.country;
    document.querySelector("#modalCountryInfo").textContent =
        selected.description;
    document.querySelector("#countryModal").showModal();
}

const closeButton =
    document.querySelector("#closeModal");
if (closeButton) {
    closeButton.addEventListener("click", () => {
        document.querySelector("#countryModal").close();
    });
}

// for splitting into modules, maybe we use js/main.js, js/storage.js, js/heritage.js, js/dashboard.js