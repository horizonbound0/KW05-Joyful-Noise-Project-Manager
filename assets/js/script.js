// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const modalFormEl = $('#modal-form');
const taskTitleEl = $('#task-title-input');
const taskDueDateEl = $('#task-due-date');
const taskDescEl = $('#task-desc');


// TODO: create a function to generate a unique task id
function generateTaskId() {
    const taskID = crypto.randomUUID();
    return taskID;
}

// TODO: MAKE FUNCTION TO STORE FORM VALUES IN LOCAL STORAGE
function storeTasksLocal(taskArray) {
    localStorage.setItem('tasks', JSON.stringify(taskArray));
}

// TODO: MAKE FUNCTION TO READ TASKS FROM LOCAL STORAGE
function readTasksLocal() {
    const tasks = [];

    if (localStorage.getItem('tasks') != null) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        return tasks;
    } else {
        return tasks;
    }
}

// TODO: create a function to create a task card
function createTaskCard(task) {

    // making the task card to hold the info and be draggable
    const taskCard = $('<div>')
        .addClass('card task-card draggable my-3')
        .attr('data-task-id', task.id);
    //--------------------

    // TODO: Create a new card header element and add the classes `card-header` and `h4`. Also set the text of the card header to the project name.
    const taskTitle = $('<h4>')
        .addClass('card-header h4')
        .text(task.title);
    //--------------------

    // TODO: Create a new card body element and add the class `card-body`.
    const cardBody = $('<div>')
        .addClass('card-body');
    //--------------------

    // TODO: Create a new paragraph element and add the class `card-text`. Also set the text of the paragraph to the project type.
    const taskDesc = $('<p>')
        .addClass('card-text')
        .text(task.desc);
    //--------------------

    // TODO: Create a new paragraph element and add the class `card-text`. Also set the text of the paragraph to the project due date.
    const taskDueDate = $('<p>')
        .addClass('card-text')
        .text(task.taskDate);
    //--------------------


    // TODO: Create a new button element and add the classes `btn`, `btn-danger`, and `delete`. Also set the text of the button to "Delete" and add a `data-project-id` attribute and set it to the project id.
    const cardDeleteBtn = $('<button>')
        .addClass('btn btn-danger delete')
        .attr('data-task-id', task.id)
        .text('Delete');
    //--------------------

    // Setting up background change like it is in the mini project, while changing the variables and handles to better align this challenge
    if (task.taskDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

        if (now.isSame(taskDueDate, 'day')) {
            taskCard.addClass('bg-warning text-white');
        } else if (now.isAfter(taskDueDate)) {
            taskCard.addClass('bg-danger text-white');
            cardDeleteBtn.addClass('border-light');
        }
    }

    // TODO: Append the card description, card due date, and card delete button to the card body.
    cardBodyEl.append([taskDesc, taskDueDate, cardDeleteBtn]);
    //--------------------

    // TODO: Append the card header and card body to the card.
    taskCard.append([taskTitle, cardBody]);
    //--------------------

    return taskCard;
}

// TODO: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// TODO: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
    const target = event.target;
    const targetAdd = target.dataset.task;
    if (targetAdd === 'add') {
        // TODO: GRAB INPUT ELEMENT VALUES <<<<<<<<<<<<<<
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

            // TODO: PUTS THE TASK ON THE SCREEN <<<<<<<<<<<<<<<<<<<<<<<<
            //renderTaskList();

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

}

// TODO: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    // ? Read projects from localStorage
    const tasks = readTasksLocal();
  
    // ? Get the project id from the event
    const taskID = ui.draggable[0].dataset.taskId;
  
    // ? Get the id of the lane that the card was dropped into
    const newStatus = event.target.id;
  
    for (let task of tasks) {
      // ? Find the project card by the `id` and update the project status.
      if (task.id === taskID) {
        task.status = newStatus;
      }
    }
    // ? Save the updated projects array to localStorage (overwritting the previous one) and render the new project data to the screen.
    localStorage.setItem('tasks', JSON.stringify(tasks));
    //renderTaskList();

}

// event listener for form submission
modalFormEl.on('click', handleAddTask);

// TODO: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    // gotta render the tasks when the page loads!
    //renderTaskList();

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
