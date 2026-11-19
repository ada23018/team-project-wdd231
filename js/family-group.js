function toTitleCase(text) {
    let titleCase = "";
    let words = text.toLowerCase().split(" ");

    for (let i = 0; i < words.length; i++) {
        let firstLetter = words[i].charAt(0).toUpperCase();
        let remainingLetters = words[i].slice(1);

        titleCase += firstLetter + remainingLetters + " ";
    }

    return titleCase.trim();
}

const savedPeople = localStorage.getItem("people");
let people = [];

if (savedPeople !== null) {
    people = JSON.parse(savedPeople);
}
console.log(people);

people.sort(function(a,b) {
    if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) {
        return -1;
    } else if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) {
        return 1;
    }
    return 0;
});

function populateDropdown(dropdown) {
    people.forEach(function(person) {
        const option = document.createElement("option");
        option.value = person.id;
        option.textContent =   `${person.firstName} ${person.lastName}`
        dropdown.appendChild(option);
    });
}

const husbandChoice = document.querySelector("#husband-choice");
populateDropdown(husbandChoice);

const wifeChoice = document.querySelector("#wife-choice");
populateDropdown(wifeChoice);

const child1Choice = document.querySelector("#child1-choice");
populateDropdown(child1Choice);

const child2Choice = document.querySelector("#child2-choice");
populateDropdown(child2Choice);

husbandChoice.addEventListener("change", function() {
    const selectedId = husbandChoice.value;

    const selectedPerson = people.find(function(person) {
        return person.id === selectedId;
    });

    const husbandName = document.querySelector("#husband-name");

    if (selectedPerson) {
        husbandName.textContent =
            `${selectedPerson.firstName} ${selectedPerson.lastName}`;
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
        document.querySelector("#husband-birth-date").textContent = birthDate;
        document.querySelector("#husband-birth-country").textContent =
    toTitleCase(selectedPerson.birthCountry);
    } else {
        husbandName.textContent = "";
        document.querySelector("#husband-birth-date").textContent = "";
        document.querySelector("#husband-birth-country").textContent = "";
    }
});


wifeChoice.addEventListener("change", function() {
    const selectedId = wifeChoice.value;

    const selectedPerson = people.find(function(person) {
        return person.id === selectedId;
    });

    const wifeName = document.querySelector("#wife-name");

    if (selectedPerson) {
        wifeName.textContent =
            `${selectedPerson.firstName} ${selectedPerson.lastName}`;

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

        document.querySelector("#wife-birth-date").textContent = birthDate;
        document.querySelector("#wife-birth-country").textContent =
            toTitleCase(selectedPerson.birthCountry);
    } else {
        wifeName.textContent = "";
        document.querySelector("#wife-birth-date").textContent = "";
        document.querySelector("#wife-birth-country").textContent = "";
    }
});

child1Choice.addEventListener("change", function() {
    const selectedId = child1Choice.value;

    const selectedPerson = people.find(function(person) {
        return person.id === selectedId;
    });

    const child1Name = document.querySelector("#child1-name");
    const child1Gender = document.querySelector("#child1-gender");
    if (selectedPerson) {
        child1Name.textContent =
            `${selectedPerson.firstName} ${selectedPerson.lastName}`;
            if (selectedPerson.gender === "male") {
                child1Gender.innerHTML = "☑ Male<br>☐ Female";
            } else if (selectedPerson.gender === "female") {
                child1Gender.innerHTML = "☐ Male<br>☑ Female";
            }

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

        document.querySelector("#child1-birth-date").textContent = birthDate;
        document.querySelector("#child1-birth-country").textContent =
            toTitleCase(selectedPerson.birthCountry);
    } else {
        child1Name.textContent = "";
        document.querySelector("#child1-birth-date").textContent = "";
        document.querySelector("#child1-birth-country").textContent = "";
        child1Gender.innerHTML = "☐ Male<br>☐ Female";
    }
});

child2Choice.addEventListener("change", function() {
    const selectedId = child2Choice.value;

    const selectedPerson = people.find(function(person) {
        return person.id === selectedId;
    });

    const child2Name = document.querySelector("#child2-name");
    const child2Gender = document.querySelector("#child2-gender");
    if (selectedPerson) {
        child2Name.textContent =
            `${selectedPerson.firstName} ${selectedPerson.lastName}`;
            if (selectedPerson.gender === "male") {
                child2Gender.innerHTML = "☑ Male<br>☐ Female";
            } else if (selectedPerson.gender === "female") {
                child2Gender.innerHTML = "☐ Male<br>☑ Female";
            }

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

        document.querySelector("#child2-birth-date").textContent = birthDate;
        document.querySelector("#child2-birth-country").textContent =
            toTitleCase(selectedPerson.birthCountry);
    } else {
        child2Name.textContent = "";
        document.querySelector("#child2-birth-date").textContent = "";
        document.querySelector("#child2-birth-country").textContent = "";
        child2Gender.innerHTML = "☐ Male<br>☐ Female";
    }
});