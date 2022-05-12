// Shayla Lee April 2022
// This code generates a suggested order for a complex to-do list based on the user's stress level.
// I was helped by Leffin Christopher when working through the initial array structure
// as well as making my user input manipulatable (not strings).

// These arrays will hold the input from the user taken from local storage
let workTasks;
let otherTasks;

// Variable to hold user-input stress level
let stressLevel;

// Template represents the text suggestion output
let template;

// Variables from the template
let randWork;
let randWork2;
let randOther;
let randOther2;

// Index of the work task that will take the longest for reference
let longIndex = 0;      

// Waits for everything to load then generates a suggestion
document.addEventListener('DOMContentLoaded', generateSuggestion());

function generateSuggestion(){
    convertData();
    biasWorkTasks();
    biasOtherTasks();
    decideTemplate();
    displayList();   
    displaySuggestion();
}

function convertData(){
    // I referenced https://catalins.tech/store-array-in-localstorage for storing and getting arrays from local storage
    const retrieved_wt = localStorage.getItem("workTasks");
    workTasks = JSON.parse(retrieved_wt);

    const retrieved_ot = localStorage.getItem("otherTasks");
    otherTasks = JSON.parse(retrieved_ot);

    const retrieved_sl = localStorage.getItem("stress");
    stressLevel = JSON.parse(retrieved_sl);
}

function biasWorkTasks(){
    // After the array is loaded, take the average of the time values
    // For work: if it takes longer than average, make it twice as likely
    let workTimeTotal = 0;

    // Add the minutes to get the total time
    for(let i = 0; i < workTasks.length; i++){
        workTimeTotal += workTasks[i].time;
    }

    // Find the average
    const workTimeAvg = workTimeTotal/workTasks.length;

    // Set a reference for the current length of the array
    const originalWTasks = workTasks.length;

    // Adds another instance of those tasks with times greater than the average
    // This makes them more likely and stops once it sees all of the tasks once
    for(let i = 0; i < originalWTasks; i++){
        if (workTasks[i].time > workTimeAvg){
            workTasks.push(workTasks[i]);
        }
    }

    return(workTasks);
}

function biasOtherTasks(){
    // Stores the max number of indicies the for loop should look through
    const originalOTasks = otherTasks.length;

    // For other: task is twice as likely if it takes less than 20 min
    for (let i = 0; i < originalOTasks; i++){
        if (otherTasks[i].time <= 20){
            otherTasks.push(otherTasks[i]);
        }
    }

    return(otherTasks);
}

function decideTemplate(){
    // Pick random tasks
    randWork = workTasks[Math.floor(Math.random()*workTasks.length)].task;
    randWork2 = workTasks[Math.floor(Math.random()*workTasks.length)].task;
    randOther = otherTasks[Math.floor(Math.random()*otherTasks.length)].task;
    randOther2 = otherTasks[Math.floor(Math.random()*otherTasks.length)].task;

    // Finds the index of the longest task so it can be prioritized for the low stress template
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
        template = `I suggest that you start with ${workTasks[longIndex].task}, take a break after one or two hours to ${randOther}, and get back to it when you're done.`
    } else if (stressLevel > 3 && stressLevel <= 6){
        template = `It might be good to ${randWork}, pause after one hour to ${randOther}, then go back to ${randWork} or ${randWork2} to switch it up.`
    } else if (stressLevel > 6){
        template = `Before you get started, I highly recommend you ${randOther}. This may help you reset before ${randWork}, then ${randOther2} after an hour of that if you're still overwhelmed.`
    }

    return(template, longIndex);
}

function displayList(){
    // Reference the location to display list items
    const outputList = document.getElementsByClassName('todo');

    // Like the template, pick the order of which variable will be displayed
    if (stressLevel <= 3){
        outputList[0].innerText = "1. " + workTasks[0].task;
        outputList[1].innerText = "2. " + randOther;
        outputList[2].innerText = "3. Finish up" + workTasks[0].task;
        
    } else if (stressLevel > 3 && stressLevel <= 6){
        outputList[0].innerText = "1. " + randWork;
        outputList[1].innerText = "2. " + randOther;
        outputList[2].innerText = "3. " + randWork + " or " + randWork2;
       
    } else if (stressLevel > 6){
        outputList[0].innerText = "1. " + randOther;
        outputList[1].innerText = "2. " + randWork;
        outputList[2].innerText = "3. " + randOther2;       
    }

    return;
}

function displaySuggestion(){
    // Reference output area, add text and template
    const outputSect = document.getElementById('output');
    outputSect.innerHTML = "Okay. " + template;

    // Reference the other tag on the page, and display the conclusion there
    const conclusion = document.getElementById('conclusion');
    conclusion.innerHTML = "That is my suggestion. You may take it, adjust it, or leave it, but it still stands. This tool will be here for you if you ever would like to use it. Take care of yourself, and good luck with your list!";
    return;
}