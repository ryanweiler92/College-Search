document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  });

const elem = document.getElementById("modal1");
const instance = M.Modal.init(elem, {dismissible: true});



var searchInput = document.getElementById("search");
var searchBttn = document.getElementById("search-btn");
var stateSearchBttn = document.getElementById("search-btn-state");
var stateSearchInput = document.getElementById("state-selection");
var resultTable = document.getElementById("results-table");
var tableBody = document.getElementById("table-body");

//get zipcode search value
var getSearchValue = function (e){
    e.preventDefault();

    var search = searchInput.value;
    console.log(search);
    //send zipcode to college search function
    collegeZipSearch(search);
}

var getStateSearchValue = function (e){
    e.preventDefault();

    var search = stateSearchInput.value
    console.log(search)
    collegeStateSearch(search)
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
            instance.open();
        }
    })
    .catch(function(error) {
        console.log("Unable to connect to API")
    })
};

var collegeStateSearch = function (state) {
    var apiUrl = "https://api.data.gov/ed/collegescorecard/v1/schools.json?school.state="+state+"&sort=latest.student.size:desc&api_key=mzvkvI7tUG41Q8n90FJQmtCL7NdDczS5dhJW6pKO"

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
    .catch(function(error){
        console.log("Unable to connect to API")
    })

};

var saveZip = function(id){
    console.log("something is happening")
    localStorage.setItem("zip", id)
};


var displayResults = function (data){
    tableBody.textContent = "";

    for (i = 0; i < data.results.length; i++){
        var tableRow = document.createElement('tr');
        tableBody.appendChild(tableRow);

        var schoolName = document.createElement('td');
        schoolName.textContent = data.results[i].latest.school.name;
        tableRow.appendChild(schoolName);

        var jobLink = document.createElement("a");
        jobLink.setAttribute("id", data.results[i].school.zip)
        jobLink.setAttribute("href", "./housing.html")
        jobLink.setAttribute("onclick", "saveZip(this.id)")
        jobLink.setAttribute("class", "job-link")
        tableRow.appendChild(jobLink)

        var cityName = document.createElement("td");
        cityName.textContent = data.results[i].latest.school.city;
        jobLink.appendChild(cityName)

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
};



searchBttn.addEventListener("click", getSearchValue);

stateSearchBttn.addEventListener("click", getStateSearchValue);





// http://api.data.gov/ed/collegescorecard/v1/schools.json?sort=latest.student.size&zip=06085&distance=20mi&api_key=mzvkvI7tUG41Q8n90FJQmtCL7NdDczS5dhJW6pKO

//http://api.data.gov/ed/collegescorecard/v1/schools.json?zip=06085&distance=20mi&sort=latest.student.size&api_key=mzvkvI7tUG41Q8n90FJQmtCL7NdDczS5dhJW6pKO