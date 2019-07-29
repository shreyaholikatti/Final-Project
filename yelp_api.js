var location;
var request;

function askLocation() {
  var apiKey = "Bearer xBYd_iC2bIBjWB8IXzFaaBcstSW6mSNJA-U9l5XKCn3xPLejA2F1CSOe3QURcJ5kUqedQZtxs5_KaDtuQI5N8NeLQGAVpCvieK5BE797-pMhCA5srEKnt66zE_M5XXYx";
  var location = document.getElementById("location").value;
  if (location === "") {
    alert('You did not enter a location!');
    return;
  }

  console.log("Name of location: " + location);

  var query = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=" + location;
  query = query.replace(/ /g, "-")
  locationRequest = new XMLHttpRequest();
  locationRequest.open("GET", query, true);
  locationRequest.setRequestHeader('Authorization', apiKey);
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
