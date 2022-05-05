// Shayla Lee April 2022
// This code collects the user input and puts it in local storage to be used
// by other parts of the site and refilled if the page is returned to

// These arrays will hold task input 
let workTasks;
let otherTasks;

// And this holds slider input
let stressLevel;

// Waits for everything to load 
document.addEventListener('DOMContentLoaded', function(){
    document.querySelector("#submit").addEventListener("click", getUserList);
});

function getUserList(){
    // Resets arrays every time the generate button is pressed
    workTasks = [];
    otherTasks = [{task: "go for a quick walk", time: 15}, {task: "move around and stop looking at screens", time: 10}];

    getWorkTasks();
    getOtherTasks();
    getStressLevel();
    storeInput();

    if (localStorage.getItem("length") > 0) {
        // repopulate the input fields with the stored data
        repopulate();
    }
}

function getWorkTasks(){
    // Get values for the user-defined work tasks
    const workClass = document.getElementsByClassName('work');
    const workTimeClass = document.getElementsByClassName('workTime');
    console.log(workClass);
    
    // Push the work tasks to the workTasks array
    for (let i = 0; i < workClass.length; i++){
        // only push if there's input
        if(workClass[i].value){
            workTasks.push({task: workClass[i].value, time: parseInt(workTimeClass[i].value)});
        }
    }

    console.log(workTasks);
    return(workTasks);
}

function getOtherTasks(){
    // Get values for the user-defined "other" tasks
    const otherClass = document.getElementsByClassName('other');
    const otherTimeClass = document.getElementsByClassName('otherTime');

    for (let i = 0; i < otherClass.length; i++){
        // only push if there's input
        if (otherClass[i].value){
            otherTasks.push({task: otherClass[i].value, time: parseInt(otherTimeClass[i].value)});
        }
    }

    console.log(otherTasks);
    return(otherTasks);
}

function getStressLevel(){
    // Get slider value and parse to integer
    const sliderInput = document.getElementById('stressLevel');
    stressLevel = parseInt(sliderInput.value);
    console.log("stress level = " + stressLevel); 
    return(stressLevel);
}

// Put the user input in local storage
function storeInput(){
    // https://catalins.tech/store-array-in-localstorage
    localStorage.setItem("otherTasks", JSON.stringify(otherTasks));
    localStorage.setItem("workTasks", JSON.stringify(workTasks));
    localStorage.setItem("stress", stressLevel);
}

function repopulate(){
    // access local storage
    const remembered_wt = localStorage.getItem("workTasks");
    // new variable for filling = JSON.parse(remembered_wt);
    // set input field values to existing stored input
}
