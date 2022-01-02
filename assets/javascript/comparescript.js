
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
                loadCollegeStats(data)
                
            })
        } else {
            console.log("Error")
        }
    })
    .catch(function(error) {
        console.log("Unable to connect to API")
    })
}};

var loadCollegeStats = function(data){

    var table = document.getElementById("compare-table-body");
    var header = document.getElementById("header");
    var admmissionRate = document.getElementById("admission-rate")
    var tuitionIn = document.getElementById("tuition-in");
    var tuitionOut = document.getElementById("tuition-out");
    var numOfPrograms = document.getElementById("number-programs");
    var size = document.getElementById("size");
    var roomBoardOn = document.getElementById("room&board-on-campus");
    var roomBoardOff = document.getElementById("room&board-off-campus")

    for (var i = 0; i < data.results.length; i++){

        var schoolNameEl = document.createElement("th");
        schoolNameEl.textContent = data.results[i].school.name 
        schoolNameEl.setAttribute("class", "text-center")
        header.appendChild(schoolNameEl)

        var adminRateEl = document.createElement("td");
        if (data.results[i].latest.admissions.admission_rate.overall == null){
            adminRateEl.textContent = "no data"
        } else {
        var adminRateNum = data.results[i].latest.admissions.admission_rate.overall
        var adminPercent = Math.floor((adminRateNum)*100)
        adminRateEl.textContent = adminPercent +"%"
        }
        admmissionRate.appendChild(adminRateEl);

        var inStateTuitionEl = document.createElement("td");
        if (data.results[i].latest.cost.tuition.in_state == null){
            inStateTuitionEl.textContent = "no data"
        } else {
        inStateTuitionEl.textContent = "$"+data.results[i].latest.cost.tuition.in_state.toLocaleString("en-US")
        }
        tuitionIn.appendChild(inStateTuitionEl);

        var outStateTuitionEl = document.createElement("td");
        if(data.results[i].latest.cost.tuition.out_of_state == null){
            outStateTuitionEl.textContent = "no data"
        } else {
        outStateTuitionEl.textContent = "$"+data.results[i].latest.cost.tuition.out_of_state.toLocaleString("en-US")
        }
        tuitionOut.appendChild(outStateTuitionEl);
        

        var numOfProgramsEl = document.createElement("td");
        if (data.results[i].latest.programs.cip_4_digit == null){
            numOfProgramsEl.textContent = "no data"
        } else {
        numOfProgramsEl.textContent = data.results[i].latest.programs.cip_4_digit.length;
        }
        numOfPrograms.appendChild(numOfProgramsEl)

        var sizeEl = document.createElement("td");
        if (data.results[i].latest.student.size == null){
            sizeEl.textContent = "no data"
        } else {
        sizeEl.textContent = data.results[i].latest.student.size.toLocaleString("en-US");
        }
        size.appendChild(sizeEl);

        var roomBoardOnEl = document.createElement("td");
        if (data.results[i].latest.cost.roomboard.oncampus == null){
            roomBoardOnEl.textContent = "no data"
        } else{
        roomBoardOnEl.textContent = "$"+data.results[i].latest.cost.roomboard.oncampus.toLocaleString("en-US");
        }
        roomBoardOn.appendChild(roomBoardOnEl)

        var roomBoardOffEl = document.createElement("td");
        if (data.results[i].latest.cost.roomboard.offcampus == null){
            roomBoardOffEl.textContent = "no data"
        } else{
        roomBoardOffEl.textContent =  "$"+data.results[i].latest.cost.roomboard.offcampus.toLocaleString("en-US");
        }
        roomBoardOff.appendChild(roomBoardOffEl);

    }



}





loadColleges();