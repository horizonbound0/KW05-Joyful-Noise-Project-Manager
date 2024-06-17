// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const modalFormEl = $('#modal-form');
const taskTitleEl = $('#task-title-input');
const taskDueDateEl = $('#task-due-date');
const taskDescEl = $('#task-desc');
const taskDisplayEl = $('#task-display');


// TODO: create a function to generate a unique task id
function generateTaskId() {
    const taskID = crypto.randomUUID();
    return taskID;
}

// MAKE FUNCTION TO STORE FORM VALUES IN LOCAL STORAGE
function storeTasksLocal(taskArray) {
    localStorage.setItem('tasks', JSON.stringify(taskArray));
}

// MAKE FUNCTION TO READ TASKS FROM LOCAL STORAGE
function readTasksLocal() {
    let tasks = [];

    if (localStorage.getItem('tasks') != null) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        return tasks;
    } else {
        return tasks;
    }
}

// TODO: create a function to create a task card
function createTaskCard(task) {

    // making the task card and it's contents to hold the info and be draggable
    const taskCard = $('<div>')
        .addClass('card task-card draggable my-3')
        .attr('data-task-id', task.id);
    
    const taskTitle = $('<h4>')
        .addClass('card-header h4')
        .text(task.title);
    
    const cardBody = $('<div>')
        .addClass('card-body');
    
    const taskDesc = $('<p>')
        .addClass('card-text')
        .text(task.desc);
    
    const taskDueDate = $('<p>')
        .addClass('card-text')
        .text(task.taskDate);
    
    const cardDeleteBtn = $('<button>')
        .addClass('btn btn-danger delete')
        .attr('data-task-id', task.id)
        .text('Delete');
    

    // Setting up background change like it is in the mini project, while changing the variables and handles to better align this challenge
    if (task.taskDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.taskDate, 'DD/MM/YYYY');

        if (now.isSame(taskDueDate, 'day')) {
            taskCard.addClass('bg-warning text-white');
        } else if (now.isAfter(taskDueDate)) {
            taskCard.addClass('bg-danger text-white');
            cardDeleteBtn.addClass('border-light');
        }
    }

    // put the description, due date, and delete button in the body
    cardBody.append([taskDesc, taskDueDate, cardDeleteBtn]);
    //--------------------

    // put the body and title in the card element
    taskCard.append([taskTitle, cardBody]);
    //--------------------

    return taskCard;
}

// TODO: create a function to render the task list and make cards draggable
function renderTaskList() {

    const tasks = readTasksLocal();
  
    // clear the lanes each time this function is called
    const todoList = $('#todo-cards');
    todoList.empty();
  
    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();
  
    const doneList = $('#done-cards');
    doneList.empty();
  
    // CREATE THE CARDS FROM THE TASKS ARRAY
  
    for (let i = 0; i < tasks.length; ++i) {
      if (tasks[i].status === 'to-do') {
        todoList.append(createTaskCard(tasks[i]));
      } else if (tasks[i].status === 'in-progress') {
        inProgressList.append(createTaskCard(tasks[i]));
      } else if (tasks[i].status === 'done') {
        doneList.append(createTaskCard(tasks[i]));
      }
    }
  
    // make the cards dragable
    $('.draggable').draggable({
      opacity: 0.7,
      zIndex: 100,
      // add some visual effects for the user like in the mini project
      helper: function (e) {
        // checks what the user is dragging, and makes sure to bring the whole card with it
        const original = $(e.target).hasClass('ui-draggable')
          ? $(e.target)
          : $(e.target).closest('.ui-draggable');
        // as noted in the mini project, this is to make sure the card width doesn't get funky during the drag
        return original.clone().css({
          width: original.outerWidth(),
        });
      },
    });  
    return tasks;
}

// TODO: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
    const target = event.target;
    const targetAdd = target.dataset.task;
    if (targetAdd === 'add') {
        // GRAB INPUT ELEMENT VALUES <<<<<<<<<<<<<<
        const taskTitle = taskTitleEl.val();
        const taskDesc = taskDescEl.val();
        const taskDate = taskDueDateEl.val();

        if (taskTitle != null && taskDesc != null && taskDate != null) {
            // BUILD THE TASK OBJECT
            const newTask = {
                id: generateTaskId(),
                title: taskTitle,
                desc: taskDesc,
                taskDate: taskDate,
                status: 'to-do',
            };

            // PULL TASKS OR ARRAY FROM STORAGE
            const tasks = readTasksLocal();

            // PUSH NEW TASK INTO ARRAY
            tasks.push(newTask);

            // OVERWRITE WHATEVER IS IN STORAGE UNDER 'TASKS'
            storeTasksLocal(tasks);

            // PUTS THE TASK ON THE SCREEN <<<<<<<<<<<<<<<<<<<<<<<<
            renderTaskList();

            console.log(`Task ID: ${generateTaskId()}
            Task Title: ${taskTitleEl.val()}
            Task Due Date: ${taskDueDateEl.val()}
            Task Desc: ${taskDescEl.val()}`);

            // RESET THE FORM
            modalFormEl[0].reset()
        }
    }
}

// TODO: create a function to handle deleting a task
function handleDeleteTask(event) {
    // using HTML to verify the project ID
    const targetEl = event.target;
    const targetId = targetEl.dataset.taskId;
    
    const tasks = readTasksLocal();  
  
    // make sure the id matches then remove from tasks array
    for (let i = 0; i < tasks.length; ++i) {
  
      if (tasks[i].id === targetId) {
        console.log('delete button clicked at: ' + tasks[i].title);
        tasks.splice(i, 1);
      }
    }
  
    // update local storage
    storeTasksLocal(tasks);
  
    // print the cards on the screen
    renderTaskList();
}

// TODO: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    // get the projects from local storage
    const tasks = readTasksLocal();
  
    // need the task id
    const taskID = ui.draggable[0].dataset.taskId;
  
    // grab what lane the task is now in
    const newStatus = event.target.id;
  
    for (let task of tasks) {
      // cycle through the tasks ^^^ and change status accordingly vvv
      if (task.id === taskID) {
        task.status = newStatus;
      }
    }
    
    // save over what's in local storage and put the cards on the page.
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
}

// event listener for form submission
modalFormEl.on('click', handleAddTask);

// event listener for delete buttons
taskDisplayEl.on('click', handleDeleteTask);

// TODO: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    // gotta render the tasks when the page loads!
    renderTaskList();

    // setting up the datepicker for the due date input
    $('#task-due-date').datepicker({
        changeMonth: true,
        changeYear: true,
    });

    // making the lanes droppable as they were in the mini-project
    $('.lane').droppable({
      accept: '.draggable',
      drop: handleDrop,
    });
});
