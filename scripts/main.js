// Shayla Lee April 2022
// This code collects the user input and stores it in local storage

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
    // decideTemplate();    
    // displaySuggestion();
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

    // After the array is loaded, take the average of the 
    // For work: if it takes longer than average, make it twice as likely
    // let workTimeTotal = 0;

    // for(let i = 0; i < workTasks.length; i++){
    //     workTimeTotal += workTasks[i].time;
    // }

    // const workTimeAvg = workTimeTotal/workTasks.length;
    // console.log(`Average: ${workTimeAvg}, Total: ${workTimeTotal}`);

    // Set a reference for the current length of the array
    // const originalWTasks = workTasks.length;

    // Adds another instance of those greater than the average
    // This makes them more likely and stops once it sees all of them once
    // for(let i = 0; i < originalWTasks; i++){
    //     if (workTasks[i].time > workTimeAvg){
    //         workTasks.push(workTasks[i]);
    //     }
    // }
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
    // const originalOTasks = otherTasks.length;

    // For other: twice as likely if <= 20
    // for (let i = 0; i < originalOTasks; i++){
    //     if (otherTasks[i].time <= 20){
    //         otherTasks.push(otherTasks[i]);
    //     }
    // }
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

/*
function decideTemplate(){
    // Get slider value and parse to integer
    const sliderInput = document.getElementById('stressLevel');
    const stressLevel = parseInt(sliderInput.value);
    console.log("stress level = " + stressLevel); 

    let randWork = workTasks[Math.floor(Math.random()*workTasks.length)].task;
    let randWork2 = workTasks[Math.floor(Math.random()*workTasks.length)].task;
    let randOther = otherTasks[Math.floor(Math.random()*otherTasks.length)].task;
    let randOther2 = otherTasks[Math.floor(Math.random()*otherTasks.length)].task;

    // Finds the index of the longest task and 
    let longIndex = 0;
    let longestTask = workTasks[longIndex].time;
    for (let i = 0; i < workTasks.length; i++){
        const currentTask = workTasks[i].time;
        if (currentTask > longestTask){
            longestTask = currentTask;
            longIndex = i;
        }
    }

    // Pick template depending on stress level
    if (stressLevel <= 3){
        template = `I suggest that you start ${workTasks[longIndex].task}, take a break after one or two hours to ${randOther}, and get back to it when you're done.`
        // "Work on <the thing that takes you the most time>, take a break after one or two hours to <random other>, and get back to it.""
    } else if (stressLevel > 3 && stressLevel <= 6){
        template = `It might be good to ${randWork}, pause after one hour to ${randOther}, then go back to ${randWork} or ${randWork2} to switch it up.`
        // "Work on <random work task>, pause after one hour to <random other>, then continue or work on <random work> now to switch it up."
    } else if (stressLevel > 6){
        template = `Before you get started, I highly recommend you ${randOther}. This may help you reset before ${randWork}, then ${randOther2} after an hour of that if you're still overwhelmed.`
        // "Before you get started, <random other>. This may help you reset before you work on <random work>, then <random other> after an hour of that if you're still overwhelmed."
    }
    // console.log(template);
    return(template);
}

function displaySuggestion(){
    const outputSect = document.getElementById('output');
    outputSect.innerHTML = "Okay. " + template;

    const conclusion = document.getElementById('conclusion');
    conclusion.innerHTML = "That is my suggestion. You may take it, adjust it, or leave it, but it still stands. This tool will be here for you if you ever would like to use it. Take care of yourself, and good luck with your list!";
    return;
}*/