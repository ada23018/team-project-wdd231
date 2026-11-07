const params = new URLSearchParams(window.location.search);
const personId = params.get("id");

console.log(personId);

/* Sources: */

/*
https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
https://www.w3schools.com/jsref/dom_obj_param.asp
https://www.w3schools.com/tags/tag_param.asp
*/