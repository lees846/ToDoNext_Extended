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
    console.log(localStorage.length);
    if (localStorage.length) {
        // repopulate the input fields with the stored data
        repopulate();
    }
    
    document.querySelector("#submit").addEventListener("click", getUserList);
    document.querySelector("#about").addEventListener("click", getUserList);
});

function getUserList(){
   // Resets arrays every time the generate button is pressed
    workTasks = [];
    otherTasks = [{task: "go for a quick walk", time: 15}, {task: "move around and stop looking at screens", time: 10}];

    getWorkTasks();
    getOtherTasks();
    getStressLevel();
    storeInput();
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

let replace_wtime;
function repopulate(){
    // console.log("repopulate is being called");
    // fetch local storage to get string 
    const remembered_wt = localStorage.getItem("workTasks");
    const remembered_ot = localStorage.getItem("otherTasks");
    const remembered_sl = localStorage.getItem("stress");
    // console.log(remembered_wt, remembered_ot, remembered_sl);

    // variable for parsed data = JSON.parse(remembered_wt);
    let oldWorkTasks = JSON.parse(remembered_wt);
    let oldOtherTasks = JSON.parse(remembered_ot);
    let oldStressLevel = JSON.parse(remembered_sl);
    console.log(oldWorkTasks, oldOtherTasks, oldStressLevel);

    // variable to hold the input fields to 
    const replace_wtask = document.getElementsByClassName('work');
    replace_wtime = document.getElementsByClassName('workTime');

    const replace_otask = document.getElementsByClassName('other');
    const replace_otime = document.getElementsByClassName('otherTime');
    const replace_sl = document.getElementById('stressLevel');
    // console.log(oldOtherTasks[0].time);

    // Repopulate Work Fields
    // document.getElementById('work0').value = oldWorkTasks[0].task;
    for(let i = 0; i < replace_wtask.length; i++){
        if(oldWorkTasks[i]){
            replace_wtask[i].value = oldWorkTasks[i].task;
        }
    }
    
    console.log("replace_wtime: " + replace_wtime);
    console.log("input num field: " + replace_wtime[0].input);
    for(let i = 0; i < replace_wtime.length; i++){
        if(oldWorkTasks[i]){
            replace_wtime[i].input = oldWorkTasks[i].time;
            console.log("trying to place work time");
            // This is getting the proper number for the time value but not setting it to the input field...
            console.log(replace_wtime[i].input); 
        }
    }

    // Repopulate Other Fields (starts at 2 to account for auto suggestions)
    for(let i = 0; i < replace_otask.length; i++){
        if(oldOtherTasks[i + 2]){
            replace_otask[i].value = oldOtherTasks[i + 2].task;
        } 
    }

    // *** add working loop for other time here ***

    // console.log("oldStressLevel: " + oldStressLevel);
    replace_sl.value = oldStressLevel;

}
