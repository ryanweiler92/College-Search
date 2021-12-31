
var searchInput = document.getElementById("search");
var searchBttn = document.getElementById("search-btn")
var resultTable = document.getElementById("results-table")

var getSearchValue = function (e){
    e.preventDefault();

    var search = searchInput.value;
    console.log(search);
    //send zipcode to college search function
    collegeZipSearch(search);
}



var collegeZipSearch = function (zip) {

    var apiUrl = "http://api.data.gov/ed/collegescorecard/v1/schools.json?zip="+ zip +"&distance=20mi&sort=latest.student.size:desc&api_key=mzvkvI7tUG41Q8n90FJQmtCL7NdDczS5dhJW6pKO"

    fetch(apiUrl).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                console.log(data)


            })
        } else {
            console.log("Error: No schools found")
        }
    })
    .catch(function(error) {
        console.log("Unable to connect to API")
    })
}


searchBttn.addEventListener("click", getSearchValue)



// http://api.data.gov/ed/collegescorecard/v1/schools.json?sort=latest.student.size&zip=06085&distance=20mi&api_key=mzvkvI7tUG41Q8n90FJQmtCL7NdDczS5dhJW6pKO

//http://api.data.gov/ed/collegescorecard/v1/schools.json?zip=06085&distance=20mi&sort=latest.student.size&api_key=mzvkvI7tUG41Q8n90FJQmtCL7NdDczS5dhJW6pKO