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

// TODO: create a function to create a task card
function createTaskCard(task) {

    // making the task card to hold the info and be draggable
    const taskCard = $('<div>')
        .addClass('card task-card draggable my-3')
        .attr('data-task-id', task.id);
    //--------------------

    // TODO: Create a new card header element and add the classes `card-header` and `h4`. Also set the text of the card header to the project name.
    const taskTitleEl = $('<h4>')
        .addClass('card-header h4')
        .text(task.title);
    //--------------------

    // TODO: Create a new card body element and add the class `card-body`.
    const cardBodyEl = $('<div>')
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
    cardBodyEl.append([newPEL, newPEL2, cardDeleteBtn]);
    //--------------------

    // TODO: Append the card header and card body to the card.
    taskCard.append([newHeaderEl, newCardBodyEl]);
    //--------------------
}

// TODO: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// TODO: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    // TODO: UPDATE THIS WITH THE PROPER ELEMENT HANDLES <<<<<<<<<<<<<<
    const taskTitle = taskTitleEl.val();
    const taskDesc = taskDescEl.val();
    const taskDate = taskDueDateEl.val();
    //--------------------

    // BUILD THE TASK OBJECT
    const newTask = {
        id: generateTaskId(),
        title: taskTitle,
        desc: taskDesc,
        taskDate: taskDate,
        status: 'to-do',
    };

    // TODO: FUNCTION TO READ TASKS FROM STORAGE <<<<<<<<<<<<<<<<<<<<<<<
    const tasks = readTasksFromStorage();
    tasks.push(newTask);

    // TODO: FUNCTION TO SAVE UPDATED TASKS TO LOCAL STORAGE <<<<<<<<<<<<<<<<
    saveTasksToStorage(projects);

    // TODO: PUTS THE TASK ON THE SCREEN <<<<<<<<<<<<<<<<<<<<<<<<
    renderTaskList();

    // TODO: PUT THE CORRECT ARRAY NAME IN THIS RESET METHOD <<<<<<<<<<<<<<<<
    modalFormEl[0].reset()
}

// TODO: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// TODO: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

//// testing modal form /////
const modalConsole = (event) => {
    event.preventDefault;
    const target = event.target;
    const targetAdd = target.dataset.task;
    if (targetAdd === 'add') {
        console.log(`Task ID: ${generateTaskId()}
            Task Title: ${taskTitleEl.val()}
            Task Due Date: ${taskDueDateEl.val()}
            Task Desc: ${taskDescEl.val()}`);
        modalFormEl[0].reset()
    }
}

modalFormEl.on('click', modalConsole);

// TODO: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    // setting up the datepicker for the due date input
    $('#task-due-date').datepicker({
        changeMonth: true,
        changeYear: true,
    });

});
