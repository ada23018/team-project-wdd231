let countries = [];

async function loadCountries() {
    const response = await fetch("data/birthCountries.json");
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
        option.textContent = `${person.firstName} ${person.lastName}`
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

const husbandFatherChoice = document.querySelector("#husband-father-choice");
populateDropdown(husbandFatherChoice);

const husbandMotherChoice = document.querySelector("#husband-mother-choice");
populateDropdown(husbandMotherChoice);

const wifeFatherChoice = document.querySelector("#wife-father-choice");
populateDropdown(wifeFatherChoice);

const wifeMotherChoice = document.querySelector("#wife-mother-choice");
populateDropdown(wifeMotherChoice);

husbandFatherChoice.addEventListener("change", function() {
    const selectedId = husbandFatherChoice.value;

    const selectedPerson = people.find(function(person) {
        return person.id === selectedId;
    });

    if (selectedPerson) {
        document.querySelector("#husband-father-name").textContent =
            `${selectedPerson.firstName} ${selectedPerson.lastName}`;

        document.querySelector("#husband-father-status").textContent =
            selectedPerson.status;
    } else {
        document.querySelector("#husband-father-name").textContent = "";
        document.querySelector("#husband-father-status").textContent = "";
    }
});

husbandMotherChoice.addEventListener("change", function() {
    const selectedId = husbandMotherChoice.value;

    const selectedPerson = people.find(function(person) {
        return person.id === selectedId;
    });

    if (selectedPerson) {
        document.querySelector("#husband-mother-name").textContent =
            `${selectedPerson.firstName} ${selectedPerson.lastName}`;

        document.querySelector("#husband-mother-status").textContent =
            selectedPerson.status;
    } else {
        document.querySelector("#husband-mother-name").textContent = "";
        document.querySelector("#husband-mother-status").textContent = "";
    }
});

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
            selectedPerson.birthCity + ", " +
            selectedPerson.birthState + ", " +
            getCountryName(selectedPerson.birthCountry);
        
        let christeningDate = "Unknown";

        if (selectedPerson.christeningDate) {
            const date = new Date(selectedPerson.christeningDate + "T00:00:00");

            christeningDate = date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });
        }

        document.querySelector("#husband-christening-date").textContent =
            christeningDate;
        
        document.querySelector("#husband-christening-place").textContent =
            selectedPerson.christeningCity + ", " +
            selectedPerson.christeningState + ", " +
            getCountryName(selectedPerson.christeningCountry);
        
        let marriageDate = "Unknown";
        
        if (selectedPerson.marriageDate) {
            const date = new Date(selectedPerson.marriageDate + "T00:00:00");

            marriageDate = date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });
        }

        document.querySelector("#husband-marriage-date").textContent =
            marriageDate;

        document.querySelector("#husband-marriage-place").textContent =
            selectedPerson.marriageCity + ", " +
            selectedPerson.marriageState + ", " +
            getCountryName(selectedPerson.marriageCountry);

        let deathDate = "Unknown";

        if (selectedPerson.deathDate) {
            const date = new Date(selectedPerson.deathDate + "T00:00:00");

            deathDate = date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });
        }

        document.querySelector("#husband-death-date").textContent =
            deathDate;

        let burialDate = "Unknown";

        document.querySelector("#husband-death-place").textContent =
            selectedPerson.deathCity + ", " +
            selectedPerson.deathState + ", " +
            getCountryName(selectedPerson.deathCountry);

        if (selectedPerson.burialDate) {
            const date = new Date(selectedPerson.burialDate + "T00:00:00");

            burialDate = date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });
        }

        document.querySelector("#husband-burial-date").textContent =
            burialDate;

        document.querySelector("#husband-burial-place").textContent =
            selectedPerson.burialCity + ", " +
            selectedPerson.burialState + ", " +
            getCountryName(selectedPerson.burialCountry);

    } else {
        husbandName.textContent = "";
        document.querySelector("#husband-birth-date").textContent = "";
        document.querySelector("#husband-birth-country").textContent = "";
        document.querySelector("#husband-christening-date").textContent = "";
        document.querySelector("#husband-christening-place").textContent = "";
        document.querySelector("#husband-marriage-date").textContent = "";
        document.querySelector("#husband-marriage-place").textContent = "";
        document.querySelector("#husband-death-date").textContent = "";
        document.querySelector("#husband-death-place").textContent = "";
        document.querySelector("#husband-burial-date").textContent = "";
        document.querySelector("#husband-burial-place").textContent = "";
        document.querySelector("#husband-father-name").textContent = "";
        document.querySelector("#husband-father-status").textContent = "";
        document.querySelector("#husband-mother-name").textContent = "";
        document.querySelector("#husband-mother-status").textContent = "";
        husbandFatherChoice.value = "";
        husbandMotherChoice.value = "";
    }
});

