// global variables
var isImportant = false; 
var detailsVisible = true; 
var calendarVisible = false; 
$(".calendar img").hide();

function toggleDetails(){
    let taskDetails = $("aside"); 
    if(detailsVisible){
        taskDetails.show(); 
        detailsVisible = true; 
    }
    else{
        taskDetails.hide();
        detailsVisible = false; 
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
    clearInput(); 
    displayTask(newTask);
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

function init(){
    console.log("Init Function");
    //load data

    //hook events
    $("#btnSave").click(saveTask); 

    $(".iImportant").click(toggleImportant);
    $(".details").click(toggleDetails);
    $(".cal-btn").click(toggleCalendar); 
}

window.onload=init; 