/**
*FourSquare API
*/
const CLIENT_ID = 'WPXCSADY4H0LGGSB40QRN4VZMMPOIENAKLOBJOVNPX2AZVU2';
const CLIENT_SECRET = 'BLVHLE5J1NI0P0Z1XQWYSN4Y1F4IXJJLM4METRWBXUPQ3TDA';
const API = "https://api.foursquare.com/v2";
const VERSION = "20180725";

const RADIUS_M = 250;
const SEARCH_RESULTS = 1;

/**
*Return a venue id from FourSquare. Takes lat, lng & name.
*/
export const getSearchResult = (lat, lng, name) =>
	fetch(`${API}/venues/search?ll=${lat},${lng}&limit=${SEARCH_RESULTS}&radius=${RADIUS_M}&query=${name}
    	&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}`)
	  	.then(response=>response.json())
	  	.then(response=>response.response.venues[0].id)
	  	.catch('error')
/**
*Return an array of details about a place from FourSquare. Takes venue id.
*/
export const getDetails = (id) =>
	fetch(`${API}/venues/${id}?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}`)
  		.then(res => res.json())
  		.catch('error')