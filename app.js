//Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load all event listeners
loadEventListeners();


function loadEventListeners(){

    //DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add a task
    form.addEventListener('submit', addTask);
    //Remove a task via delete button
    taskList.addEventListener('click', removeTask);
    //Clear all tasks via clearBtn
    clearBtn.addEventListener('click', clearTasks);
    //Filter tasks
    filter.addEventListener('keyup', filterTasks);


}


//Get tasks from local storage
function getTasks(e){
    let tasks;
    if(localStorage.getItem('tasks') === null)
        {
            tasks = [];
        }
    else
        {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

    tasks.forEach(function(task){
        //Create li
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //Add text value to li
        li.textContent = task;

        //Create delete task link
        const link = document.createElement('a');
        //Add class
        link.className = 'delete-item secondary-content';
        //Add icon
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        

        //Append link to li
        li.appendChild(link);
        //Append li to the parent ul
        taskList.appendChild(li);

    });



}

//Add a task
function addTask(e){
    if(taskInput.value === ''){
        alert('Please enter a valid item');
    }

    else
    {
        //Create li
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //Add text value to li
        li.textContent = taskInput.value;

        //Create delete task link
        const link = document.createElement('a');
        //Add class
        link.className = 'delete-item secondary-content';
        //Add icon
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        

        //Append link to li
        li.appendChild(link);
        //Append li to the parent ul
        taskList.appendChild(li);


        //Store in local storage
        storeInLocStorage(taskInput.value);


        
        //Clear input
        taskInput.value = '';
        
    }


    e.preventDefault();
}

//Store tasks in local storage
function storeInLocStorage(task)
{
    let tasks;
    if(localStorage.getItem('tasks') === null)
        tasks = [];
    else
        tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

//Remove a single task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm('Are you sure?'))
        {
            e.target.parentElement.parentElement.remove();
        
            //Removing from ls
            removeTaskLocStorage(e.target.parentElement.parentElement);
        }

    }

    
}

//Remove task from local storage
function removeTaskLocStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null)
        tasks = [];
    else
        tasks = JSON.parse(localStorage.getItem('tasks'));
    
    tasks.forEach
    (function(task, index){
        if(taskItem.textContent === task)
            {
                tasks.splice(index,1);
            }
    });
        localStorage.setItem('tasks', JSON.stringify(tasks));
}


//Clear all tasks
function clearTasks(e){
    
    //Slower way, though difference is negligible
    //taskList.innerHTML = '';

    //Faster way
    while(taskList.firstChild)
    {
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksLocStorage();
}


//Remove tasks from local storage
function clearTasksLocStorage(){
    localStorage.clear();
}

//Filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(li){
        //Store text value of li
        const item = li.firstChild.textContent;
        //Check if text value shows up anywhere in the li 
        if(item.toLowerCase().indexOf(text) !== -1)
            {   //Display li if value found
                li.style.display = 'block';
            }
        else
            //Hide if value not found
            li.style.display = 'none';
    });





    console.log(text);
}