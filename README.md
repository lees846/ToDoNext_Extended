# To-Do Next
## by Shayla Lee 2022

## Description
Our task was to create a tool or quiz for a specific community or target audience by implementing local storage and user input.

## Process
I decided to do a continuation on my Digital Divination project which suggests a todo list order based on user-defined tasks. I broke up that project into different pages and added some further interface development, styling, and content updates.

My first step was to separate my site into three different paes. I pushed the text-heavy content to an "About the site" page, then using local storage I also displayed the results of the "quiz" separate from the input fields. 

I had to figure out how to store the user input when any buttons on the site are pressed, as well as how to reaccess it once it was stored. Because my information was stored in arrays, I had to use `JSON.stringify()` to store my arrays and `JSON.parse()` to convert the data back into arrays on the results page of my site.

I had several times while working with my `repopulate()` function when I couldn't figure out the exact syntax to put the stored user input back into the input fields. In both cases it was an improper reference to the input field and I needed to set the `.value` of each existing index to the number or text. 

(Sample below from main.js lines 104 - 116)
```// Repopulate Work Tasks
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
```

## Reflection
I think I learned a lot about my coding style and organization in this project, as well as what it's like to adapt and further an existing code project. I found that in a lot of cases I benefitted from listing out exactly what steps I needed to take to achieve the goal of my code. I did this on paper, but also used pseudo coding in comments for a more direct piece of information to translate to the appropriate syntax. This also helped me keep my code organized.

Perhaps in the future this could be expanded to not allow the user to generate a suggestion without any input rather than sending them to a blank page, because if nothing is added there will currently be no results generated on that page, but you can still go to it.


## Credits
Thank you to Leffin Christopher for helping me navigate local storage and referencing user input and to Aarati Akkapeddi for helping me see the little syntax errors I was encountering when repopulating the user input fields.