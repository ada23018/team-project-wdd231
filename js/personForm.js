let countries = [];

const searchInput = document.querySelector("#search-people");
searchInput.addEventListener("input", search);

const relativeChoice = document.querySelector("#relativeChoice");
const existingPeople = document.querySelector("#existing-people");
const personList = document.querySelector("#person-list");
const personModal = document.querySelector("#person-modal");
const cancelPerson = document.querySelector("#cancel-person");

if (relativeChoice && personModal && existingPeople) {
    relativeChoice.addEventListener("change", function() {
        if (relativeChoice.value === "new") {
            existingPeople.hidden = true;
            personModal.showModal();

        } else if (relativeChoice.value === "existing") {
            personModal.close();
            existingPeople.hidden = false;

        } else {
            personModal.close();
            existingPeople.hidden = true;
        }
    });
}

if (cancelPerson) {
    cancelPerson.addEventListener("click", function() {
        personModal.close();
        relativeChoice.value = "";
    });
}

const personForm = document.querySelector("#person-form");
const submitMessage = document.querySelector("#submit-message");

if (personForm) {
    personForm.addEventListener("submit", function(event) {
        console.log("The form was submitted.");
        event.preventDefault();

        const person = {
            id: crypto.randomUUID(),
            firstName: personForm.firstName.value.trim(),
            lastName: personForm.lastName.value.trim(),
            gender: personForm.querySelector('input[name="gender"]:checked').value,
            status: personForm.querySelector('input[name="status"]:checked').value,
            birthMonth: personForm.birthMonth.value,
            birthDay: personForm.birthDay.value,
            birthYear: personForm.birthYear.value,
            birthCountry: personForm.birthCountry.value
        };
        console.log(person);

        const savedPeople = localStorage.getItem("people");

        let people;

        if (savedPeople !== null) {
            people = JSON.parse(savedPeople);
        } else {
            people = [];
        }
        people.push(person);
        localStorage.setItem("people", JSON.stringify(people));
        
        const messageText = document.querySelector("#message-text");
        messageText.textContent = `${person.firstName} ${person.lastName} was added to your tree!`;

        submitMessage.showModal();
        personForm.reset();
        personModal.close();
        relativeChoice.value = "";
        existingPeople.hidden = true;

        loadPeople();
        displayPeople(people);
    });
}

const closeMessage = document.querySelector("#close-message");

if (closeMessage) {
    closeMessage.addEventListener("click", function() {
        submitMessage.close();
    });
}
function sortPeople(a, b) {
    if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) {
        return -1;
    } else if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) {
        return 1;
    }

    if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
        return -1;
    } else if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
        return 1;
    }

    return 0;
}

function loadPeople() {
    const savedPeople = localStorage.getItem("people");

    let people = [];

    if (savedPeople !== null) {
        people = JSON.parse(savedPeople);
    }

    people.sort(sortPeople);

    personList.innerHTML = '<option value="">Select a Person</option>';

    people.forEach(function(person) {
        const option = document.createElement("option");
        option.value = person.id;
        option.textContent = `${person.firstName} ${person.lastName}`;
        personList.appendChild(option);
    });
}
loadPeople();

const personDisplay = document.querySelector("#person-display");

personList.addEventListener("change", function() {
    const selectedId = personList.value;

    const savedPeople = localStorage.getItem("people");
    let people = [];
    if (savedPeople !== null) {
        people = JSON.parse(savedPeople);
    }

    const selectedPerson = people.find(function(person) {
        return person.id === selectedId;
    });

    if (selectedPerson) {
        personDisplay.textContent =
            `${selectedPerson.firstName} ${selectedPerson.lastName}; 
            ${selectedPerson.gender}; 
            ${selectedPerson.status}; 
            Birth Year: ${selectedPerson.birthYear}; 
            Birth Country: ${getCountryName(selectedPerson.birthCountry)}`;
    } else {
        personDisplay.textContent = "";
    }
});

