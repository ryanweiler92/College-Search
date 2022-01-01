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
var compareSubmitBtn = document.getElementById("compare-submit-btn")

//feed modal with college names within checkbox form
var modalSelections = function (){
    console.log("this function at least tried")
    var modalForm = document.getElementById("modal-form");
    var schoolNames = document.querySelectorAll(".school-name")
    var zipValues = document.querySelectorAll(".job-link");
    
    for (var i = 0; i < schoolNames.length; i++){

        console.log(schoolNames[i].textContent)
        var paragraphEl = document.createElement("p")
        modalForm.appendChild(paragraphEl);

        var labelEl = document.createElement("label");
        paragraphEl.appendChild(labelEl)

        var inputEl = document.createElement("input");
        inputEl.setAttribute("type", "checkbox")
        inputEl.setAttribute("class", "check")
        inputEl.setAttribute("id", schoolNames[i].textContent)
        inputEl.setAttribute("value", zipValues[i].id )
        labelEl.appendChild(inputEl)

        var spanEl = document.createElement("span");
        spanEl.textContent = schoolNames[i].textContent;
        labelEl.appendChild(spanEl);

    }
    checkLimit()
}

//limit to 2 selections
var checkLimit = function () {
var checks = document.querySelectorAll(".check")
var max = 2;
for (var i = 0; i < checks.length; i++)
    checks[i].onclick = selectiveCheck;
    function selectiveCheck (event) {
        var checkedChecks = document.querySelectorAll(".check:checked");
        if (checkedChecks.length >= max + 1)
        return false;
    }}

var saveCollegeCompare = function(){
    //var selections = document.querySelectorAll(".check:checked").value;

    var checkedName = []
    var checkedValue = [];
    var inputElements = document.querySelectorAll(".check");
    for (var i=0; i < inputElements.length; i++){
        if(inputElements[i].checked){
            checkedValue.push(inputElements[i].value)
            checkedName.push(inputElements[i].id)
            console.log(checkedValue)
            console.log(checkedName)
            
        }
        localStorage.setItem("college zip", checkedValue)
        localStorage.setItem("college name", checkedName)
    }
    
}




const elem2 = document.getElementById("modal2")
const instance2 = M.Modal.init(elem2, {dismissible: true}, {show: true})

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
        schoolName.setAttribute("class", "school-name");
        schoolName.setAttribute("id", data.results[i].school.zip)
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
    modalSelections();
};



searchBttn.addEventListener("click", getSearchValue);

stateSearchBttn.addEventListener("click", getStateSearchValue);

compareSubmitBtn.addEventListener("click", saveCollegeCompare)





// http://api.data.gov/ed/collegescorecard/v1/schools.json?sort=latest.student.size&zip=06085&distance=20mi&api_key=mzvkvI7tUG41Q8n90FJQmtCL7NdDczS5dhJW6pKO

//http://api.data.gov/ed/collegescorecard/v1/schools.json?zip=06085&distance=20mi&sort=latest.student.size&api_key=mzvkvI7tUG41Q8n90FJQmtCL7NdDczS5dhJW6pKO