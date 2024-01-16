export default class Render {
	constructor(container) {
		this.container = container;

		this.clickInterfaceButtonsListeners = [] 
		this.changeNewTaskInputListeners = [] 
		this.keyPressNewTaskInputListeners = [] 
		this.clickNewTaskButtonsListeners = [] 
		this.clickPinnedTasksListeners = [] 
		this.clickOtherTasksListeners = [] 

		this.interfaceButtons;
		this.sectionNewTask;
		this.sectionPinnedTasks;
		this.sectionOtherTasks;
		this.modal;
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
		const modal = document.createElement('aside');
		
		modal.classList.add('modal-wrap');
		modal.innerHTML = `
			<div class="modal-main">
				<div class="modal-mess">
				</div>
				
				<div class="modal-buttons">
					<button class="interface-button modal-button-yes modal-button" data-id-task=''>
						Yes
					</button>
					<button class="interface-button modal-button-cancel modal-button">
						Cancel
					</button>
				</div>
			</div>
		`
		return modal;
	}

	renderHeaderPage() {
		const header = document.createElement('header');
		
		header.classList.add('header');
		header.innerHTML = `
			<h1 class="header-title">
				List Tasks
			</h1>
		`
		return header;
	}

	renderMainPage() {
		const main = document.createElement('main');
		main.classList.add('main');

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
		const footer = document.createElement('footer');
		footer.classList.add('footer');

		return footer;
	}

	renderInterfaceButtons() {
		const interfaceButtons = document.createElement('div');

		interfaceButtons.classList.add('interface');
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
		`
		return interfaceButtons;
	}

	renderSectionNewTask() {
		const newTask = document.createElement('div');

		newTask.classList.add('new-task');
		newTask.innerHTML = `
			<h2 class="new-task__title title-section">
				New Task:
			</h2>
			<div class="new-task-block">
				<input type="text" class="new-task__input" placeholder="Description">
				<div class="new-task-buttons">
					<div class="task__add new-task__add">&#10004;</div>
					<div class="task__clear new-task__del">&cross;</div>
				</div>
			</div>
		`
		return newTask;
	}
	
	renderSectionPinnedTasks() {
		const pinnedTasks = document.createElement('div');

		pinnedTasks.classList.add('pinned-tasks');
		pinnedTasks.innerHTML = `
			<h2 class="pinned-tasks__title title-section">
				Pinned Tasks:
			</h2>
			<div class="empty-list-task empty-pinned-tasks">
				No pinned tasks
			</div>
		`
		return pinnedTasks;
	}

	renderSectionOtherTasks() {
		const otherTasks = document.createElement('div');
		otherTasks.classList.add('other-tasks');
		otherTasks.innerHTML = `
			<h2 class="other-tasks__title title-section">
				Other Tasks:
			</h2>
			<div class="empty-list-task empty-other-tasks">
				No tasks found
			</div>
		`
		return otherTasks;
	}

	renderNewTask(task, idTask) {
		const taskEl = document.createElement('div');

		task.classList.add('task');
		task.innerHTML = `
			<div class="task__main-block">
				<p class="task-description">
					${task}
				</p>
				<label class="task__pinned-is-block" for="task-${idTask}">
					<input type="checkbox" class="task__is-pinned-input" id="task-${idTask}">
					<div class="task__is-pinned-button"></div>
				</label>
			</div>
			<div class="task__clear task__del">&cross;</div>
		`
	}

	registerEventListener() {
		
		debugger
		this.interfaceButtons.addEventListener('click', (event) => {
			this.onClickInterfaceButtons(event);
		});

		const newTaskInput = this.sectionNewTask.querySelector('.new-task__input');
		const newTaskButtons = this.sectionNewTask.querySelector('.new-task-buttons');
		
		newTaskInput.addEventListener('input', (event) => {
			this.onChangeNewTaskInput(event);
		});
		newTaskInput.addEventListener('keypress', (event) => {
			this.onKeyPressNewTaskInput(event);
		});
		newTaskButtons.addEventListener('click', (event) => {
			this.onClickNewTaskButtons(event);
		});

		this.sectionPinnedTasks.addEventListener('click', (event) => {
			this.onClickPinnedTasks(event);
		});

		this.sectionOtherTasks.addEventListener('click', (event) => {
			this.onClickOtherTasks(event);
		});

		const modalButtons = this.modal.querySelector('.modal-buttons');

		modalButtons.addEventListener('click', (event) => {
			this.onClickModalButton(event);
		})
	}

	onClickInterfaceButtons(event) {
		event.preventDefault();
		this.clickInterfaceButtonsListeners.forEach(item => item.call(null, event))
	}

	onChangeNewTaskInput(event) {
		event.preventDefault();
		this.changeNewTaskInputListeners.forEach(item => item.call(null, event))
	}

	onKeyPressNewTaskInput(event) {
		this.keyPressNewTaskInputListeners.forEach(item => item.call(null, event))
	}

	onClickNewTaskButtons(event) {
		event.preventDefault();
		this.clickNewTaskButtonsListeners.forEach(item => item.call(null, event))
	}

	onClickPinnedTasks(event) {
		event.preventDefault();
		this.clickPinnedTasksListeners.forEach(item => item.call(null, event))
	}

	onClickOtherTasks(event) {
		event.preventDefault();
		this.clickOtherTasksListeners.forEach(item => item.call(null, event))
	}

	addClickInterfaceButtons(callback) {
		this.clickInterfaceButtonsListeners.push(callback)
	}

	addChangeNewTaskInput(callback) {
		this.changeNewTaskInputListeners.push(callback)
	}

	addKeyPressNewTaskInput(callback) {
		this.keyPressNewTaskInputListeners.push(callback)
	}

	addClickNewTaskButtons(callback) {
		this.clickNewTaskButtonsListeners.push(callback)
	}

	addClickPinnedTasks(callback) {
		this.clickPinnedTasksListeners.push(callback)
	}

	addClickOtherTasks(callback) {
		this.clickOtherTasksListeners.push(callback)
	}




	showMessage(message, section) {}

	hideMessage() {}

	showModalButtons(idTask) {}

	hideModalButtons() {}



	hideMessageEmptySection(section) {}

	renderSectionTasks(tasks, section) {}

	renderTask(task, section) {}
}



