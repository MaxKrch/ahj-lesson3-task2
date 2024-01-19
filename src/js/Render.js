export default class Render {
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
		this.interfaceButtons.addEventListener("click", (event) => {
			this.clickInterfaceButtonsListener(event);
		});

		const newTaskInput = this.sectionNewTask.querySelector(".new-task__input");
		const newTaskButtons = this.sectionNewTask.querySelector(".new-task-buttons");
		this.input = newTaskInput;

		newTaskInput.addEventListener("input", (event) => {
			this.changeNewTaskInputListener(event);
		});
		newTaskInput.addEventListener("keypress", (event) => {
			this.keyPressNewTaskInputListener(event);
		});
		newTaskButtons.addEventListener("click", (event) => {
			this.clickNewTaskButtonsListener(event);
		});

		this.sectionPinnedTasks.addEventListener("click", (event) => {
			this.clickPinnedTasksListener(event);
		});

		this.sectionOtherTasks.addEventListener("click", (event) => {
			this.clickOtherTasksListener(event);
		});

		const modalButtons = this.modal.querySelector(".modal-buttons");
		this.modalButtons = modalButtons;

		modalButtons.addEventListener("click", (event) => {
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
		otherTasks.forEach((task) => {
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
		pinnedTasks.forEach((task) => {
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