function displayPeople(people) {

    const peopleDirectory = document.querySelector("#people-directory");
    peopleDirectory.innerHTML = "";

    people.sort(sortPeople);

    if (people.length === 0) {
        peopleDirectory.textContent = "Directory is empty."
        return;
    }


    people.forEach(function(person) {
        const personCard = document.createElement("article")
        const personName = document.createElement("h4");

        personCard.classList.add("person-card");
        personCard.dataset.id = person.id;
        
        personName.textContent = 
            `${person.lastName}, ${person.firstName} `;
        const birthInfo = document.createElement("p");
        birthInfo.textContent =
            `Birth Year: ${person.birthYear || "Unknown"}`;
        const countryInfo = document.createElement("p");
        countryInfo.textContent =
            `Birth Country: ${getCountryName(person.birthCountry)}`;
        personCard.appendChild(personName);
        personCard.appendChild(birthInfo);
        personCard.appendChild(countryInfo);

        peopleDirectory.appendChild(personCard);

    });
}

function search() {
    const peopleQuery = searchInput.value.toLowerCase();

    const savedPeople = localStorage.getItem("people");
    let people = [];

    if (savedPeople !== null) {
        people = JSON.parse(savedPeople);
    }
    const filteredPeople = people.filter(function(person) {
        return (
            person.firstName.toLowerCase().includes(peopleQuery) || person.lastName.toLowerCase().includes(peopleQuery) || person.birthYear.toString().includes(peopleQuery) || getCountryName(person.birthCountry).toLowerCase().includes(peopleQuery)
        );
    });
    filteredPeople.sort(sortPeople);
    displayPeople(filteredPeople);
}

async function loadCountries() {
    const response = await fetch("data/birthCountries.json");
    countries = await response.json();
    const birthCountry = document.querySelector("#birthCountry");

    const options = countries.map(function(country) {
        const option = document.createElement("option");
        option.value = country.value;
        option.textContent = country.name;

        return option;
    });
    options.forEach(function(option) {
        birthCountry.appendChild(option);
    });
    const savedPeople = localStorage.getItem("people");
    let people = [];
    if (savedPeople !== null) {
        people = JSON.parse(savedPeople);
    }
    displayPeople(people);
}
loadCountries();

function getCountryName(countryValue) {
    const country = countries.find(function(country) {
        return country.value === countryValue;
    });
    if (country) {
        return country.name;
    }
    return "Unknown";
}

const printButton = document.querySelector("#print-directory");

printButton.addEventListener("click", function() {
    document.body.classList.add("print-directory");
    window.print();
});

window.addEventListener("afterprint", function() {
    document.body.classList.remove("print-directory");
})

/* Sources: */

/*
    https://www.w3schools.com/tags/att_global_data.asp
    https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
    https://www.w3schools.com/jsref/jsref_localecompare.asp
    https://www.w3schools.com/jsref/jsref_find.asp
    https://www.w3schools.com/js/js_maps.asp
    https://www.w3schools.com/jsref/jsref_foreach.asp
    https://www.w3schools.com/js/js_api_fetch.asp
    https://www.w3schools.com/js/js_json.asp
    https://www.w3schools.com/js/js_htmldom_eventlistener.asp
    https://www.w3schools.com/jsref/dom_obj_event.asp
    https://www.w3schools.com/tags/att_hidden.asp
    https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID
    https://www.w3schools.com/tools/tool_uuid.php
    https://www.w3schools.com/jsref/jsref_primitive_null.asp
    https://www.w3schools.com/jsref/met_document_createelement.asp

    Printing: window: print() method:
    https://www.w3schools.com/jsref/met_win_print.asp
    https://developer.mozilla.org/en-US/docs/Web/API/Window/print
    https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@page
    https://www.w3schools.com/jsref/prop_element_classlist.asp
    https://www.w3schools.com/jsref/met_element_remove.asp
    https://developer.mozilla.org/en-US/docs/Web/API/Window/afterprint_event

*/
