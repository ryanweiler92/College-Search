


var getJobs = function(zip) {
    var apiUrl = "https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=03ab0e99&app_key=e527ac2e4dacd7eeb55525db9b15cac4&results_per_page=20&where=" + zip
    console.log(apiUrl)
    fetch(apiUrl).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                console.log(data);
            })
        } else {
            console.log("Error")
        }
    })
    .catch(function(error) {
        console.log("Unable to connect to API")
    })


}

//getJobs();

console.log(getJobs("06085"))



//e527ac2e4dacd7eeb55525db9b15cac4

//03ab0e99