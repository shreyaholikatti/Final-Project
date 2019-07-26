var location;
var request;

function init(){
  // API Key from Yelp
  var apiKey = "xBYd_iC2bIBjWB8IXzFaaBcstSW6mSNJA-U9l5XKCn3xPLejA2F1CSOe3QURcJ5kUqedQZtxs5_KaDtuQI5N8NeLQGAVpCvieK5BE797-pMhCA5srEKnt66zE_M5XXYx";
  var auth = "https://api.yelp.com/oauth2/token"

  authSearch = new XMLHttpRequest();
  authSearch.open("GET", auth, true);
  authSearch.setRequestHeader
var dataFile = "data.json";
var zomato_key = "54b0eda3d9055df127947076b27dbd2c";

// getJSON example: https://www.w3schools.com/jquery/ajax_getjson.asp
// $(document).ready(function(){
//   $("button").click(function(){
//     $.getJSON("data.json", function(result){
//       $.each(result, function(i, field){
//         $("div").append(field + " ");
//       });
//     });
//   });
// });

function getData() {
  $.getJSON(dataFile, function(result){
    console.log(typeof(result));
    $.each(result, function(name, object){
      // console.log(result);
      // what to do for each item in dataFile
      var txt = document.createElement("p");  // Create with DOM
      txt.HTML = "Results: " + "\n" + name + " " + object;
      var resultDiv = document.getElementById("result");
      resultDiv.append(txt);
    });
  });
}

function getRestaurant() {
  var n = "denny's";
  dataFile = "charities.json";
  $.getJSON(dataFile, function(result){
    $.each(result, function(name, object){
      if(object["name"].toLowerCase() === n) {
        // console.log(object);
        if(object["accepted"] == true) {
          alert("Shipment received!");
        }
      }
      else {
        console.log("no match");
      }
      // console.log(object["name"]);
    });
  });
}

function edit() {
  // var obj = {
  //   name: "something",
  //   food: ["crackers"],
  //   charities: [],
  //   accepted: false
  // };
  //
  // var blob = new Blob([JSON.stringify(obj)], {type : 'application/json'});
  // window.URL.revokeObjectURL("new.json");
  // var file = window.URL.createObjectURL(blob);

  //check if browser supports file api and filereader features
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    var d = new Date(2013, 12, 5, 16, 23, 45, 600);
    var generatedFile = new File(["Rough Draft ...."], "Draft1.txt", {type: "text/plain"});
  }
  else {
    console.log("File/FileReader/FileList/Blob NOT SUPPORTED");
  }
  // console.log("edit");
}

// using a bunch of code from this StackOverflow page
// https://stackoverflow.com/questions/21012580/is-it-possible-to-write-data-to-file-using-only-javascript

function saveTextAsFile()
{
    var textToWrite = document.getElementById("inputTextToSave").value;
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.HTML = "Download File";

    if (window.webkitURL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}

function getCityID(loc) {
  loc = loc.replace(/ /g, "%20");

  var reqURL = "https://developers.zomato.com/api/v2.1/cities?";
  reqURL = reqURL + "q=" + loc;

  var city_id = 306;

  $.ajax({
        url: reqURL,
        beforeSend: function(xhr) {
             xhr.setRequestHeader("user-key", zomato_key);
        }, success: function(data){
            // console.log(data);
            // get the city ID from the result
            city_id = data["location_suggestions"][0]["id"];
        }
  });

  return city_id;
}

function getSearchData() {
  var location = document.getElementById("zomato-input").value;
  var city_id = getCityID(location);
  var reqURL = "https://developers.zomato.com/api/v2.1/search?";
  reqURL = reqURL + "entity_id=" + city_id + "&entity_type=city";

  $.ajax({
        url: reqURL,
        beforeSend: function(xhr) {
             xhr.setRequestHeader("user-key", zomato_key);
        }, success: function(data){
            // console.log(data);
            // get restaurants array
            var all_rest = data["restaurants"];
            // console.log(all_rest);
            var name = all_rest[0]["restaurant"]["name"];
            var address = all_rest[0]["restaurant"]["location"]["address"];
            console.log(name + " at " + address);
        }
  });
}("Authorization", apiKey);
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

window.onload = init;
