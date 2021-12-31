//api key apikey=8MDswbbw2Ak8pYG4Mol1zG39DJq9HTWt

//kansas city chiefs api search https://app.ticketmaster.com/discovery/v2/attractions.json?id=K8vZ9171oMf&apikey=8MDswbbw2Ak8pYG4Mol1zG39DJq9HTWt


var searchInput = document.getElementById("search");
var searchBttn = document.getElementById("search-btn")

var getSearchValue = function (e){
    e.preventDefault();

    var search = searchInput.value;
    console.log(search);
}



var ticketMasterApiCall = function () {

    var apiUrl = "http://api.data.gov/ed/collegescorecard/v1/schools.json?zip=06085&distance=25mi&api_key=mzvkvI7tUG41Q8n90FJQmtCL7NdDczS5dhJW6pKO"

    fetch(apiUrl).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                console.log(data)


            })
        } else {
            console.log("Error: Artist not found")
        }
    })


}

ticketMasterApiCall();

searchBttn.addEventListener("click", getSearchValue)