wifeFatherChoice.addEventListener("change", function() {
    const selectedId = wifeFatherChoice.value;

    const selectedPerson = people.find(function(person) {
        return person.id === selectedId;
    });

    if (selectedPerson) {
        document.querySelector("#wife-father-name").textContent =
            `${selectedPerson.firstName} ${selectedPerson.lastName}`;

        document.querySelector("#wife-father-status").textContent =
            selectedPerson.status;
    } else {
        document.querySelector("#wife-father-name").textContent = "";
        document.querySelector("#wife-father-status").textContent = "";
    }
});

wifeMotherChoice.addEventListener("change", function() {
    const selectedId = wifeMotherChoice.value;

    const selectedPerson = people.find(function(person) {
        return person.id === selectedId;
    });

    if (selectedPerson) {
        document.querySelector("#wife-mother-name").textContent =
            `${selectedPerson.firstName} ${selectedPerson.lastName}`;

        document.querySelector("#wife-mother-status").textContent =
            selectedPerson.status;
    } else {
        document.querySelector("#wife-mother-name").textContent = "";
        document.querySelector("#wife-mother-status").textContent = "";
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
            selectedPerson.birthCity + ", " +
            selectedPerson.birthState + ", " +
            getCountryName(selectedPerson.birthCountry);

        let christeningDate = "Unknown";

        if (selectedPerson.christeningDate) {
            const date = new Date(selectedPerson.christeningDate + "T00:00:00");

            christeningDate = date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });
        }

        document.querySelector("#wife-christening-date").textContent =
            christeningDate;

        document.querySelector("#wife-christening-place").textContent =
            selectedPerson.christeningCity + ", " +
            selectedPerson.christeningState + ", " +
            getCountryName(selectedPerson.christeningCountry);

        let deathDate = "Unknown";

        if (selectedPerson.deathDate) {
            const date = new Date(selectedPerson.deathDate + "T00:00:00");

            deathDate = date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });
        }
        
        document.querySelector("#wife-death-date").textContent =
            deathDate;

        document.querySelector("#wife-death-place").textContent =
            selectedPerson.deathCity + ", " +
            selectedPerson.deathState + ", " +
            getCountryName(selectedPerson.deathCountry);

        let burialDate = "Unknown";

        if (selectedPerson.burialDate) {
            const date = new Date(selectedPerson.burialDate + "T00:00:00");

            burialDate = date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });
        } 

        document.querySelector("#wife-burial-date").textContent =
            burialDate;
        document.querySelector("#wife-burial-place").textContent =
            selectedPerson.burialCity + ", " +
            selectedPerson.burialState + ", " +
            getCountryName(selectedPerson.burialCountry);

    } else {
        wifeName.textContent = "";
        document.querySelector("#wife-birth-date").textContent = "";
        document.querySelector("#wife-birth-country").textContent = "";
        document.querySelector("#wife-christening-date").textContent = "";
        document.querySelector("#wife-christening-place").textContent = "";
        document.querySelector("#wife-death-date").textContent = "";
        document.querySelector("#wife-death-place").textContent = "";
        document.querySelector("#wife-burial-date").textContent = "";
        document.querySelector("#wife-burial-place").textContent = "";
        document.querySelector("#wife-father-name").textContent = "";
        document.querySelector("#wife-father-status").textContent = "";
        document.querySelector("#wife-mother-name").textContent = "";
        document.querySelector("#wife-mother-status").textContent = "";
        wifeFatherChoice.value = "";
        wifeMotherChoice.value = "";
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
        } else {
            child1Gender.innerHTML = "☐ Male<br>☐ Female";
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
            selectedPerson.birthCity + ", " +
            selectedPerson.birthState + ", " +
            getCountryName(selectedPerson.birthCountry);
        
        let christeningDate = "Unknown";

        if (selectedPerson.christeningDate) {
            const date = new Date(selectedPerson.christeningDate + "T00:00:00");

            christeningDate = date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });
        }

        document.querySelector("#child1-christening-date").textContent =
            christeningDate;
        
        document.querySelector("#child1-christening-place").textContent =
            selectedPerson.christeningCity + ", " +
            selectedPerson.christeningState + ", " +
            getCountryName(selectedPerson.christeningCountry);

        let marriageDate = "Unknown";

        if (selectedPerson.marriageDate) {
            const date = new Date(selectedPerson.marriageDate + "T00:00:00");

            marriageDate = date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });
        }

        document.querySelector("#child1-marriage-date").textContent =
            marriageDate;

        document.querySelector("#child1-marriage-place").textContent =
            selectedPerson.marriageCity + ", " +
            selectedPerson.marriageState + ", " +
            getCountryName(selectedPerson.marriageCountry);

        if (selectedPerson.spouseIds && selectedPerson.spouseIds.length > 0) {
            const spouse = people.find(function(person) {
                return person.id === selectedPerson.spouseIds[0];
            });

            if (spouse) {
                document.querySelector("#child1-spouse").textContent =
                    `${spouse.firstName} ${spouse.lastName}`;
            } else {
                document.querySelector("#child1-spouse").textContent = "";
            }
        } else {
            document.querySelector("#child1-spouse").textContent = "";
        }


        let deathDate = "Unknown";

        if (selectedPerson.deathDate) {
            const date = new Date(selectedPerson.deathDate + "T00:00:00");

            deathDate = date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });
        }

        document.querySelector("#child1-death-date").textContent =
            deathDate;

        document.querySelector("#child1-death-place").textContent =
            selectedPerson.deathCity + ", " +
            selectedPerson.deathState + ", " +
            getCountryName(selectedPerson.deathCountry);


    } else {
        child1Name.textContent = "";
        document.querySelector("#child1-birth-date").textContent = "";
        document.querySelector("#child1-birth-country").textContent = "";
        child1Gender.innerHTML = "☐ Male<br>☐ Female";
        document.querySelector("#child1-christening-date").textContent = "";
        document.querySelector("#child1-christening-place").textContent = "";
        document.querySelector("#child1-marriage-date").textContent = "";
        document.querySelector("#child1-marriage-place").textContent = "";
        document.querySelector("#child1-death-date").textContent = "";
        document.querySelector("#child1-death-place").textContent = "";
        document.querySelector("#child1-spouse").textContent = "";
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
        } else {
            child2Gender.innerHTML = "☐ Male<br>☐ Female";
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
            selectedPerson.birthCity + ", " +
            selectedPerson.birthState + ", " +
            getCountryName(selectedPerson.birthCountry);
        
        let christeningDate = "Unknown";

        if (selectedPerson.christeningDate) {
            const date = new Date(selectedPerson.christeningDate + "T00:00:00");

            christeningDate = date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });
        }

        document.querySelector("#child2-christening-date").textContent =
            christeningDate;
        
        document.querySelector("#child2-christening-place").textContent =
            selectedPerson.christeningCity + ", " +
            selectedPerson.christeningState + ", " +
            getCountryName(selectedPerson.christeningCountry);

        let marriageDate = "Unknown";

        if (selectedPerson.marriageDate) {
            const date = new Date(selectedPerson.marriageDate + "T00:00:00");

            marriageDate = date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });
        }

        document.querySelector("#child2-marriage-date").textContent =
            marriageDate;

        document.querySelector("#child2-marriage-place").textContent =
            selectedPerson.marriageCity + ", " +
            selectedPerson.marriageState + ", " +
            getCountryName(selectedPerson.marriageCountry);

        if (selectedPerson.spouseIds && selectedPerson.spouseIds.length > 0) {
            const spouse = people.find(function(person) {
                return person.id === selectedPerson.spouseIds[0];
            });

            if (spouse) {
                document.querySelector("#child2-spouse").textContent =
                    `${spouse.firstName} ${spouse.lastName}`;
            } else {
                document.querySelector("#child2-spouse").textContent = "";
            }
        } else {
            document.querySelector("#child2-spouse").textContent = "";
        }


        let deathDate = "Unknown";

        if (selectedPerson.deathDate) {
            const date = new Date(selectedPerson.deathDate + "T00:00:00");

            deathDate = date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });
        }

        document.querySelector("#child2-death-date").textContent =
            deathDate;

        document.querySelector("#child2-death-place").textContent =
            selectedPerson.deathCity + ", " +
            selectedPerson.deathState + ", " +
            getCountryName(selectedPerson.deathCountry);


    } else {
        child2Name.textContent = "";
        document.querySelector("#child2-birth-date").textContent = "";
        document.querySelector("#child2-birth-country").textContent = "";
        child2Gender.innerHTML = "☐ Male<br>☐ Female";
        document.querySelector("#child2-christening-date").textContent = "";
        document.querySelector("#child2-christening-place").textContent = "";
        document.querySelector("#child2-marriage-date").textContent = "";
        document.querySelector("#child2-marriage-place").textContent = "";
        document.querySelector("#child2-death-date").textContent = "";
        document.querySelector("#child2-death-place").textContent = "";
        document.querySelector("#child2-spouse").textContent = "";
    }
});

loadCountries();

const printButton = document.querySelector("#print-record");

printButton.addEventListener("click", function() {
    window.print();
});