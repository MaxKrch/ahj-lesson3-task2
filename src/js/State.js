export default class State {
	constructor() {
		this.idNewTask = 0;
		this.pinnedTasks = [];
		this.otherTasks = [];
		this.hiddenTasks = [];
		this.tempTextNewTask = "";
	}

	saveBoard() {
		const savedPinnedTasks = this.pinnedTasks.map((item) => {
			const id = item.dataset.id;
			const text = item.querySelector(".task-description").innerText.trim();
			const checked = true;

			return {
				id,
				text,
				checked,
			};
		});

		const savedOtherTasks = this.otherTasks.map((item) => {
			const id = item.dataset.id;
			const text = item.querySelector(".task-description").innerText.trim();
			const checked = false;

			return {
				id,
				text,
				checked,
			};
		});

		const savedHiddenTasks = this.hiddenTasks.map((item) => {
			const id = item.dataset.id;
			const text = item.querySelector(".task-description").innerText.trim();
			const checked = false;

			return {
				id,
				text,
				checked,
			};
		});

		const listTasksState = {
			idNewTask: this.idNewTask,
			tempTextNewTask: this.tempTextNewTask,
			savedPinnedTasks,
			savedOtherTasks,
			savedHiddenTasks,
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
