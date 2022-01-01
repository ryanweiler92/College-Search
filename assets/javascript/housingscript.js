

var zipHeader = document.getElementById("zip")


var loadZip = function(){

    var zip = localStorage.getItem("zip");
    getJobs(zip)


}



var getJobs = function(zip) {
    var apiUrl = "https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=03ab0e99&app_key=e527ac2e4dacd7eeb55525db9b15cac4&results_per_page=20&where=" + zip
    console.log(apiUrl)
    fetch(apiUrl).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                console.log(data);
                displayJobs(zip, data);
            })
        } else {
            console.log("Error")
        }
    })
    .catch(function(error) {
        console.log("Unable to connect to API")
    })


}

var displayJobs = function(zip, data) {
zipHeader.textContent = ""
zipHeader.textContent = zip;

var tbody = document.getElementById("job-table-body")
tbody.textContent = ""

for (i = 0; i <= data.results.length; i++) {

    console.log(data.results.length)

    var tableRow = document.createElement("tr");
    tbody.appendChild(tableRow);

    var jobTitle = document.createElement("td");
    jobTitle.textContent = data.results[i].title;
    tableRow.appendChild(jobTitle);

    var area = document.createElement("td");
    area.textContent = data.results[i].location.display_name
    tableRow.appendChild(area);

    var company = document.createElement("td");
    company.textContent = data.results[i].company.display_name;
    tableRow.appendChild(company);

    var linkSpan = document.createElement("a")
    linkSpan.setAttribute("href", data.results[i].redirect_url)
    tableRow.appendChild(linkSpan)

    var jobLink = document.createElement("i");
    jobLink.setAttribute("class", "material-icons")
    jobLink.textContent = "search"
    linkSpan.appendChild(jobLink)


}


}



loadZip();
//getJobs();

//console.log(getJobs("06085"))



//e527ac2e4dacd7eeb55525db9b15cac4

//03ab0e99