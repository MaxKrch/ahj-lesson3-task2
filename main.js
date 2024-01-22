/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/Render.js
class Render {
  constructor(container) {
    this.container = container;
    this.clickInterfaceButtonsListener;
    this.changeNewTaskInputListener;
    this.keyPressNewTaskInputListener;
    this.clickNewTaskButtonsListener;
    this.clickPinnedTasksListener;
    this.clickOtherTasksListener;
    this.clickModalButtonListener;
    this.interfaceButtons;
    this.sectionNewTask;
    this.sectionPinnedTasks;
    this.sectionOtherTasks;
    this.modal;
    this.input;
  }
  renderPage() {
    const modal = this.renderModal();
    this.container.append(modal);
    this.modal = modal;

    // const header = this.renderHeaderPage();
    // this.container.append(header);

    const main = this.renderMainPage();
    this.container.append(main);
    const footer = this.renderFooterPage();
    this.container.append(footer);
    this.registerEventListener();
  }
  renderModal() {
    const modal = document.createElement("aside");
    modal.classList.add("modal-wrap", "hidden-item");
    modal.innerHTML = `
			<div class="modal-main">
				<div class="modal-mess">
				</div>
				
				<div class="modal-buttons hidden-item">
					<button class="interface-button modal-button-yes modal-button" data-id-task=''>
						Yes
					</button>
					<button class="interface-button modal-button-cancel modal-button">
						Cancel
					</button>
				</div>
			</div>
		`;
    return modal;
  }
  renderHeaderPage() {
    const header = document.createElement("header");
    header.classList.add("header");
    header.innerHTML = `
			<h1 class="header-title">
				List Tasks
			</h1>
		`;
    return header;
  }
  renderMainPage() {
    const main = document.createElement("main");
    main.classList.add("main");
    const interfaceButtons = this.renderInterfaceButtons();
    main.append(interfaceButtons);
    this.interfaceButtons = interfaceButtons;
    const newTask = this.renderSectionNewTask();
    main.append(newTask);
    this.sectionNewTask = newTask;
    const pinnedTasks = this.renderSectionPinnedTasks();
    main.append(pinnedTasks);
    this.sectionPinnedTasks = pinnedTasks;
    const otherTasks = this.renderSectionOtherTasks();
    main.append(otherTasks);
    this.sectionOtherTasks = otherTasks;
    return main;
  }
  renderFooterPage() {
    const footer = document.createElement("footer");
    footer.classList.add("footer");
    return footer;
  }
  renderInterfaceButtons() {
    const interfaceButtons = document.createElement("div");
    interfaceButtons.classList.add("interface");
    interfaceButtons.innerHTML = `
			<button class="interface-button interface-load">
				Load Board
			</button>
			<button class="interface-button interface-save">
				Save Board
			</button>
			<button class="interface-button interface-new">
				Clear Board
			</button>
		`;
    return interfaceButtons;
  }
  renderSectionNewTask() {
    const newTask = document.createElement("div");
    newTask.classList.add("new-task");
    newTask.innerHTML = `
			<h2 class="new-task__title title-section">
				New Task:
			</h2>
			<div class="new-task-block">
				<input type="text" class="new-task__input" placeholder="Description">
				<div class="new-task-buttons">
					<div class="task__add new-task__add task__button">&#10004;</div>
					<div class="task__clear new-task__del task__button">&cross;</div>
				</div>
			</div>
		`;
    return newTask;
  }
  renderSectionPinnedTasks() {
    const pinnedTasks = document.createElement("div");
    pinnedTasks.classList.add("section-tasks", "pinned-tasks");
    pinnedTasks.innerHTML = `
			<h2 class="pinned-tasks__title title-section">
				Pinned Tasks:
			</h2>
			<div class="empty-list-task empty-pinned-tasks">
				No pinned tasks
			</div>
		`;
    return pinnedTasks;
  }
  renderSectionOtherTasks() {
    const otherTasks = document.createElement("div");
    otherTasks.classList.add("section-tasks", "other-tasks");
    otherTasks.innerHTML = `
			<h2 class="other-tasks__title title-section">
				Other Tasks:
			</h2>
			<div class="empty-list-task empty-other-tasks">
				No tasks found
			</div>
		`;
    return otherTasks;
  }
  renderNewTask(textTask, idTask) {
    const taskEl = document.createElement("div");
    taskEl.classList.add("task");
    taskEl.dataset.id = idTask;
    taskEl.innerHTML = `
			<div class="task__main-block">
				<p class="task-description">
					${textTask}
				</p>
				<label class="task__pinned-is-block" for="task-${idTask}">
					<input type="checkbox" class="task__is-pinned-input hidden-item" id="task-${idTask}">
					<div class="task__is-pinned-button"></div>
				</label>
			</div>
			<div class="task__clear task__del task__button">&cross;</div>
		`;
    return taskEl;
  }
  registerEventListener() {
    this.interfaceButtons.addEventListener("click", event => {
      this.clickInterfaceButtonsListener(event);
    });
    const newTaskInput = this.sectionNewTask.querySelector(".new-task__input");
    const newTaskButtons = this.sectionNewTask.querySelector(".new-task-buttons");
    this.input = newTaskInput;
    newTaskInput.addEventListener("input", event => {
      this.changeNewTaskInputListener(event);
    });
    newTaskInput.addEventListener("keypress", event => {
      this.keyPressNewTaskInputListener(event);
    });
    newTaskButtons.addEventListener("click", event => {
      this.clickNewTaskButtonsListener(event);
    });
    this.sectionPinnedTasks.addEventListener("click", event => {
      this.clickPinnedTasksListener(event);
    });
    this.sectionOtherTasks.addEventListener("click", event => {
      this.clickOtherTasksListener(event);
    });
    const modalButtons = this.modal.querySelector(".modal-buttons");
    this.modalButtons = modalButtons;
    modalButtons.addEventListener("click", event => {
      this.clickModalButtonListener(event);
    });
    this.modalMess = this.modal.querySelector(".modal-mess");
  }
  addClickInterfaceButtons(callback) {
    this.clickInterfaceButtonsListener = callback;
  }
  addChangeNewTaskInput(callback) {
    this.changeNewTaskInputListener = callback;
  }
  addKeyPressNewTaskInput(callback) {
    this.keyPressNewTaskInputListener = callback;
  }
  addClickNewTaskButtons(callback) {
    this.clickNewTaskButtonsListener = callback;
  }
  addClickPinnedTasks(callback) {
    this.clickPinnedTasksListener = callback;
  }
  addClickOtherTasks(callback) {
    this.clickOtherTasksListener = callback;
  }
  addClickModalButton(callback) {
    this.clickModalButtonListener = callback;
  }
  clearInputNewTask() {
    this.input.value = "";
    this.input.blur();
  }
  updateOtherTasks(otherTasks) {
    const newOtherTasks = this.renderSectionOtherTasks();
    this.sectionOtherTasks.innerHTML = newOtherTasks.innerHTML;
    if (otherTasks.length === 0) {
      this.showMessageEmptySection("other-tasks");
      return;
    }
    this.hideMessageEmptySection("other-tasks");
    otherTasks.forEach(task => {
      this.sectionOtherTasks.append(task);
    });
  }
  updatePinnedTasks(pinnedTasks) {
    const newPinnedTasks = this.renderSectionPinnedTasks();
    this.sectionPinnedTasks.innerHTML = newPinnedTasks.innerHTML;
    if (pinnedTasks.length === 0) {
      this.showMessageEmptySection("pinned-tasks");
      return;
    }
    this.hideMessageEmptySection("pinned-tasks");
    pinnedTasks.forEach(task => {
      this.sectionPinnedTasks.append(task);
    });
  }
  addPinnedTask(task) {
    this.hideMessageEmptySection("pinned-tasks");
    this.sectionPinnedTasks.append(task);
  }
  removePinnedTask(task, newSectionTasks) {
    task.remove();
    if (newSectionTasks) {
      this.updateOtherTasks(newSectionTasks);
    }
  }
  showMessage(message) {
    this.modalMess.innerHTML = message;
    // document.querySelector('body').classList.add('no-scroll')
    this.modal.classList.remove("hidden-item", "modal-wrap_error");
  }
  showError(error) {
    this.modalMess.innerHTML = error;
    // document.querySelector('body').classList.add('no-scroll')
    this.modal.classList.add("modal-wrap_error");
    this.modal.classList.remove("hidden-item");
  }
  closeModal() {
    this.modalMess.innerHTML = "";
    // document.querySelector('body').classList.remove('no-scroll')
    this.modal.classList.add("hidden-item");
  }
  showModalButtons(idTask) {
    document.querySelector("body").classList.add("no-scroll");
    this.modalButtons.classList.remove("hidden-item");
    this.modalButtons.querySelector(".modal-button-yes").dataset.idTask = idTask;
  }
  closeModalButtons() {
    document.querySelector("body").classList.remove("no-scroll");
    this.modalButtons.classList.add("hidden-item");
  }
  showMessageEmptySection(section) {
    const activeSection = section === "other-tasks" ? this.sectionOtherTasks : this.sectionPinnedTasks;
    const activeMess = activeSection.querySelector(`.empty-${section}`);
    activeMess.classList.remove("hidden-item");
  }
  hideMessageEmptySection(section) {
    const activeSection = section === "other-tasks" ? this.sectionOtherTasks : this.sectionPinnedTasks;
    const activeMess = activeSection.querySelector(`.empty-${section}`);
    activeMess.classList.add("hidden-item");
  }
  searchTaskById(idTask) {
    const task = this.container.querySelector(`div[data-id='${idTask}']`);
    return task;
  }
  searchSectionByTask(task) {
    const section = task.closest(".section-tasks");
    if (section.classList.contains("pinned-tasks")) {
      return "pinned-tasks";
    }
    if (section.classList.contains("other-tasks")) {
      return "other-tasks";
    }
  }
  deleteTask(task) {
    task.remove();
  }
  createNewBoard() {
    const newPinnedTasks = this.renderSectionPinnedTasks();
    const newOtherTasks = this.renderSectionOtherTasks();
    this.sectionPinnedTasks.innerHTML = newPinnedTasks.innerHTML;
    this.sectionOtherTasks.innerHTML = newOtherTasks.innerHTML;
    this.input.value = "";
  }
  loadSectionTasks(tasks, section) {
    const newListTasks = [];
    for (let task of tasks) {
      const newTask = this.renderNewTask(task.text, task.id);
      if (section === "pinned-tasks") {
        newTask.querySelector(".task__is-pinned-input").checked = true;
      }
      newListTasks.push(newTask);
    }
    return newListTasks;
  }
  updateBoard(state) {
    this.input.value = state.tempTextNewTask;
    this.updateOtherTasks(state.otherTasks);
    this.updatePinnedTasks(state.pinnedTasks);
  }
}
;// CONCATENATED MODULE: ./src/js/TaskApp.js

