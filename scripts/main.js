// Shayla Lee May 2022
// This code collects the user input and puts it in local storage to be used by other parts 
// of the site, and refills the user's previous input when a user leaves and returns to the page

// These arrays will hold task input 
let workTasks;
let otherTasks;

// And this holds slider input
let stressLevel;

// Waits for everything to load 
document.addEventListener('DOMContentLoaded', function(){
    // If there is data stored
    if (localStorage.length) {
        // Then repopulate the input fields with the stored data 
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
    
    // Push the work tasks to the workTasks array
    for (let i = 0; i < workClass.length; i++){
        // Only push if there's input
        if(workClass[i].value){
            workTasks.push({task: workClass[i].value, time: parseInt(workTimeClass[i].value)});
        }
    }

    return(workTasks);
}

function getOtherTasks(){
    // Get values for the user-defined "other" tasks
    const otherClass = document.getElementsByClassName('other');
    const otherTimeClass = document.getElementsByClassName('otherTime');

    for (let i = 0; i < otherClass.length; i++){
        // Only push if there's input
        if (otherClass[i].value){
            otherTasks.push({task: otherClass[i].value, time: parseInt(otherTimeClass[i].value)});
        }
    }

    return(otherTasks);
}

function getStressLevel(){
    // Get slider value and parse to integer
    const sliderInput = document.getElementById('stressLevel');
    stressLevel = parseInt(sliderInput.value);

    return(stressLevel);
}

// Put the user input in local storage
function storeInput(){
    // I referenced https://catalins.tech/store-array-in-localstorage for information on stringify
    localStorage.setItem("otherTasks", JSON.stringify(otherTasks));
    localStorage.setItem("workTasks", JSON.stringify(workTasks));
    localStorage.setItem("stress", stressLevel);
}

let replace_wtime;
function repopulate(){
    // Fetch local storage which gets strings
    const retrieved_wt = localStorage.getItem("workTasks");
    const retrieved_ot = localStorage.getItem("otherTasks");
    const retrieved_sl = localStorage.getItem("stress");

    // Convert data back to arrays so I can use info from the old values
    let oldWorkTasks = JSON.parse(retrieved_wt);
    let oldOtherTasks = JSON.parse(retrieved_ot);
    let oldStressLevel = JSON.parse(retrieved_sl);
    console.log(oldWorkTasks, oldOtherTasks, oldStressLevel);

    // Variables to hold the input field references for repopulating them
    const replace_wtask = document.getElementsByClassName('work');
    replace_wtime = document.getElementsByClassName('workTime');

    const replace_otask = document.getElementsByClassName('other');
    const replace_otime = document.getElementsByClassName('otherTime');

    const replace_sl = document.getElementById('stressLevel');

    // Repopulate Work Tasks
    for(let i = 0; i < replace_wtask.length; i++){
        if(oldWorkTasks[i]){
            replace_wtask[i].value = oldWorkTasks[i].task;
        }
    }
    
    // Repopulate Work Time
    for(let i = 0; i < replace_wtime.length; i++){
        if(oldWorkTasks[i]){
            replace_wtime[i].value = oldWorkTasks[i].time;
        }
    }

    // Repopulate Other Tasks (starts at 2 to account for auto suggestions)
    for(let i = 0; i < replace_otask.length; i++){
        if(oldOtherTasks[i + 2]){
            replace_otask[i].value = oldOtherTasks[i + 2].task;
        } 
    }

    // Repopulate Other Time
    for(let i = 0; i < replace_otime.length; i++){
        if(oldOtherTasks[i + 2]){
            replace_otime[i].value = oldOtherTasks[i + 2].time;
        }
    }

    // Re-select previous stress level
    replace_sl.value = oldStressLevel;
}
