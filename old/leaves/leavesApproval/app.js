// trying to get the id in the url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')// this id contains the id passed in the url
