// global variables
var isImportant = false; 
var detailsVisible = true; 
var calendarVisible = false; 
$(".calendar img").hide();

function toggleDetails(){
    let taskDetails = $("aside"); 
    if(detailsVisible){
        taskDetails.hide();
        detailsVisible = false;  
    }
    else{
        taskDetails.show(); 
        detailsVisible = true;
    }
}

function toggleCalendar(){
    let calendarShow = $(".calendar img");
    if(calendarVisible){
        calendarShow.hide();
        calendarVisible = false; 
    }
    else{
        calendarShow.show(); 
        calendarVisible = true; 
    }
}

function toggleImportant(){
    let icon = $(".iImportant")
    //you can "chain" instructions when it is applied to the same item 
    if(isImportant){
        icon.removeClass("fas").addClass("far"); 
        isImportant = false; 
    }
    else{
       icon.removeClass("far").addClass("fas"); 
       isImportant = true; 
    }
}

function saveTask(){
    let title=$("#txtTitle").val();
    let dueDate=$("#dueDate").val();
    let location=$("#txtLocation").val(); 
    let description=$("#txtDescription").val();
    let participants=$("#txtParticipant").val();
    let color=$("#selColor").val();

    let newTask = new Task(isImportant,title,dueDate,location,description,participants,color); 
    console.log(newTask); 
    
    console.log(JSON.stringify(newTask));
    if(isValid(newTask)==true){
        $.ajax({
        type: "POST",
        url:"https://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(newTask),
        contentType: "application/json",
        

        success: function(response){
            console.log("Server says:", response)
            
            let savedTask =JSON.parse(response);
            clearInput(); 
            displayTask(savedTask);
        },
        error: function(details){
            console.log("Save failed", details)
        }
    });
    }
}

function isValid(newTask){
    let valid=true;
    if(newTask.title.length==0){
        valid=false;
    }
    else{
        return valid; 
    }
}

function fetchTasks(){
    $.ajax({
        url:"https://fsdiapi.azurewebsites.net/api/tasks",
        type: "GET",
        success: function(response){
            // at this point the server will return the entire content to the user in the form of an [array]
            let allTasks = JSON.parse(response);
            for(let i=0;i<allTasks.length;i++){
                let task = allTasks[i];
                // this will make sure that only the tasks for that user will be displayed. 
                if(task.name==="Green-Key"){
                    displayTask(task);
                }
                
            }
        },
        error: function(details){
            console.log("Request failed",details);
        }

    });
}

function deleteTasks(){
    $.ajax({
        url:"https://fsdiapi.azurewebsites.net/api/tasks/clear/Green-Key",
        type: "DELETE",
        success: function(){
            $(".task-container").html("");
        }
    });
}

function clearInput(){
    $("#taskImportant").val(false); 
    $("#txtTitle").val("");
    $("#dueDate").val("");
    $("#txtLocation").val("");
    $("#txtDescription").val("");
    $("#txtParticipant").val("");
    $("#selColor").val("#000000");
}

function displayTask(task){
    let syntax=`<div style="background-color: ${task.color}"; class="task">
    <div  class="task-title">
        <h6>${task.title}</h6>
        <p>${task.description}</p>
    </div>

    <div class="task-middle">
        <label>${task.location}</label>
        <label>${task.date}</label>
    </div>
    </div>`;
    $(".task-container").append(syntax);
}

// function testRequest(){
    // $.ajax({
        // url:"https://restclass.azurewebsites.net/api/test",
        // type:"GET",
        // the minimum for an ajax request is the method and request type
        // success: function(response){
            // console.log("Server says, ", response)    
        // } ,
        // error: function(details){
            // console.log("My Calendar!!", details)
        // }
    // });
// }

function init(){
    console.log("Init Function");
    //load data
    // testRequest();
    fetchTasks();
    //hook events
    $("#btnSave").click(saveTask); 

    $(".iImportant").click(toggleImportant);
    $(".details").click(toggleDetails);
    $(".cal-btn").click(toggleCalendar); 
    $(".delete").click(deleteTasks);
}

window.onload=init; 