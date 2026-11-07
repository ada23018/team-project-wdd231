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
    personInformation.textContent =
        `${selectedPerson.firstName} ${selectedPerson.lastName}`
}

/* Sources: */

/*
https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
https://www.w3schools.com/jsref/dom_obj_param.asp
https://www.w3schools.com/tags/tag_param.asp
*/