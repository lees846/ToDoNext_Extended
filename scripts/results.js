// Shayla Lee April 2022
// This code generates a suggested order for a complex to-do list based on the user's stress level
// I was helped by Leffin Christopher when working through the initial array structure
// as well as making my user input manipulatable (not strings)

// These arrays will hold the input from the user taken from local storage
let workTasks;
let otherTasks;

// Variable to hold stress level
let stressLevel;

// Template represents the output
let template;

// Variables from the template
let longIndex = 0;      // index for the longest work task
let randWork;
let randWork2;
let randOther;
let randOther2;

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
    // https://catalins.tech/store-array-in-localstorage for storing and getting arrays from local storage
    const retrieved_wt = localStorage.getItem("workTasks");
    workTasks = JSON.parse(retrieved_wt);
    console.log(workTasks);

    const retrieved_ot = localStorage.getItem("otherTasks");
    otherTasks = JSON.parse(retrieved_ot);
    console.log(otherTasks);

    const retrieved_sl = localStorage.getItem("stress");
    stressLevel = JSON.parse(retrieved_sl);
    console.log(stressLevel);
}

function biasWorkTasks(){
    // After the array is loaded, take the average of the 
    // For work: if it takes longer than average, make it twice as likely
    let workTimeTotal = 0;

    for(let i = 0; i < workTasks.length; i++){
        workTimeTotal += workTasks[i].time;
    }

    const workTimeAvg = workTimeTotal/workTasks.length;
    console.log(`Average: ${workTimeAvg}, Total: ${workTimeTotal}`);

    // Set a reference for the current length of the array
    const originalWTasks = workTasks.length;

    // Adds another instance of those greater than the average
    // This makes them more likely and stops once it sees all of them once
    for(let i = 0; i < originalWTasks; i++){
        if (workTasks[i].time > workTimeAvg){
            workTasks.push(workTasks[i]);
        }
    }
    console.log(workTasks);
    return(workTasks);
}

function biasOtherTasks(){
    // Stores the max number of indicies the for loop should look through
    const originalOTasks = otherTasks.length;

    // For other: task is twice as likely if <= 20 min
    for (let i = 0; i < originalOTasks; i++){
        if (otherTasks[i].time <= 20){
            otherTasks.push(otherTasks[i]);
        }
    }
    console.log(otherTasks);
    return(otherTasks);
}

function decideTemplate(){
    randWork = workTasks[Math.floor(Math.random()*workTasks.length)].task;
    randWork2 = workTasks[Math.floor(Math.random()*workTasks.length)].task;
    randOther = otherTasks[Math.floor(Math.random()*otherTasks.length)].task;
    randOther2 = otherTasks[Math.floor(Math.random()*otherTasks.length)].task;

    // Finds the index of the longest task so it can be prioritized for one template
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
        // "Work on <the thing that takes you the most time>, take a break after one or two hours to <random other>, and get back to it.""
    } else if (stressLevel > 3 && stressLevel <= 6){
        template = `It might be good to ${randWork}, pause after one hour to ${randOther}, then go back to ${randWork} or ${randWork2} to switch it up.`
        // "Work on <random work task>, pause after one hour to <random other>, then continue or work on <random work> now to switch it up."
    } else if (stressLevel > 6){
        template = `Before you get started, I highly recommend you ${randOther}. This may help you reset before ${randWork}, then ${randOther2} after an hour of that if you're still overwhelmed.`
        // "Before you get started, <random other>. This may help you reset before you work on <random work>, then <random other> after an hour of that if you're still overwhelmed."
    }
    console.log(template);
    return(template, longIndex);
}

function displayList(){
    console.log("displayList is being called");
    // if (stressLevel <= 3){
    //     li = `${workTasks[longIndex].task} ${randOther} get back to it`
        
    // } else if (stressLevel > 3 && stressLevel <= 6){
    //     li = `${randWork} ${randOther} ${randWork} or ${randWork2}`
       
    // } else if (stressLevel > 6){
    //     li = `${randOther} ${randWork} ${randOther2}`
       
    // }
    const outputList = document.getElementsByClassName('todo');
    console.log(outputList.length);
    outputList[0].innerText = workTasks[0].task;
    // outputList[1].innerHTML = randOther;
    // outputList[2].innerHTML = workTasks[longIndex].task;
}

function displaySuggestion(){
    const outputSect = document.getElementById('output');
    outputSect.innerHTML = "Okay. " + template;

    const conclusion = document.getElementById('conclusion');
    conclusion.innerHTML = "That is my suggestion. You may take it, adjust it, or leave it, but it still stands. This tool will be here for you if you ever would like to use it. Take care of yourself, and good luck with your list!";
    return;
}