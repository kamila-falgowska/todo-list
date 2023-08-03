{
  let tasks = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      { content: newTaskContent },
    ];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done: !tasks[taskIndex].done },
      ...tasks.slice(taskIndex + 1)
    ];

    render();
  };

  const markAllTasks = () => {
    tasks = tasks.map((task) => (
      { ...task, done: true }
    ));
    render();
  };

  const toggleAllTasksDone = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };



  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

    toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  };

  const bindButtonsEvents = () => {

    const markAllTasksButton = document.querySelector(".js-markAllTasksButton");

    if (markAllTasksButton) {
      markAllTasksButton.addEventListener("click", markAllTasks);
    };

    const toggleAllTasksDoneButton = document.querySelector(".js-toggleAllTasksDoneButton");

    if (toggleAllTasksDoneButton) {
      toggleAllTasksDoneButton.addEventListener("click", toggleAllTasksDone);
    };
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
            <li class="tasks__item ${task.done && hideDoneTasks ? "tasks__item--hidden" : ""} ">
                <button class="tasks__button tasks__button--toggleDone js-toggleDone">
                  ${task.done ? "✔" : ""}
                </button>
                <span class="tasks__content${task.done ? " tasks__content--done" : ""}">${task.content}</span>
                <button class="tasks__button tasks__button--remove js-remove">🗑</button>
            </li>
          `;
    }
    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {
    let htmlButtonString = "";

    if (tasks.length > 0) {
      htmlButtonString += `
        <li>
         <button class="section__buttons js-toggleAllTasksDoneButton">
          ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
         </button>
         <button class="section__buttons js-markAllTasksButton"
          ${tasks.every(({ done }) => done) ? "disabled" : ""}>
          Ukończ wszystkie
         </button >
        </li >
        `;
    }
    document.querySelector(".js-buttons").innerHTML = htmlButtonString;
  };

  const render = () => {
    renderTasks();
    renderButtons();

    bindEvents();
    bindButtonsEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }

    newTaskElement.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}