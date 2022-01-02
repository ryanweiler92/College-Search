
var collegeIdsArray  = []

var loadColleges = function(){
    
    var collegeIds = localStorage.getItem("college id");
    collegeIdsArray.push(collegeIds.split(","))
    console.log(collegeIdsArray)

    getCollege(collegeIdsArray)


}


var getCollege = function(id) {
    
    for (var i = 0; i < collegeIdsArray.length; i++){

        id = collegeIdsArray[i]

    var apiUrl = "https://api.data.gov/ed/collegescorecard/v1/schools.json?id=" + id + "&api_key=mzvkvI7tUG41Q8n90FJQmtCL7NdDczS5dhJW6pKO"
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
}};






loadColleges();