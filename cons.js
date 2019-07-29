function handle(e){
    if(e.keyCode === 13){
        e.preventDefault(); // Ensure it is only this code that runs

        // alert("Enter was pressed was presses");
        alert("Working");
        getLongLat();
        longLatResult();

    }
}

/*var placename = document.getElementById("wage");
placename.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
      getLongLat();
      longLatResult();
    }
});
*/

function getLongLat() {
  var apikey = '133c34086ceb4f089264cb4b18457109';
  var api_url = 'https://api.opencagedata.com/geocode/v1/json?';

  var placename = document.getElementById("place").value;
  placename = placename.replace(/ /g, "%20");

  var request_url = api_url
     + 'q=' + placename
     + '&key=' + apikey;
    // + '&pretty=1'
     //+ '&no_annotations=1';

  // see full list of required and optional parameters:
  // https://opencagedata.com/api#forward

  request = new XMLHttpRequest();
  request.open('GET', request_url, true);
  //request.setRequestHeader("", apikey)
  request.onload = longLatResult;
  request.send();  // make the request
}

function longLatResult() {
    // see full list of possible response codes:
    // https://opencagedata.com/api#codes

    if (request.status == 200){
      // Success!
      var data = JSON.parse(request.responseText);
      // console.log(data);
      resultLoc = data.results[0]["geometry"];
      console.log(resultLoc["lat"] + " , " + resultLoc["lng"]);
      sessionStorage.setItem("lat", resultLoc["lat"]);
      sessionStorage.setItem("lng", resultLoc["lng"]);
      window.location.href = "num_of_people.html";
    }
}
      // drawMap(lat, lng);
//
//       // redirect with query parameters to pass data
//       window.location = "other.html";
//         // + "?lat=" + resultLoc["lat"]
//         // + "&lng=" + resultLoc["lng"];
//
//     } else if (request.status <= 500){
//       // We reached our target server, but it returned an error
//
//       console.log("unable to geocode! Response code: " + request.status);
//       var data = JSON.parse(request.responseText);
//       console.log(data.status.message);
//     } else {
//       console.log("server error");
//     }
// }

// https://www.codeproject.com/Questions/795191/Passing-JavaScript-data-values-between-HTML-pages
// function getQParams() {
//   var queryString = decodeURIComponent(window.location.search);
//   queryString = queryString.substring(1);
//   var queries = queryString.split("&");
//
//   for (var i = 0; i < queries.length; i++)
//   {
//     document.write(queries[i] + "<br>");
//   }
//
//   alert(queries[0] + " , " + queries[1]);
// }
//

//
//   alert(output);
// }
