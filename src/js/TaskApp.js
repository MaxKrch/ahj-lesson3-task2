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
	}

	onClickInterfaceButtons(event) {
		console.log(event)
	}

	onChangeNewTaskInput(event) {
console.log(event)
	}

	onKeyPressNewTaskInput(event) {
	console.log(event)
	}

	onClickNewTaskButtons(event) {
console.log(event)
	}

	onClickPinnedTasks(event) {
console.log(event)
	}

	onClickOtherTasks(event) {
console.log(event)
	}

	addFilterTasks() {}

	clearFilterTasks() {}

	createNewTask() {}

	addNewTask() {}

	createErrorAddTask() {}

	createInterfaceMess() {}

	createInterfaceError() {}

	createInterfaceError() {}

	createConfirmRemoveTask(task) {}

	createConfirmClearBoard() {}

	createConfirmLoadBoard() {}

	removeTask(task) {}
}