class TaskApp {
  constructor(container, state) {
    this.container = document.querySelector(container);
    this.state = state;
    this.render = new Render(this.container);
    this.init();
  }
  init() {
    this.render.renderPage();
    this.registerEvents();
  }
  registerEvents() {
    this.render.addClickInterfaceButtons(this.onClickInterfaceButtons.bind(this));
    this.render.addChangeNewTaskInput(this.onChangeNewTaskInput.bind(this));
    this.render.addKeyPressNewTaskInput(this.onKeyPressNewTaskInput.bind(this));
    this.render.addClickNewTaskButtons(this.onClickNewTaskButtons.bind(this));
    this.render.addClickPinnedTasks(this.onClickPinnedTasks.bind(this));
    this.render.addClickOtherTasks(this.onClickOtherTasks.bind(this));
    this.render.addClickModalButton(this.onClickModalButton.bind(this));
  }
  onClickInterfaceButtons(event) {
    if (event.target.classList.contains("interface-save")) {
      this.saveBoard();
      return;
    }
    if (event.target.classList.contains("interface-load")) {
      this.confirmLoadBoard();
      return;
    }
    if (event.target.classList.contains("interface-new")) {
      this.confirmClearBoard();
    }
  }
  onChangeNewTaskInput() {
    this.state.tempTextNewTask = this.render.input.value.trim();
    this.startFilterTasks();
  }
  onKeyPressNewTaskInput(event) {
    if (event.keyCode === 13) {
      this.chekNewTasks();
    }
  }
  onClickNewTaskButtons(event) {
    const classList = event.target.classList;
    if (classList.contains("new-task__add")) {
      this.chekNewTasks();
    }
    if (classList.contains("new-task__del")) {
      this.clearFilterTasks();
    }
  }
  onClickPinnedTasks(event) {
    const task = event.target.closest(".task");
    if (event.target.classList.contains("task__is-pinned-input")) {
      this.unpinTask(task);
      return;
    }
    if (event.target.classList.contains("task__del")) {
      this.createConfirmRemoveTask(task);
    }
  }
  onClickOtherTasks(event) {
    const task = event.target.closest(".task");
    if (event.target.classList.contains("task__is-pinned-input")) {
      this.pinTask(task);
      return;
    }
    if (event.target.classList.contains("task__del")) {
      this.createConfirmRemoveTask(task);
    }
  }
  onClickModalButton(event) {
    if (event.target.classList.contains("modal-button-cancel")) {
      this.render.closeModalButtons();
      this.render.closeModal();
      return;
    }
    if (event.target.classList.contains("modal-button-yes")) {
      if (event.target.dataset.idTask === "clear") {
        this.clearBoard();
        return;
      }
      if (event.target.dataset.idTask === "load") {
        this.loadBoard();
        return;
      }
      this.removeTask(event);
    }
  }
  chekNewTasks() {
    const taskText = this.state.tempTextNewTask;
    this.render.clearInputNewTask();
    if (taskText.length === 0) {
      this.render.showError("Can't add an empty task!");
      setTimeout(() => {
        this.render.closeModal();
      }, 750);
      return;
    }
    this.saveNewTask(taskText);
  }
  saveNewTask(taskText) {
    const newTask = this.render.renderNewTask(taskText, this.state.idNewTask);
    if (newTask) {
      this.state.idNewTask += 1;
      this.state.otherTasks.push(newTask);
      this.state.clearTempText();
      // this.render.showMessage('Task added');
      // setTimeout(() => {
      // 	this.render.closeModal()
      // }, 500);
      this.startFilterTasks();
    }
  }
  pinTask(task) {
    if (!task) {
      this.errorAction();
      return;
    }
    const oldOthetTasks = this.state.otherTasks;
    const countOldOtherTasks = oldOthetTasks.length;
    const newOtherTasks = oldOthetTasks.filter(item => item !== task);
    const countNewOtherTasks = newOtherTasks.length;
    this.state.otherTasks.splice(0, countOldOtherTasks, ...newOtherTasks);
    this.state.pinnedTasks.push(task);
    if (countNewOtherTasks === 0) {
      this.render.showMessageEmptySection("other-tasks");
    }
    this.render.addPinnedTask(task);
  }
  unpinTask(task) {
    if (!task) {
      this.errorAction();
      return;
    }
    const oldPinnedTasks = this.state.pinnedTasks;
    const countOldPinnedTasks = oldPinnedTasks.length;
    const newPinnedTasks = oldPinnedTasks.filter(item => item !== task);
    const countNewPinnedTasks = newPinnedTasks.length;
    let newSection;
    this.state.pinnedTasks.splice(0, countOldPinnedTasks, ...newPinnedTasks);
    const filterText = this.state.tempTextNewTask;
    const textTask = task.querySelector(".task-description").innerText.trim();
    if (textTask.startsWith(filterText)) {
      this.state.otherTasks.push(task);
      this.sortOtherTasks();
      newSection = this.state.otherTasks;
    } else {
      this.state.hiddenTasks.push(task);
    }
    if (countNewPinnedTasks === 0) {
      this.render.showMessageEmptySection("pinned-tasks");
    }
    this.render.removePinnedTask(task, newSection);
  }
  sortOtherTasks() {
    this.state.otherTasks.sort((a, b) => {
      return a.dataset.id - b.dataset.id;
    });
  }
  startFilterTasks() {
    const allUnPinnedTasks = [...this.state.otherTasks, ...this.state.hiddenTasks];
    const countOldOtherTasks = this.state.otherTasks.length;
    const countOldHiddenTasks = this.state.hiddenTasks.length;
    const startStr = this.state.tempTextNewTask;
    const newOtherTasks = [];
    const newHiddenTasks = [];
    allUnPinnedTasks.forEach(task => {
      const textTask = task.querySelector(".task-description").innerText.trim();
      if (textTask.startsWith(startStr)) {
        newOtherTasks.push(task);
      } else {
        newHiddenTasks.push(task);
      }
    });
    this.state.otherTasks.splice(0, countOldOtherTasks, ...newOtherTasks);
    this.state.hiddenTasks.splice(0, countOldHiddenTasks, ...newHiddenTasks);
    this.sortOtherTasks();
    this.render.updateOtherTasks(this.state.otherTasks);
  }
  clearFilterTasks() {
    this.render.input.value = "";
    this.onChangeNewTaskInput();
  }
  createConfirmRemoveTask(task) {
    this.render.showMessage(`Do you want to delete this task?`);
    this.render.showModalButtons(task.dataset.id);
  }
  removeTask(event) {
    const task = this.render.searchTaskById(event.target.dataset.idTask);
    if (!task) {
      this.errorAction();
      return;
    }
    const sectionTask = this.render.searchSectionByTask(task);
    let oldListTasks;
    if (sectionTask === "pinned-tasks") {
      oldListTasks = this.state.pinnedTasks;
    }
    if (sectionTask === "other-tasks") {
      oldListTasks = this.state.otherTasks;
    }
    const newListTasks = oldListTasks.filter(item => item !== task);
    oldListTasks.splice(0, oldListTasks.length, ...newListTasks);
    this.render.deleteTask(task);
    if (newListTasks.length === 0) {
      this.render.showMessageEmptySection(sectionTask);
    }
    this.render.closeModalButtons();
    this.render.closeModal();
  }
  saveBoard() {
    this.state.saveBoard();
    this.render.showMessage("Board saved");
    setTimeout(() => {
      this.render.closeModal();
    }, 500);
  }
  confirmClearBoard() {
    this.render.showError(`Want to clear the board? 
			All tasks will be deleted!`);
    this.render.showModalButtons("clear");
  }
  confirmLoadBoard() {
    this.render.showError(`Want to download the board? 
			All current tasks will be deleted`);
    this.render.showModalButtons("load");
  }
  clearBoard() {
    this.state.clearBoard();
    this.render.showMessage("Board cleared!");
    this.render.closeModalButtons();
    setTimeout(() => {
      this.render.closeModal();
    }, 500);
    this.render.createNewBoard();
  }
  errorAction() {
    this.render.closeModalButtons();
    this.render.showError(`Something went wrong! 
			Try again`);
    setTimeout(() => {
      this.render.closeModal();
    }, 750);
  }
  loadBoard() {
    this.render.closeModalButtons();
    const savedData = this.state.loadBoard();
    if (!savedData) {
      this.render.showError("No saved board");
      setTimeout(() => {
        this.render.closeModal();
      }, 750);
      return;
    }
    const {
      savedPinnedTasks,
      savedOtherTasks,
      savedHiddenTasks
    } = savedData;
    const pinnedTasks = this.render.loadSectionTasks(savedPinnedTasks, `pinned-tasks`);
    const otherTasks = this.render.loadSectionTasks(savedOtherTasks, `other-tasks`);
    const hiddenTasks = this.render.loadSectionTasks(savedHiddenTasks, `hidden-tasks`);
    this.state.pinnedTasks = pinnedTasks;
    this.state.otherTasks = otherTasks;
    this.state.hiddenTasks = hiddenTasks;
    this.render.updateBoard(this.state);
    this.render.showMessage("Board loaded");
    setTimeout(() => {
      this.render.closeModal();
    }, 500);
  }
  updateArrayTasks(oldArray, newArray) {
    const count = oldArray.length;
    newArray.splice(0, count, ...newArray);
    return newArray;
  }
}
;// CONCATENATED MODULE: ./src/js/State.js
class State {
  constructor() {
    this.idNewTask = 0;
    this.pinnedTasks = [];
    this.otherTasks = [];
    this.hiddenTasks = [];
    this.tempTextNewTask = "";
  }
  saveBoard() {
    const savedPinnedTasks = this.pinnedTasks.map(item => {
      const id = item.dataset.id;
      const text = item.querySelector(".task-description").innerText.trim();
      const checked = true;
      return {
        id,
        text,
        checked
      };
    });
    const savedOtherTasks = this.otherTasks.map(item => {
      const id = item.dataset.id;
      const text = item.querySelector(".task-description").innerText.trim();
      const checked = false;
      return {
        id,
        text,
        checked
      };
    });
    const savedHiddenTasks = this.hiddenTasks.map(item => {
      const id = item.dataset.id;
      const text = item.querySelector(".task-description").innerText.trim();
      const checked = false;
      return {
        id,
        text,
        checked
      };
    });
    const listTasksState = {
      idNewTask: this.idNewTask,
      tempTextNewTask: this.tempTextNewTask,
      savedPinnedTasks,
      savedOtherTasks,
      savedHiddenTasks
    };
    const listTasksStateJSON = JSON.stringify(listTasksState);
    localStorage.setItem("listTasksState", listTasksStateJSON);
  }
  clearBoard() {
    this.idNewTask = 0;
    this.pinnedTasks = [];
    this.otherTasks = [];
    this.hiddenTasks = [];
    this.tempTextNewTask = "";
  }
  loadBoard() {
    this.clearBoard();
    const savedBoardJSON = localStorage.getItem("listTasksState");
    if (!savedBoardJSON) {
      return false;
    }
    const savedBoard = JSON.parse(savedBoardJSON);
    this.idNewTask = savedBoard.idNewTask;
    this.tempTextNewTask = savedBoard.tempTextNewTask;
    return savedBoard;
  }
  clearTempText() {
    this.tempTextNewTask = "";
  }
}
;// CONCATENATED MODULE: ./src/js/app.js


const state = new State();
new TaskApp("#app", state);
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;