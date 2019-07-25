var location;
var request;

function authorize(){
  // API Key from Yelp
  var apiKey = "xBYd_iC2bIBjWB8IXzFaaBcstSW6mSNJA-U9l5XKCn3xPLejA2F1CSOe3QURcJ5kUqedQZtxs5_KaDtuQI5N8NeLQGAVpCvieK5BE797-pMhCA5srEKnt66zE_M5XXYx";
  var auth = "https://api.yelp.com/oauth2/token"

  authSearch = new XMLHttpRequest();
  authSearch.open("GET", auth, true);
  authSearch.setRequestHeader("Authorization", apiKey);
  //var headers = auth.getAllResponseHeaders().toLowerCase();
  //console.log(headers);
}


function askLocation() {
  var location = document.getElementById("location").value;

  if (location === "") {
    alert('You did not enter a location!');
    return;
  }

  //  alert("Name of location: " + location);
  console.log("Name of location: " + location);

  var query = "https://api.yelp.com/v3/businesses/" + location;
  query = query.replace(/ /g, "-")

  locationRequest = new XMLHttpRequest();
  locationRequest.open("GET", query, true);
  locationRequest.onload = findLocation;
  locationRequest.send();
}


function findLocation(){

  if(locationRequest.status != 200){
    alert("Error");
    return;
  }
  var locationInfo = JSON.parse(locationRequest.responseText);
  console.log(locationInfo);
}

window.onload = authorize
