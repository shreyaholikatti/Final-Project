var location;
var request;

function authorize(){
  // API Key from Yelp
  var apiKey = "xBYd_iC2bIBjWB8IXzFaaBcstSW6mSNJA-U9l5XKCn3xPLejA2F1CSOe3QURcJ5kUqedQZtxs5_KaDtuQI5N8NeLQGAVpCvieK5BE797-pMhCA5srEKnt66zE_M5XXYx";
//  var auth = "https://api.yelp.com/oauth2/token"
  var auth = "https://api.yelp.com/v3/json?api-key=" + apiKey
  authSearch = new XMLHttpRequest();
  authSearch.open("GET", auth, true);
//  authSearch.setRequestHeader('Authorization', 'Bearer '+ apiKey);

  authSearch.send();
  if(authSearch.status == 200){
    alert("heyyyy");
  }
  else{
    alert("heyyyyyyy");
  }
}


function askLocation() {
  var apiKey = "xBYd_iC2bIBjWB8IXzFaaBcstSW6mSNJA-U9l5XKCn3xPLejA2F1CSOe3QURcJ5kUqedQZtxs5_KaDtuQI5N8NeLQGAVpCvieK5BE797-pMhCA5srEKnt66zE_M5XXYx";

  var location = document.getElementById("location").value;


  if (location === "") {
    alert('You did not enter a location!');
    return;
  }

  console.log("Name of location: " + location);

  var query = "https://api.yelp.com/v3/businesses/search?location=" + location;
  query = query.replace(/ /g, "-")
  locationRequest = new XMLHttpRequest();
  locationRequest.open("GET", query, true);
  locationRequest.setRequestHeader('Authorization', 'Bearer '+ apiKey);
  if(locationRequest.status != 200){
    alert("Error");
    return;
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
