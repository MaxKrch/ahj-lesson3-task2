export default class State {
	constructor () {
		this.idNewTask = 0;
		this.pinnedTasks = [];
		this.otherTasks = [];
		this.hiddenTasks = [];
		this.tempTextNewTask = null;
	}

	saveBoard() {
//тут будет основная логика сохранения текущего стейта в локалсторэдж

		return false;
	}

	loadBoard () {
		const savedBoard = [];

		return savedBoard;
//тут по аналоги основная логика загрузки из локал стораджа, 
	}

	clearState() {
		
	}
}