{
  let tasks = [];
  let hideDoneTasks = false;

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
      {
        ...tasks[taskIndex],
        done: !tasks[taskIndex].done,
      },
      ...tasks.slice(taskIndex + 1),
    ];

    render();
  };

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const bindEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });

    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const renderTasks = () => {
    let tasksListHTMLContent = "";

    for (const task of tasks) {
      tasksListHTMLContent += `
          <li class="tasks__item js-task">
              <button class="tasks__button tasks__button--toggleDone js-toggleDone">
                ${task.done ? "✔" : ""}
              </button>
              <span class="tasks__content${task.done ? " tasks__content--done" : ""}">${task.content}</span>
              <button class="tasks__button tasks__button--remove js-remove">🗑</button>
          </li>
        `;
    }

    document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent;
  };

  const renderButtons = () => { };

  const bindButtonsEvents = () => { };

  const render = () => {
    renderTasks();
    renderButtons();

    bindEvents();
    bindButtonsEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskItem = document.querySelector(".js-newTask");
    const newTaskContent = newTaskItem.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskItem.value = "";
    }

    newTaskItem.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}