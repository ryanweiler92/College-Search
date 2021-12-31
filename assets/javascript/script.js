
var searchInput = document.getElementById("search");
var searchBttn = document.getElementById("search-btn");
var resultTable = document.getElementById("results-table");
var tableBody = document.getElementById("table-body");

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
                console.log(data);
                displayResults(data);
            })
        } else {
            console.log("Error: No schools found")
        }
    })
    .catch(function(error) {
        console.log("Unable to connect to API")
    })
}

var displayResults = function (data){

    for (i = 0; i <= data.results.length; i++){
        var tableRow = document.createElement('tr');
        tableBody.appendChild(tableRow);

        var schoolName = document.createElement('td');
        schoolName.textContent = data.results[i].latest.school.name;
        tableRow.appendChild(schoolName);

        var cityName = document.createElement("td");
        cityName.textContent = data.results[i].latest.school.city;
        tableRow.appendChild(cityName)

        var schoolSize = document.createElement("td");
        var schoolSizeNum = data.results[i].latest.student.size;
        var schoolSizeComma = schoolSizeNum.toLocaleString("en-US")
        schoolSize.textContent = schoolSizeComma
        tableRow.appendChild(schoolSize);

        var tuitionIn = document.createElement("td");
        if (data.results[i].latest.cost.tuition.in_state == null){
            tuitionIn.textContent = "no data"
        } else {
            var tuitionInNum = data.results[i].latest.cost.tuition.in_state;
            var tuitionInComma = tuitionInNum.toLocaleString("en-US");
            tuitionIn.textContent = "$"+ tuitionInComma;
        }
        tableRow.appendChild(tuitionIn)

        var tuitionOut = document.createElement("td");
        if (data.results[i].latest.cost.tuition.out_of_state == null){
            tuitionOut.textContent = "no data"
        } else{
            var tuitionOutNum = data.results[i].latest.cost.tuition.out_of_state;
            var tuitionOutComma = tuitionOutNum.toLocaleString("en-US");
            tuitionOut.textContent = "$"+ tuitionOutComma
        }
        tableRow.appendChild(tuitionOut)


    }
}



searchBttn.addEventListener("click", getSearchValue)



// http://api.data.gov/ed/collegescorecard/v1/schools.json?sort=latest.student.size&zip=06085&distance=20mi&api_key=mzvkvI7tUG41Q8n90FJQmtCL7NdDczS5dhJW6pKO

//http://api.data.gov/ed/collegescorecard/v1/schools.json?zip=06085&distance=20mi&sort=latest.student.size&api_key=mzvkvI7tUG41Q8n90FJQmtCL7NdDczS5dhJW6pKO