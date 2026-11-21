let countries = [];

export async function loadCountries() {
    const response = await fetch("data/birthCountries.json") // this will be changed to birth-countries.json eventually

    if (response.ok) {
        countries = await response.json();
    } else {
        throw new Error("Could not load birth countries");
    }
}

export function getCountries() {
    return countries;
}

/* Sources: */

/* 
https://developer.mozilla.org/en-US/docs/Web/API/Response/ok 
https://developer.mozilla.org/en-US/docs/Web/API/Response
https://www.w3schools.com/js/js_api_fetch.asp
https://www.w3schools.com/js/tryit.asp?filename=tryjs_json_fetch_array_error
https://www.w3schools.com/js/tryit.asp?filename=tryjs_fetch_return_ok
https://www.w3schools.com/jsref/jsref_throw.asp
https://www.w3schools.com/js/js_errors.asp
https://www.w3schools.com/nodejs/nodejs_modules_esm.asp


*/