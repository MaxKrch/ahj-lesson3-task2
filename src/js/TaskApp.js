import Render from "./Render";

export default class TaskApp {
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
		const newOtherTasks = oldOthetTasks.filter((item) => item !== task);
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
		const newPinnedTasks = oldPinnedTasks.filter((item) => item !== task);
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

		allUnPinnedTasks.forEach((task) => {
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

		const newListTasks = oldListTasks.filter((item) => item !== task);
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

		const { savedPinnedTasks, savedOtherTasks, savedHiddenTasks } = savedData;
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
